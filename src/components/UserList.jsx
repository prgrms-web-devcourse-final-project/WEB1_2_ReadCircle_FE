import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserList, deleteUser, searchUser } from "../redux/adminSlice";
import "../styles/scss/UserList.scss";

const UserList = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const { userList, status, error, userDetails } = useSelector(
    (state) => state.admin
  );

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!searchInput.trim()) {
      dispatch(fetchUserList({ page: currentPage, size: 10 }))
        .unwrap()
        .then((response) => {
          setTotalPages(response.data.totalPages);
        });
    }
  }, [dispatch, currentPage, searchInput]);

  const handleDelete = (userId) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      dispatch(deleteUser(userId));
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = () => {
    if (searchInput.trim()) {
      dispatch(searchUser(searchInput));
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") {
    return <p>Error: {error || "Something went wrong"}</p>;
  }

  return (
    <div className="user-list">
      <h2>회원 목록</h2>

      {/* 검색창 */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="아이디로 검색"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <button onClick={handleSearch}>검색</button>
      </div>

      {/* 검색된 사용자 */}
      {searchInput && userDetails ? (
        <div>
          <h3>검색된 사용자</h3>
          <table className="user-table">
            <thead>
              <tr>
                <th>아이디</th>
                <th>이메일</th>
                <th>닉네임</th>
                <th>역할</th>
                <th>작업</th>
              </tr>
            </thead>
            <tbody>
              <tr key={userDetails.userId}>
                <td>{userDetails.userId}</td>
                <td>{userDetails.email}</td>
                <td>{userDetails.nickname}</td>
                <td>{userDetails.role}</td>
                <td>
                  <button onClick={() => handleDelete(userDetails.userId)}>
                    삭제
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          {/* 일반 사용자 목록 */}
          <table className="user-table">
            <thead>
              <tr>
                <th>아이디</th>
                <th>이메일</th>
                <th>닉네임</th>
                <th>역할</th>
                <th>작업</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user) => (
                <tr key={user.userId}>
                  <td>{user.userId}</td>
                  <td>{user.email}</td>
                  <td>{user.nickname}</td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => handleDelete(user.userId)}>
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 페이지네이션 */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          이전
        </button>
        {Array.from({ length: totalPages }, (_, i) => i).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={currentPage === page}
          >
            {page + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default UserList;
