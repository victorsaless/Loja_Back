// Esquema da publicação (PubSchema)
const mongoose = require("../database").default;

const PubSchema = new mongoose.Schema({
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
  imageUrl: {
    type: String,
    required: false,
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
