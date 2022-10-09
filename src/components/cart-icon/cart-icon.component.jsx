import './cart-icon.styles.scss'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import { useSelector, useDispatch } from 'react-redux'
import { selectIsCartOpen, selectCartCount } from '../../store/cart/cart.selector'
import { setIsCartOpen } from '../../store/cart/cart.action'

const CartIcon = () => {


    const itemCount = useSelector(selectCartCount)
    const isCartOpen = useSelector(selectIsCartOpen)
    const dispatch = useDispatch()



    const togleIsCartOpen = () => {
        return dispatch(setIsCartOpen(!isCartOpen))
    }

    return (
        <div className='cart-icon-container' onClick={togleIsCartOpen}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>{itemCount}</span>
        </div>
    )
}

export default CartIcon;