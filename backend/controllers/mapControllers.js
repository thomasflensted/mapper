const Map = require('../models/MapModel')
const User = require('../models/UserModel')
const Place = require('../models/PlaceModel')

// create new map - properties in request body
const createSingleMap = async (req, res) => {
    const { map_name, map_description, user_id } = req.body;
    try {
        const map = await Map.createMap(map_name, map_description, user_id);
        res.status(200).json(map);
    } catch (err) {
        res.status(400).json({ mssg: err.message });
    }
}

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
        res.status(200).json(map);
    } catch (err) {
        res.status(400).json({ mssg: err.message });
    }
}

// get all maps that belong to specific user - user_id in url params
const getUsersMaps = async (req, res) => {
    const user_id = req.params.user_id;
    try {
        const user = await User.findOne({ _id: user_id });
        if (!user) throw Error("User does not exist");
        const userMaps = await Map.find({ user_id });
        res.status(200).json(userMaps);
    } catch (err) {
        res.status(400).json({ mssg: err.message });
    }
}

//  update a single map - map id in url params
const updateSingleMap = async (req, res) => {
    const _id = req.params.map_id;
    try {
        const response = await Map.updateOne({ _id }, { ...req.body });
        res.status(200).json({ mssg: `Updated ${response.modifiedCount} documents.` });
    } catch (err) {
        res.status(400).json({ mssg: err.message });
    }
}

// delete a single map - map id in url params
const deleteSingleMap = async (req, res) => {
    const _id = req.params.map_id;
    try {
        const deletedMap = await Map.findOneAndDelete({ _id });
        const deletedPlaces = await Place.deleteMany({ map_id: _id });
        res.status(200).json({ deletedMap, deletedPlaces });
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
    deleteSingleMap,
}