import React, { Component } from 'react'
import { Input, Table, Form } from 'antd'
import CostomForm from '../../components/form/CostomForm'

const dataSource = {
  "姓名": "SYAKJPC000473",
  "证件类型": "身份证",
  "证件号码": "35042519951207xxxx",
  "地址": "福州鼓楼",
  "邮编": "366100",
  "联系电话1": "0591-xxxxxxx",
  "联系电话2": "0591-xxxxxxx",
  "电子邮箱": "xxxxxxxx@qq.com",
  "性别": "2|女",
  "出生日期": "1957-02-17T00:00:00",
  "省份": "福建",
  "城市": "福州",
  "行政区": "鼓楼区",
  "婚姻状态": "未婚",
  "民族": "汉",
  "患者不知晓病情": "无",
  "备注": "无",
  "生存状态": "存活",
  "末次成功随访日期": "2017-1-1",
  "末次治疗日期": "2017-1-1",
  "身故日期": "",
  "身故原因": "",
}

class FormPage extends Component {
  render() {
    return (
      <div>
        <Checkout
          title="自定义表单"
          layout="horizontal"
          dataSource={dataSource}
          labelWidth={130}
          click={this.click}/>
      </div>
    )
  }

  click() {
    console.log('点击了')
  }
}

class Checkout extends CostomForm {
  state = {
  }

  change(name, e) {
    this.setState({[name]: e.target.value}, () => console.log(this.state))
  }

  costomFields() {
    const self = this
    return {
      show: [
        {
          title: '姓名', grid: 24
        },
        "证件类型",
        {
          title: '证件号码',
          grid: 9,
          render(field, dataSource) {
            return (
              <div>
                <Input onChange={(e) => self.change('name', e)} value={self.state.name}/>
              </div>
            )
          }
        },
        {
          title: '地址',
          grid: 9,
          render(feild, dataSource) {
            return (
              <Input value={self.state.name}/>
            )
          }
        }, "邮编",
        {
          title: '联系电话1', grid: 12
        },
        {
          title: '联系电话2', grid: 24,
          render(field, dataSource) {
              return ('aaa')
          }
        },
        "电子邮箱",
        "性别"
      ]
    }
  }
}

export default FormPage
