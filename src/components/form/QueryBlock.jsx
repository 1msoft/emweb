import React, { Component } from 'react';
import { Button, Checkbox, Radio, Input, Select, Icon, DatePicker } from 'antd';
import _ from 'lodash';
import './QueryBlock.css';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const Option = Select.Option;

/**
 *   -- dataSource     数据源         数据对象  必填  [{...}, {...}, {...}]
 * 　  -- 数据源对象     
 * 　　　-- title  　    定义头部字段　　string   必填
 * 　　　-- field  　    定义字段名　　　string   必填
 * 　　　-- visible      初始化是否可见　Bool     必填
 * 　　　-- type         定义模块类型　　string   必填　可选值 ['select', 'input', 'date']
 * 　　　-- sn           模块排序　　　　Number  
 * 　　　-- columns      内容数据源　　　数组对象  必填 [{...}, {...}] 
 * 　　　  -- title      头部　　　　　　string   必填
 * 　　　  -- field      字段名　　　　　string   必填
 * 　　　  -- sn  　　    排序号　　　　　Number  必填
 *   -- onSearch        父级查询方法    Fun     必填　onSearch={ this.parsetFun }
 *   -- getQueryParams  返回查询参数    Fun     必填　getQueryParams={ (params) => this.parsetFun }
 */

export class QueryBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      condition: {},
    };
  }

  componentWillMount() {
    const visibleGroup = this.renderFields();
    this.setState({ visibleGroup });
  }

  componentWillReceiveProps(nextState) {
    this.state.condition !== nextState.condition &&
      this.props.onSearch(nextState.condition);
  }

  renderFields() {
    const visibleGroup = {};
    for (let field in this.FieldList) {
      if (this.VisibleList[field]) {
        visibleGroup[this.FieldList[field]] = true;
      } else {
        visibleGroup[this.FieldList[field]] = false;
      }
    }
    return visibleGroup;
  }

  changeState = (field, val) => {
    const { visibleGroup, condition } = this.state;
    visibleGroup[field] = val;
    delete condition[field];
    this.setState({ visibleGroup, condition });
  }

  setQueryParams(field, params) {
    const { condition } = this.state;
    condition[field] = params;
    this.setState(
      { condition },
      () => {
        this.props.getQueryParams(this.state.condition);
      }
    );
  }

  renderBar() {
    const { onSearch, dataSource } = this.props;
    return dataSource.sort((prev, next) => prev.sn - next.sn)
      .map((data, index) => {
        const self = this;
        const type = data.type.trim();
        const { columns, title, field, defaultType, defaultValue } = data;
        if (type === 'input') {
          return (<QueryInputBar
            key={index}
            title="学生姓名"
            field={field}
            columns={columns}
            onSearch={onSearch}
            toggleStatus={(field, val) => self.changeState(field, val)}
            setQueryParams={(value, field) => self.setQueryParams(value, field)}
            {...this.props}
            {...this.state}
          />);
        } else if (type === 'check') {
          return (<QueryAttrBar
            key={index}
            title={title}
            field={field}
            defaultType={defaultType}
            defaultValue={defaultValue}
            columns={columns}
            toggleStatus={(field, val) => self.changeState(field, val)}
            setQueryParams={(field, params) => self.setQueryParams(field, params)}
            {...this.props}
            {...this.state}
          />);
        } else if (type === 'date') {
          return (
            <QueryDateBar
              key={index}
              title={title}
              field={field}
              columns={columns}
              toggleStatus={(field, val) => self.changeState(field, val)}
              setQueryParams={(field, params) => self.setQueryParams(field, params)}
              {...this.props}
              {...this.state}
            />
          );
        } else if (type === 'select') {
          return (
            <QuerySelectBar
              key={index}
              title={title}
              field={field}
              columns={columns}
              toggleStatus={(field, val) => self.changeState(field, val)}
              setQueryParams={(field, params) => self.setQueryParams(field, params)}
              {...this.props}
              {...this.state}
            />
          );
        } else {
          throw Error('请输入指定的类型！');
        }
      });
  }

  render() {
    return (
      <div className="antd-query-box">
        {this.renderBar()}
        <QueryTitleBar
          toggleStatus={(field, val) => this.changeState(field, val)}
          onChange={val => this.changeState(val)}
          {...this.props}
          {...this.state}
        />
      </div>
    );
  }

  get FieldList() {
    return this.props.dataSource.map(data => data.field);
  }

  get VisibleList() {
    return this.props.dataSource.map(data => data.visible || false);
  }
}

