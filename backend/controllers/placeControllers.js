const Place = require('../models/PlaceModel')
const validator = require('validator')

// get all places - only for development purposes
const getAllPlaces = async (req, res) => {
    try {
        const allPlaces = await Place.find({});
        res.status(200).json(allPlaces);
    } catch (err) {
        res.status(400).json({ mssg: err.message });
    }
}

// get single place
const getSinglePlace = async (req, res) => {
    const _id = req.params.place_id;
    try {
        const place = await Place.findOne({ _id })
        res.status(200).json(place);
    } catch (err) {
        res.status(400).json({ mssg: err.message });
    }
}

const getAllPlacesThatBelongToMap = async (req, res) => {
    const map_id = req.params.map_id;
    try {
        if (!validator.isMongoId(map_id)) throw Error('Invalid Map ID');
        const mapPlaces = await Place.find({ map_id });
        res.status(200).json(mapPlaces);
    } catch (err) {
        res.status(400).json({ mssg: err.message });
    }
}

// create single place
const createSinglePlace = async (req, res) => {
    try {
        const createdPlace = await Place.createPlace({ ...req.body });
        res.status(200).json(createdPlace);
    } catch (err) {
        res.status(400).json({ mssg: err.message });
    }
}

// update place - place id in params, updated props in body
const updateSinglePlace = async (req, res) => {
    const _id = req.params.place_id;
    const updatedProps = { ...req.body };
    try {
        const response = await Place.updateOne({ _id }, updatedProps);
        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({ mssg: err.message });
    }
}

// place id in params
const deleteSinglePlace = async (req, res) => {
    const _id = req.params.place_id;
    try {
        const response = await Place.deleteOne({ _id });
        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({ mssg: err.message });
    }
}

const deletePlacesOnMapDelete = async (req, res) => {
    const map_id = req.params.map_id;
    try {
        const response = await Place.deleteMany({ map_id });
        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({ mssg: err.message });
    }
}

module.exports = {
    createSinglePlace,
    getAllPlaces,
    getSinglePlace,
    updateSinglePlace,
    deleteSinglePlace,
    deletePlacesOnMapDelete,
    getAllPlacesThatBelongToMap
}