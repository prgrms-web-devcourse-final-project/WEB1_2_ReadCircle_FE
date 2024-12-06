import React, { useEffect, useState } from "react";
import axios from "axios";

const PaymentPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null); // 결제 상태
    const [paymentInfo, setPaymentInfo] = useState(null); // 결제 정보
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
            setIsLoading(true);

            // 1. 백엔드에서 merchantUid 요청
            const paymentRequest = {
                bookList: "Test Product", // 결제할 상품명
                amount: 10000,               // 결제 금액
                recipientName: "Test User",      // 구매자 이름
                address: "Seoul, South Korea" // 구매자 주소
            };

            const response = await axios.post("/api/payments/prepare", paymentRequest, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const merchantUidFromBackend = response.data.data;

            // 2. 결제창 띄우기 (포트원 JavaScript SDK 사용)
            const { IMP } = window;
            IMP.init("imp70213505"); // 포트원 가맹점 식별코드

            const data = {
                pg: "html5_inicis",
                pay_method: "card",
                merchant_uid: merchantUidFromBackend, // 백엔드에서 받은 merchantUid 사용
                name: paymentRequest.productName,
                amount: paymentRequest.amount,
                buyer_name: paymentRequest.buyerName,
                buyer_email: paymentRequest.buyerEmail,
                buyer_tel: paymentRequest.buyerTel,
                buyer_addr: paymentRequest.address,
            };

            // 3. 결제 요청 및 결과 처리 (동기식 처리)
            IMP.request_pay(data, async (response) => {
                if (response.success) {
                    try {
                        // 4. 결제 성공 시, 백엔드로 동기식 결제 결과 처리 요청
                        const res = await axios.post("/api/payments/validate", {
                            merchantUid: response.merchant_uid,
                            impUid: response.imp_uid
                        }, {
                            headers: { Authorization: `Bearer ${token}` }
                        });

                        // 5. 결제 상태 확인 및 사용자 피드백
                        setPaymentStatus('success');
                        setPaymentInfo(res.data); // 결제 정보 상태에 저장
                        alert("결제가 성공적으로 완료되었습니다!");
                    } catch (error) {
                        console.error("결제 검증 중 에러:", error);
                        alert("결제 검증 중 문제가 발생했습니다.");
                    }
                    
                } else {
                    console.error("결제 실패:", response.error_msg || "알 수 없는 오류");
                    setPaymentStatus('failed');
                    alert(`결제에 실패했습니다. 이유: ${response.error_msg || "알 수 없는 오류"}`);
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