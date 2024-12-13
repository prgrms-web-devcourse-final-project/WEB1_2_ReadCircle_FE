import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSaleInfo,
  deleteSaleInfo,
  updateSaleDeposit,
} from "../redux/saleSlice";
import { fetchOrderList } from "../redux/orderSlice";
import "../styles/scss/SaleManagement.scss";

const SaleManagement = () => {
  const dispatch = useDispatch();
  const { saleList, status, error, totalPages } = useSelector(
    (state) => state.sale
  );
  const {
    orderList,
    status: orderStatus,
    error: orderError,
    totalPages: orderTotalPages,
  } = useSelector((state) => state.order);
  const [currentPage, setCurrentPage] = useState(0);
  const [orderPage, setOrderPage] = useState(0);
  const [process, setProcess] = useState("WAITING");

  useEffect(() => {
    if (process !== "orderList") {
      dispatch(fetchSaleInfo({ page: currentPage, size: 10, process }));
    } else {
      dispatch(fetchOrderList({ page: orderPage, size: 10 }));
    }
  }, [dispatch, currentPage, process, orderPage]);

  const handleDelete = (sellerId) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      dispatch(deleteSaleInfo(sellerId));
    }
  };

  const handleDepositUpdate = (sellerId) => {
    const price = prompt("매입가를 입력하세요:");
    const bookCondition = prompt("책 상태를 입력하세요 (예: 상, 중, 하):");
    if (price && bookCondition) {
      dispatch(
        updateSaleDeposit({
          sellerId,
          depositData: {
            process: "REGISTRATION",
            bookCondition,
            price,
          },
        })
      );
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleOrderPageChange = (newPage) => {
    if (newPage >= 0 && newPage < orderTotalPages) {
      setOrderPage(newPage);
    }
  };

  if (status === "loading" || orderStatus === "loading")
    return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;
  if (orderStatus === "failed") return <p>Error: {orderError}</p>;

  return (
    <div className="sale-management">
      <h2>판매 정보 관리</h2>
      <select onChange={(e) => setProcess(e.target.value)} value={process}>
        <option value="WAITING">대기 중</option>
        <option value="REGISTRATION">등록</option>
        <option value="orderList">주문 목록</option>
      </select>

      {process !== "orderList" ? (
        <>
          <table>
            <thead>
              <tr>
                <th>판매자 ID</th>
                <th>은행</th>
                <th>계좌</th>
                <th>소유자</th>
                <th>작업</th>
              </tr>
            </thead>
            <tbody>
              {saleList.map((sale) => (
                <tr key={sale.sellerId}>
                  <td>{sale.userId}</td>
                  <td>{sale.bank}</td>
                  <td>{sale.account}</td>
                  <td>{sale.accountOwner}</td>
                  <td>
                    {process === "WAITING" && (
                      <>
                        <button
                          onClick={() => handleDepositUpdate(sale.sellerId)}
                        >
                          가격 수정
                        </button>
                        <button onClick={() => handleDelete(sale.sellerId)}>
                          삭제
                        </button>
                      </>
                    )}
                    {process === "REGISTRATION" && (
                      <button onClick={() => handleDelete(sale.sellerId)}>
                        삭제
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
            >
              이전
            </button>
            <span>
              {currentPage + 1} / {totalPages || 1}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage + 1 >= totalPages}
            >
              다음
            </button>
          </div>
        </>
      ) : (
        <>
          <h2>주문 목록</h2>
          <table>
            <thead>
              <tr>
                <th>주소</th>
                <th>닉네임</th>
                <th>주문 날짜</th>
                <th>결제 방법</th>
                <th>수령인 이름</th>
                <th>총 금액</th>
              </tr>
            </thead>
            <tbody>
              {orderList.map((order, index) => (
                <tr key={index}>
                  <td>{order.address}</td>
                  <td>{order.nickname}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>{order.paymentMethod}</td>
                  <td>{order.recipientName}</td>
                  <td>{order.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button
              onClick={() => handleOrderPageChange(orderPage - 1)}
              disabled={orderPage === 0}
            >
              이전
            </button>
            <span>
              {orderPage + 1} / {orderTotalPages || 1}
            </span>
            <button
              onClick={() => handleOrderPageChange(orderPage + 1)}
              disabled={orderPage + 1 >= orderTotalPages}
            >
              다음
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SaleManagement;
