const validator = require('validator');

const isEmpty = value => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
    )
}

exports.addRestaurantValidator = (req, res, next) => {
    let errors = {};
    let { name, city, category, price_range } = req.body;
    name = !isEmpty(name) ? name : '';
    city = !isEmpty(city) ? city : '';
    category = !isEmpty(category) ? category : '';
    price_range = !isEmpty(price_range) ? price_range : '';

    if (validator.isEmpty(name)) errors.error = 'Name is required';
    if (validator.isEmpty(city)) errors.error = 'City is required';
    if (validator.isEmpty(category)) errors.error = 'Category is required';
    if (validator.isEmpty(price_range)) errors.error = 'Price range is required';

    if (!isEmpty(errors)) return res.status(400).json(errors);

    next();
}