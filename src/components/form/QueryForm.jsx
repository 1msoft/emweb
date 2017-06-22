import React, { Component } from 'react';
import { Input, Select, Button, message, Form, DatePicker } from 'antd';

/**
 * parameter 为传进来的参数（为数组）
 * parameter的参数可以配合QueryFormElement文件使用
 * 使用方式：
 * class QueryFormses extends QueryForms {
 * 		parameter() {
    		return parameter(数组)
			}
 * }
 * 本组件有三个表单控件，分别是input select button
 * 
 * parameter参数例子：
 * [{type: 'input', name: 'casesNo', text: '病例编号', InputType: 'number',
 *   placeholder: '请输入', functio: ()=>{.....}}]
 * eventFunction表示事件及函数 如： {eventFunction： {onChange: () => {console.log('-----')}}}
 * 
 * InputType 为输入框控件独有的属性，其他两个控件没有。值为HTML中input的type的值
 * 
 * option  为选择控件独有的属性（数组），内有opValue和opText两个属性
 * 
 * button  有size, buttonType, icon三个独有属性。
 * 具体参考ant design的button的size，type，icon属性
 * 
 */
const Option = Select.Option
const FormItem = Form.Item
const { RangePicker } = DatePicker;
const formItemLayout = {
				labelCol: {span: 8},
				wrapperCol: {span: 14},
    	};
export default class QueryForms extends Component {

	queryType() {
		const queryCondition = this.parameter()
		const queryForm = queryCondition.map((item, index) => {
				switch(item.type) {
					case 'input':
						return <FormItem {...formItemLayout}
										label={item.text}
										key={index}
										className="query-list">
											<Input type={item.InputType}
														 value={item.value}
												     placeholder={item.placeholder}
														 onChange={item.eventFunction}
											/>
									</FormItem>
					case 'select':
						return <FormItem {...formItemLayout}
										label={item.text}
										key={index}
										className="query-list">
										<Select className="query-select"
														value={item.value}
														placeholder={item.placeholder}
														onSelect={item.eventFunction}>
											{item.option.map((value, index) => {
												return <Option key={index}
																value={value.opValue}>
																	{value.opText}
																</Option>
											})}
										</Select>
									</FormItem>
					case 'button':
						return <span key={index} className="query-button">
										<Button
											type={item.buttonType}
											size={item.size}
											icon={item.icon}
											onClick={item.eventFunction}>
											{item.text}
										</Button>
									</span>
					case 'date':
						return <FormItem {...formItemLayout}
									label={item.text}
									key={index}
									className="query-date">
									<RangePicker
									value={item.value}
									onChange={item.eventFunction} />
							   </FormItem>
					default:
							message.error("传入数据type错误格式错误")
				}
		})
		return queryForm
	}

	render() {
		return (
			<div>
				{this.queryType()}
			</div>
		)
	}
}
