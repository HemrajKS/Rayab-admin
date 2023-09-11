import mongoose, { Schema, model } from "mongoose";

// Define the category schema
const categorySchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Category =
  mongoose.models.productCategories ||
  mongoose.model("productCategories", categorySchema);

export default Category;
