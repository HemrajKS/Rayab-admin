import mongoose, { Schema, model } from 'mongoose';

const coordinatesSchema = new Schema({
  latitude: Number,
  longitude: Number,
});

const addressSchema = new Schema({
  street: String,
  city: String,
  state: String,
  postalCode: String,
  country: String,
  coordinates: coordinatesSchema,
});

const productItemSchema = new Schema({
  product: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const orderSchema = new Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    products: { type: [productItemSchema], required: true },
    currency: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: String,
      required: true,
    },
    currency: String,
    status: {
      type: String,
      enum: ['pending', 'completed', 'rejected'],
      default: 'pending',
      required: true,
    },
    orderDate: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone1: {
      type: String,
      required: true,
    },
    phone2: String,
    customerQuery: String,
    address: addressSchema,
    createdAt: Date,
    updatedAt: Date,
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.orders || mongoose.model('orders', orderSchema);

export default Order;
