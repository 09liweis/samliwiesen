import React from 'react';
import styled from 'styled-components';

const TransactionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: relative;
  background-color: #ffffff;
  padding: 10px;
  margin: 0 10px 10px;
  border-radius: 3px;
  @media (min-width: 768px) {
    width: 46%;
  }
  @media (min-width: 992px) {
    width: 23%;
  }
`;
const TransactionDelete = styled.div`
  cursor: pointer;
`;
export default class Transaction extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const t = this.props.t;
    const priceClass = (t.price > 0) ? 'transaction__price debit' : 'transaction__price credit';
    //const iconClass = 'transaction__icon fa fa-' + icons[t.category.split(' ').join('_')].icon;
    const iconClass = '';
    return (
      <TransactionItem className="box-shadow">
        <div className="transaction__info">
          <div className="transaction__title">{t.title}</div>
          <div className="transaction__category">{t.category}</div>
          <div className="transaction__date">{t.date}</div>
        </div>
        <div className={priceClass}>${Math.abs(t.price)}</div>
        {this.props.admin ? 
        <div onClick={this.props.handleUpdate.bind(this, t)}>Edit</div>
        : null}
        {this.props.admin ? 
        <TransactionDelete className="fa fa-times" onClick={this.props.handleDelete.bind(this, t)}></TransactionDelete>
        :null}
      </TransactionItem>
    );
  }
}