import { useState, useEffect } from 'react';
import '../styles/scss/PostEditPage.scss';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';

const PostEditPage = () => {
    // const { postId } = useParams();
    const postId = 2; 
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

    // 기존 데이터
    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await axios.get(`http://13.209.5.86:5000/api/posts/${postId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                });
                console.log("API 응답 데이터:", response.data);

                const post = response.data;
                setFormData({
                    title: post.title,
                    content: post.content,
                    price: post.price,
                    category: post.bookCategory,
                    status: post.bookCondition,
                    purpose: post.tradeType,
                    image: post.bookImage,
                });
                setImagePreview(post.bookImage);
            } catch (error) {
                console.error("게시글을 불러오는 중 오류 발생:", error);
                alert("게시글을 불러오는 데 실패했습니다.");
            }
        };

        fetchPostData();
    }, [postId]);

    // 이미지 파일 변경
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

    // 입력값 변경
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // 게시글 수정 처리
    const handleSubmit = async (event) => {
        event.preventDefault();

        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            alert('로그인이 필요합니다.');
            return;
        }

        // 수정된 데이터
        const { title, content, price } = formData;

        const updateData = {
            title,
            content,
            price: parseInt(price, 10),
        };

        try {
            const response = await axios.put(
                `http://13.209.5.86:5000/api/posts/${postId}`, 
                updateData, 
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                }
            );

            if (response.data.success) {
                alert('게시글이 성공적으로 수정되었습니다.');
                navigate(`/posts/${postId}`); // 수정 후 해당 게시글 페이지로 이동
            } else {
                alert('게시글 수정에 실패했습니다.');
            }
        } catch (error) {
            console.error('게시글 수정 오류:', error);
            alert('서버 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    // 게시글 삭제 처리
    const handleDelete = async () => {
        const isConfirmed = window.confirm('정말로 이 포스트를 삭제하시겠습니까?');
        if (isConfirmed) {
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (!accessToken) {
                    alert('로그인 상태가 아닙니다.');
                    return;
                }

                const response = await axios.delete(`http://13.209.5.86:5000/api/posts/${postId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (response.data.success) {
                    alert('포스트가 삭제되었습니다.');
                    navigate('/'); // 삭제 후 메인 페이지로 이동
                } else {
                    alert('게시글 삭제에 실패했습니다.');
                }
            } catch (error) {
                console.error('게시글 삭제 오류:', error);
                alert('서버 오류가 발생했습니다. 다시 시도해주세요.');
            }
        }
    };

    return (
        <>
            <Header />
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
                                            className={`category-button ${formData.category === category ? 'selected' : ''}`}
                                            style={{ pointerEvents: 'none' }}
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
                                            checked={formData.status === 'good'}
                                            disabled
                                        />
                                        상
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="status"
                                            value="fair"
                                            checked={formData.status === 'fair'}
                                            disabled
                                        />
                                        중
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="status"
                                            value="poor"
                                            checked={formData.status === 'poor'}
                                            disabled
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
                                            checked={formData.purpose === 'sell'}
                                            disabled
                                        />
                                        판매
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="purpose"
                                            value="exchange"
                                            checked={formData.purpose === 'exchange'}
                                            disabled
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
                    <button onClick={() => navigate(`/myview`)} className="cancel">
                        나가기
                    </button>
                </div>
            </div>
        </>
    );
};

export default PostEditPage;
