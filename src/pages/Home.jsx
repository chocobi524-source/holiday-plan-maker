// ホーム画面
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const menuCards = [
  { path: '/plan', emoji: '📋', title: 'プラン作成', desc: '行き先・予算・移動手段を入力してプランを作成' },
  { path: '/survey', emoji: '🔍', title: 'アンケート診断', desc: '気分や疲れ具合から最適なプランを提案' },
  { path: '/roulette', emoji: '🎡', title: '休日ルーレット', desc: 'ランダムな休日ミッションに挑戦！' },
  { path: '/local', emoji: '📍', title: 'ご当地情報', desc: '名物グルメ・観光スポット・イベント情報' },
  { path: '/log', emoji: '📓', title: 'おでかけログ', desc: '行った場所を記録して思い出を残そう' },
]

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="page">
      <div className="hero">
        <div className="hero-emoji">🌞</div>
        <h1 className="hero-title">休日プランメーカー</h1>
        <p className="hero-sub">
          {user?.email} さん、今日はどこ行く？
        </p>
      </div>
      <div className="card-grid">
        {menuCards.map(card => (
          <Link to={card.path} key={card.path} className="menu-card">
            <div className="menu-card-emoji">{card.emoji}</div>
            <h2 className="menu-card-title">{card.title}</h2>
            <p className="menu-card-desc">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
