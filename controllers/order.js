import Order from '../models/order.js';

const createOrder = async (req, res, next) => {
    try {
        const { customer, shipping_fee, order_items } = req.body;

        const newOrder = new Order({
            customer,
            shippingFee: shipping_fee,
            orderStatus: 'Pending',
            orderItems: order_items
        });

        const savedOrder = await newOrder.save();

        res.status(200).json({ status: true, data: savedOrder, message: "Save successfully" });
    } catch (error) {
        console.error('Error creating order:', error);
        const errorHandler = new Error('Internal server error');
        errorHandler.statusCode = 400; 
        next(error);
    }
};

export default {
    createOrder
};
