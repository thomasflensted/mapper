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

PlaceSchema.statics.createPlace = async function (placeObj) {

    // check if name is present and gps coordinates are valid
    const { place_name, place_coordinates } = placeObj;
    if (!place_name) throw Error("Fields with an asterisk must be filled out.")
    if (!place_coordinates || place_coordinates.length !== 2) throw Error("Invalid GPS coordinates.");

    // create place and return it and a message
    const createdPlace = await this.create(placeObj);
    return { mssg: "Created 1 place.", createdPlace };
}

module.exports = mongoose.model("Place", PlaceSchema);