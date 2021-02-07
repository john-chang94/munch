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
    let { name, address, city, state, zip, price } = req.body;
    name = !isEmpty(name) ? name : '';
    address = !isEmpty(address) ? address : '';
    city = !isEmpty(city) ? city : '';
    state = !isEmpty(state) ? state : '';
    zip = !isEmpty(zip) ? zip : '';
    price = !isEmpty(price) ? price : '';

    if (validator.isEmpty(name)) errors = 'Name required';
    if (validator.isEmpty(address)) errors = 'Address required';
    if (validator.isEmpty(city)) errors = 'City required';
    if (validator.isEmpty(state)) errors = 'State required';
    if (validator.isEmpty(zip)) errors = 'Zip required';
    if (validator.isEmpty(price)) errors = 'Price range required';

    if (!isEmpty(errors)) return res.status(400).json(errors);

    next();
}

exports.registerUserValidator = (req, res, next) => {
    let errors = {};
    let { firstName, lastName, email, password, confirmPassword } = req.body;
    firstName = !isEmpty(firstName) ? firstName : '';
    lastName = !isEmpty(lastName) ? lastName : '';
    email = !isEmpty(email) ? email : '';
    password = !isEmpty(password) ? password : '';
    confirmPassword = !isEmpty(confirmPassword) ? confirmPassword : '';

    if (validator.isEmpty(firstName)) errors = 'First name required';
    if (validator.isEmpty(lastName)) errors = 'Last name required';
    if (validator.isEmpty(email)) errors = 'Email required';
    if (!validator.isEmail(email)) errors = 'Must be a valid email';
    if (validator.isEmpty(password)) errors = 'Password required';
    if (!validator.isLength(password, { min: 8 })) errors = 'Password must be at least 8 characters';
    if (!validator.equals(password, confirmPassword)) errors = 'Passwords do not match';

    if (!isEmpty(errors)) return res.status(400).json(errors);

    next();
}

exports.updateUserValidator = (req, res, next) => {
    let errors = {};
    let { firstName, lastName, email } = req.body;
    firstName = !isEmpty(firstName) ? firstName : '';
    lastName = !isEmpty(lastName) ? lastName : '';
    email = !isEmpty(email) ? email : '';

    if (validator.isEmpty(firstName)) errors = 'First name required';
    if (validator.isEmpty(lastName)) errors = 'Last name required';
    if (validator.isEmpty(email)) errors = 'Email required';
    if (!validator.isEmail(email)) errors = 'Must be a valid email';

    if (!isEmpty(errors)) return res.status(400).json(errors);

    next();
}

exports.addReviewValidator = (req, res, next) => {
    let errors = {};
    let { restaurantId, userId, rating, details, date} = req.body;
    restaurantId = !isEmpty(restaurantId) ? restaurantId.toString() : '';
    userId = !isEmpty(userId) ? userId.toString() : '';
    rating = !isEmpty(rating) ? rating.toString() : '';
    details = !isEmpty(details) ? details : '';
    date = !isEmpty(date) ? date : '';

    if (validator.isEmpty(restaurantId)) errors = 'Restaurant id required';
    if (validator.isEmpty(userId)) errors = 'User id required';
    if (validator.isEmpty(rating)) errors = 'Rating required';
    if (validator.isEmpty(details)) errors = 'Details required';
    if (validator.isEmpty(date)) errors = 'Date required';

    if (!isEmpty(errors)) return res.status(400).json(errors);

    next();
}

exports.addReviewValidatorM = (req, res, next) => {
    let errors = {};
    let { restaurantId, userId, rating, details, date} = req.body;
    restaurantId = !isEmpty(restaurantId) ? restaurantId.toString() : '';
    userId = !isEmpty(userId) ? userId.toString() : '';
    rating = !isEmpty(rating) ? rating.toString() : '';
    details = !isEmpty(details) ? details : '';
    date = !isEmpty(date) ? date : '';

    if (validator.isEmpty(restaurantId)) errors = 'Restaurant id required';
    if (validator.isEmpty(userId)) errors = 'User id required';
    if (validator.isEmpty(rating)) errors = 'Rating required';
    if (validator.isEmpty(details)) errors = 'Details required';
    if (validator.isEmpty(date)) errors = 'Date required';

    if (!isEmpty(errors)) return res.status(400).json(errors);

    next();
}