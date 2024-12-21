import Header from '../components/Header';
import { usePostView } from '../components/usePostView';
import { useParams } from 'react-router-dom';
import '../styles/scss/PostViewPage.scss';
import axios from 'axios';
import { useState } from 'react';

const PostView = () => {
    const baseUrl = 'http://3.37.35.134:8080';
    const accessToken = localStorage.getItem('accessToken');
    const [isFavorited, setIsFavorited] = useState(false);
    const { postId } = useParams();
    const {
        post,
        comments,
        newComment,
        setNewComment,
        handleAddComment,
    } = usePostView(postId);

    if (!post) {
        return <div>Loading...</div>;
    }

    // 게시글 찜하기
        const addFavorite = async() => {
            try {
                const response = await axios.post(
                    `${baseUrl}/api/wish/post?id=${postId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${ accessToken }`
                        }
                    }
                )
                console.log(response.data);
                alert('게시글을 찜하였습니다.');
            } catch (error) {
                console.log(error)
            }
        }
    
        // 찜 삭제
        const deleteFavorite = async() => {
            try {
                const response = await axios.delete(
                    `${baseUrl}/api/wish?wishId=${postId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${ accessToken }`
                        }
                    }
                )
                console.log(response.data);
                alert('게시글의 찜을 취소하였습니다.');
            } catch (error) {
                console.log(error)
            }
        }
    
        const handleFavoriteClick = () => {
            setIsFavorited(!isFavorited);
            if (!isFavorited) {
                addFavorite();
            } else {
                deleteFavorite();
            }
        };

    return (
        <>
            <Header />
            <div className='view-page'>
                <div className='post-container'>
                    <div className='title'>
                        <span>{post.title}</span>
                    </div>
                    <div className='top-container'>
                        <div className='left-container'>
                            <div className='image'>
                                <img src={`http://3.37.35.134:8080${post.bookImage}`} alt={`${post.title} 책 표지`} />
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
                                <span>{post.bookCondition}</span>
                            </div>
                            <button className='wish' onClick={handleFavoriteClick}>
                            {isFavorited ? '찜 취소' : '찜하기'}
                            </button>
                        </div>
                    </div>
                    <div className='description'>
                        <p>{post.content}</p>
                    </div>
                </div>
                {/* 댓글 섹션 */}
                <div className='comment-section'>
                    <div className='comment-input'>
                        <input
                            type='text'
                            placeholder='댓글을 입력하세요'
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button onClick={handleAddComment}>작성</button>
                    </div>
                    {comments.length > 0 && (
                        <div className='comments'>
                            {comments.map((comment) => (
                                <div key={comment.commentId} className='comment'>
                                    <p className='user-id'>{comment.userId}</p> <p className='content'>{comment.commentContent}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default PostView;
