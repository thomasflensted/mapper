const express = require('express');
const router = express.Router();
const {
    createSinglePlace,
    getAllPlaces,
    getSinglePlace,
    updateSinglePlace,
    deleteSinglePlace,
    deletePlacesOnMapDelete,
    getAllPlacesThatBelongToMap
} = require('../controllers/placeControllers')

// get all places - only for development purposes
router.get('/', getAllPlaces)

// get single place
router.get('/:place_id', getSinglePlace)

// get all places that are included in specfic map
router.get('/map_places/:map_id', getAllPlacesThatBelongToMap)

// create single place
router.post('/', createSinglePlace)

// patch place
router.patch('/:place_id', updateSinglePlace)

// delete place
router.delete('/:place_id', deleteSinglePlace)

// delete all places belonging to a specific map
router.delete('/map_places/:map_id', deletePlacesOnMapDelete)

module.exports = router; 