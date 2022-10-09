import { createAction } from "../../utils/reducer/reducer.util";
import { CART_ACTION_TYPES } from "./cart.types";

export const setIsCartOpen = (bool) => {
    return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
}

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


export const addItemsToCart = (cartItems, newItem) => {
    const newCartItmes = (addCartItem(cartItems, newItem));
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItmes);
}

export const removeItemToCart = (cartItems, cartItemToRemove) => {
    const newCartItmes = (removeCartItem(cartItems, cartItemToRemove));
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItmes);
}

export const clearItemFromCart = (cartItems, cartItemToClear) => {
    const newCartItmes = (clearCartItem(cartItems, cartItemToClear));
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItmes);
}

