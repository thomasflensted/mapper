const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getSingleUser,
    updateNames,
    updateEmail,
    updatePassword,
    deleteUser,
    logInUser,
    signUpUser
} = require('../controllers/userControllers')

// update user's names - new names in request body
router.patch('/updateNames', updateNames);

// update user's email - new email in request body
router.patch('/updateEmail', updateEmail);

// update user's password - new password and repeated password in request body
router.patch('/updatePassword', updatePassword);

// delete user - user id in url params
router.delete('/:user_id', deleteUser);

// login user - user id in url params
router.post('/login', logInUser);

// sign up user - all user credentials in request body
router.post('/signup', signUpUser);

module.exports = router; 