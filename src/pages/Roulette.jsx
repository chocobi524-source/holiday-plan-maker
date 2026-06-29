// 休日ルーレット画面
import { useState } from 'react'

// ランダムな休日ミッション一覧
const missions = [
  { emoji: '🌸', title: '公園でピクニック', desc: 'お弁当を持って近くの公園へ。青空の下でのんびり過ごそう！' },
  { emoji: '📚', title: '図書館で読書マラソン', desc: '気になっていた本を3冊選んで、読書に集中する日にしよう。' },
  { emoji: '🍜', title: '食べ歩きツアー', desc: '気になっていた街を歩きながら、ローカルグルメを食べ歩き！' },
  { emoji: '🎨', title: '美術館・博物館めぐり', desc: '普段は行かない美術館や博物館に行って、新しい発見をしよう。' },
  { emoji: '🚲', title: 'サイクリング冒険', desc: '自転車で知らない道を探検！どこに着くかはお楽しみ。' },
  { emoji: '♨️', title: '日帰り温泉でリフレッシュ', desc: '近場の温泉施設でゆっくり。疲れを全部流しちゃおう！' },
  { emoji: '🎬', title: '映画館で話題作を鑑賞', desc: '気になっていた映画を映画館で見よう。ポップコーンも忘れずに！' },
  { emoji: '🧁', title: 'おうちでお菓子作り', desc: '好きなお菓子を手作りしてみよう。失敗も楽しさのうち！' },
  { emoji: '🌅', title: '朝活チャレンジ', desc: '早起きして日の出を見に行こう。達成感が半端ない！' },
  { emoji: '🎮', title: '友達とゲーム大会', desc: '友達を呼んでボードゲームやテレビゲームで盛り上がろう！' },
  { emoji: '🌿', title: '植物園・動物園へ', desc: '自然に触れてほっこりしよう。動物たちに癒されよう！' },
  { emoji: '📸', title: '写真散歩', desc: 'カメラやスマホを持って、素敵な写真スポットを探しながら散歩。' },
  { emoji: '🍳', title: '新レシピに挑戦', desc: 'ずっと気になっていたレシピを作ってみよう。料理は冒険だ！' },
  { emoji: '🎯', title: 'ボウリング＆カラオケ', desc: '友達と王道の休日エンタメで盛り上がろう！' },
  { emoji: '🌊', title: '川・湖でのんびり', desc: '水辺に行って、ぼーっとするだけでも最高のリフレッシュ！' },
]

export default function Roulette() {
  const [mission, setMission] = useState(null)
  const [spinning, setSpinning] = useState(false)

  const spin = () => {
    setSpinning(true)
    setMission(null)
    // スピン演出（1.5秒後に結果を表示）
    setTimeout(() => {
      const idx = Math.floor(Math.random() * missions.length)
      setMission(missions[idx])
      setSpinning(false)
    }, 1500)
  }

  return (
    <div className="page">
      <h1 className="page-title">🎡 休日ルーレット</h1>
      <p className="page-sub">ボタンを押して、今日のミッションを決めよう！</p>

      <div className="roulette-center">
        <div className={`roulette-wheel ${spinning ? 'spinning' : ''}`}>
          {spinning ? '🎡' : mission ? mission.emoji : '🎲'}
        </div>
        <button className="btn-roulette" onClick={spin} disabled={spinning}>
          {spinning ? '回転中...' : 'ルーレットを回す！'}
        </button>
      </div>

      {mission && !spinning && (
        <div className="card mission-card">
          <div className="mission-emoji">{mission.emoji}</div>
          <h2 className="mission-title">{mission.title}</h2>
          <p className="mission-desc">{mission.desc}</p>
          <button className="btn-secondary" onClick={spin}>もう一回まわす 🔄</button>
        </div>
      )}

      <div className="card">
        <h3 className="missions-list-title">🎯 ミッション一覧</h3>
        <div className="missions-grid">
          {missions.map((m, i) => (
            <div key={i} className="mission-chip">
              {m.emoji} {m.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
