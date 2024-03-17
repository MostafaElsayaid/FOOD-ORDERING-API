const { baseUrl } = require("../bseUrl");
const Order = require("../model/Order");
const stripe = require('stripe')(
    "sk_test_51OtVSrRoo6CGjFVxAKZB6yjHHxC09mI08yg3Q0ypeecGPteInljefbDQNIuOLPOlwLp2rWrXyvGUqmzIZNyYJt3b0046PQAk74"
)



const createOrder = async (req, res) => {

    try {
        const { user, items, totalAmount } = req.body;
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "EGP",
                        product_data: {
                            name: "paid for food"
                        },
                        unit_amount: totalAmount * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${baseUrl}success`,
            cancel_url: `${baseUrl}cancel`,
        });

        if (session.id) {
            const newOrder = new Order({
                user, items, totalAmount,
            });

            const saveOrder = await newOrder.save();
            await Order.findByIdAndUpdate(saveOrder._id,{
                payment:true,
            });

            res.status(200).json({
                success:true,
                message:"Order created",
                data: saveOrder,
                sessionId: session.id,
            });
        }  else {
            res.status(200).json({
                success: false,
                message: "not succes"
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
};
const getAllOrders = async (req, res) => {

    try {
        const orders = await Order.find()

            res.status(200).json({
                success:true,
               
                data: orders,
               
            });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
};
const markOrderAsDelivered = async (req, res) => {

    try {
  const {orderId} = req.body;
  console.log(orderId)
  const order = await Order.findById(orderId);
  order.status = "Deliverd";
  await order.save();
            res.status(200).json({
                success:true,
                data: order,
                message: "Deliverd"
               
            });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
};

const getSingleOrder = async (req, res) => {

    try {
        const {userId} = req.body;
        const userOrders = await Order.find({user:userId})
      
       

            res.status(200).json({
                success:true,
               
                data: userOrders,
               
            });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
};

module.exports = { createOrder , getAllOrders , getSingleOrder , markOrderAsDelivered}