import React from 'react';

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen mt-16">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">이메일 또는 아이디</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded mt-2"
              placeholder="이메일 또는 아이디를 입력하세요"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">비밀번호</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded mt-2"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
