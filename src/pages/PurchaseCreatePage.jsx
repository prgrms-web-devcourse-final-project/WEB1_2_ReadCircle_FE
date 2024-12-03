import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/scss/PurchaseCreatePage.scss';
import Header from '../components/Header';
import axios from 'axios';
import { searchBooks } from '../api'; // 네이버 API 호출 함수
import SearchModal from '../components/SearchModal';

const PurchaseCreatePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [calculatedPrice, setCalculatedPrice] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        accountOwner: '',  // 예금주
        bank: '',       // 은행
        account: '',  // 계좌번호
    });
    const [imageFile, setImageFile] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

    const navigate = useNavigate();

    const categoryBtn = [
        '고전', '과학', '만화', '소설', '시', '어린이', '에세이', '역사', 
        '외국어', '자기계발', '컴퓨터', '기타'
    ];

    // 책 검색
    const handleSearch = async () => {
        if (!searchQuery) return;

        try {
            const results = await searchBooks(searchQuery);
            setSearchResults(results);
            setIsModalOpen(true);
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            alert('책 검색에 실패했습니다.');
        }
    };

    // 검색 결과 중 책 선택
    const handleBookSelect = (book) => {
        console.log("선택된 책:", book);
        setSelectedBook(book);
        setFormData({
            ...formData,
            title: book.title,
            category: book.category || '카테고리 정보 없음',
        });
        setSearchResults([]);
        setIsModalOpen(false);
    };

    const handleStatusChange = (event) => {
        const status = event.target.value;
        setSelectedStatus(status);

        if (selectedBook) {
            const basePrice = parseInt(selectedBook.discount || selectedBook.price, 10);
            let calculated = 0;

            if (status === '상') calculated = basePrice * 0.7;
            else if (status === '중') calculated = basePrice * 0.6;
            else if (status === '하') calculated = basePrice * 0.4;

            setCalculatedPrice(Math.round(calculated));
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
            const fileUrl = URL.createObjectURL(file);
            setImagePreview(fileUrl);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCategoryClick = (category) => {
        setFormData({
            ...formData,
            category,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const accessToken = localStorage.getItem('accessToken'); 
        console.log('Access Token:', accessToken);
    
        if (!accessToken) {
            alert('로그인 상태가 아닙니다.');
            return;
        }
    
        if (!formData.title || !formData.category || !selectedStatus || !calculatedPrice) {
            alert('모든 필드를 입력해 주세요.');
            return;
        }
    
        const postData = new FormData();
        
        postData.append(
            "postDTO", 
            new Blob(
                [
                    JSON.stringify({
                        title: formData.title,
                        content: formData.description,
                        price: calculatedPrice,
                        bookCategory: formData.category,
                        bookCondition: selectedStatus,
                        isbn: selectedBook ? selectedBook.isbn : '',
                        publishDate: selectedBook ? selectedBook.pubdate : '',
                        accountOwner: formData.accountOwner,
                        bank: formData.bank,
                        account: formData.account
                        // userId
                    })
                ],
                { type: "application/json" }
            )
        );
    
        postData.append("bookImage", imageFile);
    
        for (let [key, value] of postData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            const response = await axios.post(
                'http://3.37.35.134:8080/api/sale/register',
                postData,
            );

            if (response.data.success) {
                alert('게시글이 성공적으로 작성되었습니다.');
                navigate('/');
            } else {
                alert('게시글 작성에 실패했습니다.');
            }
        } catch (error) {
            console.error('게시글 작성 오류:', error);
            alert('서버 오류가 발생했습니다. 다시 시도해 주세요.');
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <>
            <Header />
            <div className="write-page">
                <div className="write-container">
                    <div className="search-book">
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="책 검색"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button className="searchBtn" onClick={handleSearch}>검색</button>
                        </div>
                    </div>

                    {/* 입력 필드 */}
                    <div className="top-container">
                        <div className="write-left">
                            <div className="title-input">
                                <label>제목</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="image-input">
                                <label>이미지 업로드</label>
                                <div className="image-preview-container">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="preview" className="image-preview" />
                                    ) : (
                                        <div className="image-placeholder">이미지를 추가하세요</div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="image-upload-input"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="write-right">
                            <div className='category-input'>
                                <label>카테고리</label>
                                <div className="category-buttons">
                                    {categoryBtn.map((category, index) => (
                                        <button
                                            key={index}
                                            className={`category-button ${formData.category === category ? 'selected' : ''}`}
                                            onClick={() => handleCategoryClick(category)}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="status-input">
                                <label>상태</label>
                                <div className="radio-group">
                                    <label>
                                        <input
                                            type="radio"
                                            name="status"
                                            value="상"
                                            checked={selectedStatus === '상'}
                                            onChange={handleStatusChange}
                                        />
                                        상
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="status"
                                            value="중"
                                            checked={selectedStatus === '중'}
                                            onChange={handleStatusChange}
                                        />
                                        중
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="status"
                                            value="하"
                                            checked={selectedStatus === '하'}
                                            onChange={handleStatusChange}
                                        />
                                        하
                                    </label>
                                </div>
                            </div>
                            <div className="price-input">
                                <label>가격</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={calculatedPrice}
                                    readOnly
                                />
                                <span className="unit">원</span>
                            </div>

                            <div className="bank-info-container">
                                <div className="input-group">
                                    <label htmlFor="depositorName">예금주</label>
                                    <input
                                        type="text"
                                        name="depositorName"
                                        id="depositorName"
                                        value={formData.depositorName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="bankName">은행</label>
                                    <input
                                        type="text"
                                        name="bankName"
                                        id="bankName"
                                        value={formData.bankName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="accountNumber">계좌번호</label>
                                    <input
                                        type="text"
                                        name="accountNumber"
                                        id="accountNumber"
                                        value={formData.accountNumber}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="button-container">
                        <button className="submit" onClick={handleSubmit}>등록</button>
                        <button className="cancel" onClick={handleCancel}>나가기</button>
                    </div>
                </div>
            </div>

            {/* 모달 사용 */}
            <SearchModal
                isModalOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
                searchResults={searchResults}
                onBookSelect={handleBookSelect}
            />
        </>
    );
};

export default PurchaseCreatePage;
