import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import "./checkout-item.styles.scss";

const CheckoutItem =({cartItem}) => {
  const { name, imageUrl, price, quantity} = cartItem;
  const { clearItemFromCart } = useContext(CartContext);
  const { addItemToCart } = useContext(CartContext);
  const { removeItemFromCart } = useContext(CartContext);

  const clearItemHandler = () => clearItemFromCart(cartItem)
  const addItemHandler = () => addItemToCart(cartItem)
  const removeItemHandler = () => removeItemFromCart(cartItem)
  const indprice = price * quantity

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeItemHandler}>
          &#10094;
        </div>
        {quantity}
        <div className="arrow" onClick={addItemHandler}>
          &#10095;
        </div>
        </span>
      <span className="price">{indprice}</span>
      <span className="remove-button" onClick={ clearItemHandler}>&#10005;</span>
    </div>
  )
}

export default CheckoutItem;