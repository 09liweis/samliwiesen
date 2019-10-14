const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
	title: {
		type: String,
		required: 'Title is required for transaction'
	},
	price: {
		type: Number,
		required: 'Price is required for transaction'
	},
	date: {
		type: String,
		required: 'Date is required for transaction'
	},
	place: {
		type: Schema.Types.ObjectId,
		ref: 'Place'
	},
	category: String,
	created_at: {
		type: Date,
		default: Date.now
	},
	update_at: {
		type: Date,
		default: Date.now
	}
});

TransactionSchema.pre('save', (next) => {
	const currentDate = new Date();
	this.update_at = currentDate;
	if (!this.created_at) {
		this.created_at = currentDate;
	}
	next();
});

module.exports = mongoose.model('Transaction', TransactionSchema);