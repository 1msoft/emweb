/* 
// props 参数

title                               标题
index                               标题前序号
titleWidth                          标题+序号宽度(单位em)
query:{                             请求参数：
  order_id: curProjectApply.bizNo,    订单号
  catalog_id: item.catalogId,         文件id
  section_id: item.id,                目录项id
}
*/
import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Icon } from 'antd'; 

@inject('fileServerStore')
@observer
class DownloadComponent extends React.Component{
  state = {
    fileList:[],
  }
  componentWillMount(){
    this._isMounted = true;
  }
  componentWillUnmount(){
    const { fileServerStore } = this.props;
    fileServerStore.clearStore();
    this._isMounted = false;
  }
  componentDidMount(){
    this.getFileList();
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
      if(this._isMounted){
        this.setState({fileList});
      }
    });
  }

  render(){
    const style = {
      icon:{ color: '#1890FF', fontSize: '28px', lineHeight: '30px' } ,
      text: { lineHeight: '30px', padding: '0 10px'}
    };
    const { fileList } = this.state;
    const { title, index, query, titleWidth } = this.props;
    const url = process.env.REACT_APP_API_FILE_URL;
    return (
      <div className="clearfix">
        <div style={{float: 'left', marginTop: '4px', width: titleWidth || '12em'}}>
          {index}、{title}
        </div>
        <div style={{float: 'left'}}>
        <Icon style={style.icon} type="cloud-download" />
        </div>
        
        <div style={{
          
          
        }}>
          {
            fileList.map(item => (
              <a 
                href={`${url}/api/v1/drive/download/${item.id}`}
                key={item.id}
                style={{
                  ...style.text, 
                  whiteSpace:'nowrap', 
                  display: 'inline-block'
                }} 
                className="blue-span">
                {item.name} 
                &nbsp;
                {item.description !== '' ? <span>({item.description})</span> : null}
                &nbsp;
              </a>
            ))
          }
          {
            fileList.length === 0 ? <span style={style.text}>暂无上传文件</span> : 
            fileList.length === 1 ? '' : 
            <a className="blue-span"
              href={`${url}/api/v1/drive/zip/download?order_id=${query.order_id}&section_id=${query.section_id}`} 
              style={style.text}> 
              批量下载
            </a> 
          }
        </div>
      </div>
    );
  }
}
export default DownloadComponent;