export class QueryInputBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.Props,
      params: {},
    }
  }

  componentWillMount() {
    const columns = this.props.columns;
    const parentField = this.props.field;
    const { params } = this.state;
    for (let column of columns) {
      const { field, defaultValue } = column;
      if (!defaultValue) return
        params[field] = defaultValue
      this.setState({ params }, () => this.props.setQueryParams(parentField, params));
    }
  }

  changeState(file, value) {
    const { field, params } = this.state;
    params[file] = value;
    this.setState({ params }, () => this.props.setQueryParams(field, params));
  }

  destroy() {
    this.setState({ params: {} });
  }

  render() {
    const { title, columns, field, onSearch, visibleGroup } = this.props;
    if (!visibleGroup[field]) return null;
    return (
      <div className="antd-query-bar">
        <div className="antd-query-bar-title">{title}</div>
        <div className="antd-query-bar-attr">
          {
            columns.map((column, index) => {
              return (<Input
                key={index}
                className="antd-query-input"
                style={{ width: '150px' }}
                placeholder={`请输入${column.title || ''}`}
                value={this.state.params[column.field]}
                onChange={(e) => this.changeState(column.field, e.target.value)}
              />)
            })
          }
          <Button
            onClick={() => onSearch()}
            type="detault"
            className="antd-query-bar-btn">
            查询
          </Button>
        </div>
        {/* 切换选择　＆　收起 */}
        <div className="antd-query-btn-group">
          <span
            className="antd-query-bar-btn"
            onClick={() => {
              this.destroy();
              this.props.toggleStatus(field, false);
            }}
          ><Icon type="shrink" style={{ 'marginRight': '2px' }} />收起</span>
        </div>
      </div>
    );
  }

  get Props() {
    return this.props;
  }
}

export class QueryAttrBar extends QueryBlock {
  constructor(props) {
    super(props);
    this.state = {
      ...this.Props,
      toggleType: true,
      checkBoxs: [],
      radioBoxs: [],
    };
  }

  componentWillMount() {
    const parentField = this.props.field;
    const defaultValue = this.props.defaultValue;
    const defaultType = this.props.defaultType;

    const type = !!defaultType ? defaultType.trim().toLowerCase() : 'radio';
    const initValue = _.isString(defaultValue) ? [defaultValue] : defaultValue;

    if (!!type && type === 'checkbox') {
      this.setState(
        { toggleType: false, checkBoxs: !!initValue ? initValue : []},
        () => {
          !!initValue && this.props.setQueryParams(parentField, this.state.checkBoxs);
        }
      );
    } else if (!!type && type === 'radio') {
      this.setState(
        { toggleType: true, radioBoxs: !!initValue ? initValue : []},
        () => {
          !!initValue && this.props.setQueryParams(parentField, this.state.radioBoxs);
        }
      );
    }
  }

  toggleType() {
    const { toggleType } = this.state;
    this.setState({ toggleType: !toggleType, checkBoxs: [], radioBoxs: [] });
  }

  handleCheckbox(checkBoxs) {
    this.setState({ checkBoxs });
  }

  handleRadio(radio) {
    const { field } = this.state;
    this.setState(
      { radioBoxs: [radio] },
      () => this.props.setQueryParams(field, this.state.radioBoxs)
    );
  }

  confirm() {
    const { field, checkBoxs } = this.state;
    this.props.setQueryParams(field, checkBoxs)
  }

  destroy() {
    this.setState({ toggleType: true, checkBoxs: [], radioBoxs: [] });
  }

  render() {
    const { toggleType, checkBoxs, radioBoxs } = this.state;
    const { title, field, columns, visibleGroup } = this.props;
    if (!visibleGroup[field]) return null;
    return (
      <div className="antd-query-bar">
        <div className="antd-query-bar-title">{title}</div>
        {/* 选项 */}
        <div className="antd-query-bar-attr">
          {
            toggleType ?
              <RadioGroup
                value={radioBoxs[0]}
                onChange={(e) => this.handleRadio(e.target.value)}>
                {
                  columns
                    .sort((prev, next) => prev.sn - next.sn)
                    .map((col, index) => <RadioButton
                      key={index}
                      value={col.field}
                      className="antd-query-radio">
                      {col.title}
                    </RadioButton>)
                }
              </RadioGroup> :
              <Checkbox.Group
                value={checkBoxs}
                onChange={this.handleCheckbox.bind(this)}>
                {
                  columns
                    .sort((prev, next) => prev.sn - next.sn)
                    .map((col, index) =>
                      <div key={index} className="antd-query-checkbox">
                        <Checkbox
                          value={col.field}>
                          <span
                            className={`${
                              _.indexOf(this.state.checkBoxs, col.field) !== -1 ?
                                'checked' : 'unCheck'
                              }`}>
                            {col.title}
                          </span>
                        </Checkbox>
                      </div>
                    )
                }
                <div style={{ display: 'inline-block', margin: '0 20px' }}>
                  <span
                    className="antd-query-confirm"
                    onClick={this.confirm.bind(this)}>确认</span>
                  <span
                    className="antd-query-cancel"
                    onClick={this.toggleType.bind(this)}>取消</span>
                </div>
              </Checkbox.Group>
          }
        </div>
        {/* 切换选择　＆　收起 */}
        <div className="antd-query-btn-group">
          {
            toggleType ?
              <span
                className="antd-query-bar-btn"
                onClick={this.toggleType.bind(this)}
              ><Icon type="plus" style={{ 'marginRight': '2px' }} />多选</span> : ''
          }
          <span
            className="antd-query-bar-btn"
            onClick={() => {
              this.destroy();
              this.props.toggleStatus(field, false);
            }}
          ><Icon type="shrink" style={{ 'marginRight': '2px' }} />收起</span>
        </div>
      </div>
    );
  }

