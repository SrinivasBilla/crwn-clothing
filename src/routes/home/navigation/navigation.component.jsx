import { Fragment, useContext } from "react"
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as CrownLogo } from '../../../assets/crown.svg'
import './navigation.styles.jsx';
import CartIcon from '../../../components/cart-icon/cart-icon.component'
import CartDropDown from "../../../components/cart-dropdown/cart-dropdown.component";
import { UserContext } from "../../../contexts/user-conetxt";
import { CartContext } from "../../../contexts/cart.context";
import { signOutUser } from "../../../utils/firebase/firebase.utils";
import { LogoContainer, NavigationContainer, NavLinks, NavLink } from "./navigation.styles.jsx";


const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  //console.log(currentUser);
  const {isCartOpen} = useContext(CartContext);

  
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
        <CrownLogo className="logo"/>
        </LogoContainer>
        <NavLinks>
            <NavLink to='/shop'>
            Shop
            </NavLink>
            { currentUser ? (<NavLink as="span" onClick={signOutUser}>Sign Out</NavLink>) : (
            <NavLink to='/auth'>
            Signin</NavLink>)
            }
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropDown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;