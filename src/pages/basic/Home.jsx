import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Row, Col, Card } from 'antd'
import PouchDB from 'pouchdb'
import echarts from 'echarts'

import { DATABASE_URL } from '../../common/constant'

import imgStudy from '../../assets/image/u666.png'
import imgSample from '../../assets/image/u64.png'
import imgPatient from '../../assets/image/u72.png'
import imgBreak from '../../assets/image/u62.png'


PouchDB.plugin(require('pouchdb-find'))
PouchDB.debug.enable('pouchdb:find')

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      studyNum:0,
      patientNum:0,
      sampleNum:0,
      mutationNum:0
    }
  }

  componentWillMount() {
      // 组件挂载前
      // console.log(DATABASE_URL)
      let db = new PouchDB(DATABASE_URL)

      let ddoc = {
        _id: '_design/my_index',
        views: {
          by_portalDataType: {
            map: 'function (doc) { if(doc.portalDataType){emit(doc.portalDataType)} } ',
            reduce: '_count'
          }
        }
      }

      db.put(ddoc).catch(function(err){
        // success
        // console.log(err)
        if(err.name !== 'conflict'){throw err}
      }).then(function (){
        return db.query('my_index/by_portalDataType',{key:'D_MUTATION', reduce:true, group:true})
      }).then( res => {
        // console.log(res)
        this.setState({ mutationNum:res.rows[0].value})
      }).then(function(){
        return db.query('my_index/by_portalDataType',{key:'D_SAMPLE', reduce:true, group:true})
      }).then( res => {
        this.setState({ sampleNum:res.rows[0].value})
      }).then(function(){
        return db.query('my_index/by_portalDataType',{key:'D_PATIENT', reduce:true, group:true})
      }).then( res => {
        this.setState({ patientNum:res.rows[0].value})
      }).then(function(){
        return db.query('my_index/by_portalDataType',{key:'D_STUDY', reduce:true, group:true})
      }).then(res => {
        this.setState({ studyNum:res.rows[0].value})
      })
      .catch(function(err){
        console.log(err)
      })

  }





  render(){
    // 主页
    return(
      <Layout className="main-wrapper">
        <div className="main-top">
          <Row style={{margin: '5px 50px'}}>

            <PartSubject count={this.state.studyNum} title="课题数" />
            <PartPatient count={this.state.patientNum} title="病人数" />
            <PartSample count={this.state.sampleNum} title="样本数" />
            <PartBreak count={this.state.mutationNum} title="突变数" />

          </Row>
        </div>
        <div className="main-left">
          <Row>
            <Col span={11} style={{height: '300px', borderRight: '1px solid #C3C3C3'}}>
              <h2> 课题人数统计 </h2>
              <StudyBarChart />



            </Col>
            <Col span={11} offset={1}>

              <h2> 课题列表 </h2>
              {/*<span className="more"><Link to="/index/study/select"> 更多>> </Link></span>*/}

              <Subject title="胰腺癌" />

            </Col>
          </Row>
        </div>
      </Layout>
    )
  }
}

//课题数
class PartSubject extends React.Component {
  render() {
    const count = this.props.count
    const title = this.props.title
    return (
      <div style={{padding: '5px 50px', float: 'left'}}>
        <Card style={{width: 130, height: 100}} bodyStyle={{padding: 5}}>
          <div className="over">
            <img style={{margin: '0px 8px', float: 'left'}} width="50px" src={imgStudy} />
            <p style={{marginTop: '20px', textAlign: 'center'}}> {count} </p>
            <p style={{marginTop: '10px', textAlign: 'center'}}> {title} </p>
          </div>
        </Card>
      </div>
    )
  }
}
//样本数
class PartSample extends React.Component {
  render() {
    const count = this.props.count
    const title = this.props.title
    return (
      <div style={{padding: '5px 50px', float: 'left'}}>
        <Card style={{width: 130, height: 100}} bodyStyle={{padding: 5}}>
          <div className="over">
            <img style={{margin: '0px 8px', float: 'left'}} width="50px" src={imgSample} />
            <p style={{marginTop: '20px', textAlign: 'center'}}> {count} </p>
            <p style={{marginTop: '10px', textAlign: 'center'}}> {title} </p>
          </div>
        </Card>
      </div>
    )
  }
}
//病人数
class PartPatient extends React.Component {
  render() {
    const count = this.props.count
    const title = this.props.title
    return (
      <div style={{padding: '5px 50px', float: 'left'}}>
        <Card style={{width: 130, height: 100}} bodyStyle={{padding: 5}}>
          <div className="over">
            <img style={{margin: '0px 8px', float: 'left'}} width="50px" src={imgPatient} />
            <p style={{marginTop: '20px', textAlign: 'center'}}> {count} </p>
            <p style={{marginTop: '10px', textAlign: 'center'}}> {title} </p>
          </div>
        </Card>
      </div>
    )
  }
}
//突变数
class PartBreak extends React.Component {
  render() {
    const count = this.props.count
    const title = this.props.title
    return (
      <div style={{padding: '5px 50px', float: 'left'}}>
        <Card style={{width: 130, height: 100}} bodyStyle={{padding: 5}}>
          <div className="over">
            <img style={{margin: '0px 8px', float: 'left'}} width="50px" src={imgBreak} />
            <p style={{marginTop: '20px', textAlign: 'center'}}> {count} </p>
            <p style={{marginTop: '10px', textAlign: 'center'}}> {title} </p>
          </div>
        </Card>
      </div>
    )
  }
}

////常用课题
class Subject extends React.Component {
  render() {
    const title = this.props.title
    return (
      <div style={{padding: '40px', float: 'left'}}>
        <Card style={{width: 180}} bodyStyle={{padding: 5}}>
          <div className="over">
            <Link to="/study/patientlist">
              <img style={{margin: '15px 28px'}} width="100px" src={imgStudy} />
              <p style={{textAlign: 'center'}}> {title} </p>
            </Link>
          </div>
        </Card>
      </div>
    )
  }
}


class StudyBarChart extends React.Component{

    constructor() {
        super();
        this.state = {
            legenddata: [],
            data: []
        }
    }

    componentDidMount() {
        // 获取后台couchdb的数据
        let doc = {
        _id: '_design/my_index2',
        views: {
          by_study1083count: {
            map: 'function (doc) { if(doc.portalDataType == "D_PATIENT" && doc.StudyId == 1083){emit(doc.StudyId)} } ',
            reduce: '_count'
          }
        }
      }
      let db = new PouchDB(DATABASE_URL)
      db.put(doc).catch(function(err){
        // success
        // console.log(err)
        if(err.name !== 'conflict'){throw err}
      }).then(function (){
        return db.query('my_index2/by_study1083count',{key:1083, reduce:true, group:true})
      }).then( res => {
        console.log(res)
        let count1083 = res.rows[0].value

           // 基于准备好的dom, 初始化echarts实例
        let myChart = echarts.init(document.getElementById('study_bar_chart'))
        // 绘制图表
        myChart.setOption({
            title: {text: ''},
            tooptip: {
              trigger: 'item',
              formatter:"{a}<br />{b}:{c}({d}%)"

            },
            legend:{
              data:['数量']
            },
            xAxis:{
                data: ['胰腺癌', '', '', '', '']
            },
            yAxis: {},
            series: [{
                name: '数量',
                type: 'bar',
                data: [count1083, 0, 0, 0, 0]
            }]
        });

      })



    }


    render() {
        return (
            <div id="study_bar_chart" style={{width:500, height:300}}></div>
        )
    }
}

export default Home
