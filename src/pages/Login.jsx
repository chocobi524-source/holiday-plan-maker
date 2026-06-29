// ログイン画面
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await signIn(email, password)
    if (error) {
      setError('メールアドレスまたはパスワードが正しくありません')
    } else {
      navigate('/')
    }
    setLoading(false)
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">🌞</div>
        <h1 className="auth-title">休日プランメーカー</h1>
        <p className="auth-sub">ログインして休日を楽しもう！</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <label className="form-label">メールアドレス</label>
          <input
            type="email"
            className="form-input"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="example@email.com"
            required
          />
          <label className="form-label">パスワード</label>
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="パスワードを入力"
            required
          />
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'ログイン中...' : 'ログイン'}
          </button>
        </form>
        <p className="auth-link">
          アカウントをお持ちでない方は <Link to="/register">新規登録</Link>
        </p>
      </div>
    </div>
  )
}
