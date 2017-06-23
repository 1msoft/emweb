import { observable, action } from 'mobx'
import PouchDB from 'pouchdb'
import {DATABASE_URL} from '../common/constant'
import promiseMap from 'promise.map'

const DB_URL = DATABASE_URL
PouchDB.plugin(require('pouchdb-find'))
PouchDB.debug.enable('pouchdb:find')

export default class DataStore {
  db

  @observable isLoading = false
  @observable currentUserId = null
  @observable currentUser = {}
  @observable dataList = []
  @observable queryAllData = []
  @observable incompleteData = []
  @observable queryParams = {
    conds: {'portalDataType': {'$eq': "D_PATIENT"}},
    orders: {},
    page: {
      current: 1,
      pageSize: 10,
      total: 0
    }
  }

  constructor() {
    this.db = new PouchDB(DB_URL)
    this.getDataList()
  }
  //获取样本列表
  getDataList = (cb) => {
    this.isLoading = false
    const indexes = ['Name', 'PatientNumber', '疾病名称', '临床分期', 'Survivalstatus', 'CreateTime', 'portalDataType']

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
        this.dataList = res.docs
        cb && cb()
        this.isLoading = false
      }).catch( (err) => {
        console.log(err)
      })
    })
  }

  //获取查询的所有数据  导出
  @action
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

  //完整信息查询
  @action
  getIncompleteData = (cb, loding) => {
    this.db.createIndex({
      index: {
        fields: ['portalDataType']
      }
    }).then( () => {
      loding()
      return this.db.find({
        limit: 10000,
        selector: this.queryParams.conds,
      }).then( (res) => {
        return res.docs
      }).then( (res) => {
        return promiseMap(res, (item, index, arr) => {
          return this.db.find({
            selector: {
              'portalDataType': {"$eq": 'D_SAMPLE'},
              'patient_id':{"$eq": item.PatientNumber}
            }
          }).then( (date) => {
            item.sample = date.docs
            return item
          })
        }, 5)
      }).then((res) => {
        return promiseMap(res, (items, index, arr) => {
          return promiseMap(items.sample, (item) =>{
            return this.db.find({
              selector: {
                'portalDataType': 'D_MUTATION',
                'sample_id': item.sample_id
              }
            }).then( (value) =>{
              item.mutationMessage = value.docs
              return items
            })
          }, 5)
        }, 5)
      }).then((res) => {
          this.incompleteData = res
          cb()
          loding()
        })
    })
  }
}

