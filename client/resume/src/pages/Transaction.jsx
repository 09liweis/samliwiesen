import React from 'react';
import axios from 'axios';
import Flatpickr from 'react-flatpickr';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import 'flatpickr/dist/themes/material_green.css';
import '../css/transaction.css';

let apiDomain = 'https://samliweisen.herokuapp.com/';
// if (window.location.host.indexOf('a09liweis') > -1) {
//     apiDomain = 'https://samliweisen-a09liweis.c9users.io/';
// }


// Desktop design
// https://dribbble.com/shots/3555301-Qonto-transactions-dashboard-V0/attachments/791018
// Mobile Design
// https://dribbble.com/shots/3061928-Finance-App-New-Transaction/attachments/643790
export default class Transaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transaction: {
                title: '',
                date: '',
                price: '',
                category: '',
                place: {},
            },
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
            address: '',
            modal: false,
            api: {
                list: apiDomain + 'api/transactions/',
            },
            transactions: [],
            admin: window.localStorage.getItem('admin') || false
        };
        this.handleChange = this.handleChange.bind(this);
        this.getList = this.getList.bind(this);
        this.handleModalChange = this.handleModalChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.reset = this.reset.bind(this);
    }
    componentDidMount() {
        this.getList();
    }
    getList() {
        const getListApi = this.state.api.list;
        axios.get(getListApi).then((res) => {
            this.setState({
                transactions: res.data
            });
        });
    }
    handleChange(e) {
        const v = e.target.value;
        const p = e.target.name;
        let t = this.state.transaction;
        t[p] = v;
        this.setState({
            transaction: t
        });
    }
    handleDateChange(selectedDates, dateStr, instance) {
        let t = this.state.transaction;
        t.date = dateStr;
        this.setState({
            transaction: t
        });
    }
    handleSelectAddress(address) {
        geocodeByAddress(address)
            .then(results => {
                const place = {
                    name: address,
                    place_id: results[0].place_id,
                    address: results[0].formatted_address,
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng(),
                };
                let t = this.state.transaction;
                t.place = place;
                this.setState({
                    transaction: t
                });
            })
            .catch(error => console.error('Error', error));
    }
    handleModal() {
        this.handleModalChange();
    }
    handleModalChange() {
        this.setState({
            modal: !this.state.modal
        });
    }
    handleDelete(t) {
        axios.delete(this.state.api.list + t._id).then((res) => {
            this.getList();
        });
    }
    handleUpdate(t) {
        this.setState({
            transaction: t
        });
        this.handleModalChange();
    }
    handleSubmit(e) {
        e.preventDefault();
        const postApi = this.state.api.list;
        const transaction = this.state.transaction;
        if (typeof transaction._id == 'undefined') {
            axios.post(postApi, transaction).then((res) => {
                if (res.status == 200) {
                    this.reset();
                }
            });
        } else {
            axios.put(postApi + transaction._id, transaction).then((res) => {
                if (res.status == 200) {
                    this.reset();
                }
            });
        }
    }
    reset() {
        this.getList();
        this.handleModalChange();
        this.setState({
            transaction: {
                title: '',
                price: '',
                date: '',
                category: '',
                place: {}
            }
        });
    }
    render() {
        const {icons} = this.state;
        let spend = 0.0;
        let income = 0.0;
        const ts = this.state.transactions.map((t) => {
            const priceClass = (t.price > 0) ? 'transaction__price debit' : 'transaction__price credit';
            if (t.price > 0) {
                income += t.price;
            } else {
                spend += t.price;
            }
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
        });
        const t = this.state.transaction;
        const modalClass = this.state.modal ? 'modal active' : 'modal';
        return (
            <section id="transactions" className="container">
                <h1 className="transactions__title">Transactions</h1>
                <div className={modalClass}>
                    <div className="modal__bg" onClick={this.handleModal.bind(this)}></div>
                    <form className="transaction__form" onSubmit={this.handleSubmit.bind(this)}>
                        <h3>Transaction Form</h3>
                        <input placeholder="Title" name="title" value={t.title} onChange={this.handleChange} />
                        <Flatpickr options={{dateFormat: 'Y-m-d', disableMobile: 'true'}} placeholder="Date" value={t.date} name="date" onChange={this.handleDateChange} />
                        <input placeholder="Price" name="price" value={t.price} onChange={this.handleChange} />
                        <input placeholder="Category" name="category" value={t.category} onChange={this.handleChange} />
                        <PlacesAutocomplete value={this.state.address} onChange={value => this.setState({address: value}) } onSelect={this.handleSelectAddress.bind(this)}>
                            {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                            <div>
                                <input
                                    {...getInputProps({
                                        placeholder: 'Search Places ...',
                                        className: 'location-search-input'
                                    })}
                                />
                                <div className="autocomplete-dropdown-container">
                                    {suggestions.map(suggestion => {
                                        const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                                        // inline style for demonstration purpose
                                        const style = suggestion.active
                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                        return (
                                        <div {...getSuggestionItemProps(suggestion, { className, style })}>
                                            <span>{suggestion.description}</span>
                                        </div>
                                        );
                                    })}
                                </div>
                            </div>
                            )}
                        </PlacesAutocomplete>
                        <button>Submit</button>
                    </form>
                </div>
                {this.state.admin ? 
                <a className="transaction__new" onClick={this.handleModal.bind(this)}>+</a>
                : null}
                <h2 className="transaction__price credit">Total Spend: ${Math.abs(spend).toFixed(2)}</h2>
                <h2 className="transaction__price debit">Total Income: ${income.toFixed(2)}</h2>
                <div className="transaction__list">
                {ts}
                </div>
            </section>
        );
    }
}