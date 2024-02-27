const Map = require('../models/MapModel')

// get all maps - only for development purposes 
const getAllMaps = async (req, res) => {
    try {
        const maps = await Map.find({});
        res.status(200).json(maps);
    } catch (err) {
        res.status(400).json({ mssg: err.message });
    }
}

// get a single map by its id - id in url parameters
const getSingleMap = async (req, res) => {
    const map_id = req.params.map_id;
    try {
        const map = await Map.findOne({ _id: map_id });
        res.status(200).json(map ? map : { mssg: "Invalid map id" });
    } catch (err) {
        res.status(400).json({ mssg: err.message });
    }
}

// get all maps that belong to specific user - user_id in url params
const getUsersMaps = async (req, res) => {
    const user_id = req.params.user_id;
    try {
        const userMaps = await Map.find({ user_id });
        res.status(200).json(userMaps);
    } catch (err) {
        res.status(400).json({ mssg: err.message });
    }
}

// create new map - properties in request body
const createSingleMap = async (req, res) => {
    const { map_name, map_description, map_places, user_id } = req.body;
    try {
        if (!map_name) throw Error("Map name is required.");
        const map = await Map.create({ map_name, map_description, map_places, user_id });
        res.status(200).json(map);
    } catch (err) {
        res.status(400).json({ mssg: err.message });
    }
}

// add place to map's places array - map id in url params, new place id in request body
const addPlaceToMap = async (req, res) => {
    const map_id = req.params.map_id;
    const { place_id } = req.body;
    try {
        const map = await Map.findOne({ _id: map_id });
        let updatedPlaces = map.map_places;
        if (updatedPlaces.includes(place_id)) throw Error("Place is already included in map.");
        updatedPlaces.push(place_id);
        await Map.updateOne({ _id: map_id }, { map_places: updatedPlaces });
        res.status(200).json({ mssg: `Added place with id ${place_id} to map with id ${map._id}` });
    } catch (err) {
        res.status(400).json({ mssg: err.message });
    }
}

// delete place from map's places array - map id in url params, new place id in request body
const deletePlaceFromMap = async (req, res) => {
    const map_id = req.params.map_id;
    const { place_id } = req.body;
    try {
        const map = await Map.findOne({ _id: map_id });
        let updatedPlaces = map.map_places;
        if (!updatedPlaces.includes(place_id)) throw Error("Place is not in map.");
        updatedPlaces = updatedPlaces.filter(place => place !== place_id)
        await Map.updateOne({ _id: map_id }, { map_places: updatedPlaces });
        res.status(200).json({ mssg: `Deleted place with id ${place_id} from map with id ${map._id}` });
    } catch (err) {
        res.status(400).json({ mssg: err.message });
    }
}

//  update a single map - map id in url params
const updateSingleMap = async (req, res) => {
    const _id = req.params.map_id;
    const updatedProps = { ...req.body }
    try {
        const response = await Map.updateOne({ _id }, updatedProps);
        res.status(200).json({ mssg: `Matched ${response.matchedCount} documents and updated ${response.modifiedCount} documents.` });
    } catch (err) {
        res.status(400).json({ mssg: err.message });
    }
}

// delete a single map - map id in url params
const deleteSingleMap = async (req, res) => {
    const _id = req.params.map_id;
    try {
        const response = await Map.deleteOne({ _id });
        res.status(200).json({ mssg: `Deleted ${response.deletedCount} documents.` });
    } catch (err) {
        res.status(400).json({ mssg: err.message });
    }
}

// delete all maps that belong to specific user - user id in params. For when user deletes account
const deleteUsersMaps = async (req, res) => {
    const user_id = req.params.user_id;
    try {
        const response = await Map.deleteMany({ user_id });
        res.status(200).json({ mssg: `Deleted ${response.deletedCount} documents.` });
    } catch (err) {
        res.status(400).json({ mssg: err.message });
    }
}

module.exports = {
    getAllMaps,
    getSingleMap,
    getUsersMaps,
    createSingleMap,
    updateSingleMap,
    addPlaceToMap,
    deleteSingleMap,
    deleteUsersMaps,
    deletePlaceFromMap
}