import { renderStars } from './starsHelper';

const RestaurantCard = ({ name, categories, rating, total_ratings, price }) => {
    return (
        <div className="card horizontal bg-hover">
            <div className="card-content">
                <p>{name}</p>
                <p className="text-i">{categories.map((category, i) =>
                    <span key={i}>
                        {
                            // No comma after the last category
                            i === categories.length - 1 ? category : `${category}, `
                        }
                    </span>
                )}</p>
                <p>{renderStars(rating)} ({total_ratings} reviews)</p>
                <p>{'$'.repeat(parseInt(price))}</p>
            </div>
        </div>
    )
}

export default RestaurantCard;