  get Props() {
    return this.props;
  }
}

export class QueryDateBar extends QueryBlock {
  constructor(props) {
    super(props);
    this.state = {
      ...this.Props,
      timeInterval: {
      },
    };
  }

  componentWillMount() {
    const columns = this.props.columns;
    const parentField = this.props.field;
    const { timeInterval } = this.state;
    for (let column of columns) {
      const { field, defaultValue } = column;
      if (!defaultValue) return;
      timeInterval[field] = defaultValue;
      this.setState(
        { timeInterval },
        () => this.props.setQueryParams(parentField, this.state.timeInterval)
      );
    }
  }

  changeTime(dateField, time) {
    const { timeInterval } = this.state;
    const { field } = this.props;
    timeInterval[dateField] = time;
    this.setState(
      { timeInterval },
      () => this.props.setQueryParams(field, this.state.timeInterval)
    );
  }

  destroy() {
    this.setState({ timeInterval: {} });
  }
  render() {
    const { timeInterval } = this.state;
    const { title, columns, field, visibleGroup } = this.props;
    if (!visibleGroup[field]) return null;
    return (
      <div className="antd-query-bar">
        <div className="antd-query-bar-title">{title}</div>
        {/* 选项 */}
        <div className="antd-query-bar-attr">
          {
            columns.map((column, index) => {
              return (
                <DatePicker
                  key={index}
                  placeholder={column.title || ''}
                  format='YYYY/MM/DD'
                  value={timeInterval[column.field]}
                  onChange={this.changeTime.bind(this, column.field)}
                  className="antd-query-attr-date"
                  style={column.style} />
              );
            })
          }
        </div>
        {/* 切换选择　＆　收起 */}
        <div className="antd-query-btn-group">
          <span
            className="antd-query-bar-btn"
            onClick={() => {
              this.destroy();
              this.props.toggleStatus(field, false);
            }}
          ><Icon type="shrink" style={{ 'marginRight': '2px' }} />收起</span>
        </div>
      </div>
    );
  }

  get Props() {
    return this.props;
  }
}

export class QuerySelectBar extends QueryBlock {
  constructor(props) {
    super(props);
    this.state = {
      ...this.Props,
      selected: {}
    };
  }

  componentWillMount() {
    const columns = this.props.columns;
    const parentField = this.props.field;
    const { selected } = this.state;
    for (let column of columns) {
      const { field, defaultValue } = column;
      if (!defaultValue) return
      selected[field] = defaultValue
      this.setState({ selected }, () => this.props.setQueryParams(parentField, selected));
    }
  }

  changeState = (select, value) => {
    const { selected } = this.state;
    const { field } = this.props;
    selected[select] = value;
    this.setState({ selected }, () => this.props.setQueryParams(field, selected));
  }

  destroy() {
    this.setState({ selected: {} });
  }

  render() {
    const { title, columns, field, visibleGroup } = this.props;
    if (!visibleGroup[field]) return null;
    return (
      <div className="antd-query-bar">
        <div className="antd-query-bar-title">{title}</div>
        {/* 选项 */}
        <div className="antd-query-bar-attr">
          {
            columns.map((column, index) => {
              const { title, style, options, key, contentText } = column;
              return (
                <Select
                  key={index}
                  style={style || { width: '150px', marginRight: '20px' }}
                  placeholder={title}
                  value={this.state.selected[column.field]}
                  onChange={(value) => this.changeState(column.field, value)}
                >
                  {
                    options.map((option) => {
                      return (
                        <Option key={option[`${key}`]} value={option[`${key}`]}>
                          {option[`${contentText}`]}
                        </Option>
                      );
                    })
                  }
                </Select>
              );
            })
          }
        </div>
        {/* 切换选择　＆　收起 */}
        <div className="antd-query-btn-group">
          <span
            className="antd-query-bar-btn"
            onClick={() => {
              this.destroy();
              this.props.toggleStatus(field, false);
            }}
          ><Icon type="shrink" style={{ 'marginRight': '2px' }} />收起</span>
        </div>
      </div>
    );
  }

  get Props() {
    return this.props;
  }
}

export class QueryTitleBar extends QueryBlock {
  render() {
    const { dataSource, visibleGroup } = this.props;
    return (
      <div className="antd-query-block">
        {
          dataSource.filter(type => type.input !== 'input').map((data, index) => {
            if (!visibleGroup[data.field]) {
              return <span
                className="antd-query-block-btn"
                key={index}
                onClick={this.props.toggleStatus.bind(this, data.field, true)}
              >
                {data.title}
              </span>
            } else {
              return null;
            }
          })
        }
      </div>
    );
  }
}
