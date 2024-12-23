import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../contexts/cart.context'
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component';
import { CartDropdownContainer, CartItems, EmptyMassage } from './cart-dropdown.styles.jsx'
const CartDropDown = (product) => {
  const {cartItems} = useContext(CartContext);
  const navigate = useNavigate()

  const goToCheckoutHander = () => {
    navigate('/checkout')
  }
  return (
    <CartDropdownContainer>
      <CartItems>
        {
          cartItems.length ? (cartItems.map((item) => (
            <CartItem key={item.id} cartItem={item} />
          ))) : (
            <EmptyMassage>your cart is empty</EmptyMassage>
          )
        }
      </CartItems>
      <Button onClick={goToCheckoutHander}>GO TO CART</Button>
    </CartDropdownContainer>
  )
}

export default CartDropDown; 