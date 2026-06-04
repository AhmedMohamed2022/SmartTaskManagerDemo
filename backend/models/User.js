const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },

    /*
      Email will be stored encrypted using AES.
      We keep it required because authentication depends on it.
    */
    email: {
      type: String,
      required: true,
    },

    /*
      Password is stored hashed using bcrypt.
      Never store plain text passwords.
    */
    password: {
      type: String,
      required: true,
    },
    securityNote: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", UserSchema);
