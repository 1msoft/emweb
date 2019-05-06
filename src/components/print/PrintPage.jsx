import React, { Component } from 'react';
import { observer } from 'mobx-react'
import moment from 'moment'
import { fmoney } from '../../utils/helper';
import { Column } from '../../components/table/TableElements';
import { PAY_STATUS_DESC, PROJECT_STATUS_DESC } from '../../../../presale-common/consts/consts.business';
import SimpleTable from '../table/SimpleTable';
import './PrintPage.css'

class ChargeDetailPrint extends Component {
	render() {
		const { content } = this.props;
		const data = content.data.targetDate;
		const payOrderItems = content.data.payOrderItems.toJS();
		return (
			<div className="chargeDetailPrint">
				<div className="details_div">
					<span className="details_span_u1">姓名：</span>
					{data.member.memberInfo.name}
				</div>
				<div className="details_div">
					<span className="details_span_u1">学号：</span>
					{data.member.memberInfo.code}
				</div>
				<div className="details_div">
					<span className="details_span_u1">入学年份：</span>
					{data.member.memberInfo.year}
				</div>
				{
					data.member.orgs.map((item, index) => 
						<div className="details_div" key={index}>
							<span className="details_span_u1">{`${item.type ? item.type.name : ''}：`}</span>
							{item.name}
						</div>
					)
				}
				<div className="details_div">
					<span className="details_span_u1">证件号码：</span>
					{data.member.memberInfo.certNo}
				</div>
				<div className="details_div">
					<span className="details_span_u1">手机：</span>
					{data.member.memberInfo.tel}
				</div>
				<div className="details_div">
					<span className="details_span_u1">收费项目：</span>
					{data.charge.name}
				</div>
				<div className="details_div">
					<span className="details_span_u1">收费类别：</span>
					{data.charge.chargeCategory.name}
				</div>
				<div className="details_div">
					<span className="details_span_u1">收费类型：</span>
					{data.charge.chargeType.name}
				</div>
				<div className="details_div">
					<span className="details_span_u1">项目状态：</span>
					{PROJECT_STATUS_DESC[data.charge.status]}
				</div>
				<div className="details_div">
					<span className="details_span_u1">应缴金额：</span>
					{data.payableAmt ? fmoney(data.payableAmt) : 0}
				</div>
				<div className="details_div">
					<span className="details_span_u1">实收金额：</span>
					{data.payinAmt ? fmoney(data.payinAmt) : 0}
				</div>
				<div className="details_div">
					<span className="details_span_u1">缴费状态：</span>
					{PAY_STATUS_DESC[data.payStatus]}
				</div>
				<div className="details_div">
					<span className="details_span_u1">创建时间：</span>
					{data.charge.createAt ?
						moment(data.charge.createAt).format('YYYY-MM-DD') : null
					}
				</div>
				<div className="details_div">
					<span className="details_span_u1">备注：</span>
					{data.payMemo}
				</div>
				<div className="details_div">
					<span className="details_span_u1">应缴金额备注：</span>
					{data.payableAmtMemo}
				</div>

				<div className="pageAfter"></div>
				{payOrderItems.length ?
					<div className="payDetails">
						<span className="details_span_u1">缴费明细：</span>
						<div className="details_block">
							<PayOrderItemsTable
							dataSource={payOrderItems} />
						</div> 
					</div> : null
				}
			</div>
		)
	}
}

@observer
class PayOrderItemsTable extends SimpleTable {
	configTable() {
		return {
			style: {
				width: 500
			},
			rowKey: (record, index) => index,
		}
	}
	renderColumns() {
		return [
			Column('支付订单号', 'orderNo', false, false),
			Column('支付方式', 'payinWay.name', false, false),
			Column('缴费金额', 'payinAmt', false, {
				render(text, record, index) {
					return (
						<span>{fmoney(record.payinAmt)}</span>
					)
				}
			}),
			Column('退款金额', 'refundAmt', false, {
				render(text, record, index) {
					return (
						<span>{fmoney(record.refundAmt)}</span>
					)
				}
			}),
			Column('时间', 'payinTime', false, {
				render(text, record, index) {
					return (
						<span>{moment(record.payinTime).format('YYYY-MM-DD')}</span>
					)
				}
			})
		]
	}
}


class PrintPage extends Component {
  render() {
		const { content } = this.props;
		let contentComponent = null;
		switch (content.type) {
			case 'chargeDetail':
				contentComponent = <ChargeDetailPrint content={content} />;
				break;
			default:
        break;
		}
		return (
			<div id="print">
				{contentComponent}
			</div>
		);
	}
}

export default PrintPage;
