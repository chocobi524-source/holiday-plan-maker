// 会員登録画面
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (password !== confirm) {
      setError('パスワードが一致しません')
      return
    }
    if (password.length < 6) {
      setError('パスワードは6文字以上で入力してください')
      return
    }
    setLoading(true)
    const { error } = await signUp(email, password)
    if (error) {
      setError('登録に失敗しました。別のメールアドレスをお試しください')
    } else {
      setMessage('確認メールを送信しました。メールのリンクをクリックして登録を完了してください。')
    }
    setLoading(false)
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">🌟</div>
        <h1 className="auth-title">新規登録</h1>
        <p className="auth-sub">アカウントを作って休日をもっと楽しく！</p>
        {message ? (
          <div className="success-box">
            <p>{message}</p>
            <button className="btn-primary" onClick={() => navigate('/login')}>
              ログイン画面へ
            </button>
          </div>
        ) : (
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
            <label className="form-label">パスワード（6文字以上）</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="パスワードを入力"
              required
            />
            <label className="form-label">パスワード（確認）</label>
            <input
              type="password"
              className="form-input"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              placeholder="もう一度入力"
              required
            />
            {error && <p className="form-error">{error}</p>}
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? '登録中...' : '登録する'}
            </button>
          </form>
        )}
        <p className="auth-link">
          すでにアカウントをお持ちの方は <Link to="/login">ログイン</Link>
        </p>
      </div>
    </div>
  )
}
