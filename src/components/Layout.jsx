// 共通レイアウト（ヘッダー・ナビゲーション）
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const navItems = [
  { path: '/', label: '🏠 ホーム' },
  { path: '/plan', label: '📋 プラン作成' },
  { path: '/survey', label: '🔍 診断' },
  { path: '/roulette', label: '🎡 ルーレット' },
  { path: '/local', label: '📍 ご当地情報' },
  { path: '/log', label: '📓 おでかけログ' },
]

export default function Layout({ children }) {
  const { signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="app-wrapper">
      <header className="header">
        <div className="header-inner">
          <Link to="/" className="logo">🌞 休日プランメーカー</Link>
          <button className="logout-btn" onClick={handleLogout}>ログアウト</button>
        </div>
        <nav className="nav">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="main">{children}</main>
      <footer className="footer">© 2025 休日プランメーカー</footer>
    </div>
  )
}
