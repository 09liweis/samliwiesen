const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EducationSchema = new Schema({
    school: {
        type: Schema.Types.ObjectId,
        ref: 'Place'
    },
    degree: String,
    subject: String,
    from: String,
    to: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    update_at: {
        type: Date,
        default: Date.now
    }
});

EducationSchema.pre('save', function(next) {
    const currentDate = new Date();
    this.update_at = currentDate;
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});

module.exports = mongoose.model('Education', EducationSchema);