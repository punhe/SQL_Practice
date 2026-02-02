# Bài Tập SQL: SELECT & WHERE

Dưới đây là một danh sách các bài tập thực hành dựa trên bảng `Students` đã tạo trong `practice_data.sql`.

## 1. So sánh cơ bản (=, >, <, >=, <=, <>)
1. **Tìm sinh viên có tuổi bằng 20.**
   - *Yêu cầu*: Lấy tên và tuổi.
2. **Tìm sinh viên có GPA lớn hơn hoặc bằng 3.5.**
   - *Yêu cầu*: Lấy toàn bộ thông tin.
3. **Tìm sinh viên KHÔNG sống tại 'Hanoi'.**
   - *Yêu cầu*: Lấy tên và thành phố.
4. **Tìm sinh viên là nữ ('Female').**
   - *Yêu cầu*: Lấy tên, giới tính và ngành học.

## 2. Toán tử logic (AND, OR, NOT)
5. **Tìm sinh viên học ngành 'Computer Science' VÀ có GPA > 3.0.**
   - *Mục đích*: Kết hợp điều kiện bắt buộc cả hai đều đúng.
6. **Tìm sinh viên sống ở 'Ho Chi Minh' HOẶC 'Da Nang'.**
   - *Mục đích*: Lấy sinh viên thuộc một trong hai nhóm này.
7. **Tìm sinh viên là 'Male' (Nam) và tuổi dưới 22, HOẶC là 'Female' (Nữ) và tuổi trên 20.**
   - *Mục đích*: Thử thách với các nhóm điều kiện phức tạp `(A AND B) OR (C AND D)`.

## 3. Khoảng giá trị (BETWEEN)
8. **Tìm sinh viên có tuổi từ 19 đến 21 (bao gồm cả 19 và 21).**
9. **Tìm sinh viên nhập học trong khoảng thời gian từ '2021-01-01' đến '2022-12-31'.**

## 4. Tập hợp (IN / NOT IN)
10. **Tìm sinh viên thuộc các ngành: 'Marketing', 'Economics', 'Engineering'.**
    - *Gợi ý*: Thay vì dùng nhiều `OR`, hãy dùng `IN`.
11. **Tìm sinh viên KHÔNG thuộc các thành phố: 'Hanoi', 'Ho Chi Minh'.**

## 5. Tìm kiếm chuỗi (LIKE)
12. **Tìm sinh viên có họ 'Nguyen' (Tên bắt đầu bằng 'Nguyen').**
    - *Gợi ý*: Dùng `LIKE 'Nguyen%'`.
13. **Tìm sinh viên có tên chứa chữ 'Thi'.**
    - *Gợi ý*: Dùng `%Thi%`.
14. **Tìm sinh viên có tên kết thúc bằng chữ 'n'.**
15. **Tìm sinh viên có tên mà ký tự thứ 2 là chữ 'a' (Ví dụ: Dang, Pham...).**
    - *Gợi ý*: Dùng `_a%`.

## 6. Xử lý giá trị NULL (IS NULL / IS NOT NULL)
16. **Tìm sinh viên chưa có điểm GPA (GPA là NULL).**
17. **Tìm sinh viên đã có chuyên ngành (Major KHÔNG NULL).**

## 7. Bài tập tổng hợp (Nâng cao)
18. **Tìm sinh viên Nam ở 'Hanoi' có GPA trên 3.0 hoặc sinh viên Nữ ở 'Ho Chi Minh' có GPA trên 3.5.**
19. **Tìm những sinh viên học 'Computer Science' nhưng KHÔNG phải ở 'Hanoi'.**
20. **Tìm sinh viên có tuổi lớn hơn 20 và tên bắt đầu bằng chữ 'T', hoặc sinh viên có tuổi nhỏ hơn 20 và tên bắt đầu bằng chữ 'N'.**

---

## Gợi ý đáp án (Queries)

Bạn hãy thử tự viết trước khi xem đáp án nhé!

```sql
-- 1. Tuổi = 20
SELECT full_name, age FROM Students WHERE age = 20;

-- 2. GPA >= 3.5
SELECT * FROM Students WHERE gpa >= 3.5;

-- 3. Khác Hanoi
SELECT full_name, city FROM Students WHERE city <> 'Hanoi'; 
-- Hoặc: WHERE city != 'Hanoi';

-- 5. Computer Science AND GPA > 3.0
SELECT * FROM Students WHERE major = 'Computer Science' AND gpa > 3.0;

-- 8. Tuổi 19-21
SELECT * FROM Students WHERE age BETWEEN 19 AND 21;

-- 10. Ngành trong danh sách
SELECT * FROM Students WHERE major IN ('Marketing', 'Economics', 'Engineering');

-- 12. Họ Nguyen
SELECT * FROM Students WHERE full_name LIKE 'Nguyen%';

-- 16. GPA Null
SELECT * FROM Students WHERE gpa IS NULL;
```
