const mongoose = require("mongoose");
const validator = require("validator");
const db =
  "mongodb+srv://admin:123abc@cluster0-fm3f2.mongodb.net/car-rental?retryWrites=true&w=majority";

mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const usserschema = new mongoose.Schema({
  //type
  name: { type: String, required: true, validate: validator.isAlpha },
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: validator.isEmail,
  },
  mobile: { type: Number, required: true },
  address: { type: String, required: true },
  state: { type: String, required: true },
  zipcode: { type: Number, required: true },
  password: { type: String, required: true },
  confirm_pass: {
    type: String,
    requird: true,
    validate: function () {
      return this.confirm_pass === this.password;
    },
  }
});

const usermodel = mongoose.model("usermodel", userschema);

module.exports = usermodel;
