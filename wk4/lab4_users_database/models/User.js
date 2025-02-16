const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, minlength: 4 },
  email: { type: String, required: true, unique: true, match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ },
  address: {
    street: String,
    suite: String,
    city: { type: String, required: true, match: /^[A-Za-z\s]+$/ },
    zipcode: { type: String, required: true, match: /^\d{5}-\d{4}$/ },
    geo: {
      lat: String,
      lng: String
    }
  },
  phone: { type: String, required: true, match: /^1-\d{3}-\d{3}-\d{4}$/ },
  website: { type: String, required: true, match: /^(http|https):\/\/[^ "]+$/ },
  company: {
    name: String,
    catchPhrase: String,
    bs: String
  }
}, { timestamps: true });  // Automatically add createdAt & updatedAt

module.exports = mongoose.model('User', UserSchema);
