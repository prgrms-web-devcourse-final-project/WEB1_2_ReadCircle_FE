import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid'; // UUID 라이브러리 사용
import { useSelector } from "react-redux";

const PaymentPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null); // 결제 상태
    const paymentInfo = useSelector((state) => state.payment);
    const token = localStorage.getItem('accessToken');

    // 아임포트 SDK 추가
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://cdn.iamport.kr/js/iamport.payment-1.2.0.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            console.log("아임포트 SDK 로드 완료");
        };

        script.onerror = () => {
            console.error("아임포트 SDK 로드 실패");
        };
        return () => {
            document.body.removeChild(script);
        };
    }, []);

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
            console.log(data)
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
                        setPaymentStatus('success');
                        console.log(res.data);
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
            <h1>결제 테스트</h1>
            <button onClick={handlePayment} disabled={isLoading}>
                {isLoading ? "결제 중..." : "결제하기"}
            </button>
            {paymentStatus === 'success' && (
                <div>
                    <h2>결제 완료</h2>
                    <p>상품명: {paymentInfo.productName}</p>
                    <p>결제 금액: {paymentInfo.amount}원</p>
                    <p>구매자: {paymentInfo.buyerName}</p>
                    <p>결제 방법: {paymentInfo.payMethod}</p>
                    <button onClick={() => window.location.href = "/order-details"}>주문 내역 보기</button>
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