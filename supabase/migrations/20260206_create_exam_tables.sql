-- Bảng lưu session bài thi
CREATE TABLE IF NOT EXISTS exam_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ,
    duration_seconds INTEGER DEFAULT 0,
    total_questions INTEGER DEFAULT 30,
    correct_answers INTEGER DEFAULT 0,
    completed_questions INTEGER[] DEFAULT '{}',
    status VARCHAR(20) DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bảng lưu câu trả lời chi tiết
CREATE TABLE IF NOT EXISTS exam_answers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id UUID REFERENCES exam_sessions(id) ON DELETE CASCADE,
    question_id INTEGER NOT NULL,
    user_query TEXT,
    is_correct BOOLEAN DEFAULT FALSE,
    answered_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index để query nhanh hơn
CREATE INDEX IF NOT EXISTS idx_exam_sessions_user ON exam_sessions(user_name);
CREATE INDEX IF NOT EXISTS idx_exam_sessions_status ON exam_sessions(status);
CREATE INDEX IF NOT EXISTS idx_exam_answers_session ON exam_answers(session_id);

-- Bật RLS cho các bảng
ALTER TABLE exam_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_answers ENABLE ROW LEVEL SECURITY;

-- Tạo policy cho phép tất cả (cho demo)
DROP POLICY IF EXISTS "Allow all for exam_sessions" ON exam_sessions;
CREATE POLICY "Allow all for exam_sessions" ON exam_sessions
    FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all for exam_answers" ON exam_answers;
CREATE POLICY "Allow all for exam_answers" ON exam_answers
    FOR ALL USING (true) WITH CHECK (true);
