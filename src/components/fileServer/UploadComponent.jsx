
// 等待：waiting  上传中： uploading 上传成功：succeed  上传失败：failed
// 手动上传…… 从外部传状态进来：
import React from 'react';
import { observer, inject } from 'mobx-react';
import { 
  Upload, message, Button, Icon, Progress, Spin, Row, Col,
  Collapse, Modal, Input, Form
} from 'antd';
import "./fileServer.css";
const Panel = Collapse.Panel;
const FormItem = Form.Item;

@inject('fileServerStore')
@observer
class UploadComponent extends React.Component {
  constructor(){
    super();
    this.state = {
      fileList: []
    };
  }

  componentWillMount(){
    this.getFileList();
  }
  componentWillUnmount(){
    const { fileServerStore } = this.props;
    fileServerStore.clearStore();
  }
  // 
  onChange = (info) => {
    const { fileList } = this.state;
    this.setState({
      fileList: info.fileList
    });
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done' ) {
      info.file.response.respCode === 0 ? 
        message.success(`${info.file.name} 文件上传成功！`) :
        message.error(`${info.file.name} 文件上传失败！`)
      this.getFileList();
    }
    if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  onPreview = (file) => {
    const { fileServerStore, history } = this.props;
    const w=window.open('file-preview');
    w.location.href=`${process.env.REACT_APP_API_FILE_URL}/api/v1/drive/preview/${file.id}`;
  }

  onRemove = (file) => {
    const { fileServerStore } = this.props;
    fileServerStore.removeFile(file.id, (res) => {
      message.error(`${file.name}删除成功！`);
    });
  }

  // 
  getFileList = () => {
    const { query, fileServerStore } = this.props;
    const left = this;
    const data = [];
    fileServerStore.getFilesByOrderId(query.order_id, (res) => {
      const fileList = [];
      for(let i = 0; i < res.data.length; i++){
        if(res.data[i].sectionId === query.section_id ){
          const data = JSON.parse(JSON.stringify(res.data[i]));
          data.name = data.title;
          data.uid = data.id;
          fileList.push(data);
        }
      }
      this.setState({fileList});
    });
  }


  // 获取配置
  getSetting = () => {
    const {query} = this.props;
    const { fileList } = this.state;
    const props = {
      // customRequest: this.customRequest,
      // showUploadList:false,
      action: `${process.env.REACT_APP_API_FILE_URL}/api/v1/drive/files`,
      data: query,
      fileList,
      onChange: this.onChange,
      onPreview: this.onPreview,
      onRemove: this.onRemove
    };
    return {props};
  }

  render() {
    const setting = this.getSetting();
    const { fileList } = this.state;
    const { title, index, titleWidth } = this.props;
    return (
      <div id="upload-component" >
        <div className="clearfix">
          <div style={{float: 'left', width: titleWidth || '12em', marginTop: '4px'}}>
            {index}、{title}
          </div>
          <Upload {...setting.props} >
            <Icon style={{
              fontSize: '30px',
              cursor: 'pointer',
              color: 'blue'
            }} type="cloud-upload" />
          </Upload>
          {
            fileList.length === 0 ? 
            <span style={{
              display: 'inline-block',
              margin: '4px 10px 0 10px'
            }}>
              待上传……
            </span>
            : ''
          }
        </div>
      </div>
    );
  }
}

export default UploadComponent;

// 封装修改
// this.props.bizNo : 订单编号
// this.props.zoneCode : 项目zoneCode
// this.props.uid 文件目录唯一标识码 
// this.titleWidth 自定义上传文件标题长度带单位（单位 em）
// this.onCollapseChange 折叠面板改变事件
@inject('fileServerStore')
@observer
export class UploadBox extends React.Component{
  constructor(){
    super();
    this.state={
      visible: false,
      description: []
    };
    this.OtherPanelHeader = 
      <div >
        <span style={{float: 'left'}}>
          自定义文件上传
        </span>
        <span 
          className="blue-span" 
          onClick={this.openModal} 
          style={{
            float: 'left',
            fontSize: '20px',
            padding: '0 10px'

          }}> 
        <Icon type="plus" />
        </span> 
        <div style={{clear: 'both'}}></div>
      </div>;
  }

  // 
  componentDidMount(){
    const {zoneCode, uid, fileServerStore} = this.props;
    // 获取（或创建）当前目录项（地区编码、目录项唯一标识）
    fileServerStore.getCurrCatalog(zoneCode, uid);
  }

  openModal = (e) => {
    e.stopPropagation();
    this.setState({visible: true});
  }
  closeModal = () => {
    this.setState({visible: false});
  }

