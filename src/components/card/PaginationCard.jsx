import React, { Component } from 'react'
import { Card, Pagination } from 'antd'
import './PaginationCard.css'

/**
 * 卡片式列表
 * 配置参数 data为数组，包含image，title，content
 * 使用方式：
 * <PaginationCards data={} />
 */
export default class PaginationCards extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			pageSize: 3,
			distance: 0,
		}
	}

	render() {
		// 分页设置
		const pagination = {
			showTotal: this.showTotal,
			total: this.props.data.length,
			onChange: this.onChange,
		}

		return (
			<div style={{ width: '100%', overflow: 'hidden' }} ref='border_area'>
				<div style={{ width: `${35 * pagination.total}%`, marginLeft: `${this.state.distance}` }} ref='content_area'>
					{this.cards()}
				</div>
				<div className="card-page">
					<Pagination
						showTotal={this.showTotal}
						total={this.props.data.length}
						pageSize={3}
						onChange={this.onChange} />
				</div>
			</div>
		)
	}

	cards() {
		const cardData = this.props.data.map((item, index) => {
			return <div className="custom-div" key={index}>
				<Card style={{ display: `${item.display}`, width: 240, height: 360 }} bodyStyle={{ padding: 5 }}>
					<div className="custom-image">
						<img alt="example" width="100%" src={item.images} />
					</div>
					<div className="custom-card">
						<h3> {item.title} </h3>
						<p> {item.content} </p>
					</div>
				</Card>
			</div>
		})
		return cardData
	}

	// 显示条数
	showTotal(total, range) {
		return `当前 ${range[0]} - ${range[1]} 条 总共${total}条`
	}

	onChange = (page, pageSize) => {
		const contentWide = this.refs.border_area.clientWidth
		console.log('contentWide', contentWide)
		this.refs.content_area.style.marginLeft = `${-contentWide * (page - 1)}px`
	}
}