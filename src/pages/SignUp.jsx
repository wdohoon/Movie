import React, { useState } from 'react';
import supabase from '../contexts/SupabaseClient.js';
import { z } from 'zod';
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    setFormErrors({ ...formErrors, [e.target.name]: '' });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">회원가입</h2>
        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">이름</label>
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
                placeholder="이름을 입력하세요"
                value={formData.name}
                onChange={handleChange}
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            {formErrors.name && <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>}
          </div>
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
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">비밀번호 확인</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10 pr-10"
                placeholder="비밀번호를 다시 입력하세요"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {formErrors.confirmPassword && <p className="mt-1 text-sm text-red-600">{formErrors.confirmPassword}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;