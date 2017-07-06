import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Row, Col } from 'antd'
import PaginationCards from '../../components/card/PaginationCard'

const data = [{
  images: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
  title: '1',
  content: '天气不错',
}, {
  images: require('../../assets/image/u72.png'),
  title: '2',
  content: '天气不错',
}, {
  images: require('../../assets/image/u72.png'),
  title: '3',
  content: '天气不错',
}, {
  images: require('../../assets/image/u72.png'),
  title: '4',
  content: '天气不错',
}, {
  images: require('../../assets/image/u72.png'),
  title: '5',
  content: '天气不错',
}, {
  images: require('../../assets/image/u72.png'),
  title: '6',
  content: '天气不错',
}, {
  images: require('../../assets/image/u72.png'),
  title: '7',
  content: '天气不错',
}, {
  images: require('../../assets/image/u72.png'),
  title: '8',
  content: '天气不错',
}]

export default class PaginationCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: data
    }
  }

  render() {
    console.log(this.state.data)
    return (
      <div style={{width: '90%', background: '#ECECEC', padding: '10px'}}>
        <Row gutter={16}>
          <PaginationCards
            data={this.state.data} />
        </Row>
      </div>
    )
  }
}