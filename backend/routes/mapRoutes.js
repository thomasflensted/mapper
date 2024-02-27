const express = require('express');
const router = express.Router();
const {
    getAllMaps,
    getSingleMap,
    getUsersMaps,
    createSingleMap,
    updateSingleMap,
    deleteSingleMap,
    deleteUsersMaps,
    addPlaceToMap,
    deletePlaceFromMap
} = require('../controllers/mapControllers');

// get all maps - only for development purposes
router.get('/', getAllMaps)

// get single map
router.get('/:map_id', getSingleMap)

// get all maps belonging to one user
router.get('/user_maps/:user_id', getUsersMaps)

// create map
router.post('/', createSingleMap);

// update map
router.patch('/:map_id', updateSingleMap)

// add place to map
router.patch('/add_place/:map_id', addPlaceToMap)

// delete place from map
router.patch('/delete_place/:map_id', deletePlaceFromMap)

// delete single map
router.delete('/:map_id', deleteSingleMap)

// delete all maps belonging to one user
router.delete('/user_maps/:user_id', deleteUsersMaps)

module.exports = router; 