import { useEffect, useState } from 'react';
import '../styles/scss/PostViewPage.scss';
import mockPostData from '../components/mockPost.json'

const PostViewPage = () => {
    const [post, setPost] = useState(null);
    useEffect(() => {
        setPost(mockPostData);
    }, []);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
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
                        <button className='message'>Message</button>
                        <button className='wish'>Wish List</button>
                    </div>
                </div>
                <div className='description'>
                  <p>{post.content}</p>
                </div>
            </div>
        </div>
    );
};

export default PostViewPage;