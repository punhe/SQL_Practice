# Hướng dẫn cài đặt Supabase

## Bước 1: Tạo tài khoản Supabase

1. Truy cập https://supabase.com
2. Đăng ký tài khoản miễn phí
3. Tạo một project mới

## Bước 2: Tạo các bảng trong Supabase

Vào **SQL Editor** trong Supabase Dashboard và chạy các lệnh SQL sau:

```sql
-- Bảng lưu session bài thi
CREATE TABLE exam_sessions (
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
CREATE TABLE exam_answers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id UUID REFERENCES exam_sessions(id) ON DELETE CASCADE,
    question_id INTEGER NOT NULL,
    user_query TEXT,
    is_correct BOOLEAN DEFAULT FALSE,
    answered_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index để query nhanh hơn
CREATE INDEX idx_exam_sessions_user ON exam_sessions(user_name);
CREATE INDEX idx_exam_sessions_status ON exam_sessions(status);
CREATE INDEX idx_exam_answers_session ON exam_answers(session_id);
```

## Bước 3: Bật Row Level Security (RLS)

```sql
-- Bật RLS cho các bảng
ALTER TABLE exam_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_answers ENABLE ROW LEVEL SECURITY;

-- Tạo policy cho phép tất cả (cho demo - trong production nên dùng auth)
CREATE POLICY "Allow all for exam_sessions" ON exam_sessions
    FOR ALL USING (true);

CREATE POLICY "Allow all for exam_answers" ON exam_answers
    FOR ALL USING (true);
```

## Bước 4: Lấy thông tin kết nối

1. Vào **Settings** > **API** trong Supabase Dashboard
2. Copy **Project URL** và **anon public** key
3. Cập nhật file `src/supabase.ts`:

```typescript
const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIs...YOUR_KEY';
```

## Bước 5: Chạy ứng dụng

```bash
npm run dev
```

---

## Cấu trúc dữ liệu

### exam_sessions
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_name | VARCHAR | Tên người dùng |
| start_time | TIMESTAMPTZ | Thời gian bắt đầu |
| end_time | TIMESTAMPTZ | Thời gian kết thúc |
| duration_seconds | INTEGER | Thời gian làm bài (giây) |
| total_questions | INTEGER | Tổng số câu hỏi |
| correct_answers | INTEGER | Số câu đúng |
| completed_questions | INTEGER[] | Array ID các câu đã làm đúng |
| status | VARCHAR | Trạng thái: in_progress, completed, abandoned |
| created_at | TIMESTAMPTZ | Thời gian tạo |

### exam_answers
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| session_id | UUID | FK đến exam_sessions |
| question_id | INTEGER | ID câu hỏi |
| user_query | TEXT | Câu lệnh SQL user nhập |
| is_correct | BOOLEAN | Đúng/Sai |
| answered_at | TIMESTAMPTZ | Thời gian trả lời |

---

## Lưu ý

- Session được **tự động lưu mỗi 30 giây**
- Khi reload trang, app sẽ **khôi phục session đang làm dở**
- Timer tiếp tục đếm từ vị trí đã lưu
- Các câu đã làm đúng được lưu lại
