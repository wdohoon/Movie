// src/pages/Signup.jsx
import React, { useState } from 'react';
import supabase from '../supabaseClient';
import {useNavigate} from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      alert('유효한 이메일 주소를 입력해주세요.');
      return;
    }

    if (password.length < 6) {
      alert('비밀번호는 최소 6자리 이상이어야 합니다.');
      return;
    }

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      console.error('회원가입 에러:', error);
      alert('회원가입에 실패했습니다: ' + error.message);
    } else {
      alert('회원가입에 성공했습니다.');
      navigate('/');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen mt-16">
      <div className="p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block">이름</label>
            <input
              type="text"
              className="input text-black"
              placeholder="이름을 입력하세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block">이메일</label>
            <input
              type="email"
              className="input text-black"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block">비밀번호</label>
            <input
              type="password"
              className="input"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block">비밀번호 확인</label>
            <input
              type="password"
              className="input"
              placeholder="비밀번호를 다시 입력하세요"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn w-full">
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
