import React, { Component } from 'react'
import {Table, message} from 'antd'
import { QueryFormsInput,
         QueryFormsSelect,
         QueryFormsButton,
         QueryFormsDateTime,
				 QueryFormsQuery } from '../../components/form/QueryFormElement'
import QueryForms from '../../components/form/QueryForm'

//假数据Start
 //假数据-选项
const options = [
	{
		opValue: '男',
		opText: '男',
	}, {
		opValue: '女',
		opText: '女',
	}
]
  //假数据-表格数据
const tableDate = [
	{id: '1', name: '张三', gender: '男', time: '2017-01-01', tel: '123456789'},
	{id: '2', name: '李四', gender: '男', time: '2017-02-02', tel: '987654321'},
	{id: '3', name: '王五', gender: '男', time: '2017-03-03', tel: '154321562'},
	{id: '4', name: '马六', gender: '男', time: '2017-04-04', tel: '987565435'},
	{id: '5', name: '赵钱', gender: '女', time: '2017-05-05', tel: '791265354'},
	{id: '6', name: '孙李', gender: '女', time: '2017-06-06', tel: '321515846'},
	{id: '7', name: '周吴', gender: '女', time: '2017-07-07', tel: '795661325'},
	{id: '8', name: '郑王', gender: '女', time: '2017-08-08', tel: '545432145'}
]


//假数据End

export default class QueryForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			tableDateSource: tableDate
		}
	}

	changeDate = (date) => {
		console.log(date)
		this.setState({
			tableDateSource: date
		})
	}

	enterKey = () => {
		message.info("按F12，查看console")
		console.log("按回车键，触发事件")
	}

	render() {
		const columns = [{
			title: 'ID编号',
			dataIndex: 'id',
			key: 'id'
		}, {
			title: '昵称',
			dataIndex: 'name',
			key: 'name'
		}, {
			title: '性别',
			dataIndex: 'gender',
			key: 'gender'
		}, {
			title: '电话号码',
			dataIndex: 'tel',
			key: 'tel'
		}, {
			title: '创建时间',
			dataIndex: 'time',
			key: 'time'
		}]
		return (
			<div style={{width: '80%',
									 margin: '0 auto',
									 background: '#fff',
									 marginBottom: '30px',
									 padding: '15px 0'}}>
					<TestQueryForm changeDate={this.changeDate} enterKey={this.enterKey} aotu_focus={true} />
					<Table style={{width: '95%', margin: '0 auto'}}
								 columns={columns}
								 dataSource={this.state.tableDateSource}
								 bordered />
			</div>
		)
	}
}

class TestQueryForm extends QueryForms {
	constructor(props) {
		super(props)
		this.state = {
			id: '',
			name: '',
			gender: '',
			tel: ''
		}
	}

	parmsList() {
		return [
			QueryFormsInput('ID编号：', {placeholder: 'ID编号',
											onChange: (e) => {this.changeState('id', e)}},
											'id', this.state.id, '$regex'),
			QueryFormsInput('昵称：', {placeholder: '昵称',
																	onChange: (e) => {this.changeState('name', e)}},
											'name', this.state.name, '$or'),
			QueryFormsSelect('选择：', {placeholder: '选择',
																 onSelect: (value, option) => {this.selectState(value, option, 'gender')}},
											options, 'gender', this.state.gender),
			QueryFormsDateTime('日期选择：',
												{placeholder: '起始日期'},
												{placeholder: '结束日期'}),
			QueryFormsInput('电话：', {placeholder: '电话',
																onChange: (e) => {this.changeState('tel', e)}},
											'tel', this.state.tel, '$regex'),
			QueryFormsButton('查询', {size: 'large', type: 'primary',
																onClick: () => {this.sreach()}}),
			QueryFormsQuery((parms) => {this.querySreach(parms)})
		]
	}

	changeState = (name, e) => {
		this.setState({[name]: e.target.value})
	}

	selectState = (value, option, name) => {
		this.setState({[name]: value})
	}

	querySreach(parms){
		message.info("按F12，查看console")
		console.log('组成的查询条件:', parms)
	}

	sreach = () => {
		const {id, name, gender, tel} = this.state
		const data = []
		let idREg = new RegExp(`${id}`,'i'),
			  nameREg = new RegExp(`${name}`,'i'),
				genderREG = new RegExp(`${gender}`, 'i'),
				telREg = new RegExp(`${tel}`,'i')
		for (let i = 0; i < tableDate.length; i++) {
			if (tableDate[i].id.match(idREg) !== null &&
					tableDate[i].name.match(nameREg) !== null &&
					tableDate[i].gender.match(genderREG) !== null &&
					tableDate[i].tel.match(telREg) !== null) {
				data.push(tableDate[i])
			}
		}
		this.props.changeDate(data)
		// this.props.changeDate(a)
	}
}
