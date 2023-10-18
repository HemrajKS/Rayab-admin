import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    productVideo: {
      type: String,
    },
    manufacturer: {
      type: String,
    },
    model: {
      type: String,
    },
    weight: String,
    dimensions: String,
    color: String,
    rating: String,
    reviews: [
      {
        user: { type: String, unique: true, required: true },
        rating: String,
        comment: String,
        userId: { type: String, unique: true, required: true },
      },
    ],
    features: [String],
    warranty: String,
    shippingInfo: {
      weight: String,
      dimensions: String,
      shippingCost: String,
    },
    images: [String],
    addedBy: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Products || mongoose.model("Products", productSchema);

export default Product;
