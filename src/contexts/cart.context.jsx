import { createContext, useEffect, useState } from "react";

export const addCartItem = (cartItems, productToAdd) => {

  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if(existingCartItem) {
    return cartItems.map((cartItem)=> 
    cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem)
  }
  return [...cartItems, {...productToAdd, quantity:1}]

};

export const removeCartItem = ( cartItems, cartItemTORemove) => {

  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemTORemove.id
  );
  if(existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem)=> cartItem.id !== cartItemTORemove.id)
  }
  if(existingCartItem) {
    return cartItems.map((cartItem)=> 
    cartItem.id === cartItemTORemove.id ? {...cartItem, quantity: cartItem.quantity - 1}: cartItem)
  }

}
export const clearCartItem = ( cartItems, cartItemTOClear) => cartItems.filter((cartItem)=> cartItem.id !== cartItemTOClear.id)

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: ()=>{},
  cartItems: [],
  addItemToCart: ()=>{},
  removeItemFromCart: ()=>{},
  clearItemFromCart: ()=>{},
  cartCount: 0,
  cartTotal: 0
});

export const CartProvider = ({children})=> {
  const [isCartOpen, setIsCartOpen] = useState(false);
   const [cartItems, setCartItems] = useState([]);
   const [cartCount, setCartCount] = useState(0);
   const [ cartTotal, setCartTotal] = useState(0)

   useEffect(()=>{
    const newCartCount = cartItems.reduce((total, cartItem)=> total+cartItem.quantity, 0)
    setCartCount(newCartCount)
   },[cartItems])

   useEffect(()=>{
    const newCartTotal = cartItems.reduce((total, cartItem)=> total+cartItem.quantity * cartItem.price, 0)
    setCartTotal(newCartTotal)
   },[cartItems])
   
   const addItemToCart = (productTOAdd) => {
    setCartItems(addCartItem(cartItems, productTOAdd))
   }
   const removeItemFromCart = (cartItemTORemove) => {
    setCartItems(removeCartItem(cartItems, cartItemTORemove))
   }
   const clearItemFromCart = (cartItemTOClear) => {
    setCartItems(clearCartItem(cartItems, cartItemTOClear))
   }
  const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemFromCart, clearItemFromCart, cartTotal};

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}