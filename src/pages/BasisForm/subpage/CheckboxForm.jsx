import React from 'react';
import { Form, Input, Checkbox } from '@1msoft/kant-ui';
import { Radio } from 'antd';

const { FormLayout, FormItem } = Form;
const getGrid = FormItem.getGrid;
const options = [
  { label: '公开', value: '1' },
  { label: '部分公开', value: '2' },
  { label: '不公开', value: '3' },
  { label: '部分公开', value: '4' },
  { label: '部分公开', value: '5' }
];

const CheckboxForm = (props) => {
  return (
    <div style={{ width: '50%', margin: '0 auto' }}>
      <FormLayout
        colon={true}>
        <FormItem
          row={1}
          span={getGrid(24)}
          label="单选">
          <div>
            <Radio.Group defaultValue={3}>
              <Radio value={1}>公开</Radio>
              <Radio value={2}>部分公开</Radio>
              <Radio value={3}>不公开</Radio>
              <Radio value={4}>不公开</Radio>
            </Radio.Group>
          </div>
          <div>
            <Input placeholder="公开给" />
          </div>
        </FormItem>
        <FormItem
          row={2}
          span={getGrid(24)}
          label="多选">
          <Checkbox.Group
            options={options}
            defaultValue={["2", "4"]} />
        </FormItem>
      </FormLayout>
    </div>
  );
};

export default CheckboxForm;
