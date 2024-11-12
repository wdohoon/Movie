import React, { useState } from 'react';
import supabase from '../contexts/SupabaseClient.js';
import { z } from 'zod';
import {useNavigate} from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const signupSchema = z
    .object({
      name: z.string().nonempty('이름을 입력해주세요.'),
      email: z.string().email('유효한 이메일 주소를 입력해주세요.'),
      password: z.string().min(6, '비밀번호는 최소 6자리 이상이어야 합니다.'),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: '비밀번호가 일치하지 않습니다.',
      path: ['confirmPassword'],
    });

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      signupSchema.parse(formData);

      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
          },
        },
      });

      if (error) {
        console.error('회원가입 에러:', error);
        alert('회원가입에 실패했습니다: ' + error.message);
      } else {
        alert('회원가입에 성공했습니다! 이메일을 확인해주세요.');
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

  return (
    <div className="flex items-center justify-center min-h-screen mt-16">
      <div className="p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block">이름</label>
            <input
              type="text"
              name="name"
              className="input text-black"
              placeholder="이름을 입력하세요"
              value={formData.name}
              onChange={handleChange}
            />
            {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
          </div>
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
          <div className="mb-4">
            <label className="block">비밀번호 확인</label>
            <input
              type="password"
              name="confirmPassword"
              className="input text-black"
              placeholder="비밀번호를 다시 입력하세요"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {formErrors.confirmPassword && (
              <p className="text-red-500 text-sm">{formErrors.confirmPassword}</p>
            )}
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
