import { observable, action } from 'mobx'
import _ from 'lodash'
import PouchDB from 'pouchdb'

import {DATABASE_URL} from '../common/constant'

const DB_URL = DATABASE_URL
PouchDB.plugin(require('pouchdb-find'))
PouchDB.debug.enable('pouchdb:find')

//突变
export default class SampleStore {
  db

  @observable isLoading = false
  @observable currentUserId = null
  @observable currentUser = {}
  @observable sampleList = []
  @observable patientSampleList = []
  @observable queryAllData = []
  @observable queryParams = {
    conds: {
      'portalDataType': {'$eq': "D_SAMPLE"},
    },
    orders: {},
    page: {
      current: 1,
      pageSize: 10,
      total: 0
    },
  }

  constructor() {
    this.db = new PouchDB(DB_URL)
    this.getSampleList()
  }
  //获取样本列表
  getSampleList = (patient_id, cb) => {
    this.isLoading = false
    const indexes = ['patient_id', 'sample_id', 'sample_type', 'instance_id', 'instance_type', 'recruit_time', '检测情况', 'portalDataType']

    Promise.all(indexes.map( (index) => {
      return this.db.createIndex({
        index: {
          fields: [index]
        }
      })
    })).then( () => {
      // return this.db.find({
      //   selector: Object.assign(this.queryParams.conds, mustField, {"sample_id": {"$regex": ""}}),
      //   limit: this.queryParams.page.pageSize + 1,
      //   skip: (this.queryParams.page.current - 1) * this.queryParams.page.pageSize,
      // }).then( (res) => {
      return this.db.find({
        sort: this.queryParams.sort,
        selector:this.queryParams.conds,
        limit: this.queryParams.page.pageSize + 1,
        skip: (this.queryParams.page.current - 1) * this.queryParams.page.pageSize,
      }).then( (res) => {
        const offset = (this.queryParams.page.current - 1) * this.queryParams.page.pageSize
        this.queryParams.page.total = offset + res.docs.length

        res.docs.length > this.queryParams.page.pageSize && res.docs.pop()
        this.sampleList = res.docs
        cb && cb()
        this.isLoading = false
      }).catch( (err) => {
        console.log(err)
      })
    })
  }

  //获取病人下的样本
  getPatientSampleList = (patient, cb) => {
    const patient_id = patient ? {$regex: patient} : undefined
    this.db.createIndex({
      index: {
        fields: ['portalDataType', 'patient_id']
      }
    }).then( () => {
      return this.db.find({
        selector: {portalDataType: {$eq: 'D_SAMPLE'}, patient_id},
      }).then( (res) => {
        this.patientSampleList = res.docs
        cb && cb()
        this.isLoading = false
      }).catch( (err) => {
        console.log(err)
      })
    })
  }
  //获取查询查询所有数据
  getAllData = (cb) => {
    this.db.createIndex({
      index: {
        fields: ['portalDataType']
      }
    }).then( () => {
      return this.db.find({
        limit: 10000,
        selector: this.queryParams.conds,
      }).then( (res) => {
        this.queryAllData = res.docs
        cb()
        console.log('new:', this.queryAllData)
      }).catch( (err) => {
        console.log(err)
      })
    })
  }

  //设置查询条件
  @action
  setQueryParams = (...options) => {
    options.forEach((option) => {
      if (option.change) {
        Object.assign(this.queryParams.conds, option.conds)
        Object.assign(this.queryParams.page, option.page)
      } else {
        Object.assign(this.queryParams, option)
      }
    })
  }
}

