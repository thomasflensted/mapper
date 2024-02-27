const User = require('../models/UserModel')

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find({});
        res.status(200).json(allUsers.length === 0 ? { mssg: "No users exist" } : allUsers);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
const getSingleUser = async (req, res) => {
    const _id = req.params.user_id;
    try {
        const user = await User.findOne({ _id });
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
const updateNames = async (req, res) => {
    const { email, first_name, last_name } = req.body;
    try {
        if (!first_name) throw Error("First name must be filled out.");
        const response = await User.updateNames(email, first_name, last_name)
        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const updateEmail = async (req, res) => {
    const { oldEmail, newEmail, password } = req.body;
    try {
        if (!newEmail) throw Error("Email field must be filled out.");
        const response = await User.updateEmail(oldEmail, newEmail, password)
        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const updatePassword = async (req, res) => {
    const { email, oldPasswordTyped, newPassword, newPasswordRepeat } = req.body;
    try {
        if (!newPassword || !newPasswordRepeat) throw Error("Both password fields must be filled out.");
        if (newPassword !== newPasswordRepeat) throw Error("New passwords are not matching.");
        const response = await User.updatePassword(email, newPassword, oldPasswordTyped);
        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const deleteUser = async (req, res) => {
    const _id = req.params.user_id;
    try {
        const deletedUser = await User.findOneAndDelete({ _id });
        if (!deletedUser) throw Error("Something went wrong. Please refresh the page or log out and in again.")
        res.status(200).json({ mssg: "Successfully deleted 1 user", deletedUser });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
const logInUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
const signUpUser = async (req, res) => {
    const { first_name, last_name, email, password, passwordRepeat } = req.body;
    try {
        const newUser = await User.signup(first_name, last_name, email, password, passwordRepeat);
        res.status(200).json(newUser);
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