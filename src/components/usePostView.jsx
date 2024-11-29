import { useState, useEffect } from 'react';
import axios from 'axios';

export const usePostView = (postId) => {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    // 게시글 정보 가져오기
    useEffect(() => {
        const postId = 1; 
        const fetchPost = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const response = await axios.get(
                    `http://13.209.5.86:5000/api/posts/${postId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        }
                    }
                );

                if (response.data) {
                    const { postId, userId, title, content, category, postCreatedAt, bookImage, price, bookCondition, tradeType, trade_status } = response.data;
                    setPost({
                        postId,
                        userId,
                        title,
                        content,
                        category,
                        postCreatedAt,
                        bookImage,
                        price,
                        bookCondition,
                        tradeType,
                        trade_status,
                    });
                }
            } catch (error) {
                console.error('게시글 상세 조회 오류:', error);
            }
        };

        fetchPost();
    }, [postId]);

    // 댓글 추가 함수
    const handleAddComment = async () => {
        const postId = 1;
        if (newComment.trim() === '') return;

        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.post(
                `http://13.209.5.86:5000/api/posts/${postId}/comments`, 
                { content: newComment },
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            if (response.data.success) {
                setComments([...comments, { userId: 'user123', content: newComment }]);
                setNewComment('');
            }
        } catch (error) {
            console.error('댓글 추가 오류:', error);
        }
    };

    // 찜 버튼
    const handleFavoriteClick = (event) => {
        event.preventDefault();
    };

    return {
        post,
        comments,
        newComment,
        setNewComment,
        handleAddComment,
        handleFavoriteClick,
    };
};
