import React, { Component } from 'react';
import { Modal } from 'antd';


export default class DialogPage extends Component {
  state = {
    confirmLoading: false,
  }

  defaultProps = {
    title: '未命名',
    visible: true,
    maskClosable: false,
    autoClose: true,
    onOk: this.onClickBtn.bind(this)(this.onOk),
    onCancel: this.onClickBtn.bind(this)(this.onCancel),
  }

  render() {
    const props = {...this.defaultProps, ...this.modalProps};
    this.autoClose = props.autoClose;

    return (
      <Modal {...props}
        confirmLoading={this.state.confirmLoading}>
        {this.renderContent ? this.renderContent() : ''}
      </Modal>
    );
  }

  onClickBtn(clickFunc) {
    return (e) => {
      clickFunc.bind(this)(e)
      if (this.autoClose) {
        this.onClose()
      }
    }
  }

  onOk() {}

  onCancel() {}

  onClose() {
    this.props.history.goBack();
  }
}