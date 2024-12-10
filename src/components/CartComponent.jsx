import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, setCartItems, deleteCart } from '../redux/cartSlice';
import Trash from '../assets/trash.svg';
import '../styles/css/CartComponent.css';
import axios from 'axios';

const CartComponent = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();

    // 카트 데이터 불러오기
    const cartData = async() => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.get(
                'http://3.37.35.134:8080/api/cart',
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )
            console.log(response.data);
            dispatch(setCartItems(response.data.data));
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        cartData();
    },[]);
    
    // 책 수량 증가, 감소
    const bookIncrement = (bookId) => {
        dispatch(increment(bookId));
    }

    const bookDecrement = (bookId) => {
        dispatch(decrement(bookId));
    }

    // 카트 목록 삭제
    const deleteItem = async(cartItemId) => {
        const accessToken = localStorage.getItem('accessToken');
    
        try {
            const response = await axios.delete(
                `http://3.37.35.134:8080/api/cart?cartItemId=${cartItemId}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )
            console.log(response.data);
            dispatch(deleteCart(cartItemId));
        } catch (error) {
            if (error.response) {
                console.error("Error Response:", error.response);
              } else {
                console.error("Error:", error.message);
              }
        }
        
    }

    return (
        <div className='cart_area'>
            <div className='go_back_area'>
                <button className='go_back'> &#12296; 뒤로 가기 </button>
            </div>
            <p className='quantity'>
               {cartItems.length} 개의 책들이 담겨 있습니다.
            </p>
            <ul className='carts'>
                {
                    cartItems && cartItems.map((item) => (
                        <li className='cart_list' key={item.bookId}>
                            <img src={item.thumbnailUrl} alt="" />
                            <div className='book_info'>
                                <p className='book_title'>{item.title}</p>
                                <span className='book_author'>{item.author}</span> / 
                                <span className='book_publish'> {item.publisher}</span>
                            </div>
                            <div className='quantitiy_area'>
                                <p className='quantitiy_cnt'>{item.quantity}</p>
                                <div className='quantitiy_btn'>
                                    <button className='up' onClick={() => bookIncrement(item.bookId)}>▲</button>
                                    <button className={item.quantity <= 0 ? 'none' : 'down'} onClick={() => bookDecrement(item.bookId)}>▼</button>
                                </div>
                            </div>
                            <p className='pirce'>{item.price * item.quantity} 원</p>
                            <button 
                                className='delete'
                                onClick={() => deleteItem(item.cartItemId)}
                            >
                                <img src={Trash} alt="" />
                            </button>
                        </li>
                    ))
                }
                
            </ul>
        </div>
    );
};

export default CartComponent;