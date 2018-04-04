var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    title: {
        type: String,
        required: 'Kindly enter the name of the task'
    },
    content: {
        type: String
    },
    link: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    update_at: {
        type: Date,
        default: Date.now
    }
});

ProjectSchema.pre('save', function(next) {
    const currentDate = new Date();
    this.update_at = currentDate;
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});

module.exports = mongoose.model('Project', ProjectSchema);