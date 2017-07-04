import React, { Component } from 'react'
import { message, Upload, Icon } from 'antd'
import PreviewPictures from '../../components/previewpicture/PreviewPictures'

class PreviewPicture extends Component {

	state = {
    previewVisible: 'none',
    fileList: [],
		curImgUid: undefined
  };

	handleChange = ({ fileList }) => {
		this.setState({ fileList })
	}

	handlePreview = (file) => {
    let fileIndex = this.state.fileList.indexOf(file);
    let length = fileIndex;
    let reg = /(.*).(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/;
    if (!reg.test(file.name)) {
			message.warning('非图片格式')
      return;
    }
    for (let k = 0; k < length; k++) {
      if (!reg.test(this.state.fileList[k].name)) {
        fileIndex--;
      }
    }
    this.setState({
      previewVisible: 'block',
			curImgUid: file.uid
    });
  }

	//控制遮罩层隐藏，改变curImgUid
	closePreviewPictures =() => {
		this.setState({
			previewVisible: 'none',
			curImgUid: undefined
		})
	}

	render () {
		return (
			<div style={{width: '90%', margin: '0 auto'}}>
				<Upload
				multiple= {true}
				fileList={this.state.fileList}
				listType="picture-card"
				onPreview={this.handlePreview}
				onChange={this.handleChange}
				>
					<Icon type="plus" style={{fontSize: '32px'}} />
					<div className="ant-upload-text" style={{fontSize: '14px'}}>点击上传</div>
				</Upload>
				<PreviewPictures
				close={this.closePreviewPictures}
				previewVisible={this.state.previewVisible}
				fileList={this.state.fileList}
				curImgUid={this.state.curImgUid} />
			</div>
		)
	}
}

export default PreviewPicture