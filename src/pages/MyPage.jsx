import React, { useEffect, useState } from 'react';
import '../styles/css/MyPage.css';
import Modi from '../assets/Modi.svg';
import Book from '../assets/book4.png';
import Header from '../components/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
    const baseUrl = 'http://3.37.35.134:8080';
    const token = localStorage.getItem('accessToken');
    const navigate = useNavigate();

    // 초기값 세팅
    const [currentImage, setCurrentImage] = useState();
    const [currentNick, setCurrentNick] = useState();
    const [image, setImage] = useState(currentImage);
    const [nick, setNick] = useState(currentNick);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentPw, setCurrentPw] = useState('');
    const [pwCon, setPwCon] = useState('');
    const [idx, setIdx] = useState(0);
    const [File, setFile] = useState(null);
    const [active, setActive] = useState(false);
    const [pwActive, setPwActive] = useState(false);
    const [posts, setPosts] = useState([]);

    // 유효성 검사
    const [isOpen, setIsOpen] = useState(false);
    const [isChange, setIsChange] = useState(false);
    const [isNick, setIsNick] = useState(true);
    const [isEmail, setIsEmail] = useState(true);
    const [isCrPw, setIsCrPw] = useState(false);
    const [isPw, setIsPw] = useState(false);
    const [isPwCon, setIsPwCon] = useState(false);

    // 에러 메세지
    const [nickError, setNickError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [crPwError, setCrPwError] = useState('');
    const [pwError, setPwError] = useState('');
    const [pwConError, setPwConError] = useState('');


    // 유저 데이터 불러오기
    const userData = async() => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.get(
                `${baseUrl}/api/users/me`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )
            setNick(response.data.data.nickname);
            setCurrentNick(response.data.data.nickname);
            setEmail(response.data.data.email);
            setCurrentPw(response.data.data.password);
            setImage(response.data.data.profileImageUrl);
            setCurrentImage(`${baseUrl}${response.data.data.profileImageUrl}`)
        } catch (error) {
            console.log(error)
        }
    }

    // 유저 게시글 불러오기
    const postData = async() => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.get(
                `${baseUrl}/api/posts/search/my-posts`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )
            console.log(response.data.content);
            setPosts(response.data.content);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        userData();
        postData();
    },[])

    // 탭 메뉴 기능
    const tabData = [
        {
            title: (
                <li 
                    className={idx === 0 ? "on" : ""}
                    onClick={() => tabHandler(0)}>작성한 게시물
                </li>
            ),
            content: (
                posts && posts.map((post => (
                    <li 
                        key={post.id}
                        className='mypost' 
                        onClick={() => navigate(`/view/${post.postId}`)}
                    >
                        <div className="post">
                            <img src={`${baseUrl}${post.bookImage}`} alt="" />
                            <p className='book_title'>{post.title}</p>
                            <div className='middle'>
                                <p className='category'>{post.bookCategory}</p>
                                <p className='quality'>{post.bookCondition}</p>
                            </div>
                            <div className='bottom'>
                                <div>
                                    <p className=
                                        {`status ${post.tradeType == '교환' ? 'trade' : 'sell'}`}
                                    ></p>
                                </div>
                                <p className='price'>{post.price}</p>
                            </div>
                            <div className='block'></div>
                        </div>
                    </li>
                )))
            )
        },
        {
            title: (
                <li 
                    className={idx === 1 ? "on" : ""}
                    onClick={() => tabHandler(1)}>찜한 게시물
                </li>
            ),
            content: (
                <li className='scrap_post'>
                    <div className="post">
                        <img src={Book} alt="" />
                        <p className='book_title'>Scrap</p>
                        <div className='middle'>
                            <p className='category'>SF</p>
                            <p className='quality'>상</p>
                        </div>
                        <div className='bottom'>
                            <div>
                                <p className='status sell'></p>
                                <p className='status trade'></p>
                            </div>
                            <p className='price'>23,000</p>
                        </div>
                        <div className='block'></div>
                    </div>
                </li>
            )
        },
        {
            title: (
                <li 
                    className={idx === 2 ? "on" : ""}
                    onClick={() => tabHandler(2)}>구매 내역
                </li>
            ),
            content: (
                <li className='purchase_list'>
                    <div className="post">
                        <img src={Book} alt="" />
                        <p className='book_title'>Purchase</p>
                        <div className='middle'>
                            <p className='category'>Fantasy</p>
                            <p className='quality'>중</p>
                        </div>
                        <div className='bottom'>
                            <div>
                                <p className='status sell'></p>
                                <p className='status trade'></p>
                            </div>
                            <p className='price'>20,000</p>
                        </div>
                        <div className='block'></div>
                    </div>
                </li>
            )
        },
    ]

    const tabHandler = (i) => {
        setIdx(i);
    }

    // 개인정보 수정 기능
    // 모달 창
    const toggleHandler = () => {
        setIsOpen((prev) => !prev);
    }

    // 프로필 이미지 변경
    const imgChange = (e) => {
        const selectFile = e.target.files[0];
        if (selectFile) {
            setFile(selectFile);
            const fileUrl = URL.createObjectURL(selectFile);
            setCurrentImage(fileUrl);
            setIsChange(true);
        }
    }

    const profileChange = async() => {
        const formData = new FormData();
        formData.append('image', File);

        try {
            const response = await axios.patch(
                `${baseUrl}/api/users/me/profileImage`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            );
            alert('프로필 이미지 변경이 완료되었습니다.');
            setIsOpen(false);
            setImage(response.data.data);
            setIsChange(false);
        } catch (error) {
            console.log(error)
        }
    }

    // 닉네임 변경
    const nickChange = (e) => {
        const nickValue = e.target.value;
        setNick(nickValue);
        const nickRegExp = /^[a-zA-z0-9]{4,8}$/;

        if (!nickRegExp.test(nickValue)) {
            setNickError('4 ~ 8 자 사이의 영문 또는 숫자만 입력해 주세요.');
            setIsNick(false);
        }else{
            setNickError('');
            setIsNick(true);
        }
    }

    // 이메일 변경
    const emailChange = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);
        const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

        if (!emailRegExp.test(emailValue)) {
            setEmailError('올바른 이메일 형식이 아닙니다.');
            setIsEmail(false);
        }else{
            setEmailError('');
            setIsEmail(true);
        }
    }

    // 변경 버튼 활성화
    useEffect(() => {
        if (isEmail && isNick) {
            setActive(true)
        } else {
            setActive(false)
        }
    },[isEmail, isNick])

    // 닉네임, 이메일 변경 기능
    const neChange = async() => {
        try {
            const response = await axios.patch(
                `${baseUrl}/api/users/me`,
                {
                    email: email,
                    nickname: nick,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            );
            alert('변경이 완료되었습니다.');
            setIsOpen(false);
            setCurrentNick(nick);
        } catch (error) {
            console.log(error)
        }
    }

    // 현재 PW 확인
    const crPwChange = (e) => {
        const pwValue = e.target.value;
        setPassword(pwValue);
    }

    const verifyPw = async() => {
        try {
            console.log("입력된 비밀번호:", password);
    
            // 비밀번호 검증 API 호출
            await axios.post(
                `${baseUrl}/api/users/me/verify-password`,
                null,
                {
                    params: {
                        currentPassword: password
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            );
    
            alert("비밀번호가 확인되었습니다.");
            setCrPwError("");
            setIsCrPw(true); 
        } catch (error) {
            console.error("비밀번호 검증 실패:", error.response);
            setCrPwError("비밀번호가 일치하지 않습니다.");
        }
    }

    // 비밀번호 변경
    const pwChange = (e) => {
        const pwValue = e.target.value;
        setPassword(pwValue);
        const pwRegExp = /^[a-zA-z0-9]{6,12}$/;

        if (!pwRegExp.test(pwValue)) {
            setPwError('6 ~ 12 자 사이의 영문 또는 숫자만 입력해 주세요.');
            setIsPw(false);
        }else{
            setPwError('');
            setIsPw(true);
        }
    }

    // PW 확인
    const pwConChange = (e) => {
        const pwConValue = e.target.value;
        setPwCon(pwConValue);
        if (password !== pwConValue) {
            setPwConError('비밀번호가 같지 않습니다.');
            setIsPwCon(false);
        }else{
            setPwConError('')
            setIsPwCon(true);
        }
    }

    // 변경 버튼 활성화
    useEffect(() => {
        if (isPw && isPwCon && isCrPw) {
            setPwActive(true)
        } else {
            setPwActive(false)
        }
    },[isPw, isPwCon, isCrPw])

    // 비밀번호 변경 기능
    const passwordChange = async() => {
        try {
            await axios.put(
                `${baseUrl}/api/users/me/change-password`,
                null,
                {
                    params: {
                        newPassword: pwCon
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            );
    
            alert("비밀번호가 변경되었습니다.");
            setIsOpen(false); 
        } catch (error) {
            console.error(error.response);
        }
    }

    return (
        <>
            <Header />
            <div className='profile_area'>
                <div className='profile_image'>
                    <img className='user_profile' src={`${baseUrl}${image}`} alt="" />
                    <button 
                        className='modi_btn'
                        onClick={toggleHandler}
                    >
                        <img src={Modi} alt="" />
                    </button>
                </div>
                <div className='user_nick'>{currentNick}</div>
            </div>
            <ul className='title_area'>
                {tabData.map((tab, idx) => {
                    return tab.title;
                })}
            </ul>
            <ul className='post_area'>
                {tabData[idx].content}
            </ul>
            {isOpen && (
                <div className="modal">
                    <div className='profile_image'>
                        <label htmlFor="file">
                            <img 
                                src={currentImage}
                            />
                        </label>
                        
                        <p 
                            className={isChange ?  'on' : ''}
                            onClick={profileChange}
                        >
                            프로필 이미지 변경
                        </p>
                        <input 
                            type="file" 
                            id='file' 
                            onChange={imgChange}
                        />
                    </div>
                    <div className='profile_nick'>
                        <input 
                            type="text"
                            defaultValue={nick}
                            placeholder='새 닉네임을 입력해 주세요.'
                            onChange={nickChange}
                        />
                        <span>{nickError}</span>
                        <input 
                            type="text"
                            defaultValue={email} 
                            placeholder='새 이메일을 입력해 주세요.'
                            onChange={emailChange}
                        />
                        <span>{emailError}</span>
                        <button
                            className={active ? 'on' : ''}
                            onClick={neChange}
                        >
                            변경
                        </button>
                    </div>
                    <div className='profile_password'>
                        <h2>새 비밀번호</h2>
                        <input 
                            type="password" 
                            placeholder='현재 비밀번호를 입력해 주세요.'
                            onChange={crPwChange}
                        />
                        <span>{crPwError}</span>
                        <button
                            className='on'
                            onClick={verifyPw}
                        >
                            확인
                        </button>
                        <input 
                            type="password" 
                            placeholder='새 비밀번호를 입력해 주세요.'
                            onChange={pwChange}
                        />
                        <span>{pwError}</span>
                        <input 
                            type="password" 
                            placeholder='비밀 번호를 다시 입력해 주세요.'
                            onChange={pwConChange}
                            />
                        <span>{pwConError}</span>
                        <button
                            className={pwActive ? 'on' : ''}
                            onClick={passwordChange}
                        >
                            변경
                        </button>
                    </div>
                    <button
                        className='close_modal'
                        onClick={() => setIsOpen(false)}
                    >
                        ×
                    </button>
                </div>
            )}
        </>
    );
};

export default MyPage;