var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  steps: [
    {
      status: {
        type: String,
        default: 'pending'
      },
      transaction: {
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
      },
    }
  ],
  created_at: {
    type: Date,
    default: Date.now
  },
  update_at: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: 'pending'
  }
});

TodoSchema.pre('save', function(next) {
  const currentDate = new Date();
  this.update_at = currentDate;
  if (!this.created_at) {
    this.created_at = currentDate;
  }
  next();
});

module.exports = mongoose.model('Todo', TodoSchema);