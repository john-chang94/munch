const RestaurantCard = ({ name, category, rating, total_ratings, price_range }) => {
    // Fill in stars by rating
    let stars = [];
    for (let i = 1; i <=5; i++) {
        if (i <= rating) {
            // Add a whole star
            stars.push(<i className="fas fa-star"></i>)
            // Add a half star if rating is a decimal and is equal to current loop index
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            stars.push(<i className="fas fa-star-half-alt"></i>)
        } else {
            // Add an empty star
            stars.push(<i className="far fa-star"></i>)
        }
    }

    return (
        <div className="card horizontal">
            <div className="card-content">
                <p>{name}</p>
                <p>{category}</p>
                <p>{stars} ({total_ratings})</p>
                <p>{'$'.repeat(parseInt(price_range))}</p>
            </div>
        </div>
    )
}

export default RestaurantCard;