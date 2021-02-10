import { renderStars } from './starsHelper';

const RestaurantCard = ({ name, categories, rating, total_ratings, price }) => {
    return (
        <div className="card horizontal bg-hover">
            <div className="card-content">
                <p>{name}</p>
                <p className="text-i">{categories.map((category, i) => <span key={i}>{category}, </span>)}</p>
                <p>{renderStars(rating)} ({total_ratings})</p>
                <p>{'$'.repeat(parseInt(price))}</p>
            </div>
        </div>
    )
}

export default RestaurantCard;