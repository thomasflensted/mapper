const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Place = require('./PlaceModel')

const MapSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    user_id: { type: String, required: true }
})

MapSchema.statics.createMap = async function (name, description, user_id) {

    if (!name) throw Error("Map name is required.");
    const createdMap = await this.create({ name, description, user_id });
    if (!createdMap) throw Error("Something went wrong when creating the map. Please refresh the page and try again.")
    return createdMap;
}

MapSchema.statics.deleteMap = async function (map_id) {

    // find map, if non-existent throw Error
    const mapToBeDeleted = await this.findOne({ _id: map_id });
    if (!mapToBeDeleted) throw Error("Unable to delete map");

    // delete all places associated with this map
    const placesResponse = await Place.deleteMany({ map_id });

    // delete map and return result from places delete and map delete
    const mapResponse = await this.deleteOne({ _id: map_id })

    const placesMssg = `Deleted ${placesResponse.deletedCount} places associated with the map`;
    const mapMssg = `Deleted ${mapResponse.deletedCount} map with id ${map_id}.`;

    return { placesMssg, mapMssg };
}

module.exports = mongoose.model("Map", MapSchema);