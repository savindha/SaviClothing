import './navigation.styles.scss'
import { Outlet, Link } from 'react-router-dom'
import { Fragment, useContext } from 'react'
import { ReactComponent as ShopLogo } from '../../assets/crown.svg'
import { UserContext } from '../../contexts/user.context'
import { signOutUser } from '../../utils/firebase/firebase.util'

const Navigation = () => {
    const { currentUser } = useContext(UserContext)

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

                </div>
            </div>
            <Outlet />
        </Fragment>

    )
}

export default Navigation;