const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")

const couponRoutes = require("./routes/couponRoutes")

dotenv.config()

mongoose.connect(
    process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }
).then((d) => console.log("connected to MongoDB"))

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/coupons/", couponRoutes)
app.get("/", (req, res) => {
    res.json({ msg: "its working" })
})


app.listen(5000)