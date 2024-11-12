import React, {useState} from 'react';
import supabase from '../contexts/SupabaseClient.js';
import {useNavigate} from 'react-router-dom';
import {z} from "zod";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});
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
    // 입력 변경 시 에러 메시지 초기화
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
    <div className="flex items-center justify-center min-h-screen mt-16">
      <div className="p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block">이메일</label>
            <input
              type="email"
              name="email"
              className="input text-black"
              placeholder="이메일을 입력하세요"
              value={formData.email}
              onChange={handleChange}
            />
            {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block">비밀번호</label>
            <input
              type="password"
              name="password"
              className="input text-black"
              placeholder="비밀번호를 입력하세요"
              value={formData.password}
              onChange={handleChange}
            />
            {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
          </div>
          <button type="submit" className="btn w-full">
            로그인
          </button>
          <div className="mt-6">
            <button
              onClick={() => handleKakaoLogin('kakao')}
              className="btn btn-kakao w-full mt-4"
            >
              카카오로 로그인
            </button>
            <button onClick={handleGoogleLogin} className="btn btn-google w-full mt-4">
              구글로 로그인
            </button>
            <button onClick={handleGitHubLogin} className="btn btn-github w-full mt-4">
              깃허브로 로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
