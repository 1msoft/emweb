import { observable, action } from 'mobx'
import _ from 'lodash'
import PouchDB from 'pouchdb'
import {DATABASE_URL} from '../common/constant'

const DB_URL = DATABASE_URL
PouchDB.plugin(require('pouchdb-find'))
PouchDB.debug.enable('pouchdb:find')

//突变
export default class MutationStore {
  db

  @observable isLoading = false
  @observable currentUserId = null
  @observable currentUser = {}
  @observable mutationList = []
  @observable patientMutationList = []
  @observable queryAllData = []
  @observable queryParams = {
    conds: {
      'portalDataType': {'$eq': "D_MUTATION"},
    },
    orders: {},
    page: {
      current: 1,
      pageSize: 10,
      total: 0
    }
  }

  constructor() {
    this.db = new PouchDB(DB_URL)
    this.getMutationList()
  }
  //获取样本列表
  getMutationList = () => {
    this.isLoading = false
    const indexes = ['patient_id', 'sample_id', 'sample_type', 'chrom', 'start_pos',
          'reference', 'alternate', 'annotation', 'gene_name', 'feature_type', 'feature_id', 'hgvs_c',
          'hgvs_p', 'rank', 'af', 'portalDataType']

    Promise.all(indexes.map( (index) => {
      return this.db.createIndex({
        index: {
          fields: [index]
        }
      })
    })).then( () => {
      return this.db.find({
        sort: this.queryParams.sort,
        selector: this.queryParams.conds,
        limit: this.queryParams.page.pageSize + 1,
        skip: (this.queryParams.page.current - 1) * this.queryParams.page.pageSize
      }).then( (res) => {
        const offset = (this.queryParams.page.current - 1) * this.queryParams.page.pageSize
        this.queryParams.page.total = offset + res.docs.length

        res.docs.length > this.queryParams.page.pageSize && res.docs.pop()
        this.mutationList = res.docs
        this.isLoading = false
      }).catch( (err) => {
        console.log(err)
      })
    })
  }
  //获取病人基因突变数据
  getPatientMutationList = (sample, cb) => {
    const sample_id = sample ? {$regex: sample} : undefined
    this.db.createIndex({
      index: {
        fields: ['portalDataType', 'sample_id']
      }
    }).then( () => {
      return this.db.find({
        selector: {portalDataType: {$eq: 'D_MUTATION'}, sample_id},
      }).then( (res) => {
        this.patientMutationList = res.docs
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

