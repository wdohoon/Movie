import React from 'react';

const Signup = () => {
  return (
    <div className="flex items-center justify-center min-h-screen mt-16">
      <div className="p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>
        <form>
          <div className="mb-4">
            <label className="block">이름</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded mt-2"
              placeholder="이름을 입력하세요"
            />
          </div>
          <div className="mb-4">
            <label className="block">이메일</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded mt-2"
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div className="mb-4">
            <label className="block">비밀번호</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded mt-2"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <div className="mb-6">
            <label className="block">비밀번호 확인</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded mt-2"
              placeholder="비밀번호를 다시 입력하세요"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded dark:bg-white bg-black text-white dark:text-black"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
