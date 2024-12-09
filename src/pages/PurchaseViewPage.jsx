import { useEffect, useState } from 'react';
import '../styles/scss/PurchaseViewPage.scss';
import Header from '../components/Header';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const PurchaseViewPage = () => {
    const { bookId } = useParams();
    const [post, setPost] = useState(null);
    const [isFavorited, setIsFavorited] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');

    const handleFavoriteClick = () => {
        setIsFavorited(!isFavorited);
        if (!isFavorited) {
            alert('게시글을 찜하였습니다.');
        } else {
            alert('게시글의 찜을 취소하였습니다.');
        }
    };

    // 게시글 정보 가져오기
    useEffect(() => {
        const fetchPost = async () => {
            setIsLoading(true);
            setError(null);

            try {
                if (!accessToken) {
                    setError('로그인 정보가 없습니다.');
                    setIsLoading(false);
                    return;
                }

                const response = await axios.get(
                    `http://3.37.35.134:8080/api/books/detail/${bookId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        }
                    }
                );

                if (response.data.data) {
                    const { id, title, description, category, createdAt, thumbnailUrl, price, bookCondition } = response.data.data;

                    setPost({
                        id,
                        title,
                        description,
                        category,
                        createdAt,
                        thumbnailUrl,
                        price,
                        bookCondition,
                    });
                }
            } catch (error) {
                console.error('게시글 상세 조회 오류:', error);
                setError('게시글을 불러오는 데 실패했습니다.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchPost();
    }, [bookId]);

    // 장바구니 기능
    const addCart = async() => {
        console.log(bookId)
        try {
          const response = await axios.post(
            `http://3.37.35.134:8080/api/cart/add/${bookId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            }
          )
          console.log(response.data);
          navigate('/cart')
        } catch (error) {
            console.log(error);
        }
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!post) {
        return <div>게시글을 찾을 수 없습니다.</div>;
    }

    return (
        <>
            <Header />
            <div className="view-page">
                <div className="post-container">
                    <div className="title">
                        <h1>{post.title}</h1>
                    </div>
                    <div className="top-container">
                        <div className="left-container">
                            <div className="image">
                                {post.thumbnailUrl ? (
                                    <img src={post.thumbnailUrl} alt={`${post.title} 책 표지`} />
                                ) : (
                                    <div className="no-image">이미지가 없습니다</div>
                                )}
                            </div>
                        </div>
                        <div className="right-container">
                            <div className="price">
                                <span>{post.price} 원</span>
                            </div>
                            <div className="status">
                                <span>{post.bookCondition}</span> 
                            </div>
                            <div className='botton-container'>
                                <button className="wish" onClick={handleFavoriteClick}>
                                {isFavorited ? '찜 취소' : '찜하기'}
                                </button>
                                <button 
                                    className="cart"
                                    onClick={addCart}
                                >장바구니</button>
                            </div>
                        </div>
                    </div>
                    <div className="description">
                        <p>{post.description}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PurchaseViewPage;
