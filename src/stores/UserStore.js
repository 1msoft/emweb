import { observable, action, reaction } from 'mobx'
import PouchDB from 'pouchdb'
import bcrypt from '../utils/bcrypt'

import UserModel from '../models/UserModel'
import {DATABASE_URL} from '../common/constant'

const DB_URL = DATABASE_URL
PouchDB.plugin(require('pouchdb-find'))
PouchDB.debug.enable('pouchdb:find')
// const DB_URL = 'http://localhost:5984/fyzxk'

export default class UserStore {
  db

  @observable isLoading = false
  @observable currentUserId = null
  @observable currentUser = {}
  @observable userList = []
  @observable getQueryParams = {
    conds: {username: {'$regex': ''}},
    page: {
      current: 1,
      pageSize: 10,
      total: 0
    }
  }

  constructor() {
    this.db = new PouchDB(DB_URL)
    // console.log(this.db)
    // eslint-disable-next-line
    this.getUserList()
    this.queryWhenSetCurrentId()
  }

  //获取用户列表
  @action
  getUserList() {
    this.isLoading = true
    this.db.createIndex({
      index: {
        fields: ['username']
      }
    }).then( () => {
      return this.db.find({
        selector: this.getQueryParams.conds,
        limit: this.getQueryParams.page.pageSize + 1,
        skip: (this.getQueryParams.page.current - 1) * this.getQueryParams.page.pageSize
      }).then( (res) => {
        const offset = (this.getQueryParams.page.current - 1) * this.getQueryParams.page.pageSize
        this.getQueryParams.page.total = offset + res.docs.length

        res.docs.length > this.getQueryParams.page.pageSize && res.docs.pop()
        this.userList = res.docs.map( (item) => new UserModel(this, item) )

        this.isLoading = false
      }).catch( (err) => {
        console.log(err)
      })
    })
  }

  //设置查询条件
  @action
  setQueryParams = (...options) => {
    options.forEach((option) => {
      if(option.change) {
        Object.assign(this.getQueryParams.conds, option.conds)
        Object.assign(this.getQueryParams.page, option.page)
      } else {
        Object.assign(this.getQueryParams, option)
      }
    })
  }

  //新建用户
  @action
  create() {
    const user = new UserModel(this)
    this.currentUser = user
    this.currentUser.password = bcrypt.encryptSync('123456')
    return user
  }

  //设置当前用户ID
  @action
  setCurrentUserId = (_id) => {
    this.currentUserId = _id
  }

  queryWhenSetCurrentId() {
    reaction(
      () => this.currentUserId,
      this.findById
    )
  }

  //查询
  @action
  findById(_id) {
    if(!_id) return
    this.db.get(_id).then(response => {
      this.currentUser = new UserModel(this, response)
    }).catch(err => {
      console.log(err)
    })
  }

  //表单提交
  @action
  submit = (currentUser) => {
    // console.log("表单提交")
    !currentUser._id && (currentUser._id = currentUser.generateId())
    this.db.put(currentUser.toJS())
    .then(() => {
      this.getUserList()
    }).catch(err => console.log(err))
  }

  //删除对应数据
  @action
  onDelete(_id) {
    this.db.get(_id)
    .then((_id) => {
      return this.db.remove(_id)
    }).then(() => {
      this.getUserList()
    }).catch(err => {
      console.log(err)
    })
  }

  //重置密码
  @action
  onReset(_id) {
    this.db.get(_id).then(response => {
      response.password = bcrypt.encryptSync('123456')
      return this.db.put(response)
    }).then(() => {
      this.getUserList()
    })
  }
}
