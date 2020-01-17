const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
	name: String,
	address: String,
	lat: String,
	lng: String,
	place_id: String,
	rating:Number,
	icon:String,
	created_at: {
		type: Date,
		default: Date.now
	},
	updated_at: {
		type: Date,
		default: Date.now
	},
	photos:Array,
	types:Array,
	transactions:Array
});

PlaceSchema.pre('save', function(next) {
	const currentDate = new Date();
	this.updated_at = currentDate;
	if (!this.created_at) {
		this.created_at = currentDate;
	}
	next();
});

module.exports = mongoose.model('Place', PlaceSchema);