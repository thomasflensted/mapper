const express = require('express');
const router = express.Router();

// get all maps - only for development purposes
router.get('/', (req, res) => {
    res.json({ mssg: "get all maps" })
})

// get map
router.get('/:id', (req, res) => {
    res.json({ mssg: "get map" })
})

// patch map
router.patch('/:id', (req, res) => {
    res.json({ mssg: "patch map" })
})

// delete map
router.delete('/:id', (req, res) => {
    res.json({ mssg: "delete map" })
})

module.exports = router; 