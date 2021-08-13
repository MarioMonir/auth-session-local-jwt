const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please insert a valid email"],
    },
    password: {
        type: String,
        required: [true, "Password is requried"],
        minLength: [6, "Minimum password length is 6 characters"],
    },
});

/* Mongoose Hooks */

// Execute this function before doc saved to db
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Execute this function after doc saved to db
// userSchema.post("save", async function(doc, next){
//     next();
// });

userSchema.methods.checkPassword = function (password) {
    const passwordHash = this.password;
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, passwordHash, (err, same) => {
            if (err){
                return reject(err);
            }
            return resolve(same);
        });
    });
};

const User = mongoose.model("user", userSchema);

module.exports = User;
