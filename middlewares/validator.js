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
    let { name, location, category, price_range } = req.body;
    name = !isEmpty(name) ? name : '';
    location = !isEmpty(location) ? location : '';
    category = !isEmpty(category) ? category : '';
    price_range = !isEmpty(price_range) ? price_range : '';

    if (validator.isEmpty(name)) errors = 'Name required';
    if (validator.isEmpty(location)) errors = 'location required';
    if (validator.isEmpty(category)) errors = 'Category required';
    if (validator.isEmpty(price_range)) errors = 'Price range required';

    if (!isEmpty(errors)) return res.status(400).json(errors);

    next();
}

exports.registerUserValidator = (req, res, next) => {
    let errors = {};
    let { first_name, last_name, email, password, confirmPassword } = req.body;
    first_name = !isEmpty(first_name) ? first_name : '';
    last_name = !isEmpty(last_name) ? last_name : '';
    email = !isEmpty(email) ? email : '';
    password = !isEmpty(password) ? password : '';
    confirmPassword = !isEmpty(confirmPassword) ? confirmPassword : '';

    if (validator.isEmpty(first_name)) errors = 'First name required';
    if (validator.isEmpty(last_name)) errors = 'Last name required';
    if (validator.isEmpty(email)) errors = 'Email required';
    if (!validator.isEmail(email)) errors = 'Must be a valid email';
    if (validator.isEmpty(password)) errors = 'Password required';
    if (!validator.isLength(password, { min: 8 })) errors = 'Password must be at least 8 characters';
    if (!validator.equals(password, confirmPassword)) errors = 'Passwords do not match';

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

    if (validator.isEmpty(restaurant_id)) errors = 'Restaurant id required';
    if (validator.isEmpty(user_id)) errors = 'User id required';
    if (validator.isEmpty(rating)) errors = 'Rating required';
    if (validator.isEmpty(details)) errors = 'Details required';
    if (validator.isEmpty(date)) errors = 'Date required';

    if (!isEmpty(errors)) return res.status(400).json(errors);

    next();
}