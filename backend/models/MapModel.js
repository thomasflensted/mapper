const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MapSchema = new Schema({
    map_name: { type: String, required: true },
    map_description: { type: String },
    map_places: { type: Array, required: true },
    user_id: { type: String, required: true }
})

module.exports = mongoose.model("Map", MapSchema);