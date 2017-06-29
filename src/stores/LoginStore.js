import { observable, action } from 'mobx'
import { message } from 'antd'
import PouchDB from 'pouchdb'

import bcrypt from '../utils/bcrypt'
import cookie from '../utils/cookie'
import {DATABASE_URL} from '../common/constant'

const DB_URL = DATABASE_URL
// const DB_URL = 'http://localhost:5984/fyzxk'

PouchDB.plugin(require('pouchdb-find'))
PouchDB.debug.enable('pouchdb:find')



export default class LoginStore {
	db

	@observable isLoading = false
	@observable loginUser = {}

	constructor(){
		this.db = new PouchDB(DB_URL)
	}

	@action
	getList = (userName, userPassWord, cb)=> {
		this.isLoading = true

		this.db.createIndex({
			index:{fields:['username']}
		}).then( ()=>{
			return this.db.find({
				selector: {username: userName}
			})
		}).then( (res)=>{
			if(res.docs[0] === undefined) {
				message.error("账号不存在")
				return
			}
			if (bcrypt.compareSync(userPassWord, res.docs[0].password)) {
				message.success('登录成功')
				this.loginUser = res.docs[0]
				cookie.set('_id', res.docs[0]._id)
				cb()
			} else {
				message.error('密码不正确')
			}
			this.isLoading = false
		}).catch( (err)=>{
		})
	}

	@action
  findId = (id) => {
    this.db.get(id).then(date => {
      this.loginUser = date
    })
  }

  @action
  changePassWord = (id, newpass, cb) => {
    this.db.get(id).then(date => {
      date.password = bcrypt.encryptSync(newpass)
      return this.db.put(date)
    }).then(() => {
      message.success('密码修改成功，请重新登录！')
			cb()
    }).catch((err) => {
      console.log(err)
    })
  }
}
