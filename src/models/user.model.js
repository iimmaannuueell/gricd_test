const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    },
    phoneNumber: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlenght: 6,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    isActive: {
        type: Boolean,
        default: true,
    },
},
{
    timestamps: true,
});


// Encrypt password using bcryptjs
UserSchema.pre('save', async function(next) {
    if(this.password){
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });
}

// Sign JWT and return
UserSchema.methods.expireJwtToken = function (req) {
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
        console.log('logout', true)
       return  myCache.del(token)
    }
    console.log('logout', false)
    return false;
}

// Match user entered password
UserSchema.methods.matchPassword = async function(password) {
    const user = this;
  return bcrypt.compare(password, user.password);
}

/**
 * Check if email is taken
 */
UserSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
};


module.exports = mongoose.model('User', UserSchema);