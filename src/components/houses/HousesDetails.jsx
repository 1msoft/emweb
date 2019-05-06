import React from 'react';
import {Row, Col, Modal, Form, Divider } from 'antd';
import { fmoney, dateFormat } from '../../utils/helper';
import { observer, inject } from 'mobx-react';
import { 
  HOUSE_IS_PAY_STATUS,HOUSE_IS_PAY_STATUS_DESC,
  HOUSE_PAY_STATUS, HOUSE_PAY_STATUS_DESC, 
  HAS_ELEVATOR_STATUS, HAS_ELEVATOR_STATUS_DESC } 
  from '../../../../presale-common/consts/consts.business';

@observer
class HousesDetails extends React.Component{

  // 取消
  onCancel = () => {
    const { houseStore } = this.props;
    const { commonStore } = houseStore;
    commonStore.closeDialog('showHouseDetails');
  }

  render(){
    const { houseStore = {} } = this.props;
    const { commonStore, currHouse} = houseStore;
    const { dialog } = commonStore;
    const formItemLayout = {
      labelCol:{span: 6},
      wrapperCol:{span: 18}
    };
    return (
      <div>
      <Modal
        className="modal-confirm-button-hidden"
        visible={dialog.showHouseDetails}
        width={1200}
        title={`房屋详情`}
        maskClosable={false}
        cancelText="返回"
        onCancel={this.onCancel}>
        <Form layout="inline">
          <Divider orientation="left">楼栋基本信息</Divider>
          <Row gutter={8}>
            <Col span="8">
              <Form.Item className="form-item-clear-margin" 
                label="所属小区">
                {currHouse[0] && currHouse[0].communityName}
              </Form.Item>
            </Col>
            <Col span="8">
              <Form.Item className="form-item-clear-margin" 
              label="所属楼栋">
                {currHouse[0] && currHouse[0].buildingName}
              </Form.Item>
            </Col>
            <Col span="8">
              <Form.Item className="form-item-clear-margin" 
              label="所在层">
                {currHouse[0] && currHouse[0].onFloor}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span="8">
              <Form.Item className="form-item-clear-margin"
              label="单元号">
                {currHouse[0] && currHouse[0].unitNo}
              </Form.Item>
            </Col>
            <Col span="8">
                <Form.Item className="form-item-clear-margin"
                label="房号">
                  {currHouse[0] && currHouse[0].houseNo}
                </Form.Item>
            </Col>
            <Col span="8">
              <Form.Item className="form-item-clear-margin"
              label="房屋类型">
                {currHouse[0] && currHouse[0].houseType && 
                  currHouse[0].houseType.name}                
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span="8">
              <Form.Item className="form-item-clear-margin"
              label="房屋性质">
                {currHouse[0] && currHouse[0].houseProperty && 
                  currHouse[0].houseProperty.name} 
              </Form.Item>
            </Col>
            <Col span="8">
              <Form.Item className="form-item-clear-margin"
              label="房屋用途">
                {currHouse[0] && currHouse[0].housePurpose &&  
                  currHouse[0].housePurpose.name}
              </Form.Item>
            </Col>
            <Col span="8">
              <Form.Item className="form-item-clear-margin"
              label="房屋位置">
                {currHouse[0] && currHouse[0].location}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span="8">
              <Form.Item className="form-item-clear-margin"
              label="建筑面积">
                {currHouse[0] && currHouse[0].buildArea}m²
              </Form.Item>
            </Col>
            <Col span="8">
              <Form.Item className="form-item-clear-margin"
              label="房屋售价">
                {currHouse[0] && fmoney(currHouse[0].price)}
              </Form.Item>
            </Col>
            <Col span="8">
              <Form.Item className="form-item-clear-margin"
              label="子账户">
                {currHouse[0] && currHouse[0].subAcct &&
                  currHouse[0].subAcct.subAcctNo}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span="8">
              <Form.Item className="form-item-clear-margin"
              label="是否出售">
                {currHouse[0] && 
                  HOUSE_IS_PAY_STATUS_DESC[currHouse[0].isPay]}
              </Form.Item>
            </Col>
            <Col span="8">
              <Form.Item className="form-item-clear-margin"
              label="是否缴费">
                {currHouse[0] && 
                  HAS_ELEVATOR_STATUS_DESC[currHouse[0].isPayStatus]}
              </Form.Item>
            </Col>
            <Col span="8">
              <Form.Item className="form-item-clear-margin"
              label="所在地区">
                {currHouse[0] && currHouse[0].zone &&
                  currHouse[0].zone.name}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span="8">
              <Form.Item className="form-item-clear-margin"
              label="地区编码">
                {currHouse[0] && currHouse[0].zoneCode}
              </Form.Item>
            </Col>
          </Row>
          <Divider orientation="left">业主信息</Divider>
          <Row gutter={8}>
            <Col span="8">
              <Form.Item className="form-item-clear-margin"
              label="姓名">
                {currHouse[0] && currHouse[0].owner &&
                  currHouse[0].owner.name}
              </Form.Item>
            </Col>
            <Col span="8">
              <Form.Item className="form-item-clear-margin"
              label="证件号">
                {currHouse[0] && currHouse[0].owner &&
                  currHouse[0].owner.certNo}
              </Form.Item>
            </Col>
            <Col span="8">
              <Form.Item className="form-item-clear-margin"
              label="联系电话">
                {currHouse[0] && currHouse[0].owner &&
                  currHouse[0].owner.tel}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      </div>
    );
  }
}

export default HousesDetails;