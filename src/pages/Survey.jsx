// アンケート診断画面
import { useState } from 'react'

// 診断結果のダミーデータ
const results = [
  { condition: (a) => a.outside === 'はい' && a.budget === '多め' && a.weather === '晴れ', plan: '🏖️ 海辺ドライブ＆シーフードランチ', detail: '天気も良くて予算もOK！ドライブで海沿いを走り、新鮮なシーフードを楽しもう。帰りは夕日鑑賞もおすすめ。' },
  { condition: (a) => a.outside === 'はい' && a.mood === 'アクティブ', plan: '🥾 ハイキング＆山頂カフェ', detail: '体を動かしたい気分にぴったり！近くの低山ハイキングで自然を満喫。山頂からの景色は格別です。' },
  { condition: (a) => a.outside === 'いいえ', plan: '🏠 おうちカフェ＆映画マラソン', detail: 'おうちでゆっくり過ごすのが一番！お気に入りの映画を並べて、手作りスイーツと一緒に楽しもう。' },
  { condition: (a) => a.tired === 'かなり疲れてる', plan: '♨️ 日帰り温泉リフレッシュデー', detail: '疲れを癒すなら温泉が最高！近くの日帰り温泉でゆっくり過ごして、ランチは温泉地グルメを。' },
  { condition: (a) => a.who === '子供と', plan: '🎠 テーマパーク＆ファミリーランチ', detail: '子供も大喜び！テーマパークやアクティビティ施設で一日遊んで、みんなで楽しい思い出を作ろう。' },
  { condition: (a) => a.mood === 'まったり', plan: '☕ 街歩き＆カフェ巡り', detail: 'のんびりした気分にぴったり！お気に入りのエリアを散歩しながら、素敵なカフェを見つけよう。' },
]

const defaultPlan = { plan: '🌟 近場のお散歩＆ランチ', detail: 'どんな気分でも楽しめる定番コース！近所のお気に入りの場所を散歩して、美味しいランチを食べよう。' }

export default function Survey() {
  const [answers, setAnswers] = useState({ outside: '', tired: '', budget: '', weather: '', who: '', mood: '' })
  const [result, setResult] = useState(null)
  const [step, setStep] = useState(0)

  const questions = [
    { key: 'outside', label: '外に出たいですか？', options: ['はい', 'いいえ', 'どちらでも'] },
    { key: 'tired', label: '今どのくらい疲れていますか？', options: ['元気いっぱい', '少し疲れてる', 'かなり疲れてる'] },
    { key: 'budget', label: '今日の予算は？', options: ['少なめ（〜3000円）', '普通（3000〜8000円）', '多め（8000円以上）'] },
    { key: 'weather', label: '今日の天気は？', options: ['晴れ', '曇り', '雨'] },
    { key: 'who', label: '誰と行きますか？', options: ['ひとりで', 'パートナーと', '友達と', '子供と'] },
    { key: 'mood', label: '今日の気分は？', options: ['アクティブ', 'まったり', 'ワクワク', '癒されたい'] },
  ]

  const currentQ = questions[step]

  const handleSelect = (value) => {
    const newAnswers = { ...answers, [currentQ.key]: value }
    setAnswers(newAnswers)
    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      // 回答から最適なプランを選択
      const matched = results.find(r => r.condition(newAnswers))
      setResult(matched || defaultPlan)
    }
  }

  const reset = () => {
    setAnswers({ outside: '', tired: '', budget: '', weather: '', who: '', mood: '' })
    setResult(null)
    setStep(0)
  }

  return (
    <div className="page">
      <h1 className="page-title">🔍 アンケート診断</h1>
      <p className="page-sub">6つの質問に答えて、ぴったりのプランを見つけよう！</p>

      {!result ? (
        <div className="card survey-card">
          <div className="survey-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${((step) / questions.length) * 100}%` }} />
            </div>
            <span className="progress-text">{step + 1} / {questions.length}</span>
          </div>
          <h2 className="survey-question">{currentQ.label}</h2>
          <div className="survey-options">
            {currentQ.options.map(opt => (
              <button key={opt} className="survey-option-btn" onClick={() => handleSelect(opt)}>
                {opt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="card result-card">
          <div className="result-emoji">🎉</div>
          <h2 className="result-plan-title">{result.plan}</h2>
          <p className="result-detail">{result.detail}</p>
          <button className="btn-primary" onClick={reset}>もう一度診断する</button>
        </div>
      )}
    </div>
  )
}
