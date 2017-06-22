import React, { Component } from 'react';
import { Steps, Popover, Button, message } from 'antd';

/**
 *          date表示数据 
 * 使用方式  <TimeLine date={date} />
 * 
 * 详解： 		date.CreateTime表示date中的入院时间
 * 			  date.sketch表示简述
 * 			  item.details表示详细介绍
 * date参数例子: 
 * [{CreateTime: '2017-01-01',
     sketch: '事件描述详细信息事件描述详细信息1',
     details: '事情详情介绍事情详情介绍事情详情介绍'}]
 * 
 * 关于对step的修改： title为入院时间点
 * 					 description为简述  即为时间点下面的内容
 * 					 status为详情  即为气泡提示块
 */

const Step = Steps.Step;
export default class TimeLine extends Component {
	constructor(props) {
		super(props)
		this.state = {
			marginLeft: 0
		}
	}

	step() {
		const date = this.props.date
		const step = date.map((item, index) => {
			return <Step title={item.CreateTime}
							description={item.sketch}
							status={item.details}
							key={index} />
		})
		return step
	}

	move(length, direction) {
		const lineWidth = document.getElementById('line').clientWidth
		const lineMarginLeft = parseInt(lineWidth * 5 / length * direction)
		let newMarginLeft = this.state.marginLeft+lineMarginLeft
		if (newMarginLeft > 0) {
			newMarginLeft = 0
			message.warning("最前面了，不能再移动了")
		}
		if (newMarginLeft < -lineWidth) {
			message.warning("最后一个记录了，后面没有了")
			return
		}
		this.setState({
			marginLeft: newMarginLeft
		})
	}

	render() {
		const date = this.props.date
		const dateLength = date.length
		const customDot = (dot, { status, index, title, icon }) => (
					<Popover content={<span>{status}</span>}>
						{dot}
					</Popover>
				);
		return (
			<div id="TimeLine" className="TimeLine" style={{overflow:'hidden',marginTop: '50px'}}>
				<div style={{textAlign: 'right'}}>
					<span style={{marginRight: '15px'}}>
						<Button
							type="primary"
							shape="circle"
							icon="left"
							onClick={this.move.bind(this, dateLength, 1)} />
					</span>
					<span style={{marginRight: '15px'}}>
						<Button
							type="primary"
							shape="circle"
							icon="right"
							onClick={this.move.bind(this, dateLength, -1)} />
					</span>
				</div>
				<br />
				<div id='line'
				  style={{width: `${dateLength/5*100}%`,
									minWidth: '100%',
									marginLeft: `${this.state.marginLeft}px`}}>
					<Steps progressDot={customDot} >
						{
							this.step()
						}
					</Steps>
				</div>
			</div>
		)
	}
}