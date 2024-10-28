var mongoose = require('mongoose')
var validator = require('validator')
var bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    fullname: {
        type: String
    },
    username: {
        type: String,
        required: [true, "username tidak boleh kosong!"],
        unique: [true, "username sudah digunakan!"]
    },
    email: {
        type: String,
        required: [true, "email tidak boleh kosong!"],
        unique: [true, "email sudah digunakan!"],
        validator: {
            validator: validator.isEmail,
            message: "silahkan input email yang valid!"
        }
    },
    age: {
        type: Number,
        required: [true, "Umur tidak boleh kosong"]
    },
    password: {
        type: String,
        required: [true, "password tidak boleh kosong!"],
        minLength: [6, "Password minimal harus 6 karakter"]
    },
})

// Middleware untuk enkripsi password sebelum menyimpan user
userSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        this.password_user = await bcrypt.hash(this.password, salt);
    }
    next();
});

const user = mongoose.model("User", userSchema)

module.exports = user;