  modalHandleOk = (v) => {
    const {description} = this.state;
    const descriptionCp = [...description, v];
    this.setState({visible: false, description: descriptionCp}, ()=>{console.log(this.state)});

  }

  // 获取文件描述
  getDescriptions = (section) => {
    if(this.getDescriptions.isExecute){return;}
    const {fileServerStore, bizNo} = this.props;
    fileServerStore.getFilesByOrderId(bizNo, (res) => {
      const fileList = [];
      const descriptions = {};
      for(let i = 0; i < res.data.length; i++){
        if(res.data[i].sectionId === section.id){
          const data = JSON.parse(JSON.stringify(res.data[i]));
          descriptions[data.description] = true;
        }
      }
      this.getDescriptions.isExecute = true;
      this.setState({description: Object.keys(descriptions)});
    });
  }

  render(){
    const {bizNo, fileServerStore, titleWidth, onCollapseChange} = this.props;
    const { description } = this.state;
    const { currCatalog, onUpload } = fileServerStore;
    const {sections=[]} = currCatalog;
    // 对目录项数据进行分类： 固定文件上传、 其他文件上传
    const constDataArr = sections.filter(item => item.title !== '其他相关材料');
    const varDataArr = sections.filter(item => item.title === '其他相关材料');
    varDataArr[0] && this.getDescriptions(varDataArr[0]);
    return (
      <div>
      {
        (constDataArr.length > 0 || varDataArr.length > 0 ) && 
        <Collapse defaultActiveKey={['1']} onChange={onCollapseChange}>
          {
            constDataArr.length > 0 &&
            <Panel header="指定文件上传" key="1">
              <Row>
                {
                  constDataArr.map((item, index) =>
                  <Col key={item.id} span="24">
                    <UploadComponent
                      title={item.title}
                      index={index + 1}
                      titleWidth={titleWidth}
                      query={{
                        order_id: bizNo,
                        catalog_id: item.catalogId,
                        section_id: item.id,
                      }} />
                  </Col>
                  )
                }
              </Row>
            </Panel>
          }
          {
            varDataArr.length > 0 &&
            <Panel header={this.OtherPanelHeader} key="2">
              {
                description.length ? description.map( (item, index)=>(
                  <OtherUpload 
                    description={item} 
                    index={index + 1} 
                    key={index} 
                    bizNo={bizNo} 
                    sections={varDataArr[0]}/>
                )) : <span>暂无上传内容……</span>
              }
            </Panel>
          }
        </Collapse>
      }
      {
        varDataArr.length > 0 &&
        <AddDescriptionModal
          bizNo={bizNo} sections={varDataArr[0]}
          visible={this.state.visible}
          modalHandleOk={this.modalHandleOk}
          closeModal={this.closeModal}/>
      }
      </div>
    );
  }
}

// 添加描述
@inject('fileServerStore')
@observer
class AddDescriptionModal extends React.Component{
  state = {
    description: '',
    fileList: []
  };

  onChangeDescription = (e) => {
    this.setState({description: e.target.value}, () => {console.log(this.state)});
  }

  onOk = () => {
    const {modalHandleOk} = this.props;
    modalHandleOk(this.state.description);
    this.clearState();
  }

  clearState = () => {
    this.setState({
      description: '',
      fileList: []
    });
  }

  closeModal = () => {
    const { closeModal } = this.props;
    closeModal();
    this.clearState();

  }

  // 
  onChangeUpload = (info) => {
    const { fileList } = this.state;
    this.setState({
      fileList: info.fileList
    });
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done' ) {
      info.file.response.respCode === 0 ? 
        message.success(`${info.file.name} 文件上传成功！`) :
        message.error(`${info.file.name} 文件上传失败！`)
      this.getFileList();
    }
    if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  onPreview = (file) => {
    const { fileServerStore, history } = this.props;
    const w=window.open('file-preview');
    w.location.href=`${process.env.REACT_APP_API_FILE_URL}/api/v1/drive/preview/${file.id}`;
  }

  onRemove = (file) => {
    const { fileServerStore } = this.props;
    fileServerStore.removeFile(file.id);
  }

  // 
  getFileList = () => {
    const { bizNo, sections, fileServerStore } = this.props;
    const {description} = this.state;
    const left = this;
    const data = [];
    fileServerStore.getFilesByOrderId(bizNo, (res) => {
      const fileList = [];
      for(let i = 0; i < res.data.length; i++){
        if( res.data[i].sectionId === sections.id && 
            res.data[i].description === description ){
          const data = JSON.parse(JSON.stringify(res.data[i]));
          data.name = data.title;
          data.uid = data.id;
          fileList.push(data);
        }
      }
      this.setState({fileList});
    });
  }

