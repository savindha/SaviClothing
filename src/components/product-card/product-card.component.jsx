import Button from '../button/button.component';
import './product-card.styles.scss'
import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';

const ProductCard = ({ product }) => {

    const { name, price, imageUrl } = product

    const { addItemsToCart } = useContext(CartContext)

    const handleAddItemsToCart = () => {
        addItemsToCart(product)
    }

    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`} />
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button onClick={handleAddItemsToCart} buttonType='inverted'>Add to cart</Button>

        </div>
    )


}

export default ProductCard;