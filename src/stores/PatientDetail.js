import { observable } from 'mobx'
import _ from 'lodash'
import PouchDB from 'pouchdb'
import {DATABASE_URL} from '../common/constant'

const DB_URL = DATABASE_URL
PouchDB.plugin(require('pouchdb-find'))
PouchDB.debug.enable('pouchdb:find')

export default class PatientDateil {
  db

  @observable isLoading = false
  @observable currentUserId = null
  @observable currentUser = {}
  @observable detailList = []

  constructor() {
    this.db = new PouchDB(DB_URL)
    // this.getDetailData()
  }
  //获取样本列表
  getDetailData = (num = 'AGCHPC0118', cb) => {
    this.isLoading = false
    this.db.createIndex({
      index: {
        fields: ['PatientNumber']
      }
    }).then( () => {
      return this.db.find({
        selector: {PatientNumber: num}
      }).then( (res) => {
        this.detailList = res.docs
        this.isLoading = false
        cb && cb()
      }).catch( (err) => {
        console.log(err)
      })
    })
  }
}

