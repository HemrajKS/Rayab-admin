const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  shippingInfo: {
    weight: String,
    dimensions: String,
    shippingCost: String,
  },
  name: String,
  description: String,
  category: String,
  price: String,
  stock: Number,
  imageUrl: String,
  productVideo: String,
  createdAt: Date,
  updatedAt: Date,
  brand: String,
  size: String,
  color: String,
  material: String,
  rating: String,
  reviews: [
    {
      user: String,
      rating: String,
      comment: String,
    },
  ],
  images: [String],
  currency: String,
  features: [String],
  model: String,
});

const categorySchema = new mongoose.Schema({
  name: String,
  link: String,
});

const bannerSchema = new mongoose.Schema({
  banner: String,
});

const homeSchema = new mongoose.Schema({
  banner: { type: [bannerSchema], required: true },
  about: { type: String, required: true },
  categories: {
    type: [categorySchema],
    validate: [
      {
        validator: function (categories) {
          return categories.length >= 1 && categories.length <= 5;
        },
        message: "You must have at least 1 category and at most 5 categories.",
      },
    ],
  },
  products: {
    type: [productSchema],
    validate: [
      {
        validator: function (products) {
          return products.length <= 5;
        },
        message: "You can have at most 5 products.",
      },
    ],
  },
});

const HomeData =
  mongoose.models.HomeData || mongoose.model("HomeData", homeSchema);
export default HomeData;
