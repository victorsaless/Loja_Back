// Esquema do usuário (UserSchema)
const mongoose = require("../database");
const bcryptjs = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  favoritos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Publi",
  }],
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userPosts: {
    type: Number,
    default: 0,
    required: false,
  },
});

UserSchema.pre("save", async function (next) {
  try {
    if (this.isModified('password') || this.isNew) {
      const hash = await bcryptjs.hash(String(this.password), 10);
      this.password = hash;
    }
    if (!this._id) {
      this._id = new mongoose.Types.ObjectId();
    }
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
