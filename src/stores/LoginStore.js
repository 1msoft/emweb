/**
 *
 */
import { observable, action } from 'mobx'
import { message } from 'antd'
import PouchDB from 'pouchdb'

import bcrypt from '../utils/bcrypt'
import cookie from '../utils/cookie'
import {DATABASE_URL} from '../common/constant'

// const DB_URL = DATABASE_URL

/**
 * DB_URL
 * @constant
 * @type {String}
 * @default
 */
const DB_URL = 'http://localhost:5984/fyzxk'

PouchDB.plugin(require('pouchdb-find'))
PouchDB.debug.enable('pouchdb:find')

/**
 * LoginStore
 *
 * @export
 * @class LoginStore
 */
class LoginStore {
	db

	isLoading = false
	loginUser = {}

	constructor(){
		this.db = new PouchDB(DB_URL)
	}

  /**
    * 登录
    *
    * @param {String} userName     用户名称
    * @param {String} userPassWord 用户密码
    * @memberof LoginStore
    */
  @action
	login = (userName, userPassWord) => {
		return this.db.createIndex({
			index:{fields:['username']}
		}).then( () => {
			return this.db.find({
				limit: 1,
				selector: {username: userName}
			})
		}).catch(() => {
			throw 'fail_dataBase'
		}).then( (res) => {
			const userData = res.docs[0]
			if(userData === undefined) {
				return 'fail_username'
			}
			if (bcrypt.compareSync(userPassWord, userData.password)) {
				this.loginUser = userData
				cookie.set('_id', userData._id)
				return 'success'
			} else {
				return 'fail_password'
			}
		})
	}

  /**
   * 查询指定用户
   * @param {String} id  用户id
   * @returns {Object}   用户信息
   * @memberof LoginStore
   */
  findId = (id) => {
    return this.db.get(id).then(date => {
      this.loginUser = date
    })
  }

  /**
   * 修改密码
   *
   * @param {String} id      用户id
   * @param {String} newpass 新密码
   * @returns
   * @memberof LoginStore
   */
  changePassWord = (id, newpass) => {
    return this.db.get(id).then(date => {
      date.password = bcrypt.encryptSync(newpass)
      return this.db.put(date)
    })
		// .then(() => {
    //   message.success('密码修改成功，请重新登录！')
		// 	cb()
    // }).catch((err) => {
    //   console.log(err)
    // })
  }
}

export default LoginStore
