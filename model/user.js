const mongoose = require('mongoose')

const validator = require('validator')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,


  },
  isVerified: {
    type: Boolean,
    default: false,


  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'field must be a vaild email']
  },
  password: {
    type: String,
    required: true
  },

  otp: {
    type: Number,

  }
  , role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  profileImage: {
    type: String,
    required: true,
  },
  token: {
    type: String
  },
  street: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  zipCode: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },


}
  ,
  {
    timestamps: true,
  })




module.exports = mongoose.model("User", UserSchema);
