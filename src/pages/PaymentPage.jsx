import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid'; // UUID 라이브러리 사용
import { useSelector, useDispatch } from 'react-redux';
import { setCartItems } from '../redux/cartSlice';
import '../styles/css/PaymentPage.css';
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null); // 결제 상태
    const [paymentDetail, setPaymentDetail] = useState([]);
    const paymentInfo = useSelector((state) => state.payment);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken');

    // 아임포트 SDK 추가
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://cdn.iamport.kr/js/iamport.payment-1.2.0.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            console.log("아임포트 SDK 로드 완료");
            console.log(paymentInfo);
        };

        script.onerror = () => {
            console.error("아임포트 SDK 로드 실패");
        };
        return () => {
            document.body.removeChild(script);
        };
    }, []);

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

    // 결제
    const handlePayment = async () => {
        try {
            const { address, recipientName, totalPrice, bookList } = paymentInfo;

            if (!address || !recipientName || !bookList || bookList.length === 0) {
                alert("결제 정보를 확인해주세요.");
                return;
            }
            setIsLoading(true);

            // 1. merchantUid 생성
            const merchantUid = "order_" + uuidv4(); // 임의로 생성된 고유 ID

            const { IMP } = window;
            IMP.init("imp70213505"); // 포트원 가맹점 식별코드

            const data = {
                pg: "html5_inicis",
                paymentMethod: "card",  // 결제 수단
                merchantUid: merchantUid,   // 주문 식별 번호
                amount: 10,  // 테스트용 결제 금액
                // amount: paymentInfo.totalPrice, // 총 결제 금액
                buyer_name: recipientName,
                buyer_addr: address,
            };

            // 2. 결제 요청 및 결과 처리
            IMP.request_pay(data, async (response) => {
                if (response.success) {
                    // 결제 성공 후, 백엔드로 결제 결과 처리 요청
                    const res = await axios.post("http://3.37.35.134:8080/api/payments/process", 
                        {
                            impUid: response.imp_uid,
                            merchantUid: response.merchant_uid,
                            bookList: bookList,
                            amount: totalPrice,
                            paymentMethod: 'card',
                            address: address,
                            recipientName: recipientName
                        }, {
                            headers: { Authorization: `Bearer ${token}` }
                        });

                        // 3. 결제 상태 확인 및 사용자 피드백
                        setPaymentDetail(res.data);
                        setPaymentStatus('success');
                        console.log(res.data);
                        console.log(paymentDetail);
                        console.log(paymentDetail.data);
                        alert("결제가 성공적으로 완료되었습니다!");
                } else {
                    // 결제 실패 시
                    setPaymentStatus('failed');
                    alert("결제가 실패했습니다. 다시 시도해주세요.");
                }
            });
        } catch (error) {
            setPaymentStatus('failed');
            console.error("결제 처리 중 에러 발생:", error);
            alert("결제 중 문제가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div>
            <h1 className="h1">결제</h1>
            <div className="main">
                <div className="book_info">
                    <ul>
                        {
                            cartItems && cartItems.map((item) => (
                                <li key={item.cartId}>
                                    <img src={item.thumbnailUrl} alt="" />
                                    <div className='book_detail'>
                                        <p className='book_title'>{item.title}</p>
                                        <span className='book_author'>{item.author}</span> / 
                                        <span className='book_publish'> {item.publisher}</span>
                                    </div>
                                    <p className="book_price">{item.price}원</p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="order_info">
                    <h2>결제 정보</h2>
                    <p>
                        <span>수령인:</span>
                        <span>{paymentInfo.recipientName}</span>
                    </p>
                    <p>
                       <span>주소:</span>
                       <span>{paymentInfo.address}</span>
                    </p>
                    <p>
                        <span>결제 방법: </span>
                        <span>card</span>
                    </p>
                    <hr />
                    <p>
                        <span>결제 금액:</span>
                        <span className="blue">{paymentInfo.totalPrice}원</span>
                    </p>
                </div>
            </div>
            <button onClick={handlePayment} disabled={isLoading}>
                {isLoading ? "결제 중..." : "결제하기"}
            </button>
            {paymentStatus === 'success' && (
                <div>
                    <h2>결제 완료</h2>
                    <button onClick={() => navigate('/mypage')}>주문 내역 보기</button>
                </div>
            )}
            {paymentStatus === 'failed' && (
                <div>
                    <h2>결제 실패</h2>
                    <p>결제에 실패했습니다. 다시 시도해주세요.</p>
                </div>
            )}
        </div>
    );
};
export default PaymentPage;