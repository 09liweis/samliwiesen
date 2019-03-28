import React from 'react';
import styled from 'styled-components';

const TransactionItem = styled.div`
    width: 100%;
    position: relative;
    background-color: #ffffff;
    padding: 10px;
    margin: 0 10px 20px;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);
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
            <TransactionItem>
                <div className="transaction__info">
                    <div className="transaction__title">{t.title + ' - ' + t.category}</div>
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