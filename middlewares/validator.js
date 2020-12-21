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

exports.registerUserValidator = (req, res, next) => {
    let errors = {};
    let { name, email, password, confirmPassword } = req.body;
    name = !isEmpty(name) ? name : '';
    email = !isEmpty(email) ? email : '';
    password = !isEmpty(password) ? password : '';
    confirmPassword = !isEmpty(confirmPassword) ? confirmPassword : '';

    if (validator.isEmpty(name)) errors.error = 'Name is required';
    if (validator.isEmpty(email)) errors.error = 'Email is required';
    if (!validator.isEmail(email)) errors.error = 'Must be a valid email';
    if (validator.isEmpty(password)) errors.error = 'Password is required';
    if (!validator.isLength(password, { min: 8 })) errors.error = 'Password must be at least 8 characters';
    if (!validator.equals(password, confirmPassword)) errors.error = 'Passwords do not match';

    if (!isEmpty(errors)) return res.status(400).json(errors);

    next();
}