import mongoose, { Schema, model } from "mongoose";

// Define the product item schema within the promotion
const productItemSchema = new Schema({
  productId: {
    type: String,
    required: true,
  },
  discountedPrice: {
    type: Number,
    required: true,
  },
});

// Define the promotion schema
const promotionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    discountType: {
      type: String,
      required: true,
    },
    discountValue: {
      type: Number,
      required: true,
    },
    products: [productItemSchema],
  },
  {
    timestamps: true,
  }
);

const Promotion =
  mongoose.models.promotions || mongoose.model("promotions", promotionSchema);

export default Promotion;
