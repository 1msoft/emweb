import React, { Component } from 'react';
import { Icon } from 'antd';
import './PreviewPictures.css'

/**
 * 组件说明：
 * props:  
 * 			close 隐藏该组件 改变curImgUid --方法 -----必需传
 * 			previewVisible 控制组件显示隐藏 字符串 （‘block’或‘none’） -----必需传
 * 			fileList　上传的东西　　--数组 -----必需传
 * 			curImgUid　　点击预览的那项的ｕｉｄ　　--字符串 -----必需传
 */

class PreviewPictures extends Component {
	constructor(props) {
    super(props);
		this.state = {
			curImgIndex: 0
		}
	}

	componentDidMount() {
		this.obtainWebWidthHeight()
	}

	//每次点击预览的时候 重新获取选中的索引以及页面宽高
	componentDidUpdate(nextProps, nextState) {
    (nextProps.curImgUid !== this.props.curImgUid) &&
		(this.filterCurImg(this.props.curImgUid),
		 this.obtainWebWidthHeight())
  }

	//当前页面的宽高
	obtainWebWidthHeight() {
		let width = window.innerWidth
          || document.documentElement.clientWidth
          || document.body.clientWidth;
    let height = window.innerHeight
          || document.documentElement.clientHeight
          || document.body.clientHeight;
		this.setState({
			webWidth: width,
			webHeight: height
		})
	}

	//根据传进来的curImgId来获取数组索引
	filterCurImg(imgId) {
		const {fileList} = this.props
		if (fileList[0] !== undefined && imgId !== '') {
			fileList.map((value, index) => {
				if(value.uid === imgId) {
					this.setState({
						curImgIndex: index
					})
				}
				return
			})
		}
	}

	//对传进来的fileList数组进行筛选处理
	filterImgs() {
		const {fileList} = this.props
		let fileListdata = [];
    let reg = /(.*).(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/;
		if (fileList[0] !== undefined) {
      fileListdata = fileList.filter(item => reg.test(item.name)).map((value, index) => {
        let imgsFormat = reg.test(value.name);
        if (imgsFormat) {
          const data = {
            ...value,
            opacity: index === this.state.curImgIndex ? 1 : 0,
            zIndex: index === this.state.curImgIndex ? 99 : 3,
						display: index === this.state.curImgIndex ? 'block' : 'none',
          };
          return data;
        }
        return null;
      });
      return fileListdata;
    }
	}

	//根据fileList数组生成HTML代码
	carouselfigure() {
		let imgs = []
		let newFileList = this.filterImgs()
		if (newFileList !== undefined) {
      for (let i = 0; i < newFileList.length; i++) {
        imgs.push(
          <li style={{opacity: newFileList[i].opacity,
          zIndex: newFileList[i].zIndex,
					display:newFileList[i].display,
					marginTop: `${this.state.webHeight * 0.1}px`,
					marginBottom: `${this.state.webHeight * 0.1}px`,
					lineHeight: `${this.state.webHeight * 0.8}px`,
          minHeight: `${this.state.webHeight * 0.8}px`,}}
          key={i}>
            <img alt={newFileList[i].name}
            src={newFileList[i].thumbUrl} />
          </li>
        );
      }
    }
		return imgs
	}

	//左右切换的触发方法
	changeImg(value, e) {
    e.stopPropagation();
    e.preventDefault();
    const newFileList = this.filterImgs();
    let newindex = this.state.curImgIndex + value;
    if (newindex < 0 || newindex > newFileList.length - 1) {
      return;
    }
    this.setState({
      curImgIndex: newindex
    });
  }

	render() {
		return (
			<div className='preview_pictures'
						style={{display: `${this.props.previewVisible}`,
										width:`${this.state.webWidth}px`,
										hieght:`${this.state.webHeight}px`}}>
				<div className='preview_pictures_main'>
					<div className='preview_pictures_operation'>
						<div>
							<Icon className='p_p_o_left' type='left'
							onClick={this.changeImg.bind(this, -1)} />
						</div>
						<div>
							<Icon className='p_p_o_right' type='right'
							onClick={this.changeImg.bind(this, 1)} />
						</div>
						<div>
							<Icon className='p_p_o_close' type='close'
							onClick={this.props.close} />
						</div>
					</div>
					<ul>
						{this.carouselfigure()}
					</ul>
				</div>
			</div>
		)
	}
}

export default PreviewPictures