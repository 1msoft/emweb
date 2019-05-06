import React from 'react'
import { Form, Input } from 'antd'

const FormItem = ({ field, label, decorator, ...options }) => {
  const rules = []
  options.required && ( rules.push({ required: true, message: `${label}必填` }) )
  return (
    <Form.Item label={ label } { ...options.layout } style={ options.style }>
      { decorator(field, { rules, ...options })(options.component || <Input />) }
    </Form.Item>
  )
}

export default FormItem
