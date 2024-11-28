import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/scss/PostCreatePage.scss';
import Header from '../components/Header';
import axios from 'axios';
import { searchBooks } from '../api'; // 네이버 API 호출 함수
import SearchModal from '../components/SearchModal';

const PostCreatePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [calculatedPrice, setCalculatedPrice] = useState('');
    const [selectedPurpose, setSelectedPurpose] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
    }); // 폼 데이터
    const [imageFile, setImageFile] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    // 책 검색 처리
    const handleSearch = async () => {
        if (!searchQuery) return;

        try {
            const results = await searchBooks(searchQuery);
            setSearchResults(results);
            setIsModalOpen(true); // 모달 열기
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            alert('책 검색에 실패했습니다.');
        }
    };

    // 검색 결과 중 책 선택
    const handleBookSelect = (book) => {
        setSelectedBook(book);
        setFormData({
            ...formData,
            title: book.title,
            category: book.category || '카테고리 정보 없음',
        });
        setSearchResults([]); 
        setIsModalOpen(false); // 모달 닫기
    };

    // 책 상태 변경 및 가격 계산
    const handleStatusChange = (event) => {
        const status = event.target.value;
        setSelectedStatus(status);

        if (selectedBook) {
            const basePrice = parseInt(selectedBook.discount || selectedBook.price, 10);
            let calculated = 0;

            if (status === 'good') calculated = basePrice * 0.7;
            else if (status === 'fair') calculated = basePrice * 0.6;
            else if (status === 'poor') calculated = basePrice * 0.4;

            setCalculatedPrice(Math.round(calculated));
        }
    };

    const handlePurposeChange = (event) => {
        setSelectedPurpose(event.target.value);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            setImageFile(file);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.title || !formData.category || !selectedStatus || !calculatedPrice || !selectedPurpose) {
            alert('모든 필드를 입력해 주세요.');
            return;
        }

        const postData = new FormData();
        postData.append('title', formData.title);
        postData.append('content', formData.description);
        postData.append('price', calculatedPrice);
        postData.append('category', formData.category);
        postData.append('bookCondition', selectedStatus);
        postData.append('tradeType', selectedPurpose);
        postData.append('userId', 'user123');
        postData.append('bookImage', imageFile);

        try {
            const response = await axios.post(
                'http://13.209.5.86:5000/api/posts/create',
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

    const categoryBtn = [
        '고전', '과학', '만화', '소설', '시', '어린이', '에세이', '역사', 
        '외국어', '자기계발', '컴퓨터', '기타'
    ];

    // 카테고리 버튼 클릭 처리
    const handleCategoryClick = (category) => {
        setFormData({
            ...formData,
            category,
        });
    };

    return (
        <>
            <Header />
            <div className="write-page">
                <div className="write-container">
                    {/* 책 검색 섹션 */}
                    <div className="search-book">
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="책 검색"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button className='searchBtn' onClick={handleSearch}>검색</button>
                        </div>
                    </div>

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
                            <div className="category-buttons">
                                <label>카테고리</label>
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

                            <div className="status-input">
                                <label>상태</label>
                                <div className="radio-group">
                                    <label>
                                        <input
                                            type="radio"
                                            name="status"
                                            value="good"
                                            checked={selectedStatus === 'good'}
                                            onChange={handleStatusChange}
                                        />
                                        상
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="status"
                                            value="fair"
                                            checked={selectedStatus === 'fair'}
                                            onChange={handleStatusChange}
                                        />
                                        중
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="status"
                                            value="poor"
                                            checked={selectedStatus === 'poor'}
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
                            <div className="purpose-input">
                                <label>목적</label>
                                <div className="radio-group">
                                    <label>
                                        <input
                                            type="radio"
                                            name="purpose"
                                            value="sell"
                                            checked={selectedPurpose === 'sell'}
                                            onChange={handlePurposeChange}
                                        />
                                        판매
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="purpose"
                                            value="exchange"
                                            checked={selectedPurpose === 'exchange'}
                                            onChange={handlePurposeChange}
                                        />
                                        교환
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="description-input">
                        <label>설명</label>
                        <textarea
                            name="description"
                            placeholder="설명을 입력하세요"
                            rows="5"
                            value={formData.description}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>

                    <div className="button-container">
                        <button className="submit" onClick={handleSubmit}>등록</button>
                        <button className="cancel" onClick={handleCancel}>나가기</button>
                    </div>
                </div>
            </div>

            {/* 책 검색 모달 */}
            <SearchModal
                isModalOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
                searchResults={searchResults}
                onBookSelect={handleBookSelect}
            />
        </>
    );
};

export default PostCreatePage;
