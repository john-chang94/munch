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

    if (validator.isEmpty(name)) errors.error = 'Name required';
    if (validator.isEmpty(city)) errors.error = 'City required';
    if (validator.isEmpty(category)) errors.error = 'Category required';
    if (validator.isEmpty(price_range)) errors.error = 'Price range required';

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

    if (validator.isEmpty(name)) errors.error = 'Name required';
    if (validator.isEmpty(email)) errors.error = 'Email required';
    if (!validator.isEmail(email)) errors.error = 'Must be a valid email';
    if (validator.isEmpty(password)) errors.error = 'Password required';
    if (!validator.isLength(password, { min: 8 })) errors.error = 'Password must be at least 8 characters';
    if (!validator.equals(password, confirmPassword)) errors.error = 'Passwords do not match';

    if (!isEmpty(errors)) return res.status(400).json(errors);

    next();
}

exports.addReviewValidator = (req, res, next) => {
    let errors = {};
    let { restaurant_id, user_id, rating, details, date} = req.body;
    restaurant_id = !isEmpty(restaurant_id) ? restaurant_id.toString() : '';
    user_id = !isEmpty(user_id) ? user_id.toString() : '';
    rating = !isEmpty(rating) ? rating.toString() : '';
    details = !isEmpty(details) ? details : '';
    date = !isEmpty(date) ? date : '';

    if (validator.isEmpty(restaurant_id)) errors.error = 'Restaurant id required';
    if (validator.isEmpty(user_id)) errors.error = 'User id required';
    if (validator.isEmpty(rating)) errors.error = 'Rating required';
    if (validator.isEmpty(details)) errors.error = 'Details are required';
    if (validator.isEmpty(date)) errors.error = 'Date required';

    if (!isEmpty(errors)) return res.status(400).json(errors);

    next();
}