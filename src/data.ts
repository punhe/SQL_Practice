
export interface Student {
    student_id: number;
    full_name: string;
    age: number;
    gender: string;
    gpa: number | null;
    city: string;
    major: string | null;
    admission_date: string;
}

export const initialStudents: Student[] = [
    { student_id: 1, full_name: 'Nguyen Van A', age: 20, gender: 'Male', gpa: 3.5, city: 'Hanoi', major: 'Computer Science', admission_date: '2022-09-01' },
    { student_id: 2, full_name: 'Tran Thi B', age: 19, gender: 'Female', gpa: 3.8, city: 'Ho Chi Minh', major: 'Marketing', admission_date: '2023-09-01' },
    { student_id: 3, full_name: 'Le Van C', age: 21, gender: 'Male', gpa: 2.5, city: 'Da Nang', major: 'Business Admin', admission_date: '2021-09-01' },
    { student_id: 4, full_name: 'Pham Thi D', age: 20, gender: 'Female', gpa: 3.2, city: 'Hanoi', major: 'Computer Science', admission_date: '2022-09-01' },
    { student_id: 5, full_name: 'Hoang Van E', age: 22, gender: 'Male', gpa: 2.9, city: 'Hai Phong', major: 'Engineering', admission_date: '2020-09-01' },
    { student_id: 6, full_name: 'Do Thi F', age: 19, gender: 'Female', gpa: 4.0, city: 'Ho Chi Minh', major: 'Marketing', admission_date: '2023-09-01' },
    { student_id: 7, full_name: 'Vu Van G', age: 20, gender: 'Male', gpa: 3.0, city: 'Can Tho', major: 'Business Admin', admission_date: '2022-09-01' },
    { student_id: 8, full_name: 'Dang Thi H', age: 21, gender: 'Female', gpa: 3.6, city: 'Hanoi', major: 'Economics', admission_date: '2021-09-01' },
    { student_id: 9, full_name: 'Bui Van I', age: 23, gender: 'Male', gpa: 2.1, city: 'Da Nang', major: 'Engineering', admission_date: '2019-09-01' },
    { student_id: 10, full_name: 'Nguyen Thi K', age: 18, gender: 'Female', gpa: 3.9, city: 'Ho Chi Minh', major: 'Computer Science', admission_date: '2024-09-01' },
    { student_id: 11, full_name: 'Tran Van L', age: 20, gender: 'Male', gpa: null, city: 'Hanoi', major: 'Economics', admission_date: '2022-09-01' },
    { student_id: 12, full_name: 'Le Thi M', age: 21, gender: 'Female', gpa: 3.4, city: 'Hai Phong', major: null, admission_date: '2021-09-01' },
    { student_id: 13, full_name: 'Ngo Van N', age: 25, gender: 'Male', gpa: 3.1, city: 'Hanoi', major: 'Engineering', admission_date: '2018-09-01' },
    { student_id: 14, full_name: 'Doan Thi P', age: 22, gender: 'Female', gpa: 2.8, city: 'Da Nang', major: 'Marketing', admission_date: '2020-09-01' },
    { student_id: 15, full_name: 'Ly Van Q', age: 20, gender: 'Male', gpa: 3.7, city: 'Ho Chi Minh', major: 'Computer Science', admission_date: '2022-09-01' },
];

export interface Exercise {
    id: number;
    category: string;
    question: string;
    hint: string;
    expectedQuery?: string;
}

