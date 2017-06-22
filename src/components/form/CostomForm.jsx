import React, { Component } from 'react'
import { Form, Col } from 'antd'
import _ from 'lodash'

/* 配置参数
*  -- dataSource 源数据对象 例：{住院号：1, 入院日期: "2015-09-16T00:00:00"}
*  -- costomData 自定义数据对象  例：{show: [], fields: {}}
*     -- show   要显示字段  例：['住院号', '入院日期', {title: 'title', value: 'value', col: 0-24, sn: 'number'}]
*     -- hide   要隐藏字段  例：['fieds_1', 'fieds_2']
*     -- fields 自定义字段
*        例：{
*              '住院号': {
*                title: '',
*                alias: '别名', //设置alias则会覆盖title
*                value: '',
*                col: 0-24,  //设置表单字段的栅格个数
*                sn: number,
*                render(field){ return (string|Node) },
*                ...
*              }
*            }
*  -- title 表单表头  string
*  -- layout 表单布局 'horizontal'|'vertical'|'inline'
*  -- labelHide 控制label的显示隐藏 默认为false
*  -- bordered 表单边框
*  -- col 控制表单栅格个数（只针对子表单设置）
*  例：
*  <ConstomForm
*     dataSource={{}}
*     costomData={{}}
*     title='title'
*     layout='horizontal'
*     bordered>
*
*     <ConstomForm
*       title='title'
*       layout='horizontal'>
*
*       <Table />
*
*     </ConstomForm>
*
*  </ConstomForm>
*/

class ConstomForm extends Component {
  render() {
    const { title, layout, dataSource, costomData, children, bordered } = this.props
    const fields = this.getFields(dataSource, costomData)
    const titleCls =  bordered ? 'antd-form-title' : 'antd-form-title'
    const formCls = bordered ? 'antd-form-body clearfix' : 'antd-childForm-body clearfix'
    const formLayout = (layout === 'vertical') ? 24 : 6
    const wrap = (layout === 'vertical') ? 'antd-form-span-break' : ''
    // let count = 0
    // let contentArr = []
    return (
      <div className="formWrap">
        <h3 className={titleCls}>{title}</h3>
        <Form
          layout={layout || 'horizontal'}
          className={formCls}>
          {
            fields ? fields.map((field, index) => {
              const contentVal = (typeof field.render === 'function') ? field.render(field, dataSource) : (field.value || '')
              const titleVal = (typeof contentVal === 'object') ? '' : contentVal
              const labelHide = (field.labelHide || false) ? 'none' : '-webkit-box'
              // const labelMapSpan = labelHide === 'none' ? 'none' : 1
              // contentArr.push(field.title)
              // count += (field.col || formLayout)
              //count 为24,签闭合一次 到结束如果不满24也必须闭合
              // if (count === 24) {
              //   count = 0
              //   console.log(contentArr, 'contentArr')
              //   return (
              //     <Row>
              //       {
              //         contentArr.map(value => {
              //           <Col span={value.col || formLayout}>
              //             {value.title}
              //           </Col>
              //         })
              //       }
              //     </Row>
              //   )
              //   contentArr = []
              //   console.log(field)
              // } else {
                // console.log(field.col || formLayout)
              // }
              return (
                <Col className="antd-form-col" span={field.col || formLayout} key={index} >
                  <label className="antd-form-label" title={field.alias || field.title} style={{display: labelHide}}>
                    {field.alias || field.title}
                  </label>
                  <span className={`${wrap} antd-form-span`} title={titleVal}>
                    {contentVal}
                  </span>
                </Col>
              )
              // return (
              //     `<Col className=antd-form-col span={${field.col || formLayout}} key=${index} >
              //       <label className="antd-form-label">
              //         ${field.title}
              //       </label>
              //       <span className=${wrap} antd-form-span title=${titleVal}>
              //         ${contentVal}
              //       </span>
              //     </Col>`
              //   )
            }) : ''
          }
          {
            children ? React.Children.map(this.props.children, (child, index) => {
              return (
                <Col span={child.props.col || 24} key={index}>
                  {child}
                </Col>
              )
            }) : ''
          }
        </Form>
      </div>
    )
  }
  //字段操作
  getFields(dataSource, costomData) {
    if (dataSource === undefined || costomData === undefined) return null
    const source = dataSource

    const UcostomData = costomData ? costomData : {}
    const {fields, show, hide } = UcostomData
    const sourceKey = Object.keys(source)
    //传入show,显示show，传入hide, 显示除hide之后的源数据，show或者hide都不传，显示全部的源数据
    const handleFields = show || _.difference(sourceKey, hide)

    const result = {}
    for(let field of handleFields) {
      //show内的字段为对象
      if (typeof field === 'object') {
        const newObj = {
          [field.title]: {
            title: field.title,
            value: source[field.title],
            sn: 10 * (handleFields.indexOf(field) + 1),
          }
        }
        const fieldMerge = _.merge({}, {[field.title]: field}, newObj)
        Object.assign(result, fieldMerge)
      }
      //show内的字段为字符串
      if (sourceKey.includes(field)) {
        const newObj = {
          [field]: {
            title: field,
            value: source[field],
            sn: 10 * (handleFields.indexOf(field) + 1),
          }
        }
        Object.assign(result, newObj)
      }
    }

    const fieldsObj = _.merge({}, result, fields)
    const fieldsArr = Object.values(fieldsObj)

    fieldsArr.sort((a, b) => {
      return a.sn - b.sn
    })

    return fieldsArr
  }
  //自定义字段costomData
  // costomData(costomData) {
  //   this.costomData = costomData
  // }
}

export default ConstomForm