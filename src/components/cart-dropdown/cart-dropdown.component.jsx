import './cart-dropdown.styles.scss';
import Button from '../button/button.component';
import { useContext, useRef, useEffect } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CartItem from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router-dom';



const CartDropdown = () => {

    const { cartItems, setIsCartOpen } = useContext(CartContext)
    const navigate = useNavigate()

    const node = useRef()

    const goToCheckoutHandler = () => {
        navigate('/checkout');
        setIsCartOpen(false);
    }

    
    const handleOuterComponentClick = e => {
        if (node.current.contains(e.target)) {
            return;
        }
        setIsCartOpen(false);
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