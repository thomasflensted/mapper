const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validator = require('validator');

const UserSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String },
    profile_picture: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true }
})

UserSchema.statics.login = async function (email, password) {

    if (!email) throw Error("Email field must be filled out.");
    if (!password) throw Error("Password field must be filled out.");

    const user = await this.findOne({ email });
    if (!user) throw Error("Invalid email address.");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw Error("Invalid password");

    return user;
}

UserSchema.statics.signup = async function (first_name, last_name, profile_picture, email, password, passwordRepeat) {

    if (!first_name) throw Error("First name field must be filled out");
    if (!email) throw Error("Email field must be filled out");
    if (!validator.isEmail(email)) throw Error("Invalid email address.");
    if (!password || !passwordRepeat) throw Error("Password fields must be filled out");
    if (password !== passwordRepeat) throw Error("Passwords are not matching.");

    const exists = await this.findOne({ email });
    if (exists) {
        throw Error("A user with that email already exists.");
    }

    if (!validator.isStrongPassword(password)) {
        throw Error("Password is not strong enough.");
    }

    const capitalizedFirstName = capitalizeFirstLetter(first_name);
    const capitalizedLastName = last_name ? capitalizeFirstLetter(last_name) : '';

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = this.create({ first_name: capitalizedFirstName, last_name: capitalizedLastName, profile_picture, email, password: passwordHash })
    return user;
}

UserSchema.statics.updateEmail = async function (oldEmail, newEmail, password) {

    if (!newEmail) throw Error("Email field must be filled out.");
    if (!validator.isEmail(newEmail)) throw Error("New email address is invalid.");
    if (newEmail === oldEmail) throw Error("Nothing to update.");

    const user = await this.findOne({ email: oldEmail });
    if (!user) throw Error("Something went wrong. Please refresh the page or log out and in again.");

    const anotherUserExists = await this.findOne({ email: newEmail });
    if (anotherUserExists) throw Error("Another user with that email address already exists.");

    const isCorrectpassword = await bcrypt.compare(password, user.password);
    if (!isCorrectpassword) throw Error("Incorrect password");

    const updatedUser = await this.findOneAndUpdate({ email: oldEmail }, { email: newEmail }, { returnDocument: 'after' });
    return updatedUser;

}

UserSchema.statics.updateNames = async function (email, first_name, last_name) {

    if (!first_name) throw Error("First name must be filled out.");

    const user = await this.findOne({ email });
    if (!user) {
        throw Error("Couldn't find user. Please refresh the page or log out and in again.")
    }

    const capitalizedFirstName = capitalizeFirstLetter(first_name);
    const capitalizedLastName = capitalizeFirstLetter(last_name);

    if (user.first_name === capitalizedFirstName && user.last_name == capitalizedLastName) {
        throw Error("No changes to update.")
    }

    const updatedUser = await this.findOneAndUpdate(
        { email },
        { first_name: capitalizedFirstName, last_name: capitalizedLastName },
        { returnDocument: 'after' }
    );

    return updatedUser;
}

//email: user.email,oldPassword,newPassword,newPasswordRepeat

UserSchema.statics.updatePassword = async function (email, oldPassword, newPassword, newPasswordRepeat) {

    if (!newPassword || !newPasswordRepeat || !oldPassword) throw Error("All fields must be filled out.");
    if (newPassword !== newPasswordRepeat) throw Error("Passwords are not matching.");

    const user = await this.findOne({ email });
    if (!user) throw Error("Something went wrong. Please refresh the page or log out and in again.");

    const isCorrectpassword = await bcrypt.compare(oldPassword, user.password);
    if (!isCorrectpassword) throw Error("Incorrect password");

    if (!validator.isStrongPassword(newPassword)) throw Error("Password is too weak.");

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    const updatedUser = await this.findOneAndUpdate({ email }, { password: passwordHash }, { returnDocument: 'after' });
    return updatedUser;
}

const capitalizeFirstLetter = (text) => {
    return text.substring(0, 1).toUpperCase() + text.substring(1);
}

module.exports = mongoose.model("User", UserSchema);