import React, { Component } from 'react'
import { Card, Pagination, Row, Col } from 'antd'
import imgSrc from '../../assets/image/u72.png'

export default class PaginationCard extends Component {
	constructor(props) {
		super(props)
		this.pageNext=this.pageNext.bind(this)
    this.setPage=this.setPage.bind(this)
    this.state = {
      dataList: [],
      totalData: data,
      current: 1,
      pageSize: 3,
      govalue: 0,
      totalPage: 0,
    }
	}

	componentWillMount() {
    this.setState({
      totalPage: Math.ceil(this.state.totalData.length/this.state.pageSize)
    })
  }

  // 设置内容
  setPage(num) {
    this.setState({
      dataList: this.state.totalData.slice(num, num+this.state.pageSize)
    })
  }

  pageNext(num) {
    this.setPage(num)
  }

	render() {
		return (
			<div>
				{this.cards()}
				{/*<Pagination
					showTotal={this.showTotal}
					total={this.props.data.length}
					pageSize={3} />*/}
				<PageButton {...this.state} pageNext={this.pageNext} />
			</div>
		)
	}

	cards() {
		const cardData = this.props.data.map((item, index) => {
			return <div className="custom-div" key={index}>
				<Card style={{ width: 240, height: 360 }} bodyStyle={{ padding: 5 }}>
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
}

class pageButton extends Component {
	constructor(props) {
		super(props)
		this.setNext = this.setNext.bind(this)
		this.setUp = this.setUp.bind(this)
		this.state = {
			num: 0,
			pagenum: this.props.current
		}
	}

	// 下一页
	setNext() {
		if(this.state.pagenum < this.props.totalPage) {
			this.setState({
				num: this.state.num + this.props.pageSize,
				pagenum: this.state.pagenum + 1
			}, function() {
				console.log(this.state)
				this.props.pageNext(this.state.num)
			})
		}
	}

	// 上一页
	setUp() {
		if(this.state.pagenum > 1) {
			this.setState({
				num: this.state.num - this.props.pageSize,
				pagenum: this.state.pagenum - 1
			}, function() {
				console.log(this.state)
				this.props.pageNext(this.state.num)
			})
		}
	}
	render() {
		return (
			<div>
				<span onClick={this.setUp}> 上一页 </span>
				<span> {this.state.pagenum}页/{this.props.totalPage}页 </span>
				<span onClick={this.setNext}> 下一页 </span>
			</div>
		)
	}
}