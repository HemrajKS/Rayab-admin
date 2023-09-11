import mongoose, { Schema, model } from 'mongoose';

// Define the coordinates schema
const coordinatesSchema = new Schema({
  latitude: Number,
  longitude: Number,
});

// Define the address schema
const addressSchema = new Schema({
  street: String,
  city: String,
  state: String,
  postalCode: String,
  country: String,
  coordinates: coordinatesSchema,
});

// Define the product item schema
const productItemSchema = new Schema({
  product: String,
  quantity: Number,
});

// Define the customer schema
const customerSchema = new Schema({
  _id: String,
  username: String,
  email: String,
  firstName: String,
  lastName: String,
});

// Define the order schema
const orderSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  user: String,
  products: [productItemSchema],
  totalPrice: Number,
  status: String,
  orderDate: Date,
  customerQuery: String,
  address: addressSchema,
  customer: customerSchema,
  createdAt: Date,
  updatedAt: Date,
});


const Order = mongoose.models.orders || mongoose.model("orders", orderSchema);

export default Order;
