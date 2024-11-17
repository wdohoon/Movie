import React, { useState } from 'react';
import supabase from '../contexts/SupabaseClient.js';
import { useNavigate } from 'react-router-dom';
import { z } from "zod";
import { Eye, EyeOff, Mail, Lock, Github } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const loginSchema = z.object({
    email: z.string().email('유효한 이메일 주소를 입력해주세요.'),
    password: z.string().nonempty('비밀번호를 입력해주세요.'),
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      loginSchema.parse(formData);

      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        console.error('로그인 에러:', error);
        alert('로그인에 실패했습니다: ' + error.message);
      } else {
        alert('로그인에 성공했습니다!');
        navigate('/');
      }
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        const errors = {};
        validationError.errors.forEach((err) => {
          errors[err.path[0]] = err.message;
        });
        setFormErrors(errors);
      } else {
        console.error('유효성 검사 에러:', validationError);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '' });
  };

  const handleKakaoLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) {
      console.error('카카오 로그인 에러:', error);
      alert('카카오 로그인에 실패했습니다: ' + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      console.error('구글 로그인 에러:', error);
      alert('구글 로그인에 실패했습니다: ' + error.message);
    }
  };

  const handleGitHubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    });

    if (error) {
      console.error('깃허브 로그인 에러:', error);
      alert('깃허브 로그인에 실패했습니다: ' + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">로그인</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">이메일</label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
                placeholder="이메일을 입력하세요"
                value={formData.email}
                onChange={handleChange}
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            {formErrors.email && <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">비밀번호</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10 pr-10"
                placeholder="비밀번호를 입력하세요"
                value={formData.password}
                onChange={handleChange}
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {formErrors.password && <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
          >
            로그인
          </button>
        </form>
        <div className="mt-6 space-y-4">
          <button
            onClick={handleKakaoLogin}
            className="w-full bg-yellow-400 text-gray-900 py-2 px-4 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition duration-200 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3C6.477 3 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zM9.5 16.5H7.7v-4.9H6.5v-1.7h4.2v1.7h-1.2v4.9zm7.3 0h-1.7l-2.3-3.1v3.1h-1.7v-6.6h1.7l2.3 3.1v-3.1h1.7v6.6z"/>
            </svg>
            카카오로 로그인
          </button>
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white text-gray-900 py-2 px-4 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200 flex items-center justify-center border border-gray-300"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
              />
              <path
                fill="#34A853"
                d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09c1.97 3.92 6.02 6.62 10.71 6.62z"
              />
              <path
                fill="#FBBC05"
                d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29v-3.09h-3.98c-.8 1.6-1.26 3.41-1.26 5.38s.46 3.78 1.26 5.38l3.98-3.09z"
              />
              <path
                fill="#EA4335"
                d="M12.255 5.04c1.77 0 3.35.61 4.6 1.8l3.42-3.42c-2.07-1.94-4.78-3.13-8.02-3.13-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
              />
            </svg>
            구글로 로그인
          </button>
          <button
            onClick={handleGitHubLogin}
            className="w-full bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200 flex items-center justify-center"
          >
            <Github className="w-5 h-5 mr-2" />
            깃허브로 로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;