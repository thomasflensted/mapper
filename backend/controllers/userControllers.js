const User = require('../models/UserModel');
const Map = require('../models/MapModel');
const Place = require('../models/PlaceModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

// update user's name or names
const updateNames = async (req, res) => {
    const { email, first_name, last_name } = req.body;
    try {
        const updatedUser = await User.updateNames(email, first_name, last_name)
        const token = createToken(updatedUser._id);
        res.status(200).json({
            _id: updatedUser._id,
            email: updatedUser.email,
            first_name: updatedUser.first_name,
            last_name: updatedUser.last_name,
            profile_picture: updatedUser.profile_picture,
            token
        });
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

// update users email - uses function on user model
const updateEmail = async (req, res) => {
    const { oldEmail, newEmail, password } = req.body;
    try {
        const updatedUser = await User.updateEmail(oldEmail, newEmail, password)
        const token = createToken(updatedUser._id);
        res.status(200).json({
            _id: updatedUser._id,
            email: updatedUser.email,
            first_name: updatedUser.first_name,
            last_name: updatedUser.last_name,
            profile_picture: updatedUser.profile_picture,
            token
        });
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

// update users email - uses function on user model
const updatePassword = async (req, res) => {
    const { email, oldPassword, newPassword, newPasswordRepeat } = req.body;
    try {
        const updatedUser = await User.updatePassword(email, oldPassword, newPassword, newPasswordRepeat);
        const token = createToken(updatedUser._id);
        res.status(200).json({
            _id: updatedUser._id,
            email: updatedUser.email,
            first_name: updatedUser.first_name,
            last_name: updatedUser.last_name,
            profile_picture: updatedUser.profile_picture,
            token
        });
    } catch (err) {
        res.status(400).json({ message: err.message })
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
        res.status(400).json({ message: err.message });
    }
}

// log in - uses function on user model
const logInUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.status(200).json({
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            profile_picture: user.profile_picture,
            token
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// sign up - uses function on user model
const signUpUser = async (req, res) => {
    const { first_name, last_name, email, profile_picture, password, passwordRepeat } = req.body;
    try {
        const newUser = await User.signup(first_name, last_name, profile_picture, email, password, passwordRepeat);
        const token = createToken(newUser._id);
        res.status(200).json({
            _id: newUser._id,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            profile_picture: newUser.profile_picture,
            token
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = {
    updateNames,
    updateEmail,
    updatePassword,
    deleteUser,
    logInUser,
    signUpUser
}