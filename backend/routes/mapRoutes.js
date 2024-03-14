const express = require('express');
const router = express.Router();
const {
    getAllMaps,
    getSingleMap,
    getUsersMaps,
    createSingleMap,
    updateSingleMap,
    deleteSingleMap,
} = require('../controllers/mapControllers');
const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);

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

// delete single map
router.delete('/:map_id', deleteSingleMap)

module.exports = router; 