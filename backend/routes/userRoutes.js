const express = require('express');
const router = express.Router();

// get all users - only for development purposes
router.get('/', (req, res) => {
    res.json({ mssg: "get all users" })
})

// get user
router.get('/:id', (req, res) => {
    res.json({ mssg: "get user" })
})

// patch user
router.patch('/:id', (req, res) => {
    res.json({ mssg: "patch user" })
})

// delete user
router.delete('/:id', (req, res) => {
    res.json({ mssg: "delete user" })
})

module.exports = router; 