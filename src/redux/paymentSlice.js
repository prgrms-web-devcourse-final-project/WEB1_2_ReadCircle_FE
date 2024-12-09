import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    recipientName: '',
    address: '',
    totalPrice: 0,
    bookList: []
};

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        setPaymentInfo: (state, action) => {
            state.recipientName = action.payload.recipientName;
            state.address = action.payload.address;
            state.totalPrice = action.payload.totalPrice;
            state.bookList = action.payload.bookList;
        }
    }
})

export const { setPaymentInfo } = paymentSlice.actions;
export default paymentSlice.reducer;