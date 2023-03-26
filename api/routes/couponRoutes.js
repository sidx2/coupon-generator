const couponRrouter = require("express").Router();
const Coupon = require("../models/Coupon")

// Get information of a coupon using couponCode
couponRrouter.get("/:couponCode", async(req, res) => {
    const couponCode = req.params.couponCode
    console.log("couponCode: ", couponCode)
    const coupon = await Coupon.findOne({ couponCode })

    // check if the coupon does not exists
    if (!coupon) {
        res.status(222).json({ Error: "Invalid Coupon" })
        return
    }

    // check if coupon is expired
    const documentExpireTime = coupon.expireAt.getTime(); // assuming 'document' is the document object
    const currentTime = Date.now();

    if (documentExpireTime > currentTime) {
        // The document has not expired yet
        res.status(200).json({ coupon: coupon })
    } else {
        // The document has expired
        res.status(269).json({ Error: "The coupon has expired" })
    }

})

// create a new coupon
couponRrouter.post("/", async(req, res) => {
    const { couponCode, desc, inPercentage, expireTimeInHours } = req.body
    let { discount } = req.body
    if (inPercentage) discount += '%'
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getTime() + expireTimeInHours * 60 * 60 * 1000);

    // check if coupon already exists and it is not yet epxpired
    const existingCoupons = await Coupon.find({ couponCode })

    if (existingCoupons.length > 0) {
        for (let i = 0; i < existingCoupons.length; i++) {
            if (existingCoupons[i]) {
                const documentExpireTime = existingCoupons[i].expireAt.getTime(); // assuming 'document' is the document object
                const currentTime = Date.now();

                if (documentExpireTime > currentTime) {
                    // The document has not expired yet
                    return res.status(245).json({ Error: "A coupon with same coupon code already exists, and has not expired yet" })
                    break
                }
            }
        }
    }

    // create new coupon and send it as response
    const newCoupon = new Coupon({
        couponCode,
        discount,
        desc,
        expireAt: futureDate,
    })
    await newCoupon.save()
    res.status(200).json({ newCoupon })
})

module.exports = couponRrouter