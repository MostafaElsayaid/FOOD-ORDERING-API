const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const imageRoute = require("./routes/image.js")
const userRoute = require("./routes/user.js")
const foodRoute = require("./routes/food.js")
const orderRoute = require("./routes/order")

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json())
app.use(express.json());

dotenv.config();


const cors = require('cors');

const port = process.env.PORT || 8000
app.use(cors());
app.get("/", (req, res) => {

    res.send("Hello world");

});

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB)
        console.log("connected")
    } catch (error) {
        throw error;
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("disconnected");
});
mongoose.connection.on("connected", () => {
    console.log("connected");
});
app.use('/all', imageRoute);
app.use('/user', userRoute);
app.use('/food', foodRoute);
app.use('/order', orderRoute);


app.use(express.json({ limit: '20mb' }))
app.use(express.urlencoded({ extended: false, limit: '20mb' }))


app.listen(port, () => {
    connect();
    console.log(`listening on port ${port}`);
});



