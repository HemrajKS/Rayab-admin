import mongoose, { Schema, model } from 'mongoose';

// Define the contact info schema within terms and conditions
const contactInfoSchema = new Schema({
  email: String,
  phone: String,
});

// Define the terms and conditions schema
const termsNConditionsSchema = new Schema({
  title: String,
  lastUpdated: Date,
  content: String,
  effectiveDate: Date,
  contactInfo: contactInfoSchema,
  disputeResolution: String,
  governingLaw: String,
  termination: String,
  limitationOfLiability: String,
  userResponsibilities: String,
  paymentTerms: String,
  intellectualProperty: String,
  changes: String,
});

// Define the Terms and Conditions model
const TermsNConditions =
  mongoose.models.termsNConditions ||
  mongoose.model("termsNConditions", termsNConditionsSchema);

export default TermsNConditions;
