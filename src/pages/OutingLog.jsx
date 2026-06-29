// おでかけログ画面（追加・編集・削除）
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

const genres = ['自然・公園', 'グルメ', '観光・歴史', 'テーマパーク', 'ショッピング', '温泉・スパ', 'アウトドア', 'その他']

const emptyForm = { place_name: '', visit_date: '', genre: genres[0], satisfaction: 3, memo: '', want_to_revisit: false }

export default function OutingLog() {
  const { user } = useAuth()
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [error, setError] = useState('')

  // ログ一覧を取得
  const fetchLogs = async () => {
    const { data, error } = await supabase
      .from('outing_logs')
      .select('*')
      .order('visit_date', { ascending: false })
    if (!error) setLogs(data)
    setLoading(false)
  }

  useEffect(() => { fetchLogs() }, [])

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  // 追加・更新
  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    const payload = { ...form, user_id: user.id, satisfaction: Number(form.satisfaction) }

    if (editId) {
      const { error } = await supabase.from('outing_logs').update(payload).eq('id', editId)
      if (error) { setError('更新に失敗しました'); return }
    } else {
      const { error } = await supabase.from('outing_logs').insert(payload)
      if (error) { setError('追加に失敗しました'); return }
    }
    setForm(emptyForm)
    setEditId(null)
    setShowForm(false)
    fetchLogs()
  }

  // 編集開始
  const handleEdit = log => {
    setForm({
      place_name: log.place_name,
      visit_date: log.visit_date,
      genre: log.genre,
      satisfaction: log.satisfaction,
      memo: log.memo || '',
      want_to_revisit: log.want_to_revisit,
    })
    setEditId(log.id)
    setShowForm(true)
  }

  // 削除
  const handleDelete = async (id) => {
    if (!window.confirm('このログを削除しますか？')) return
    await supabase.from('outing_logs').delete().eq('id', id)
    fetchLogs()
  }

  const stars = n => '⭐'.repeat(n) + '☆'.repeat(5 - n)

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">📓 おでかけログ</h1>
          <p className="page-sub">行った場所を記録して思い出を残そう！</p>
        </div>
        <button className="btn-primary" onClick={() => { setShowForm(!showForm); setEditId(null); setForm(emptyForm) }}>
          {showForm ? 'キャンセル' : '＋ 新しく記録する'}
        </button>
      </div>

      {showForm && (
        <div className="card form-card">
          <h2 className="form-title">{editId ? '✏️ ログを編集' : '📝 新しいおでかけを記録'}</h2>
          <form onSubmit={handleSubmit} className="form">
            <label className="form-label">場所名</label>
            <input type="text" name="place_name" className="form-input" value={form.place_name} onChange={handleChange} placeholder="例：浅草、鎌倉大仏" required />

            <label className="form-label">訪問日</label>
            <input type="date" name="visit_date" className="form-input" value={form.visit_date} onChange={handleChange} required />

            <label className="form-label">ジャンル</label>
            <select name="genre" className="form-input" value={form.genre} onChange={handleChange}>
              {genres.map(g => <option key={g}>{g}</option>)}
            </select>

            <label className="form-label">満足度（{form.satisfaction}）</label>
            <input type="range" name="satisfaction" min="1" max="5" value={form.satisfaction} onChange={handleChange} className="range-input" />
            <div className="stars-preview">{stars(Number(form.satisfaction))}</div>

            <label className="form-label">メモ（任意）</label>
            <textarea name="memo" className="form-input form-textarea" value={form.memo} onChange={handleChange} placeholder="感想・次回のメモなど" rows={3} />

            <label className="checkbox-label">
              <input type="checkbox" name="want_to_revisit" checked={form.want_to_revisit} onChange={handleChange} />
              また行きたい！
            </label>

            {error && <p className="form-error">{error}</p>}
            <button type="submit" className="btn-primary">{editId ? '更新する' : '記録する'}</button>
          </form>
        </div>
      )}

      {loading ? (
        <p className="loading">読み込み中...</p>
      ) : logs.length === 0 ? (
        <div className="empty-state">
          <div className="empty-emoji">📭</div>
          <p>まだおでかけログがありません。<br />最初の記録を追加してみよう！</p>
        </div>
      ) : (
        <div className="log-list">
          {logs.map(log => (
            <div key={log.id} className="log-card">
              <div className="log-header">
                <div>
                  <h3 className="log-place">{log.place_name}</h3>
                  <p className="log-meta">{log.visit_date} ・ {log.genre}</p>
                </div>
                {log.want_to_revisit && <span className="revisit-badge">💕 また行きたい</span>}
              </div>
              <div className="log-stars">{stars(log.satisfaction)}</div>
              {log.memo && <p className="log-memo">{log.memo}</p>}
              <div className="log-actions">
                <button className="btn-edit" onClick={() => handleEdit(log)}>✏️ 編集</button>
                <button className="btn-delete" onClick={() => handleDelete(log.id)}>🗑️ 削除</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
