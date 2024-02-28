const User = require('../models/UserModel');
const Map = require('../models/MapModel');
const Place = require('../models/PlaceModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

// list all user - only for development purposes
const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find({});
        res.status(200).json(allUsers.length === 0 ? { mssg: "No users exist" } : allUsers);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// get a single user by its id
const getSingleUser = async (req, res) => {
    const _id = req.params.user_id;
    try {
        const user = await User.findOne({ _id });
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// update user's name or names
const updateNames = async (req, res) => {
    const { email, first_name, last_name } = req.body;
    try {
        const response = await User.updateNames(email, first_name, last_name)
        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

// update users email - uses function on user model
const updateEmail = async (req, res) => {
    const { oldEmail, newEmail, password } = req.body;
    try {
        const response = await User.updateEmail(oldEmail, newEmail, password)
        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

// update users email - uses function on user model
const updatePassword = async (req, res) => {
    const { email, oldPasswordTyped, newPassword, newPasswordRepeat } = req.body;
    try {
        const response = await User.updatePassword(email, newPassword, oldPasswordTyped, newPasswordRepeat);
        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

// delete user and all associated maps and places
const deleteUser = async (req, res) => {
    const _id = req.params.user_id;
    try {
        const deletedUser = await User.findOneAndDelete({ _id });
        const userMaps = await Map.find({ user_id: _id });
        const userMapIds = userMaps.map(map => map._id);
        const placeResponse = await Place.deleteMany({ map_id: { $in: userMapIds } })
        await Map.deleteMany({ user_id: deletedUser._id });
        res.status(200).json({
            deletedUser: deletedUser._id,
            deletedMaps: userMaps.length,
            deletedPlaces: placeResponse.deletedCount
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// log in - uses function on user model
const logInUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.status(200).json({ email, token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// sign up - uses function on user model
const signUpUser = async (req, res) => {
    const { first_name, last_name, email, profile_picture, password, passwordRepeat } = req.body;
    try {
        const newUser = await User.signup(first_name, last_name, profile_picture, email, password, passwordRepeat);
        const token = createToken(newUser._id);
        res.status(200).json({ email, token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = {
    getAllUsers,
    getSingleUser,
    updateNames,
    updateEmail,
    updatePassword,
    deleteUser,
    logInUser,
    signUpUser
}