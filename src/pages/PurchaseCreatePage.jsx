import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/scss/PurchaseCreatePage.scss';
import Header from '../components/Header';
import axios from 'axios';
import { searchBooks } from '../api'; // 네이버 API 호출 함수

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
    });
    const [imageFile, setImageFile] = useState(null);

    const navigate = useNavigate();

    // 책 검색
    const handleSearch = async () => {
        if (!searchQuery) return;

        try {
            const results = await searchBooks(searchQuery);
            setSearchResults(results);
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
    };

    // 상태 변경 및 가격 계산
    const handleStatusChange = (event) => {
        const status = event.target.value;
        setSelectedStatus(status);

        if (selectedBook) {
            const basePrice = parseInt(selectedBook.discount || selectedBook.price, 10);
            let calculated = 0;

            if (status === 'good') calculated = basePrice * 0.7; // 상
            else if (status === 'fair') calculated = basePrice * 0.6; // 중
            else if (status === 'poor') calculated = basePrice * 0.4; // 하

            setCalculatedPrice(Math.round(calculated));
        }
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

        if (!formData.title || !formData.category || !selectedStatus) {
            alert('모든 필드를 입력해 주세요.');
            return;
        }

        const postData = new FormData();
        postData.append('title', formData.title);
        postData.append('price', calculatedPrice); // 계산된 가격
        postData.append('category', formData.category);
        postData.append('bookCondition', selectedStatus);
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
                        {searchResults.length > 0 && (
                            <div className="search-results">
                                <ul>
                                    {searchResults.map((book, index) => (
                                        <li key={index} onClick={() => handleBookSelect(book)}>
                                            <strong>{book.title}</strong>
                                            <p>{book.category || '카테고리 정보 없음'}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
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
                            <div className="category-input">
                                    <label>카테고리</label>
                                    <input
                                        type="text"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                    />
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
                            <div className='account-input'>
                                <input
                                    type='text'
                                    placeholder='예금주'
                                />
                                <div>
                                    <input
                                        type='text'
                                        placeholder='은행'
                                    />
                                    <input
                                        type='number'
                                        placeholder='계좌번호'
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
        </>
    );
};

export default PurchaseCreatePage;