  // 获取配置
  getSetting = () => {
    const {bizNo, sections} = this.props;
    const { fileList, description } = this.state;
    const props = {
      // customRequest: this.customRequest,
      // showUploadList:false,
      action: `${process.env.REACT_APP_API_FILE_URL}/api/v1/drive/files`,
      data: {
        description,
        order_id: bizNo,
        catalog_id: sections.catalogId,
        section_id: sections.id,
      },
      fileList,
      onChange: this.onChangeUpload,
      onPreview: this.onPreview,
      onRemove: this.onRemove
    };
    return {props};
  }

  render(){
    const {modalHandleOk, visible  } = this.props;
    const setting = this.getSetting();
    const { fileList, description } = this.state;
    return (
      <Modal
        title="添加描述"
        visible={visible}
        onOk={this.onOk}
        onCancel={this.closeModal}
      >
        <Form layout="inline">
          <FormItem label="文件描述">
            <Input 
              style={{width: '350px'}}
              value={description} 
              onChange={this.onChangeDescription} placeholder="文件描述" />
          </FormItem>
          <div>
            <Upload {...setting.props} >
              <div style={{paddingTop: '10px'}}>
                <span style={{float: 'left', lineHeight: '30px'}}>文件上传：</span>
                <span style={{float: 'left'}}>
                  <Icon style={{
                    fontSize: '30px',
                    cursor: 'pointer',
                    color: 'blue',
                  }} type="cloud-upload" />
                </span>
                <div style={{clear: 'both'}}></div>
              </div>
            </Upload>
          </div>
        </Form>
      </Modal>
    );
  }
}

// // bizNo={bizNo} sections={varDataArr[0]}
@inject('fileServerStore')
@observer
class OtherUpload extends React.Component {
  constructor(){
    super();
    this.state = {
      fileList: []
    };
  }

  componentWillMount(){
    this.getFileList();
  }

  componentWillUnmount(){
    const { fileServerStore } = this.props;
    fileServerStore.clearStore();
  }

  // 
  onChange = (info) => {
    const { fileList } = this.state;
    this.setState({
      fileList: info.fileList
    });
    if (info.file.status !== 'uploading') {
      // 
    }
    if (info.file.status === 'done' ) {
      info.file.response.respCode === 0 ? 
        message.success(`${info.file.name} 文件上传成功！`) :
        message.error(`${info.file.name} 文件上传失败！`)
        this.getFileList();
    }
    if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败！`);
    }
  }

  onPreview = (file) => {
    const { fileServerStore, history } = this.props;
    const w=window.open('file-preview');
    w.location.href=`${process.env.REACT_APP_API_FILE_URL}/api/v1/drive/preview/${file.id}`;
  }

  onRemove = (file) => {
    const { fileServerStore, popDescription, description } = this.props;
    fileServerStore.removeFile(file.id, (res) => {
      message.error(`${file.name}删除成功！`);
    });
  }

  // 
  getFileList = () => {
    const { bizNo, sections, fileServerStore, description,  } = this.props;
    const left = this;
    const data = [];
    fileServerStore.getFilesByOrderId(bizNo, (res) => {
      const fileList = [];
      for(let i = 0; i < res.data.length; i++){
        if(res.data[i].sectionId === sections.id && res.data[i].description === description ){
          const data = JSON.parse(JSON.stringify(res.data[i]));
          data.name = data.title;
          data.uid = data.id;
          fileList.push(data);
        }
      }
      this.setState({fileList});
    });
  }

  // 获取配置
  getSetting = () => {
    const {bizNo, sections} = this.props;
    const { fileList } = this.state;
    const {description} = this.props;
    const props = {
      // customRequest: this.customRequest,
      // showUploadList:false,
      action: `${process.env.REACT_APP_API_FILE_URL}/api/v1/drive/files`,
      data: {
        description,
        order_id: bizNo,
        catalog_id: sections.catalogId,
        section_id: sections.id,
      },
      fileList,
      onChange: this.onChange,
      onPreview: this.onPreview,
      onRemove: this.onRemove
    };
    return {props};
  }

  render() {
    const setting = this.getSetting();
    const { fileList } = this.state;
    const { title, index,titleWidth, description } = this.props;
    return (
      <div id="upload-component" >
        <div className="clearfix">
          <div style={{float: 'left', marginTop: '4px', marginRight: '10px'}}>
            {index}、{description}
          </div>
          <Upload {...setting.props} >
            <Icon style={{
              fontSize: '30px',
              cursor: 'pointer',
              color: 'blue'
            }} type="cloud-upload" />
          </Upload>
        </div>
      </div>
    );
  }
}
