const mongoose = require("mongoose");

const { Schema } = mongoose;

const ItemSchema = new Schema({
  // category: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Category",
  //   required: true,
  // },
  CategoryName: {
    type: String, // Assuming CategoryName is a string
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  options: [
    {
      type: mongoose.Schema.Types.Mixed, // Mixed type to accommodate different pricing options
    },
  ],
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("item", ItemSchema);