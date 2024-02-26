const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
    place_name: { type: String, required: true },
    place_description: { type: String },
    place_type: { type: String },
    place_images: { type: Array },
    place_coordinates: { type: Array, required: true },
    map_id: { type: String, required: true },
})

module.exports = mongoose.model("Place", PlaceSchema);