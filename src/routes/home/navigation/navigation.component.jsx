import { Fragment, useContext } from "react"
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as CrownLogo } from '../../../assets/crown.svg'
import './navigation.styles.scss';
import CartIcon from '../../../components/cart-icon/cart-icon.component'
import CartDropDown from "../../../components/cart-dropdown/cart-dropdown.component";
import { UserContext } from "../../../contexts/user-conetxt";
import { CartContext } from "../../../contexts/cart.context";
import { signOutUser } from "../../../utils/firebase/firebase.utils";


const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  //console.log(currentUser);
  const {isCartOpen} = useContext(CartContext);

  
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to='/'>
        <CrownLogo className="logo"/>
        </Link>
        <div className="nav-links-container">
          <div className="nav-links">
            <Link className="nav-link" to='/shop'>
            Shop
            </Link>
            { currentUser ? (<span className="nav-link" onClick={signOutUser}>Sign Out</span>) : (
            <Link className="nav-link" to='/auth'>
            Signin</Link>)
            }
          </div>
          <CartIcon />
        </div>
        {isCartOpen && <CartDropDown />}
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;