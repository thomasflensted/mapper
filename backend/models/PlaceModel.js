const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    type: { type: String },
    have_been: { type: Boolean, required: true },
    images: { type: Array },
    coordinates: { type: Array, required: true },
    map_id: { type: String, required: true },
})

PlaceSchema.statics.createPlace = async function (placeObj) {

    // check if name is present and gps coordinates are valid
    const { name, coordinates } = placeObj;
    if (!name) throw Error("The name field must be filled out.")
    if (!coordinates || coordinates.length !== 2) throw Error("Invalid GPS coordinates.");

    // create place and return it and a message
    const createdPlace = await this.create(placeObj);
    return { mssg: "Created 1 place.", createdPlace };
}

module.exports = mongoose.model("Place", PlaceSchema);