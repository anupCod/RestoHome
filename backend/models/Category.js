const mongoose = require("mongoose");

const { Schema } = mongoose;

const CategorySchema = new Schema({
  CategoryName: {
    type: String,
    required: true,
    unique: true,
  },
});

CategorySchema.index({ CategoryName: 1 }, { unique: true });

module.exports = mongoose.model("category", CategorySchema);