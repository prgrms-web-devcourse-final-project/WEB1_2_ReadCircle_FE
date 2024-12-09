import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPaymentInfo } from '../redux/paymentSlice';
import '../styles/css/PaymentComponent.css';
import { useNavigate } from 'react-router-dom';
import DaumPostCode from 'react-daum-postcode';

const PaymentComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isName, setIsName] = useState(false);
    const [isAddress, setIsAddress] = useState(false);
    const [active, setActive] = useState(false);
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toggleHandler = () => setIsOpen((prev) => !prev);
    const nameHandler = (e) => {
        setName(e.target.value);
        setIsName(true);  
    } 
    const completeHandler = (data) => {
        setAddress(data.address);
        setIsAddress(true);
    }  

    // 주소 입력
    const closeHandler = (state) => {
        if (state === 'FORCE_CLOSE') {
            setIsOpen(false);
          } else if (state === 'COMPLETE_CLOSE') {
            setIsOpen(false);
          }
    }

    // 버튼 활성화
    useEffect(() => {
        if (isName && isAddress) {
            setActive(true)
        } else {
            setActive(false)
        }
    },[isName, isAddress])

    // 결제 정보 전송
    const paymentDataSend = () => {
        const bookList = cartItems.map((item) => item.bookId);
        dispatch(
            setPaymentInfo({
                recipientName: name,
                address: address,
                totalPrice: totalPrice + 3000,
                bookList: bookList
            })
        )
        if(!active) {
            alert('수령인 이름과 주소를 입력해 주세요.')
        } else {
            navigate('/payment');
        }
    }

    return (
        <div className='payment_area'>
            <div className='card_info'>
                <div className='user_name'>
                    <p>수령인 이름</p>
                    <input 
                        type="text" 
                        placeholder='Name'
                        onChange={nameHandler}
                    />
                </div>
                <div className='user_address'>
                    <p>수령인 주소</p>
                    <input 
                        type="text" 
                        value={address}
                        placeholder='클릭하여 주소를 입력해 주세요.'
                        onClick={toggleHandler}
                    />
                    <input 
                        type="text" 
                        placeholder='상세 주소를 입력해 주세요.'
                    />
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
                <button 
                    className={active ? 'purchase_btn on' : 'purchase_btn'}
                    onClick={paymentDataSend}
                >
                    <p>{totalPrice + 3000}원</p>
                    <p>구매 →</p>
                </button>
            </div>
            {isOpen && (
                <div className='modal_area'>
                    <DaumPostCode
                        className='daum_post'
                        onClose={closeHandler}
                        onComplete={completeHandler}
                    />
                    <button 
                        className='close_modal'
                        onClick={() => setIsOpen(false)}
                    >
                        ×
                    </button>
                </div>        
            )}
        </div>
    );
};

export default PaymentComponent;