const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema({
    couponCode: {
        type: String,
        required: true,
    },
    discount: {
        type: String,
        required: true,
    },
    desc: {
        type: String
    },
    expireAt: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model("Coupon", CouponSchema);