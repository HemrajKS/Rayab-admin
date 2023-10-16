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
  banner: [bannerSchema],
  about: String,
  categories: [categorySchema],
  products: [productSchema],
});

const HomeData =
  mongoose.models.HomeData || mongoose.model("HomeData", homeSchema);
export default HomeData;
