import './cart-dropdown.styles.scss';
import Button from '../button/button.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CartItem from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router-dom';


const CartDropdown = () => {

    const { cartItems } = useContext(CartContext)
    const navigate = useNavigate()

    console.log("DDDDDD", cartItems)

    const goToCheckoutHandler = () => {
        navigate('/checkout')
    }

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.length != 0 ?

                    cartItems.map((item) => (<CartItem key={item.id} cartItem={item} />))
                    : 
                    <span className='empty-message'>Cart is empty!</span>
                }
            </div>

            <Button onClick={goToCheckoutHandler}>Go To Checkout</Button>


        </div>
    )
}


export default CartDropdown;