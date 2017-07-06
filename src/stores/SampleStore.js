import { observable, action } from 'mobx'
import PouchDB from 'pouchdb'

import {DATABASE_URL} from '../common/constant'

PouchDB.plugin(require('pouchdb-find'))
PouchDB.debug.enable('pouchdb:find')

const DB_URL = DATABASE_URL
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
  @action
  getSampleList = (cb) => {
    this.isLoading = true
    const indexes = ['patient_id', 'sample_id', 'sample_type', 'instance_id', 'instance_type', 'recruit_time', 'recruit_type',
      'raw_input_key','raw_yield_key','raw_yield_value','seq_id','seq_time','seq_input_key','seq_input_value','mean_seq_depth',
      'target_rate','median_length','raw_seq_file','seq_quailty_file','analysis_result_file','compare_sample','compare_instance_id',
      'compare_seq_id', 'compare_seq_time', 'portalDataType']
    this.db.find({
      selector:this.queryParams.conds,
      limit: 10000
    }).then((res) => {
      this.queryParams.page.total = res.docs.length
    })
    Promise.all(indexes.map( (index) => {
      return this.db.createIndex({
        index: {
          fields: [index]
        }
      })
    })).then( () => {
      return this.db.find({
        // sort: this.queryParams.sort,
        selector:this.queryParams.conds,
        limit: this.queryParams.page.pageSize + 1,
        // limit: 1000,
        skip: (this.queryParams.page.current - 1) * this.queryParams.page.pageSize,
      }).then( (res) => {
        // const offset = (this.queryParams.page.current - 1) * this.queryParams.page.pageSize
        // this.queryParams.page.total = offset + res.docs.length
        // this.queryParams.page.total = res.docs.length

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
  @action
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
  //编辑行
  @action
  editRow = (_id, changeData) => {
    if(!_id) {
      const num_1 = Math.floor(Math.random() * 10)
      const num_2 = Math.floor(Math.random() * 10)
      const num_3 = Math.floor(Math.random() * 10)
      this.db.put({
        _id: `sample_${num_1}${num_2}${num_3}`,
        portalDataType: 'D_SAMPLE',
        ...changeData
      }).then((doc) => {
        this.getSampleList()
        return
      })
    }
    this.db.get(_id).then(doc => {
      doc.sample_id = changeData.sample_id
      doc.sample_type = changeData.sample_type
      doc.patient_id = changeData.patient_id
      return this.db.put(doc)
    }).then((doc) => {
      this.getSampleList()
    })
  }
  //删除行
  @action
  deleteRow = (_id) => {
    this.db.get(_id).then(doc => {
      return this.db.remove(doc)
    }).then(() => {
      this.getSampleList()
    })
  }
}

