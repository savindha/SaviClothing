import './cart-icon.styles.scss'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'

const CartIcon = () => {

    const {isCartOpen, setIsCartOpen} = useContext(CartContext)

    const togleIsCartOpen = () => {
        setIsCartOpen(!isCartOpen)
    }

    return (
        <div className='cart-icon-container' onClick={togleIsCartOpen}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>20</span>
        </div>
    )
}

export default CartIcon;