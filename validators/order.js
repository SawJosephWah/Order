import Joi from 'joi';

const validateOrder = (req, res, next) => {
    const orderItemSchema = Joi.object({
        name: Joi.string().max(50).required().messages({
            'string.empty': 'Order item name cannot be empty',
        }),
        price: Joi.number().max(9999999999).required().messages({
            'number.base': 'Order item price must be a number',
        }),
        image: Joi.string().max(255).required().messages({
            'string.empty': 'Order item image cannot be empty',
        }),
        size: Joi.string().max(10).required().messages({
            'string.empty': 'Order item size cannot be empty',
        }),
        quantity: Joi.number().max(255).required().messages({
            'number.base': 'Order item quantity must be a number',
        }),
    });

    const orderSchema = Joi.object({
        customer: Joi.object({
            name: Joi.string().max(50).required().messages({
                'string.empty': 'Name cannot be empty',
            }),
            phone: Joi.string().max(13).required().messages({
                'string.empty': 'Customer phone cannot be empty',
            }),
            address: Joi.string().max(255).required().messages({
                'string.empty': 'Customer address cannot be empty',
            }),
        }).required(),
        shipping_fee: Joi.number().max(9999999999).required().messages({
            'number.base': 'Shipping fee must be a number',
        }),
        order_items: Joi.array().items(orderItemSchema).min(1).required().messages({
            'array.min': 'At least one order item is required',
        }),
    });

    const { error } = orderSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errors = error.details.map(detail => detail.message.replace(/"/g, ''));
        return res.status(400).json({ errors });
    }

    next();
};

export default { validateOrder };
