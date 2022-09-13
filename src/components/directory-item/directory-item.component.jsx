import './directory-item.styles.scss';
import { Link } from 'react-router-dom';

const DirectoryItem = ({ category }) => {
    const { title, imageUrl } = category
    return (
        <Link to={`shop/${title}`} className="directory-item-container">
            <div className="background-image" style={{ backgroundImage: `url(${imageUrl})` }}></div>
            <div className="body">
                <h2>{title.toUpperCase()}</h2>
                <p>SHOP NOW</p>
            </div>
        </Link>
    )

}

export default DirectoryItem;