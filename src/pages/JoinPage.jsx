
import React, { useEffect, useState } from 'react';
import Logo from '../assets/Logo.svg';
import '../styles/css/JoinPage.css';
import { Form, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import DaumPostCode from 'react-daum-postcode';

const JoinPage = () => {
    // 초기 값 세팅
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [pwCon, setPwCon] = useState('');
    const [nick, setNick] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
    const [File, setFile] = useState(null);
    const [address, setAddress] = useState('');
    const [zonecode, setZonecode] = useState('');
    const [detail, setDetail] = useState('');

    // 오류 메세지
    const [idError, setIdError] = useState('');
    const [pwError, setPwError] = useState('');
    const [pwConError, setPwConError] = useState('');
    const [nickError, setNickError] = useState('');
    const [emailError, setEmailError] = useState('');

    // 유효성 검사
    const [isId, setIsId] = useState(false);
    const [isPw, setIsPw] = useState(false);
    const [isPwCon, setIsPwCon] = useState(false);
    const [isNick, setIsNick] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isAdress, setIsAddress] = useState(false);
    const [active, setActive] = useState(false);
    
    // 유저 ID 설정
    const idChange = (e) => {
        const idValue = e.target.value;
        setId(idValue);
        const idRegExp = /^[a-zA-z0-9]{4,8}$/;
        
        if (!idRegExp.test(idValue)) {
            setIdError("4 ~ 8 자 사이의 영문 또는 숫자만 입력해 주세요.");
            setIsId(false)
        }else{
            setIdError('');
            setIsId(true)
        }
    }

    // 유저 PW 설정
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

    // 유저 닉네임 설정
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

    // 유저 Email 설정
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

    // 유저 이미지 변경
    const imgChange = (e) => {
        const selectFile = e.target.files[0];
        if (selectFile) {
            setFile(selectFile);
            const fileUrl = URL.createObjectURL(selectFile);
            setImage(fileUrl);
        }
    }

    // 주소 입력
    const closeHandler = (state) => {
        if (state === 'FORCE_CLOSE') {
            setIsOpen(false);
          } else if (state === 'COMPLETE_CLOSE') {
            setIsOpen(false);
          }
    }

    const completeHandler = (data) => {
        const {address, zonecode} = data;
        setAddress(address);
        setZonecode(zonecode);
        setIsAddress(true);
    }

    const toggleHandler = () => {
        setIsOpen((prev) => !prev);
    }

    const inputHandler = (e) => {
        setAddress(e.target.value)
    }

    const detailChange = (e) => {
        const detailValue  = e.target.value;
        setDetail(detailValue);
    }

    // 회원가입 버튼 활성화
    useEffect(() => {
        if (isId && isPw && isPwCon && isEmail && isNick && isAdress) {
            setActive(true)
        } else {
            setActive(false)
        }
    },[isId, isPw, isPwCon, isEmail, isNick, isAdress])

   // 회원가입 요청 처리
   const joinFn = async() => {
    try {
        const formData = new FormData();
        formData.append(
            'request', 
            new Blob(
                [
                    JSON.stringify({
                        userId: id,
                        password: password,
                        email: email,
                        nickname: nick,
                        address: address + zonecode + detail
                    })
                ],
                {type: "application/json"}
            )
        );
        formData.append('image', File);

        console.log('FormData 내용:');
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}:`, pair[1]);
        }

        await axios.post(
            'http://13.209.5.86:5000/api/users/signup',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        alert('회원가입이 완료되었습니다!');
        navigate('/login');
    } catch (error) {
        console.log(error);
        alert('회원가입에 실패했습니다. 다시 시도해주세요.')
    }
   }

    return (
        <>
            <Header />
            <div className="logos">
                <img src={Logo} alt="" />
                <h2>회원 가입</h2>
            </div>
            <div className="form_area">
                <div className="id_area">
                    <p>아이디</p>
                    <input 
                        type="text" 
                        placeholder='4 ~ 8자의 영문, 숫자 조합의 아이디를 입력해 주세요.'
                        value={id}
                        onChange={idChange}
                        maxLength={8} 
                    />
                    <span>{idError}</span>
                </div>
                <div className="pw_area">
                    <p>비밀번호</p>
                    <input 
                        type="password" 
                        placeholder='8 ~ 12 자 사이의 비밀번호를 입력해 주세요.' 
                        value={password}
                        onChange={pwChange}
                    />
                    <span>{pwError}</span>
                </div>
                <div className="pw_check_area">
                    <p>비밀번호 확인</p>
                    <input
                        type="password" placeholder='비밀번호를 다시 입력해 주세요.' 
                        value={pwCon}
                        onChange={pwConChange}
                    />
                    <span>{pwConError}</span>
                </div>
                <div className="address_area">
                    <p>주소</p>
                    <input 
                        placeholder='주소를 검색해주세요'
                        disabled={true}
                        value={address + zonecode}
                        onChange={inputHandler}
                    />
                    <input 
                        className='detail_input'
                        type="text" 
                        placeholder='상세 주소를 입력해 주세요'
                        value={detail}
                        onChange={detailChange}
                    />
                    <button
                        onClick={toggleHandler}
                        className='address_btn'
                    >
                        주소 찾기
                    </button>
                </div>
                <div className="profile_area">
                    <p>프로필 이미지</p>
                    <label htmlFor="file">
                        <img 
                            src={image}
                        />
                        <p>프로필 이미지 추가</p>
                    </label>
                    <input 
                        type="file" 
                        id='file' 
                        onChange={imgChange}
                    />
                </div>
                <div className="nick_area">
                    <p>닉네임</p>
                    <input 
                        type="text" 
                        placeholder='최대 8 자 까지 가능합니다.' 
                        value={nick}
                        onChange={nickChange}
                    />
                    <span>{nickError}</span>
                </div>
                <div className="email_area">
                    <p>이메일</p>
                    <input 
                        type="text" 
                        placeholder='ex) abc@naver.com' 
                        value={email}
                        onChange={emailChange}
                    />
                    <span>{emailError}</span>
                </div>
            </div>
            <button
                disabled={!active}
                className={active ? 'join_btn' : 'de_join_btn'}
                onClick={joinFn}
            >
                회원 가입
            </button>
            {isOpen && (
                <div className='modal_area'>
                    <DaumPostCode
                        className='daum_post'
                        onComplete={completeHandler}
                        onClose={closeHandler}
                    />
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

export default JoinPage;