import { renderStars } from './starsHelper';

const RestaurantCard = ({ name, category, rating, totalRatings, priceRange }) => {
    return (
        <div className="card horizontal bg-hover">
            <div className="card-content">
                <p>{name}</p>
                <p className="text-i">{category}</p>
                <p>{renderStars(rating)} ({totalRatings})</p>
                <p>{'$'.repeat(parseInt(priceRange))}</p>
            </div>
        </div>
    )
}

export default RestaurantCard;