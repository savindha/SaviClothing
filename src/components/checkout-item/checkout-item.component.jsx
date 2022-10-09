import './checkout-item.styles.scss';
import { addItemsToCart, removeItemToCart, clearItemFromCart } from '../../store/cart/cart.action';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';


const CheckoutItem = ({ cartItem }) => {

    const dispatch = useDispatch()
    const cartItems = useSelector(selectCartItems)


    const clearCartItemHandler = () => {
        dispatch(clearItemFromCart(cartItems, cartItem))
    }

    const addItemHandler = () => {
        dispatch(addItemsToCart(cartItems, cartItem))
    }

    const removeItemHandler = () => {
        dispatch(removeItemToCart(cartItems, cartItem))
    }

    const { name, quantity, imageUrl, price } = cartItem
    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>

            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={removeItemHandler}>
                    &#10094;
                </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addItemHandler}>
                    &#10095;
                </div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={clearCartItemHandler}>&#10005;</div>
        </div>

    )
}

export default CheckoutItem;