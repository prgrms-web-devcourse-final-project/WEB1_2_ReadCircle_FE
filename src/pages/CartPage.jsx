import React from 'react';
import Header from '../components/Header';
import CartComponent from '../components/CartComponent';
import PaymentComponent from '../components/PaymentComponent';
import '../styles/css/Cartpage.css';

const CartPage = () => {
    return (
        <div>
            <Header />
            <h1>장바구니</h1>
            <div className="main">
                <CartComponent />
                <PaymentComponent />
            </div>
        </div>
    );
};

export default CartPage;