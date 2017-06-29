import React, { Component } from 'react'
import { Form, Col, Row } from 'antd'
import _ from 'lodash'
import './CostomForm.css'

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
*  -- layout 表单布局 'horizontal'|'vertical'|'inline' 默认'horizontal'
*  -- labelWidth 表单label的宽度设置
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
*       grid={24}
*       layout='horizontal'>
*
*       <Table />
*
*     </ConstomForm>
*
*  </ConstomForm>
*/

class ConstomForm extends Component {
  state = {
    fields: [],
    dataSource: {}
  }

  componentWillMount() {
    const { costomData, dataSource } = this.props
    if (!costomData && !this.costomFields()) throw Error('填写字段')
    this.costomData = this.props.costomData
    const costomFields = this.costomFields()
    this.setState({fields: this.getFields(dataSource, costomFields), dataSource: dataSource})
  }

  render() {
    const { title, layout, children, labelWidth = 0, bordered } = this.props
    const { fields, dataSource } = this.state

    const toggleBorder = bordered ? "" : 'hide-border'
    const fieldsGrid = (layout === 'vertical') ? 24 : 6

    let count = 0, cacheArr = [], cacheFields = fields, cacheChildren = children

    return (
      <div className='antd-form-container'>
        { title ? <h3 className='antd-form-title'>{title}</h3> : <div />}
        <Form
          layout={layout || 'horizontal'}
          className={`antd-form-box ${toggleBorder}`}>
          {
            fields ? fields.map((field, index) => {

              cacheArr.push(field)
              count += (field.grid || fieldsGrid)

              if (count >= 24) {

                count = 0
                cacheFields = _.difference(cacheFields, cacheArr)

                return (
                  <Row key={index} style={{marginBottom: '12px'}}>
                    {
                      cacheArr.map((value, idx) => {

                        cacheArr = []
                        const renderVal = (typeof value.render === 'function') ?
                           value.render(value, dataSource) : (value.value || '')
                        const labelHide = value.labelHide ? 'hide-label' : ""
                        const changeWidth = value.labelHide ? '0' : labelWidth

                        return (
                          <Col span={value.grid || fieldsGrid} key={`last_${idx}`}>
                            <label className={`antd-form-row-label ${labelHide}`} style={{width: `${labelWidth || 100}px`}}>
                              {value.alias || value.title}
                            </label>
                            <div className='antd-form-row-content' style={{width: `calc(100% - ${changeWidth || (labelWidth || 105)}px)`}}>
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
                      cacheFields.map((value, idx) => {

                        const renderVal = (typeof value.render === 'function') ?
                           value.render(value, dataSource) : (value.value || '')
                        const labelHide = value.labelHide ? 'hide-label' : ""

                        return (
                          <Col span={value.grid || fieldsGrid} key={`last_${idx}`}>
                            <label className={`antd-form-row-label ${labelHide}`} style={{width: `${labelWidth || 100}px`}}>
                              {value.alias || value.title}
                            </label>
                            <div className='antd-form-row-content' style={{width: `calc(100% - ${labelWidth || 105}px)`}}>
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

              cacheArr.push(child)
              count += (child.props.grid || 24)

              if(count >= 24) {

                count = 0
                cacheChildren = _.difference(cacheChildren, cacheArr)

                return (
                  <Row key={index} style={{marginBottom: '12px'}}>
                    {
                      cacheArr.map((value, idx) => {

                        cacheArr = []

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
                      cacheChildren.map((value, idx) => {

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
    return {}
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