import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { usePostView } from '../components/usePostView';
import '../styles/scss/MyPostViewPage.scss';
import axios from 'axios';

const MyPostView = () => {
    const {
        post,
        comments,
        newComment,
        setNewComment,
        handleAddComment,
        handleDeleteComment
    } = usePostView(false);
    const navigate = useNavigate();

    function handleEditPost() {
        if (post) {
            navigate('/edit');
        }
    }

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

                const response = await axios.delete(`http://3.37.35.134:8080/api/posts/${postId}`, {
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
                                <span>{post.bookCondition}</span>
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
                    <button className='delete' onClick={handleDelete}>
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
                            <div key={comment.commentId} className='comment'>
                                <p className='user-id'>{comment.userId}</p> <p className='content'>{comment.commentContent}</p>
                                <button className='delete-btn' onClick={() => handleDeleteComment(comment.commentId)}>
                                    X
                                </button>
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
