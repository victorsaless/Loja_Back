const mongoose = require("../database").default;

const PubSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productLink: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
  },

  productPrice: {
    type: Number,
    required: true,
  },

  imageUrl: {
    type: String,
    required: true,
  },
  favorited: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Publi = mongoose.model("Publi", PubSchema);

module.exports = Publi;