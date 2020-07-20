const mongoose = require("mongoose");
const validator = require("validator");
var bcrypt = require("bcrypt");

const db =
  "mongodb+srv://admin:123abc@cluster0-fm3f2.mongodb.net/car-rental?retryWrites=true&w=majority";

mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const userschema = new mongoose.Schema({
  //type
  name: { type: String, required: true, validate: validator.isAlpha },
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: validator.isEmail,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 10,
    validate: {
      validator: (value) => {
        return validator.isMobilePhone(value);
      }
    }
  },
  address: { type: String, required: true },
  state: { type: String, required: true },
  zipcode: { type: Number, required: true },
  password: { type: String, required: true },
  confirm_pass: {
    type: String,
    requird: true,
    validate: function () {
      return this.confirm_pass === this.password;
    }
  },
  yourOrders: [{
    company: { type: String, validate: validator.isAlpha },
    modelNo: { type: String },
    display: { type: String },
    processor: { type: String },
    ram: { type: String },
    rom: { type: String },
    rear_camera: { type: String },
    front_camera: { type: String },
    battery: { type: String },
    charger: { type: String },
    software: { type: String },
    userInterface: { type: String },
    price: { type: Number },
  }],
  yourWishlist: [{
    company: { type: String, validate: validator.isAlpha },
    modelNo: { type: String },
    display: { type: String },
    processor: { type: String },
    ram: { type: String },
    rom: { type: String },
    rear_camera: { type: String },
    front_camera: { type: String },
    battery: { type: String },
    charger: { type: String },
    software: { type: String },
    userInterface: { type: String },
    price: { type: Number },
  }],
  reset_token: { type: String }
});

userschema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  this.confirm_pass = undefined;
  return next();
});

const usermodel = mongoose.model("usermodel", userschema);

module.exports = usermodel;
