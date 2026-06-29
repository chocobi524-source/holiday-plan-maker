// 休日プラン作成画面
import { useState } from 'react'

const transportOptions = ['徒歩・自転車', '電車・バス', '車', 'どれでも']
const durationOptions = ['半日（3〜4時間）', '1日（6〜8時間）', '朝から夕方まで']

// 時間帯ごとのプランをダミーで生成する関数
function generatePlan({ destination, budget, transport, duration }) {
  const plans = {
    morning: [`${destination}周辺を散策`, '地元のカフェで朝食', '観光スポットを下調べ'],
    lunch: [`${destination}の名物グルメを堪能`, '地元の定食屋でランチ', '公園でピクニックランチ'],
    afternoon: ['メインスポットを観光', 'お土産ショッピング', '近くの美術館・博物館へ'],
    evening: ['夕暮れの景色を楽しむ', '地元の居酒屋で夕食', '夜景スポットへ立ち寄り'],
  }
  const pick = arr => arr[Math.floor(Math.random() * arr.length)]
  return {
    morning: pick(plans.morning),
    lunch: pick(plans.lunch),
    afternoon: pick(plans.afternoon),
    evening: duration === '半日（3〜4時間）' ? '早めに帰宅してゆっくり休憩' : pick(plans.evening),
    budgetNote: `予算 ${budget}円 / 移動手段：${transport}`,
  }
}

export default function PlanMaker() {
  const [form, setForm] = useState({ destination: '', budget: '', transport: '電車・バス', duration: '1日（6〜8時間）' })
  const [plan, setPlan] = useState(null)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    setPlan(generatePlan(form))
  }

  const timeBlocks = plan ? [
    { time: '午前', emoji: '🌅', content: plan.morning },
    { time: '昼', emoji: '🍱', content: plan.lunch },
    { time: '午後', emoji: '☀️', content: plan.afternoon },
    { time: '夕方', emoji: '🌇', content: plan.evening },
  ] : []

  return (
    <div className="page">
      <h1 className="page-title">📋 休日プラン作成</h1>
      <p className="page-sub">条件を入力して、あなただけのプランを作ろう！</p>

      <div className="card">
        <form onSubmit={handleSubmit} className="form">
          <label className="form-label">行き先</label>
          <input
            type="text"
            name="destination"
            className="form-input"
            value={form.destination}
            onChange={handleChange}
            placeholder="例：浅草、鎌倉、大阪"
            required
          />
          <label className="form-label">予算（円）</label>
          <input
            type="number"
            name="budget"
            className="form-input"
            value={form.budget}
            onChange={handleChange}
            placeholder="例：5000"
            min="0"
            required
          />
          <label className="form-label">移動手段</label>
          <select name="transport" className="form-input" value={form.transport} onChange={handleChange}>
            {transportOptions.map(opt => <option key={opt}>{opt}</option>)}
          </select>
          <label className="form-label">滞在時間</label>
          <select name="duration" className="form-input" value={form.duration} onChange={handleChange}>
            {durationOptions.map(opt => <option key={opt}>{opt}</option>)}
          </select>
          <button type="submit" className="btn-primary">プランを作成する 🎉</button>
        </form>
      </div>

      {plan && (
        <div className="plan-result">
          <h2 className="result-title">✨ あなたの休日プラン</h2>
          <p className="result-note">{plan.budgetNote}</p>
          <div className="time-blocks">
            {timeBlocks.map(block => (
              <div key={block.time} className="time-block">
                <div className="time-label">{block.emoji} {block.time}</div>
                <div className="time-content">{block.content}</div>
              </div>
            ))}
          </div>
          <button className="btn-secondary" onClick={() => setPlan(generatePlan(form))}>
            🔄 プランを作り直す
          </button>
        </div>
      )}
    </div>
  )
}
