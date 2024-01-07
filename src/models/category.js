import mongoose, { Schema, model } from 'mongoose';

// Define the category schema
const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    subCategories: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Category =
  mongoose.models.productCategories ||
  mongoose.model('productCategories', categorySchema);

export default Category;
