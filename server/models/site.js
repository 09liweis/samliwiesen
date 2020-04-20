var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SiteSchema = new Schema({
  name: {
    type: String,
    default: 'Samliweisen'
  },
  visit: {
    type: Number,
    default: 0
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  update_at: {
    type: Date,
    default: Date.now
  },
});

SiteSchema.pre('save', (next) => {
  const currentDate = new Date();
  this.update_at = currentDate;
  if (!this.created_at) {
    this.created_at = currentDate;
  }
  next();
});

module.exports = mongoose.model('Site', SiteSchema);