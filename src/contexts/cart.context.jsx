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


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => null,
    cartItems: [],
    addItemsToCart: () => null,
    itemCount: 0,
    setItemCount: () => null
})

export const CartProvider = ({ children }) => {

    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [itemCount, setItemCount] = useState(0)

    useEffect(() => {
        setItemCount(calculateItemCount)
    }, [cartItems])

    const calculateItemCount = () => (
        cartItems.reduce((acc, item) => acc + item.quantity, 0)
    )

    const addItemsToCart = (newItem) => {
        setCartItems(addCartItem(cartItems, newItem))
    }

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemsToCart, itemCount }


    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}