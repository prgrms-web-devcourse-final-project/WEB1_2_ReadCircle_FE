import { useState, useEffect } from 'react';
import '../styles/scss/PostEditPage.scss';
import mockPostData from '../components/mockPost.json'; // 예시로 mock 데이터를 사용
import { useNavigate } from 'react-router-dom';

const PostEditPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedPurpose, setSelectedPurpose] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        price: '',
        category: '',
        status: '',
        purpose: '',
        image: null,
    });

    const categoryBtn = ['고전', '과학', '만화', '소설', '시', '어린이', '에세이', '역사', '외국어', '자기계발', '컴퓨터', '기타'];

    const navigate = useNavigate();

    useEffect(() => {
        if (mockPostData) {
            setFormData({
                title: mockPostData.title,
                content: mockPostData.content,
                price: mockPostData.price,
                category: mockPostData.category,
                status: mockPostData.condition,
                purpose: mockPostData.tradeType,
                image: mockPostData.bookImage,
            });
            setSelectedCategory(mockPostData.category);
            setSelectedStatus(mockPostData.condition);
            setSelectedPurpose(mockPostData.tradeType);
            setImagePreview(mockPostData.bookImage);
        }
    }, []);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setFormData({
            ...formData,
            category: category,
        });
    };

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
        setFormData({
            ...formData,
            status: event.target.value,
        });
    };

    const handlePurposeChange = (event) => {
        setSelectedPurpose(event.target.value);
        setFormData({
            ...formData,
            purpose: event.target.value,
        });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            setFormData({
                ...formData,
                image: file,
            });
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('수정된 포스트:', formData);
        alert('포스트가 수정되었습니다.');
    };

    const handleDelete = () => {
        const isConfirmed = window.confirm('정말로 이 포스트를 삭제하시겠습니까?');
        if (isConfirmed) {
            // 백엔드에서 삭제하는 로직 추가
            setFormData({
                title: '',
                content: '',
                price: '',
                category: '',
                status: '',
                purpose: '',
                image: null,
            });
            setImagePreview(null);
            setSelectedCategory('');
            setSelectedStatus('');
            setSelectedPurpose('');
            alert('포스트가 삭제되었습니다.');
            navigate('/');
        }
    };

    return (
        <div className="edit-page">
            <div className="edit-container">
                <div className="top-container">
                    <div className="edit-left">
                        <div className="title-input">
                            <label>제목</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="제목을 입력하세요"
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

                    <div className="edit-right">
                        <div className="category-input">
                            <label>카테고리</label>
                            <div className="category-buttons">
                                {categoryBtn.map((category, index) => (
                                    <button
                                        key={index}
                                        className={`category-button ${
                                            selectedCategory === category ? 'selected' : ''
                                        }`}
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
                                value={formData.price}
                                onChange={handleInputChange}
                                placeholder="가격을 입력하세요"
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
                                <label>
                                    <input
                                        type="radio"
                                        name="purpose"
                                        value="purchase"
                                        checked={selectedPurpose === 'purchase'}
                                        onChange={handlePurposeChange}
                                    />
                                    구매
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="description-input">
                    <label>설명</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        placeholder="설명을 입력하세요"
                        rows="5"
                    ></textarea>
                </div>
            </div>

            <div className="editBtn-container">
                <button onClick={handleSubmit} className="submit">
                    수정
                </button>
                <button onClick={handleDelete} className="delete">
                    삭제
                </button>
                <button className="cancel">나가기</button>

            </div>
        </div>
    );
};

export default PostEditPage;
