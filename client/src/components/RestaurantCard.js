import { renderStars } from './starsHelper';

const RestaurantCard = ({ name, category, rating, total_ratings, price_range }) => {
    return (
        <div className="card horizontal">
            <div className="card-content">
                <p>{name}</p>
                <p>{category}</p>
                <p>{renderStars(rating)} ({total_ratings})</p>
                <p>{'$'.repeat(parseInt(price_range))}</p>
            </div>
        </div>
    )
}

export default RestaurantCard;