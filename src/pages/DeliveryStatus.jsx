import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/css/DeliveryStatus.css';

const DeliveryStatus = () => {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');
    const baseUrl = 'http://3.37.35.134:8080';
    const { orderId } = useParams();
    const [reason, setReason] = useState('');
    const [delivery, setDelivery] = useState([]);
    const [imgs, setImgs] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    // 데이터 불러오기
    const deliveryData = async() => {
        try {
            const response = await axios.get(
                `${baseUrl}/api/orders/${orderId}/me`,
                {
                    headers: {
                        Authorization: `Bearer ${ accessToken }`
                    }
                }
            )
            console.log(response.data.data);
            setDelivery(response.data.data);
            setImgs(response.data.data.orderItems);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        deliveryData();
    },[])

    const dateTime = delivery.orderDate || "0000-00-00T00:00:00"
    const [year, month, day, hour, minute] = dateTime.split(/[-T:.]/).slice(0, 5);

     // 주문 취소
    const resonWhy = (e) => {
        const val = e.target.value;
        setReason(val);
    }

    const deliveryCancel = async() => {
        if( confirm('정말 주문을 취소하시겠습니까?') ) {
            try {
                const response = await axios.post(
                    `${baseUrl}/api/payments/cancel`,
                    {
                        merchantUid: delivery.merchantUid,
                        reason: reason
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${ accessToken }`
                        }
                    }
                )
                console.log(response.data);
                alert('주문이 취소되었습니다')
                navigate('/mypage');
            } catch (error) {
                console.log(delivery.merchantUid);
                console.log(reason);
                console.log(error)
            }
        } else {
            setIsOpen(false);
        }
        
    }

    return (
        <div>
            <h1 className='del_h1'>
                <p 
                    className='back'
                    onClick={() => {navigate('/mypage')}}
                >
                    ←
                </p>
                <span>주문 상세</span>
            </h1>
            <div className='delivery_status'>
                <ul className='del_books'>
                    {
                        imgs && imgs.map((img) => (
                            <li 
                                className='book'
                                key={img.bookId}
                            >
                                <img src={img.thumbnailUrl} />
                                <div className='del_books_detail'>
                                    <p>책 제목 : {img.bookTitle}</p>
                                    <p>저자 : {img.author}</p>
                                    <p>책 상태 : {img.bookCondition}</p>
                                    <p>출판사 : {img.publisher} 원</p>
                                    <p>ISBN No : {img.isbn}</p>
                                    <p>가격 : {img.price} 원</p>
                                </div>
                            </li>
                        ))
                    }
                </ul>
                <div className='del_stat'>
                    <p>
                        <span>수령인 :</span>
                        <span>{delivery.recipientName}</span>
                    </p>
                    <p>
                        <span>주소 :</span> 
                        <span>{delivery.address}</span>
                    </p>
                    <p>
                        <span>결제 방법 :</span> 
                        <span>{delivery.paymentMethod}</span>
                    </p>
                    <p>
                        <span>주문 날짜 :</span> 
                        {`${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`}
                    </p>
                    <p>
                        <span>주문 상태 :</span> 
                        <span>{delivery.orderStatus}</span>
                    </p>
                    <p>
                        <span>배송 상태 :</span> 
                        <span>{delivery.paymentStatus}</span>
                    </p>
                    <p>
                        <span>배송비 :</span> 
                        3000 원
                    </p>
                    <hr />
                    <p className='total_pr'>
                        <span>총 가격 :</span> 
                        <span className='bl'>{delivery.totalPrice + 3000} 원</span>
                    </p>
                    <button 
                        className='cancel_btn'
                        onClick={() => setIsOpen(true)}
                    >주문 취소</button>
                </div>
                {isOpen && (
                    <div className='outside'>
                        <div className="modal">
                            <h3>취소 사유</h3>
                            <select className='cancel_reason'>
                                <option value="">배송 지연</option>
                                <option value="">상품 정보가 다름</option>
                                <option value="">구매자 변심</option>
                                <option value="">중복 주문</option>
                                <option value="">결제 문제</option>
                                <option value="">기타</option>
                            </select>
                            <textarea 
                                placeholder='취소 사유를 적어 주세요.'
                                onChange={resonWhy}
                            ></textarea>
                            <button 
                                className='submit_cancel'
                                onClick={deliveryCancel}
                            >주문 취소</button>
                            <p 
                                className='modal_close'
                                onClick={() => setIsOpen(false)}
                            >×</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeliveryStatus;40