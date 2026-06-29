// 未ログイン時にログイン画面へリダイレクトするガード
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) return <div className="loading">読み込み中...</div>
  if (!user) return <Navigate to="/login" replace />

  return children
}
