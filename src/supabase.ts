import { createClient } from '@supabase/supabase-js';

// ✅ Supabase Config - Đọc từ .env
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ========== TYPES ==========
export interface ExamSession {
    id?: string;
    user_name: string;
    start_time: string;
    end_time?: string;
    duration_seconds: number;
    total_questions: number;
    correct_answers: number;
    completed_questions: number[];
    status: 'in_progress' | 'completed' | 'abandoned';
    created_at?: string;
}

export interface ExamAnswer {
    id?: string;
    session_id: string;
    question_id: number;
    user_query: string;
    is_correct: boolean;
    answered_at: string;
}

// ========== API FUNCTIONS ==========

// Tạo session mới
export async function createExamSession(userName: string): Promise<ExamSession | null> {
    const session: ExamSession = {
        user_name: userName,
        start_time: new Date().toISOString(),
        duration_seconds: 0,
        total_questions: 30,
        correct_answers: 0,
        completed_questions: [],
        status: 'in_progress'
    };

    const { data, error } = await supabase
        .from('exam_sessions')
        .insert([session])
        .select()
        .single();

    if (error) {
        console.error('Error creating session:', error);
        return null;
    }
    return data;
}

// Lấy session đang làm dở (in_progress)
export async function getActiveSession(userName: string): Promise<ExamSession | null> {
    const { data, error } = await supabase
        .from('exam_sessions')
        .select('*')
        .eq('user_name', userName)
        .eq('status', 'in_progress')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    if (error && error.code !== 'PGRST116') {
        console.error('Error fetching session:', error);
    }
    return data || null;
}

// Cập nhật session
export async function updateExamSession(
    sessionId: string,
    updates: Partial<ExamSession>
): Promise<boolean> {
    const { error } = await supabase
        .from('exam_sessions')
        .update(updates)
        .eq('id', sessionId);

    if (error) {
        console.error('Error updating session:', error);
        return false;
    }
    return true;
}

// Lưu câu trả lời
export async function saveAnswer(answer: ExamAnswer): Promise<boolean> {
    const { error } = await supabase
        .from('exam_answers')
        .insert([answer]);

    if (error) {
        console.error('Error saving answer:', error);
        return false;
    }
    return true;
}

// Lấy lịch sử làm bài
export async function getExamHistory(userName: string): Promise<ExamSession[]> {
    const { data, error } = await supabase
        .from('exam_sessions')
        .select('*')
        .eq('user_name', userName)
        .order('created_at', { ascending: false })
        .limit(10);

    if (error) {
        console.error('Error fetching history:', error);
        return [];
    }
    return data || [];
}

// Hoàn thành bài thi
export async function completeExamSession(
    sessionId: string,
    correctAnswers: number,
    durationSeconds: number
): Promise<boolean> {
    return updateExamSession(sessionId, {
        status: 'completed',
        end_time: new Date().toISOString(),
        correct_answers: correctAnswers,
        duration_seconds: durationSeconds
    });
}
