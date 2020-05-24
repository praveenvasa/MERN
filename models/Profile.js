const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    accountNumber: {
        type: Number,
        required: true,
        unique: true
    },
    balance: {
        type: Number
    },
    accountType: {
        type: String
    },
    lastTransactionDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);