const RestaurantCard = ({ name, category, rating, price_range }) => {
    // Fill in stars by rating
    let stars = [];
    for (let i = 1; i <=5; i++) {
        if (i <= rating) {
            stars.push(<i className="fas fa-star"></i>)
            // Add half star if i is a decimal and is equal to current loop index
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            stars.push(<i className="fas fa-star-half-alt"></i>)
        } else {
            stars.push(<i className="far fa-star"></i>)
        }
    }

    return (
        <div className="card horizontal">
            <div className="card-content">
                <p>{name}</p>
                <p>{category}</p>
                <>{stars}</>
                <p>{'$'.repeat(parseInt(price_range))}</p>
            </div>
        </div>
    )
}

export default RestaurantCard;