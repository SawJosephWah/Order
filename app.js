import express from 'express';
import mongoose from 'mongoose';
import orderRoutes from './routes/order.js';
import errorHandler from './Utils/errorHandler.js';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/order', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

app.use('/api/orders', orderRoutes);

app.use(errorHandler);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
