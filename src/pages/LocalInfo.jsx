// ご当地情報・イベント情報画面（ダミーデータ）
import { useState } from 'react'

const localData = {
  gourmet: [
    { name: 'もんじゃ焼き', area: '東京・月島', desc: '下町の定番！具材を混ぜて焼くのが楽しい東京のソウルフード。', emoji: '🍳' },
    { name: '生しらす丼', area: '神奈川・鎌倉', desc: '海が近い鎌倉ならではの新鮮な生しらすをたっぷり乗せた丼。', emoji: '🐟' },
    { name: '富士宮やきそば', area: '静岡・富士宮', desc: '独特の太めな麺が特徴。B級グルメの王道として全国区の人気。', emoji: '🍜' },
    { name: '黒カレー', area: '北海道・函館', desc: 'イカ墨を使った黒いカレー。見た目のインパクト大で味も絶品！', emoji: '🦑' },
  ],
  spots: [
    { name: '浅草雷門', area: '東京・台東区', desc: '東京を代表する観光地。仲見世通りのお土産巡りも楽しい。', emoji: '⛩️' },
    { name: '鎌倉大仏', area: '神奈川・鎌倉', desc: '高さ約13mの青銅製の大仏。内部にも入れる歴史スポット。', emoji: '🗿' },
    { name: '富士山五合目', area: '静岡・山梨', desc: 'ドライブで気軽に行ける絶景スポット。雲海が見られることも。', emoji: '🗻' },
    { name: '小樽運河', area: '北海道・小樽', desc: '夜はライトアップされてロマンチックな雰囲気に。', emoji: '🌊' },
  ],
  trivia: [
    { title: '東京のタコ焼き？', content: '東京では「もんじゃ焼き」が大人気ですが、実はタコ焼き発祥の地は大阪の会津橋周辺と言われています。' },
    { title: '桜の種類は800以上！', content: '日本には約800種類もの桜の品種があります。ソメイヨシノは全体の80%を占める人気品種。' },
    { title: '新幹線は時速320km', content: '東北新幹線「はやぶさ」の最高速度は時速320km。東京〜新函館北斗が約4時間で結ばれています。' },
    { title: 'コンビニ数は約6万店舗', content: '日本のコンビニは全国に約6万店舗。24時間365日、日本の休日を支えてくれています！' },
  ],
  events: [
    { name: '夏祭り・花火大会シーズン', period: '7月〜8月', desc: '全国各地で花火大会や夏祭りが開催。浴衣を着て屋台グルメを楽しもう！', emoji: '🎆' },
    { name: '紅葉狩り', period: '10月〜11月', desc: '山や公園が赤・黄・オレンジに染まる季節。各地の紅葉スポットへ出かけよう。', emoji: '🍁' },
    { name: '桜まつり', period: '3月〜4月', desc: '日本の春の風物詩。お花見シートを広げてのんびり桜を楽しもう！', emoji: '🌸' },
    { name: 'ランタンフェスティバル', period: '2月（長崎）', desc: '長崎で毎年開催される幻想的なランタンのお祭り。夜の景色が絶景！', emoji: '🏮' },
  ],
}

const tabs = [
  { key: 'gourmet', label: '🍴 名物グルメ' },
  { key: 'spots', label: '📸 観光スポット' },
  { key: 'trivia', label: '💡 豆知識' },
  { key: 'events', label: '🎉 イベント情報' },
]

export default function LocalInfo() {
  const [activeTab, setActiveTab] = useState('gourmet')

  return (
    <div className="page">
      <h1 className="page-title">📍 ご当地情報・イベント情報</h1>
      <p className="page-sub">全国の名物グルメ・観光スポット・イベントを探そう！</p>

      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="card-grid">
        {activeTab === 'gourmet' && localData.gourmet.map((item, i) => (
          <div key={i} className="info-card">
            <div className="info-emoji">{item.emoji}</div>
            <h3 className="info-name">{item.name}</h3>
            <p className="info-area">📌 {item.area}</p>
            <p className="info-desc">{item.desc}</p>
          </div>
        ))}
        {activeTab === 'spots' && localData.spots.map((item, i) => (
          <div key={i} className="info-card">
            <div className="info-emoji">{item.emoji}</div>
            <h3 className="info-name">{item.name}</h3>
            <p className="info-area">📌 {item.area}</p>
            <p className="info-desc">{item.desc}</p>
          </div>
        ))}
        {activeTab === 'trivia' && localData.trivia.map((item, i) => (
          <div key={i} className="info-card trivia-card">
            <div className="info-emoji">💡</div>
            <h3 className="info-name">{item.title}</h3>
            <p className="info-desc">{item.content}</p>
          </div>
        ))}
        {activeTab === 'events' && localData.events.map((item, i) => (
          <div key={i} className="info-card">
            <div className="info-emoji">{item.emoji}</div>
            <h3 className="info-name">{item.name}</h3>
            <p className="info-area">🗓️ {item.period}</p>
            <p className="info-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
