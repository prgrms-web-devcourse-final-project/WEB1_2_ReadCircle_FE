import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import '../styles/css/PaymentComponent.css';
import master from '../assets/master_card.png';
import visa from '../assets/visa_card.png';
import rupay from '../assets/rupay.png';

const PaymentComponent = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    )
    const [cardNum, setCardNum] = useState();
    const [expDate, setExpDate] = useState();
    const [cvv, setCvv] = useState();

    // 카드 번호 입력
    const cardNumber = (e) => {
        const value = e.target.value.replace(/\D/g, ""); 
        const formValue = value
            .match(/.{1,4}/g) 
            ?.join(" ")
            .slice(0, 19);
        setCardNum(formValue || "");
    }

    // 만료일자 입력
    const exDateChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        const formValue = value
        .replace(/^(\d{2})(\d{0,2})/, "$1 / $2") 
        .slice(0, 7);
        setExpDate(formValue);
    };

    // CVV 입력
    const cvvChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        const formValue = value.slice(0, 3);
        setCvv(formValue);
    };

    return (
        <div className='payment_area'>
            <h2>카드 정보</h2>
            <h3>카드 종류</h3>
            <ul className='cards'>
                <li className='card_master'>
                    <img src={master} alt="" />
                </li> 
                <li className='card_visa'>
                    <img src={visa} alt="" />    
                </li> 
                <li className='card_rupay'>
                    <img src={rupay} alt="" />    
                </li> 
                <li className='card_others'>
                    See All    
                </li> 
            </ul>
            <div className='card_info'>
                <div className='card_name'>
                    <p>카드 이름</p>
                    <input 
                        type="text" 
                        placeholder='Name'
                    />
                </div>
                <div className='card_number'>
                    <p>카드 번호</p>
                    <input 
                        type="text" 
                        placeholder='1111 2222 3333 4444'
                        value={cardNum}
                        onChange={cardNumber}
                    />
                </div>
                <div className='card_date'>
                    <div>
                        <p>만료 일자</p>
                        <input 
                            type="text" 
                            placeholder='yy / mm'
                            value={expDate}
                            onChange={exDateChange}
                        />
                    </div>
                    <div>
                        <p>CVV</p>
                        <input 
                            type="text" 
                            placeholder='123'
                            value={cvv}
                            onChange={cvvChange}
                        />
                    </div>
                </div>
                <div className='total_price'>
                    <div>
                        <p>가격</p>
                        <p>{totalPrice}원</p>
                    </div>
                    <div>
                        <p>배송비</p>
                        <p>{3000}원</p>
                    </div>
                    <div>
                        <p>Total</p>
                        <p>원</p>
                    </div>
                </div>
                <button className="purchase_btn">
                    <p>{totalPrice + 3000}원</p>
                    <p>구매 →</p>
                </button>
            </div>
        </div>
    );
};

export default PaymentComponent;