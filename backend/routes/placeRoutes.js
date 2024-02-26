const express = require('express');
const router = express.Router();

// get all places - only for development purposes
router.get('/', (req, res) => {
    res.json({ mssg: "get all places" })
})

// get place
router.get('/:id', (req, res) => {
    res.json({ mssg: "get place" })
})

// patch place
router.patch('/:id', (req, res) => {
    res.json({ mssg: "patch place" })
})

// delete place
router.delete('/:id', (req, res) => {
    res.json({ mssg: "delete place" })
})

module.exports = router; 