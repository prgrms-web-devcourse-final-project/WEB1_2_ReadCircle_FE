import React from 'react';
import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    cartItems: [],
    bookList: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartItems: (state, action) => {
            state.cartItems = action.payload.map((item) => ({
                ...item,
                quantity: 1
            }));
            state.bookList = action.payload.map((item) => item.bookId);
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
            const cartItemId = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.cartItemId !== cartItemId);
            state.bookList = state.bookList.filter((id) => id !== cartItemId)
        }
    }
});

export const { increment, decrement, setCartItems, deleteCart } = cartSlice.actions;
export default cartSlice.reducer;