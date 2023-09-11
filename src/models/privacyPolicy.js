import mongoose, { Schema, model } from 'mongoose';

// Define the contact info schema within privacy policy
const contactInfoSchema = new Schema({
  email: String,
  phone: String,
});

// Define the privacy policy schema
const privacyPolicySchema = new Schema({
  title: String,
  lastUpdated: Date,
  content: String,
  effectiveDate: Date,
  contactInfo: contactInfoSchema,
  informationCollected: String,
  howInformationIsUsed: String,
  dataSecurity: String,
  thirdPartyServices: String,
  userRights: String,
  cookies: String,
  policyChanges: String,
});

// Define the Privacy Policy model
const PrivacyPolicy =
  mongoose.models.misc ||
  mongoose.model("misc", privacyPolicySchema);

export default PrivacyPolicy;
