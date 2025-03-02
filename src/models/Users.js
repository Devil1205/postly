const mongoose = require("mongoose");
const { string } = require("yup");

const User = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Name is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  phone: {
    type: String,
    required: false,
    unique: true,
  },
  profilePic: {
    type: string,
    required: false,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("User", User);
