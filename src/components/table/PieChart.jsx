import React, { Component } from 'react'

/**
 * 配置参数
 * --rate 百分比数值 string 例：'50%'
 * --width 宽度设置 number 默认为20 例：20 
 * <PieChart rate=’50%‘ width={30} />
 */

class PieChart extends Component {
  componentDidMount() {
    this.updateCanvas()
  }

  // componentDidUpdate(nextProps, nextState) {
  //   (this.props.rate !== nextProps.rate) && (this.updateCanvas())
  // }

  updateCanvas() {
    const { rate, width = 10 } = this.props
    const parseRate = parseInt(rate.slice(0, -1), 10)/100
    const wrap = this.refs.canvas.getContext('2d')
    let agl
    // 外圆
    wrap.fillStyle='#efefef'
    wrap.beginPath();
    wrap.arc(width,width,width,0,2*Math.PI);
    wrap.closePath();
    wrap.fill();
    //内圆
    agl = parseRate * (Math.PI*2) - 0.5 * Math.PI
    wrap.fillStyle = 'rgba(87, 197, 247, 1)'
    wrap.beginPath();
    wrap.moveTo(width,width);
    wrap.arc(width, width, width, -0.5*Math.PI, agl,);
    wrap.lineTo(width, width);
    wrap.closePath();
    wrap.fill();
    //文本
    // wrap.font = "12px Microsoft YaHei"
    // wrap.strokeText(`${parseRate * 100}%`, 25, 14)
  }

  render() {
    const { rate, width = 10 } = this.props
    const styles = {
      span: {
        display: 'inline-block',
        boxSizing: 'border-box',
        verticalAlign: 'middle',
        padding: '0 5px',
        fontSize: '14px',
      }
    }
    return (
      <span style={styles.span}>
        <canvas ref="canvas"
          width={`${width * 2}`}
          height={`${width * 2}`}
          style={{verticalAlign: 'middle'}}>
        </canvas>
        <b style={styles.span}>{rate}</b>
      </span>
    )
  }
}

export default PieChart