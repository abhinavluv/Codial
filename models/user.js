const mongoose = require('mongoose');
const user_schema = new mongoose.Schema({
   email: {
       type: String,
       required: true,
       unique: true
   },
    password: {
       type: String,
       required: true
    },
    name: {
       type: String,
       required: true,
    }
}, {
    // time stamps is Created_at and updated_at
    timestamps: true
});

const User = mongoose.Model('User', user_schema);
module.exports = User;