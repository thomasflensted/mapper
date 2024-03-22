const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes')
const mapRoutes = require('./routes/mapRoutes')
const placeRoutes = require('./routes/placeRoutes')
require('dotenv').config()

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/user', userRoutes)
app.use('/api/map', mapRoutes)
app.use('/api/place', placeRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Listening on port", process.env.PORT);
        })
    })
    .catch((err) => {
        console.log(err);
    })