export const exercises: Exercise[] = [
    // 1. Comparison
    { id: 1, category: 'Basic Comparison', question: 'Tìm sinh viên có tuổi bằng 20.', hint: '', expectedQuery: "SELECT * FROM Students WHERE age = 20" },
    { id: 2, category: 'Basic Comparison', question: 'Tìm sinh viên có GPA lớn hơn hoặc bằng 3.5.', hint: '', expectedQuery: "SELECT * FROM Students WHERE gpa >= 3.5" },
    { id: 3, category: 'Basic Comparison', question: 'Tìm sinh viên KHÔNG sống tại "Hanoi".', hint: "", expectedQuery: "SELECT * FROM Students WHERE city <> 'Hanoi'" },
    { id: 4, category: 'Basic Comparison', question: 'Tìm sinh viên là nữ ("Female").', hint: "", expectedQuery: "SELECT * FROM Students WHERE gender = 'Female'" },
    { id: 5, category: 'Basic Comparison', question: '[Nâng cao] Tìm sinh viên có GPA nhỏ hơn 2.5 nhưng tuổi lớn hơn 20.', hint: "", expectedQuery: "SELECT * FROM Students WHERE gpa < 2.5 AND age > 20" },

    // 2. Logic
    { id: 6, category: 'Logic (AND/OR)', question: 'Tìm sinh viên học ngành "Computer Science" VÀ có GPA > 3.0.', hint: "", expectedQuery: "SELECT * FROM Students WHERE major = 'Computer Science' AND gpa > 3.0" },
    { id: 7, category: 'Logic (AND/OR)', question: 'Tìm sinh viên sống ở "Ho Chi Minh" HOẶC "Da Nang".', hint: "", expectedQuery: "SELECT * FROM Students WHERE city = 'Ho Chi Minh' OR city = 'Da Nang'" },
    { id: 8, category: 'Logic (AND/OR)', question: 'Tìm sinh viên (Nam dưới 22 tuổi) HOẶC (Nữ trên 20 tuổi).', hint: "", expectedQuery: "SELECT * FROM Students WHERE (gender = 'Male' AND age < 22) OR (gender = 'Female' AND age > 20)" },
    { id: 9, category: 'Logic (AND/OR)', question: '[Nâng cao] Tìm sinh viên không học "Marketing" và cũng không sống ở "Hanoi".', hint: "", expectedQuery: "SELECT * FROM Students WHERE major <> 'Marketing' AND city <> 'Hanoi'" },

    // 3. Between
    { id: 10, category: 'Range (BETWEEN)', question: 'Tìm sinh viên có tuổi từ 19 đến 21.', hint: "", expectedQuery: "SELECT * FROM Students WHERE age BETWEEN 19 AND 21" },
    { id: 11, category: 'Range (BETWEEN)', question: '[Nâng cao] Tìm sinh viên nhập học trong năm 2022 (từ 2022-01-01 đến 2022-12-31).', hint: "", expectedQuery: "SELECT * FROM Students WHERE admission_date BETWEEN '2022-01-01' AND '2022-12-31'" },

    // 4. IN
    { id: 12, category: 'Set (IN)', question: 'Tìm sinh viên thuộc các ngành: "Marketing", "Economics", "Engineering".', hint: "", expectedQuery: "SELECT * FROM Students WHERE major IN ('Marketing', 'Economics', 'Engineering')" },
    { id: 13, category: 'Set (IN)', question: '[Nâng cao] Tìm sinh viên sống tại "Hanoi" hoặc "Ho Chi Minh" nhưng KHÔNG học "Computer Science".', hint: "", expectedQuery: "SELECT * FROM Students WHERE city IN ('Hanoi', 'Ho Chi Minh') AND major <> 'Computer Science'" },

    // 5. LIKE
    { id: 14, category: 'String Search (LIKE)', question: 'Tìm sinh viên có họ "Nguyen" (Tên bắt đầu bằng "Nguyen").', hint: "", expectedQuery: "SELECT * FROM Students WHERE full_name LIKE 'Nguyen%'" },
    { id: 15, category: 'String Search (LIKE)', question: 'Tìm sinh viên có tên chứa chữ "Thi".', hint: "", expectedQuery: "SELECT * FROM Students WHERE full_name LIKE '%Thi%'" },
    { id: 16, category: 'String Search (LIKE)', question: '[Nâng cao] Tìm sinh viên có tên kết thúc bằng chữ "n" và có độ dài tên lớn hơn 10 ký tự (Gợi ý: Chỉ cần check LIKE "%n" là đủ cho bài này).', hint: "", expectedQuery: "SELECT * FROM Students WHERE full_name LIKE '%n'" },

    // 6. NULL
    { id: 17, category: 'NULL Handling', question: 'Tìm sinh viên chưa có điểm GPA (GPA là NULL).', hint: "", expectedQuery: "SELECT * FROM Students WHERE gpa IS NULL" },
    { id: 18, category: 'NULL Handling', question: 'Tìm sinh viên đã có chuyên ngành (Major KHÔNG NULL).', hint: "", expectedQuery: "SELECT * FROM Students WHERE major IS NOT NULL" },
    { id: 19, category: 'NULL Handling', question: '[Nâng cao] Tìm sinh viên có GPA là NULL HOẶC Major là NULL.', hint: "", expectedQuery: "SELECT * FROM Students WHERE gpa IS NULL OR major IS NULL" },

    // 7. General
    { id: 20, category: 'General Challenge', question: '[Tổng hợp] Tìm sinh viên Nữ, GPA > 3.5, không tên "Nguyen", nhập học sau năm 2021.', hint: "", expectedQuery: "SELECT * FROM Students WHERE gender = 'Female' AND gpa > 3.5 AND full_name NOT LIKE 'Nguyen%' AND admission_date > '2021-12-31'" }
];
