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
    price: {
      type: Number,
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
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    updatedAt: {
      type: Date,
      required: true,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    weight: String,
    dimensions: String,
    color: String,
    rating: Number,
    reviews: [
      {
        user: String,
        rating: Number,
        comment: String,
      },
    ],
    features: [String],
    warranty: String,
    shippingInfo: {
      weight: String,
      dimensions: String,
      shippingCost: Number,
    },
    images: [String],
    addedBy:{
      type: String,
      required: true
    }
  },

  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Products || mongoose.model("Products", productSchema);

export default Product;
