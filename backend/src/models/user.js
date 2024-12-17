const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId, 
      required: true,
      ref: 'Product',
    },
    productName: {
      type: String, 
      required: true,
    },
    quantity: {
      type: Number, 
      required: true,
      default: 1,
    },
    price: {
      type: Number, 
      required: true,
    },
    totalAmount: {
      type: Number, 
      required: true,
    },
  },
  { _id: false } 
);

const paymentSchema = new mongoose.Schema(
  {
    products: {
      type: [productSchema],  
      required: true,
    },
    purchasedAt: {
      type: Date, 
      default: Date.now,
    },
    totalAmount: {
      type: Number, 
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    payments: [paymentSchema], 
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
