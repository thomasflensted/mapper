const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()
const userRoutes = require('./routes/userRoutes')
const mapRoutes = require('./routes/mapRoutes')
const placeRoutes = require('./routes/placeRoutes')

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/user', userRoutes)
app.use('/api/map', mapRoutes)
app.use('/api/place', placeRoutes)

app.get('/', (req, res) => {
    res.json({ mssg: "get" })
})

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Listening on port ", process.env.PORT);
        })
    })
    .catch((err) => {
        console.log(err);
    })