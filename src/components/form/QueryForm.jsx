import React, { Component } from 'react';
import { Input, Select, Button, message, Form, DatePicker } from 'antd';

const Option = Select.Option
const FormItem = Form.Item
const formItemLayout = {
				labelCol: {span: 8},
				wrapperCol: {span: 14},
    	};
export default class QueryForms extends Component {

	componentDidMount() {
		const autoFocus = this.props.aotu_focus
		if (autoFocus) {
			let queryForm_AotuFocus = document.getElementById("queryForm_AotuFocus")
			queryForm_AotuFocus.focus()
		}
	}

	queryType() {
		const queryCondition = this.parmsList()
		const enterKey = this.props.enterKey
		const autoFocus = this.props.aotu_focus
		const queryForm = queryCondition.map((item, index) => {
				switch(item.type) {
					case 'input':
						return <FormItem {...formItemLayout}
										label={item.text}
										key={index}
										className="query-list">
											<Input {...item.parms}
											id={(autoFocus === true && index === 0) ?
													'queryForm_AotuFocus' : null}
											onKeyDown={enterKey !== undefined ?
																((e) => e.keyCode === 13 ? enterKey() : null) :
																null}
											/>
									</FormItem>
					case 'select':
						return <FormItem {...formItemLayout}
										label={item.text}
										key={index}
										className="query-list">
										<Select className="query-select"
														{...item.parms}>
											{item.options.map((value, index) => {
												return <Option key={index}
																value={value.opValue}>
																	{value.opText}
																</Option>
											})}
										</Select>
									</FormItem>
					case 'button':
						return <span key={index} className="query-button">
										<Button {...item.parms}>
											{item.text}
										</Button>
									 </span>
					case 'query':
						return <span key={index} className='query-button'>
										<Button type="primary" size="large" icon="search"
										onClick={this.query.bind(this,item.clickFunction)}>
											查询
										</Button>
									 </span>
					case 'dateTime':
						return <FormItem {...formItemLayout}
											label={item.text}
											key={index}
											className="query-date">
												<DatePicker style={{width: '47%'}}
												{...item.startParms} />
												~
												<DatePicker style={{width: '47%'}}
												{...item.endParms} />
							   	 </FormItem>
					default:
							return message.error("传入数据type错误格式错误")
				}
		})
		return queryForm
	}

	query(cb){
		const queryCondition = this.parmsList()
		const conds = {}
		queryCondition.map((item, index) => {
			if (item.type === 'dateTime') {
				console.log(item)
				if (item.startQueryValue === undefined && item.endQueryValue === undefined) {
					return conds
				} else if (item.startQueryValue !== undefined && item.endQueryValue === undefined) {
					return conds[item.queryName] = {'$gte': item.startQueryValue}
				} else if (item.startQueryValue === undefined && item.endQueryValue !== undefined) {
					return conds[item.queryName] = {'$lte': item.endQueryValue}
				} else {
					return conds[item.queryName] = {'$gte': item.startQueryValue, '$lte': item.endQueryValue}
				}
			}
			if (item.queryName === undefined) {
				return conds
			}
			if (item.queryReg) {
				return conds[item.queryName] = {[item.queryReg] : item.queryValue}
			} else {
				return conds[item.queryName] = item.queryValue
			}
		})
		cb(conds)
	}

	render() {
		return (
			<div>
				{this.queryType()}
			</div>
		)
	}
}
