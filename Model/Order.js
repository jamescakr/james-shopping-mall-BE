const mongoose = require("mongoose");
const User = require("./User");
const Product = require("./Product");
const Schema = mongoose.Schema;

const orderSchema = Schema(
  {
    userId: { type: mongoose.ObjectId, ref: User, required: true }, 
    items: [
      {
        productId: { type: mongoose.ObjectId, ref: Product, required: true }, 
        size: { type: String, required: true }, 
        qty: { type: Number, default: 1, required: true }, 
        price: { type: Number, required: true }, 
      },
    ],
    orderStatus: { type: String, default: "pending" }, 
    paymentStatus: { type: String, default: "unpaid" }, 
    shippingAddress: { type: String, required: true }, 
    totalAmount: { type: Number, required: true }, 
    isCancelled: { type: Boolean, default: false }, 
  },
  { timestamps: true } 
);

orderSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.__v;
  delete obj.updateAt;
  delete obj.createAt;
  return obj;
};

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
