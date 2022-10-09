import Button from '../button/button.component';
import './product-card.styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addItemsToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';


const ProductCard = ({ product }) => {

    const { name, price, imageUrl } = product
    const dispatch = useDispatch()
    const cartItems = useSelector(selectCartItems)


    const handleAddItemsToCart = () => {
        dispatch(addItemsToCart(cartItems,product))
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