-- ============================================================
-- 休日プランメーカー：テーブル定義 & RLSポリシー
-- Supabase SQL Editorで実行してください
-- ============================================================

-- おでかけログテーブル
CREATE TABLE IF NOT EXISTS outing_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  place_name TEXT NOT NULL,
  visit_date DATE NOT NULL,
  genre TEXT NOT NULL,
  satisfaction INTEGER NOT NULL CHECK (satisfaction BETWEEN 1 AND 5),
  memo TEXT,
  want_to_revisit BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- updated_at自動更新トリガー
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS outing_logs_updated_at ON outing_logs;
CREATE TRIGGER outing_logs_updated_at
  BEFORE UPDATE ON outing_logs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS有効化
ALTER TABLE outing_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ユーザーは自分のログを参照できる"
  ON outing_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "ユーザーは自分のログを追加できる"
  ON outing_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "ユーザーは自分のログを更新できる"
  ON outing_logs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "ユーザーは自分のログを削除できる"
  ON outing_logs FOR DELETE
  USING (auth.uid() = user_id);
