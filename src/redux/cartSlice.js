import React from 'react';
import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    cartItems: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartItems: (state, action) => {
            state.cartItems = action.payload.map((item) => ({
                ...item,
                quantity: 1
            }))
        },
        increment: (state, action) => {
            const bookId = action.payload;
            const item = state.cartItems.find((item) => item.bookId === bookId);
            if (item) {
                item.quantity += 1;
            }
        },
        decrement: (state, action) => {
            const bookId = action.payload;
            const item = state.cartItems.find((item) => item.bookId === bookId);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
        deleteCart: (state, action) => {
            const bookId = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.bookId !== bookId);
           
        }
    }
});

export const { increment, decrement, setCartItems, deleteCart } = cartSlice.actions;
export default cartSlice.reducer;