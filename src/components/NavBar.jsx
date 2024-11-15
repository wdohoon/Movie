import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Search, User, Menu, X } from 'lucide-react'
import { ThemeContext } from "../contexts/ThemeContext"
import { AuthContext } from "../contexts/AuthContext"
import supabase from "../contexts/SupabaseClient"

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const { theme, toggleTheme } = useContext(ThemeContext)
  const { user } = useContext(AuthContext)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      alert('로그아웃에 실패했습니다: ' + error.message)
    } else {
      alert('로그아웃되었습니다.')
      setMenuOpen(false)
    }
  }

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-red-600">MovieDH</span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">홈</Link>
                <Link to="/genres" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">장르별 영화</Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <form className="relative mr-3">
                <input
                  type="search"
                  placeholder="영화 검색..."
                  className="bg-gray-700 text-white pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </form>
              <button size="icon" variant="ghost" onClick={toggleTheme}>
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
              {user ? (
                <div className="relative ml-3">
                  <div>
                    <button size="icon" variant="ghost" onClick={() => setMenuOpen(!menuOpen)}>
                      <User size={20} />
                    </button>
                  </div>
                  {menuOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-800 ring-1 ring-black ring-opacity-5">
                      <Link to="/mypage" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700" onClick={() => setMenuOpen(false)}>
                        마이 페이지
                      </Link>
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                        로그아웃
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link to="/signup" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    회원가입
                  </Link>
                  <Link to="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    로그인
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button size="icon" variant="ghost" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">홈</Link>
            <Link to="/genres" className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">장르별 영화</Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <User size={40} />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium leading-none text-white">{user ? user.email : 'Guest'}</div>
              </div>
              <button size="icon" variant="ghost" className="ml-auto" onClick={toggleTheme}>
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
            </div>
            <div className="mt-3 px-2 space-y-1">
              {user ? (
                <>
                  <Link to="/mypage" className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">마이 페이지</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <Link to="/signup" className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">회원가입</Link>
                  <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">로그인</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}