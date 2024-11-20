import { useState } from 'react';
import '../styles/scss/PostCreatePage.scss';

const PostCreatePage = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedPurpose, setSelectedPurpose] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

    const categoryBtn = ['고전', '과학', '만화', '소설', '시', '어린이', '에세이', '역사', '외국어', '자기계발', '컴퓨터', '기타'];

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    const handlePurposeChange = (event) => {
        setSelectedPurpose(event.target.value);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="write-page">
            <div className="write-container">
                <div className="top-container">
                    <div className="write-left">
                        <div className="title-input">
                            <label>제목</label>
                            <input type="text" placeholder="제목을 입력하세요" />
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
                            <input type="number" placeholder="가격을 입력하세요" />
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
                    <textarea placeholder="설명을 입력하세요" rows="5"></textarea>
                </div>
            </div>

            <div className='button-container'>
                <button className='submit'>등록</button>
                <button className='cancel'>나가기</button>
            </div>
        </div>
    );
};

export default PostCreatePage;
