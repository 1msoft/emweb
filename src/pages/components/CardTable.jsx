import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Layout } from 'antd'
import CollapsePanel from '../../components/card/CollapsePanel'
import SimpleTable from '../../components/table/SimpleTable'


const data_month = [{
  key: '1',
  time_quantum: '2017-06-21',
  visit_times: '3',
  visit_number: '9',
  visit_new: '4',
  visit_rate: '50%',
}, {
  key: '2',
  time_quantum: '2017-06-21',
  visit_times: '3',
  visit_number: '9',
  visit_new: '4',
  visit_rate: '50%',
},{
  key: '3',
  time_quantum: '2017-06-21',
  visit_times: '3',
  visit_number: '9',
  visit_new: '4',
  visit_rate: '50%',
}]

const data_week = [{
  key: '1',
  time_quantum: '2017-06-21',
  visit_times: '3',
  visit_number: '9',
  visit_new: '4',
  visit_rate: '60%',
}, {
  key: '2',
  time_quantum: '2017-06-21',
  visit_times: '3',
  visit_number: '9',
  visit_new: '4',
  visit_rate: '60%',
},{
  key: '3',
  time_quantum: '2017-06-21',
  visit_times: '3',
  visit_number: '9',
  visit_new: '4',
  visit_rate: '60%',
}]

@observer
export default class CardTable extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {

    return (
      <div>
        <CollapsePanel header="近一个月">
          <InfoTable columns={this.props.columns} dataSource={data_month} />
        </CollapsePanel>
        <CollapsePanel header="近一个星期">
          <InfoTable columns={this.props.columns} dataSource={data_week} />
        </CollapsePanel>
      </div>
    )
  }
}

class InfoTable extends SimpleTable {
  renderColumns() {
    return [{
      title: '访问时间',
      dataIndex: 'time_quantum',
      key: 'time_quantum',
    }, {
      title: '访问次数',
      dataIndex: 'visit_times',
      key: 'visit_times',
    }, {
      title: '访客数',
      dataIndex: 'visit_number',
      key: 'visit_number',
    }, {
      title: '新访客数',
      dataIndex: 'visit_new',
      key: 'visit_new',
    }, {
      title: '新访客比率',
      dataIndex: 'visit_rate',
      key: 'visit_rate',
    }]
  }
}
