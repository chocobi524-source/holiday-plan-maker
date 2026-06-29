// アプリのルーティング定義
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import Layout from './components/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import PlanMaker from './pages/PlanMaker'
import Survey from './pages/Survey'
import Roulette from './pages/Roulette'
import LocalInfo from './pages/LocalInfo'
import OutingLog from './pages/OutingLog'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* 公開ルート */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 認証が必要なルート */}
          <Route path="/" element={
            <PrivateRoute>
              <Layout><Home /></Layout>
            </PrivateRoute>
          } />
          <Route path="/plan" element={
            <PrivateRoute>
              <Layout><PlanMaker /></Layout>
            </PrivateRoute>
          } />
          <Route path="/survey" element={
            <PrivateRoute>
              <Layout><Survey /></Layout>
            </PrivateRoute>
          } />
          <Route path="/roulette" element={
            <PrivateRoute>
              <Layout><Roulette /></Layout>
            </PrivateRoute>
          } />
          <Route path="/local" element={
            <PrivateRoute>
              <Layout><LocalInfo /></Layout>
            </PrivateRoute>
          } />
          <Route path="/log" element={
            <PrivateRoute>
              <Layout><OutingLog /></Layout>
            </PrivateRoute>
          } />

          {/* 未定義のパスはホームへ */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
