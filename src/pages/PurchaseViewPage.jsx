import { useEffect, useState } from 'react';
import '../styles/scss/PurchaseViewPage.scss';
import mockPostData from '../components/mockPost.json';
import Header from '../components/Header';

const PurchaseViewPage = () => {
    const [post, setPost] = useState(null);
    const [isFavorited, setIsFavorited] = useState(false);

    const handleFavoriteClick = () => {
        setIsFavorited(!isFavorited);
        if (!isFavorited) {
            alert('게시글을 찜하였습니다.');
        } else {
            alert('게시글의 찜을 취소하였습니다.');
        }
    };

    useEffect(() => {
        setPost(mockPostData);
    }, []);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            <div className='view-page'>
                <div className='post-container'>
                    <div className='title'>
                        <h1>{post.title}</h1>
                    </div>
                    <div className='top-container'>
                        <div className='left-container'>
                            <div className='image'>
                                <img src={post.bookImage} alt={`${post.title} 책 표지`} />
                            </div>
                        </div>
                        <div className='right-container'>
                            <div className='price'>
                                <span>{post.price} 원</span>
                            </div>
                            <div className='nickname'>
                                <span>{post.userId}</span>
                            </div>
                            <div className='status'>
                                <span>{post.condition}</span>
                            </div>
                            <button className='wish' onClick={handleFavoriteClick}>
                                {isFavorited ? '찜 취소' : '찜하기'}
                            </button>
                            <button className='cart'>장바구니</button>
                        </div>
                    </div>
                    <div className='description'>
                        <p>{post.content}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PurchaseViewPage;
