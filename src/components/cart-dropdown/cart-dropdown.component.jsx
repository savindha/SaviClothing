import './cart-dropdown.styles.scss';
import Button from '../button/button.component';
import { useRef, useEffect } from 'react';
import CartItem from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';



const CartDropdown = () => {


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cartItems = useSelector(selectCartItems)

    const node = useRef()

    const goToCheckoutHandler = () => {
        navigate('/checkout');
        dispatch(setIsCartOpen(false));
    }


    const handleOuterComponentClick = e => {
        if (node.current.contains(e.target)) {
            return;
        }
        dispatch(setIsCartOpen(false));
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOuterComponentClick);

        return () => {
            document.removeEventListener("mousedown", handleOuterComponentClick);
        };
    }, []);

    return (
        <div ref={node} className='cart-dropdown-container'>
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