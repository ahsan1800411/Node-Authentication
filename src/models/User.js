const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide the name'],
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: [true, 'Please provide the email'],
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please provide the valid email addresss',
    },
  },
  password: {
    type: String,
    required: [true, 'Please provide the password'],
    minlength: 3,
    maxlength: 20,
    select: false,
  },
});

userSchema.pre('save', async function () {
  // console.log(this.modifiedPaths());

  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// to generate jsonwebtoken;
userSchema.methods.createJWT = function () {
  return JWT.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFE,
  });
};

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
