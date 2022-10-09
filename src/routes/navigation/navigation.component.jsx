import './navigation.styles.scss'
import { Outlet, Link } from 'react-router-dom'
import { Fragment, useContext } from 'react'
import { ReactComponent as ShopLogo } from '../../assets/crown.svg'
import { useSelector } from 'react-redux'
import { selectIsCartOpen } from '../../store/cart/cart.selector'
import { signOutUser } from '../../utils/firebase/firebase.util'
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'
import { selectCurrentUser } from '../../store/user/user.selector'

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);


    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <ShopLogo className='logo' />
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>
                    {
                        currentUser ?
                            <span onClick={signOutUser} className='nav-link'>SIGN OUT</span> :
                            <Link className='nav-link' to='/auth'>
                                SIGN-IN
                            </Link>
                    }
                    <CartIcon />

                </div>
                {
                    isCartOpen ? <CartDropdown /> : null
                }

            </div>
            <Outlet />
        </Fragment>

    )
}

export default Navigation;