import React, { Component } from 'react'
import { Table } from 'antd'
import PieChart from '../../components/table/PieChart'

const percentage = []

for(let i=1; i <= 5; i++) {
  const tage = {percantage: Math.floor(Math.random()* (60 - 40 + 1)) + 40 + '%'}
  percentage.push(tage)
}

class SimplePieChart extends Component {
  render() {
    return (
      <div>
        <div style={{marginBottom: '20px'}}>
          <PieChart rate='50%' />
          <PieChart rate='30%' />
          <PieChart rate='10%' />
        </div>
        <Table
          dataSource={percentage}
          pagination={false}
          bordered
          columns={[{title: '百分比饼图', dataIndex: 'percantage', render(text) {
            return (
            <PieChart rate={text} width={20} />
            )
          }}]}/>
      </div>
    )
  }
}

export default SimplePieChart
