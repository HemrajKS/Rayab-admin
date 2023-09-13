const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  phoneCode: {
    type: String,
    required: true,
  },
  flagSvg: {
    type: String, 
    required: true,
  },
  currencyName: {
    type: String,
    required: true,
  },
  currencyCode: {
    type: String,
    required: true,
  },
  currencySymbol: {
    type: String,
    required: true,
  },
});

const Country =
  mongoose.models.Country || mongoose.model("Country", countrySchema);
export default Country;
