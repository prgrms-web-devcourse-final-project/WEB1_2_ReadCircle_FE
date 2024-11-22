
import React, { useState } from 'react';
import LoginImage from '../assets/LoginPage.png';
import Logo from '../assets/Logo.svg';
import '../styles/css/LoginPage.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const loginFn = async() => {
        try {
            const response = await axios.post(
                'http://localhost:5000/api/auth/login', {
                    userId: id,
                    password: pw
                }
            )
    
            const { token } = response.data;
            localStorage.setItem('jwt', token);
            
            alert('로그인 성공');
            navigate('/');

        } catch (error) {
            console.log(error);
            setError('아이디 또는 비밀번호가 잘못되었습니다.')
        }
    }

    return (
        <>
            <img src={LoginImage} alt="" />
            <div className="logos">
                <img src={Logo} alt="" />
                <h2>로그인</h2>
            </div>
            <div className="login_area">
                <div className="id_area">
                    <p>아이디</p>
                    <input 
                        type="text" 
                        placeholder='아이디를 입력해 주세요.' 
                        value={id}
                        onChange={(e) => {setId(e.target.value)}}
                    />
                </div>
                <div className="pw_area">
                    <p>비밀번호</p>
                    <input 
                        type="password" 
                        placeholder='비밀번호를 입력해 주세요.' 
                        value={pw}
                        onChange={(e) => {setPw(e.target.value)}}
                    />
                </div>
                <p className='error_message'>{error}</p>
            </div>
            <div className='btn_area'>
                <button className='join_btn'>
                    <Link to="/join">회원 가입</Link>
                </button>
                <button className='login_btn'
                onClick={loginFn}>로그인</button>
            </div>
        </>
    );
};

export default LoginPage;