import React, { Component } from 'react'
import { Form, Col, Row } from 'antd'
import _ from 'lodash'
import styles from './costomForm.css'

const FormItem = Form.Item
/* 配置参数
*  -- dataSource 源数据对象 例：{住院号：1, 入院日期: "2015-09-16T00:00:00"}
*  -- costomData 自定义数据对象  例：{show: [], fields: {}}
*     -- show   要显示字段  例：['住院号', '入院日期', {title: 'title', value: 'value', grid: 0-24, sn: 'number'}]
*     -- hide   要隐藏字段  例：['fieds_1', 'fieds_2']
*     -- fields 自定义字段
*        例：{
*              '住院号': {
*                title: '',
*                alias: '别名', //设置alias则会覆盖title
*                value: '',
*                grid: 0-24,  //设置表单字段的栅格个数
*                sn: number,  //排序依据
*                render(field， dataSource){ return (string|Node) },
*                ...
*              }
*            }
*  -- title 表单表头  string
*  -- layout 表单布局 'horizontal'|'vertical'|'inline'
*  -- labelHide 控制label的显示隐藏 默认为false
*  -- bordered 表单边框
*  -- grid 控制表单栅格个数（只针对子表单设置）
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
    const { title, layout, dataSource, costomData, children, labelWidth, bordered } = this.props
    const costomFields = this.costomFields()
    const fields = this.getFields(dataSource, costomFields)

    // const titleCls =  bordered ? 'antd-form-title' : 'antd-form-title'
    const formCls = bordered ? 'antd-form-body clearfix' : 'antd-childForm-body clearfix'
    const formLayout = (layout === 'vertical') ? 24 : 6
    // const wrap = (layout === 'vertical') ? 'antd-form-span-break' : ''
    let count = 0, contentArr = [], oldField = fields
    let childCount = 0, childArr = [], childrens = children
    return (
      <div className='antd-form-container'>
        { title ? <h3 className='antd-form-title'>{title}</h3> : <div />}
        <Form
          layout={layout || 'horizontal'}
          className='antd-form-box'>
          {
            fields ? fields.map((field, index) => {
              {/*const labelHide = (field.labelHide || false) ? 'none' : '-webkit-box'*/}
              // const labelMapSpan = labelHide === 'none' ? 'none' : 1
              contentArr.push(field)
              count += (field.col || formLayout)
              if (count === 24) {
                count = 0
                oldField = _.difference(oldField, contentArr)
                return (
                  <Row key={index} style={{marginBottom: '12px'}}>
                    {
                      contentArr.map((value, idx) => {
                        contentArr = []
                        const renderVal = (typeof value.render === 'function') ?
                           value.render(value, dataSource) : (value.value || '')
                        return (
                          <Col span={value.col || formLayout} key={`last_${idx}`}>
                            <label className='antd-form-row-label' title={value.title}>
                              {value.alias || value.title}
                            </label>
                            <div className='antd-form-row-content'>
                              {renderVal}
                            </div>
                          </Col>
                        )
                      })
                    }
                  </Row>
                )
              }
              if(fields.indexOf(field) === fields.length -1 ) {
                return (
                  <Row key={index} style={{marginBottom: '12px'}}>
                    {
                      oldField.map((value, idx) => {
                        const renderVal = (typeof value.render === 'function') ?
                           value.render(value, dataSource) : (value.value || '')
                        return (
                          <Col span={value.col || formLayout} key={`last_${idx}`}>
                            <label className='antd-form-row-label' title={value.title}>
                              {value.alias || value.title}
                            </label>
                            <div className='antd-form-row-content'>
                              {renderVal}
                            </div>
                          </Col>
                        )
                      })
                    }
                  </Row>
                )
              }
            }) : ''
          }
          {
            children ? React.Children.map(children, (child, index) => {
              childArr.push(child)
              childCount += (child.props.grid || 24)
              if(childCount === 24) {
                childCount = 0
                childrens = _.difference(childrens, childArr)
                return (
                  <Row key={index} style={{marginBottom: '12px'}}>
                    {
                      childArr.map((value, idx) => {
                        childArr = []
                        return (
                          <Col span={value.props.grid || 24} key={idx} style={{padding: '16px 18px'}}>
                            {value}
                          </Col>
                        )
                      })
                    }
                  </Row>
                )
              }
              if(children.indexOf(child) === children.length - 1 ) {
                return (
                  <Row key={index} style={{marginBottom: '12px'}}>
                    {
                      childrens.map((value, idx) => {
                        return (
                          <Col span={value.props.grid || 24} key={idx} style={{padding: '16px 18px'}}>
                            {value}
                          </Col>
                        )
                      })
                    }
                  </Row>
                )
              }
            }) : ''
          }
        </Form>
      </div>
    )
  }
  //自定义字段
  costomFields() {
    return {
      show: [],
      hide: [],
      fields: [{}]
    }
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