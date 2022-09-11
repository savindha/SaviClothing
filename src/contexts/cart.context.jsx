import { createContext, useState, useEffect } from "react";



const addCartItem = (cartItems, newItem) => {

    const existingCartItem = cartItems.find((cartItem) => cartItem.id === newItem.id)

    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === newItem.id ?
            { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
    }
    return [...cartItems, { ...newItem, quantity: 1 }]

}

const removeCartItem = (cartItems, cartItemToRemove) => {

    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id)

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }

    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ?
        { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
    )

}

const clearCartItem = (cartItems, cartItemToRemove) => {

    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)

}


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => null,
    cartItems: [],
    addItemsToCart: () => null,
    removeItemToCart: () => null,
    clearItemFromCart: () => null,
    itemCount: 0,
    cartTotal:0,
    setItemCount: () => null
})

export const CartProvider = ({ children }) => {

    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [itemCount, setItemCount] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)

    useEffect(() => {
        setItemCount(calculateItemCount)
    }, [cartItems])

    useEffect(() => {
        setCartTotal(calculateCartTotal)
    }, [cartItems])

    const calculateItemCount = () => (
        cartItems.reduce((acc, item) => acc + item.quantity, 0)
    )

    const calculateCartTotal = () => (
        cartItems.reduce((acc, item) => acc + item.quantity*item.price, 0)
    )

    const addItemsToCart = (newItem) => {
        setCartItems(addCartItem(cartItems, newItem))
    }

    const removeItemToCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove))
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear))
    }


    const value = { isCartOpen, setIsCartOpen, cartItems, addItemsToCart, itemCount, removeItemToCart, clearItemFromCart, cartTotal }


    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}