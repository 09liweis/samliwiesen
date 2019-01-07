import React from 'react';
import styled from 'styled-components';

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
            <div className="transaction__item" key={t._id}>
                <div className={iconClass}></div>
                <div className="transaction__info">
                    <div className="transaction__title">{t.title + ' - ' + t.category}</div>
                    <div className="transaction__date">{t.date}</div>
                </div>
                <div className={priceClass}>${Math.abs(t.price)}</div>
                {this.state.admin ? 
                <div onClick={this.handleUpdate.bind(this, t)}>Edit</div>
                : null}
                {this.state.admin ? 
                <div className="transaction__delete fa fa-times" onClick={this.handleDelete.bind(this, t)}></div>
                :null}
            </div>
        );
    }
}