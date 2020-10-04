import React from 'react';
import axios from 'axios';
import Flatpickr from 'react-flatpickr';

import 'flatpickr/dist/themes/material_green.css';
import '../css/transaction.css';

import Transaction from '../components/Transaction.jsx';
// Desktop design
// https://dribbble.com/shots/3555301-Qonto-transactions-dashboard-V0/attachments/791018
// Mobile Design
// https://dribbble.com/shots/3061928-Finance-App-New-Transaction/attachments/643790
// Google Map Component
// https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/
export default class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icons: {
        food: {
          icon: 'cutlery'
        },
        transportation: {
          icon: 'car'
        },
        education: {
          icon: 'book'
        },
        house: {
          icon: 'home'
        },
        photo: {
          icon: 'photo'
        },
        salary: {
          icon: 'money'
        },
        drink: {
          icon: 'glass'
        },
        sport: {
          icon: 'futbol-o'
        },
        movie: {
          icon: 'ticket'
        },
        donation: {
          icon: 'donation'
        },
        tax_return: {
          icon: 'tax'
        },
        penalty: {
          icon: 'penalty'
        },
        entertainment: {
          icon: 'smile-o'
        }
      },
      api: {
        list: '/api/transactions/',
      },
      filters:{},
      transactions: [],
    };
    this.getList = this.getList.bind(this);
  }
  componentDidMount() {
    this.getList();
  }
  getFilters() {
    const {href} = location;
    let [host,search] = href.split('?');
    let filters = {};
    if (search) {
      search = search.split('&');
      const searchLength = search.length;
      if (searchLength) {
        for (let i = 0; i < searchLength; i++) {
          const queryString = search[i];
          let [key,val] = queryString.split('=');
          if (key == 'cin') {
            val = val.split('.');
            filters.category = {'$in':val};
          } else {
            filters[key] = val;
          }
        }
      }
    }
    return filters;
  }
  getList() {
    const getListApi = this.state.api.list;
    const filters = this.getFilters();
    axios.post(getListApi,filters).then((res) => {
      this.setState({
        transactions: res.data,
        filters
      });
    });
  }
  render() {
    const {icons,filters} = this.state;
    let spend = 0.0;
    const ts = this.state.transactions.map((t) => {
      if (t.price < 0) {
        spend += t.price;
      }
      return (
        <Transaction key={t._id} t={t} />
      );
    });
    return (
      <section id="transactions" className="container">
        <h1 className="transactions__title">
          <span>Date: {filters.date}</span>
        </h1>
        <h2 className="transaction__price credit">Total Spend: ${Math.abs(spend).toFixed(2)}</h2>
        <div className="transaction__list">
        {ts}
        </div>
      </section>
    );
  }
}