const mongoose = require("mongoose");
const validator = require("validator");
const db =
  "mongodb+srv://admin:123abc@cluster0-fm3f2.mongodb.net/car-rental?retryWrites=true&w=majority";

mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const mobileschema = new mongoose.Schema({
  //type
  company: { type: String, required: true, validate: validator.isAlpha },
  modelNo: { type: String, required: true },
  display:{type: String, required: true},
  processor: { type: String, required: true },
  ram:{type: String, required: true},
  rom:{type: String, required: true},
  rear_camera: { type: String, required: true },
  front_camera: { type: String, required: true },
  battery: { type: String, required: true },
  charger: { type: String, required: true },
  software: {type: String, required: true},
  userInterface: {type: String, required: true},
  price: { type: Number, required: true },
});

const mobilemodel = mongoose.model("mobilemodel", mobileschema);

module.exports = mobilemodel;
