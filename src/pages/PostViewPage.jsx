import Header from '../components/Header';
import { usePostView } from '../components/usePostView';
import { useParams } from 'react-router-dom';
import '../styles/scss/PostViewPage.scss';

const PostView = () => {
    const { postId } = useParams();
    const {
        post,
        comments,
        newComment,
        setNewComment,
        handleAddComment,
        handleFavoriteClick,
    } = usePostView(postId);

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
                                찜하기
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
