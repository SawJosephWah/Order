import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    customer: {
        name: String,
        phone: String,
        address: String
    },
    shippingFee: Number,
    orderStatus: String,
    orderItems: [
        {
            name: String,
            price: Number,
            image: String,
            size: String,
            quantity: Number
        }
    ]
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
