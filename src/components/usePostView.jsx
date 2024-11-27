import { useEffect, useState } from 'react';
import mockPostData from './mockPost.json';

export const usePostView = (withFavorite = true) => {
    const [post, setPost] = useState(null);
    const [isFavorited, setIsFavorited] = useState(false);
    const [comments, setComments] = useState([]); // 댓글 목록
    const [newComment, setNewComment] = useState(''); // 새 댓글 입력 값

    const mockUserId = 'user123'; // 작성자 ID (임시)

    useEffect(() => {
        setPost(mockPostData);
    }, []);

    const handleFavoriteClick = () => {
        if (withFavorite) {
            setIsFavorited(!isFavorited);
            if (!isFavorited) {
                alert('게시글을 찜하였습니다.');
            } else {
                alert('게시글의 찜을 취소하였습니다.');
            }
        }
    };

    const handleAddComment = () => {
        if (newComment.trim()) {
            const newCommentData = {
                id: comments.length + 1,
                userId: mockUserId,
                content: newComment,
            };
            setComments([...comments, newCommentData]);
            setNewComment('');
        } else {
            alert('댓글을 입력하세요.');
        }
    };

    return {
        post,
        isFavorited,
        comments,
        newComment,
        setNewComment,
        handleFavoriteClick,
        handleAddComment,
    };
};
