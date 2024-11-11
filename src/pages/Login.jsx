import React, { useState } from 'react';
import supabase from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('로그인 에러:', error);
      alert('로그인에 실패했습니다: ' + error.message);
    } else {
      alert('로그인에 성공했습니다!');
      navigate('/');
    }
  };
  const handleSocialLogin = async (provider) => {
    const { error } = await supabase.auth.signIn(
      {
        provider,
      },
      {
        redirectTo: window.location.origin,
      }
    );
    if (error) {
      alert('소셜 로그인에 실패했습니다: ' + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen mt-16">
      <div className="p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
        <form onSubmit={handleLogin}>
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
              className="input text-black"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn w-full">
            로그인
          </button>
          <div className="mt-6">
            <button
              onClick={() => handleSocialLogin('google')}
              className="btn btn-secondary w-full mb-2"
            >
              Google로 로그인
            </button>
            <button
              onClick={() => handleSocialLogin('github')}
              className="btn btn-secondary w-full"
            >
              GitHub로 로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
