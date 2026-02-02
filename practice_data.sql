-- Tạo bảng Students
CREATE TABLE Students (
    student_id INT PRIMARY KEY,
    full_name VARCHAR(100),
    age INT,
    gender VARCHAR(10),
    gpa DECIMAL(3, 2),
    city VARCHAR(50),
    major VARCHAR(50),
    admission_date DATE
);

-- Thêm dữ liệu mẫu
INSERT INTO Students (student_id, full_name, age, gender, gpa, city, major, admission_date) VALUES
(1, 'Nguyen Van A', 20, 'Male', 3.5, 'Hanoi', 'Computer Science', '2022-09-01'),
(2, 'Tran Thi B', 19, 'Female', 3.8, 'Ho Chi Minh', 'Marketing', '2023-09-01'),
(3, 'Le Van C', 21, 'Male', 2.5, 'Da Nang', 'Business Admin', '2021-09-01'),
(4, 'Pham Thi D', 20, 'Female', 3.2, 'Hanoi', 'Computer Science', '2022-09-01'),
(5, 'Hoang Van E', 22, 'Male', 2.9, 'Hai Phong', 'Engineering', '2020-09-01'),
(6, 'Do Thi F', 19, 'Female', 4.0, 'Ho Chi Minh', 'Marketing', '2023-09-01'),
(7, 'Vu Van G', 20, 'Male', 3.0, 'Can Tho', 'Business Admin', '2022-09-01'),
(8, 'Dang Thi H', 21, 'Female', 3.6, 'Hanoi', 'Economics', '2021-09-01'),
(9, 'Bui Van I', 23, 'Male', 2.1, 'Da Nang', 'Engineering', '2019-09-01'),
(10, 'Nguyen Thi K', 18, 'Female', 3.9, 'Ho Chi Minh', 'Computer Science', '2024-09-01'),
(11, 'Tran Van L', 20, 'Male', NULL, 'Hanoi', 'Economics', '2022-09-01'), -- GPA NULL
(12, 'Le Thi M', 21, 'Female', 3.4, 'Hai Phong', NULL, '2021-09-01'); -- Major NULL
