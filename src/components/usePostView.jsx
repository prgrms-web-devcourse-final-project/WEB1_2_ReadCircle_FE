import { useState, useEffect } from 'react';
import axios from 'axios';

export const usePostView = (postId) => {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    // 게시글 정보 가져오기
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const response = await axios.get(
                    `http://3.37.35.134:8080/api/posts/${postId}`,
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

    // 댓글 조회
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const response = await axios.get(
                    `http://3.37.35.134:8080/api/comments/${postId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                setComments(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('댓글 조회 오류:', error);
            }
        };

        fetchComments();
    }, [postId]);

    // 댓글 추가 함수
    const handleAddComment = async () => {
        if (newComment.trim() === '') return;

        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.post(
                `http://3.37.35.134:8080/api/comments/${postId}`, 
                { commentContent: newComment },
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            if (response.data.success) {
                const { commentId, commentContent, userId, commentCreatedAt } = response.data;
                setComments([...comments, { commentId, content: commentContent, userId, commentCreatedAt }]);
                setNewComment('');
            }
        } catch (error) {
            console.error('댓글 추가 오류:', error);
        }
    };

    // 댓글 삭제
    const handleDeleteComment = async (commentId) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            await axios.delete(`http://3.37.35.134:8080/api/comments/${commentId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setComments(comments.filter((comment) => comment.commentId !== commentId)); // 삭제된 댓글 제거
        } catch (error) {
            console.error('댓글 삭제 오류:', error);
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
        handleDeleteComment,
        handleFavoriteClick,
    };
};
