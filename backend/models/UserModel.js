const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String },
    email_address: { type: Array, required: true },
    password: { type: String, required: true }
})

module.exports = mongoose.model("User", UserSchema);