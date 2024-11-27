import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { usePostView } from '../components/usePostView';
import '../styles/scss/MyPostViewPage.scss';

const MyPostView = () => {
    const {
        post,
        comments,
        newComment,
        setNewComment,
        handleAddComment,
    } = usePostView(false); // 찜 버튼 비활성화
    const navigate = useNavigate();

    const handleEditPost = () => {
        if (post) {
            navigate(`/edit/${post.id}`, { state: { post } });
        }
    };

    const handleDeletePost = async () => {
        if (window.confirm('게시글을 삭제하시겠습니까?')) {
            try {
                // 실제 삭제 API 호출
                const response = await fetch(`http://example.com/posts/${post.id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    alert('게시글이 삭제되었습니다.');
                    navigate('/');
                } else {
                    alert('삭제에 실패했습니다. 다시 시도해주세요.');
                }
            } catch (error) {
                console.error('삭제 오류:', error);
                alert('서버 오류가 발생했습니다. 다시 시도해주세요.');
            }
        }
    };

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
                        </div>
                    </div>
                    <div className='description'>
                        <p>{post.content}</p>
                    </div>
                </div>
                <div className='action-buttons'>
                    <button className='edit' onClick={handleEditPost}>
                        수정
                    </button>
                    <button className='delete' onClick={handleDeletePost}>
                        삭제
                    </button>
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
                                <div key={comment.id} className='comment'>
                                    <strong>{comment.userId}</strong> {comment.content}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default MyPostView;
