// 77 BÀI TẬP SQL - FULL CHỦ ĐỀ TRUY VẤN SQL

export interface Exercise {
    id: number;
    category: string;
    question: string;
    hint: string;
    expectedQuery?: string;
    expectedQueries?: string[];
}

export const exercises: Exercise[] = [
    // ===== CHỦ ĐỀ 1: SELECT CƠ BẢN (5 câu) =====
    {
        id: 1, category: 'SELECT Cơ Bản',
        question: 'Lấy tất cả thông tin từ bảng Products.',
        hint: 'Dùng SELECT * FROM ...',
        expectedQuery: "SELECT * FROM Products",
    },
    {
        id: 2, category: 'SELECT Cơ Bản',
        question: 'Lấy tên sản phẩm và giá (product_name, price) từ bảng Products.',
        hint: 'SELECT cột1, cột2 FROM ...',
        expectedQuery: "SELECT product_name, price FROM Products",
        expectedQueries: ["SELECT Products.product_name, Products.price FROM Products"]
    },
    {
        id: 3, category: 'SELECT Cơ Bản',
        question: 'Lấy tất cả thông tin từ bảng Customers.',
        hint: 'SELECT * FROM ...',
        expectedQuery: "SELECT * FROM Customers",
    },
    {
        id: 4, category: 'SELECT Cơ Bản',
        question: 'Lấy tên và thành phố khách hàng (customer_name, city) từ bảng Customers.',
        hint: 'Chọn các cột cần thiết',
        expectedQuery: "SELECT customer_name, city FROM Customers",
    },
    {
        id: 5, category: 'SELECT Cơ Bản',
        question: 'Lấy mã đơn, ngày đặt, tổng tiền (order_id, order_date, total_amount) từ bảng Orders.',
        hint: 'Chọn 3 cột cụ thể từ Orders',
        expectedQuery: "SELECT order_id, order_date, total_amount FROM Orders",
    },

    // ===== CHỦ ĐỀ 2: WHERE (5 câu) =====
    {
        id: 6, category: 'WHERE',
        question: 'Lấy sản phẩm thuộc loại "Trái cây" (tất cả cột).',
        hint: 'WHERE category = ...',
        expectedQuery: "SELECT * FROM Products WHERE category = 'Trái cây'",
    },
    {
        id: 7, category: 'WHERE',
        question: 'Lấy đơn hàng có trạng thái "Completed" (tất cả cột).',
        hint: 'WHERE status = ...',
        expectedQuery: "SELECT * FROM Orders WHERE status = 'Completed'",
    },
    {
        id: 8, category: 'WHERE',
        question: 'Lấy sản phẩm có giá lớn hơn 100000 (product_name, price).',
        hint: 'WHERE price > ...',
        expectedQuery: "SELECT product_name, price FROM Products WHERE price > 100000",
    },
    {
        id: 9, category: 'WHERE',
        question: 'Lấy khách hàng ở thành phố "Hà Nội" (customer_name, city).',
        hint: 'WHERE city = ...',
        expectedQuery: "SELECT customer_name, city FROM Customers WHERE city = 'Hà Nội'",
    },
    {
        id: 10, category: 'WHERE',
        question: 'Lấy nhân viên có lương trên 20 triệu (employee_name, salary).',
        hint: 'WHERE salary > 20000000',
        expectedQuery: "SELECT employee_name, salary FROM Employees WHERE salary > 20000000",
    },

    // ===== CHỦ ĐỀ 3: AND / OR / NOT (5 câu) =====
    {
        id: 11, category: 'AND / OR / NOT',
        question: 'Lấy sản phẩm loại "Thịt" VÀ giá > 130000 (product_name, category, price).',
        hint: 'WHERE ... AND ...',
        expectedQuery: "SELECT product_name, category, price FROM Products WHERE category = 'Thịt' AND price > 130000",
    },
    {
        id: 12, category: 'AND / OR / NOT',
        question: 'Lấy đơn hàng "Pending" HOẶC "Cancelled" (order_id, status, total_amount).',
        hint: 'WHERE ... OR ... hoặc dùng IN',
        expectedQuery: "SELECT order_id, status, total_amount FROM Orders WHERE status = 'Pending' OR status = 'Cancelled'",
        expectedQueries: ["SELECT order_id, status, total_amount FROM Orders WHERE status IN ('Pending', 'Cancelled')"]
    },
    {
        id: 13, category: 'AND / OR / NOT',
        question: 'Lấy khách hàng KHÔNG ở "Hà Nội" (customer_name, city).',
        hint: 'WHERE city <> hoặc WHERE NOT',
        expectedQuery: "SELECT customer_name, city FROM Customers WHERE city <> 'Hà Nội'",
        expectedQueries: [
            "SELECT customer_name, city FROM Customers WHERE NOT city = 'Hà Nội'",
            "SELECT customer_name, city FROM Customers WHERE city != 'Hà Nội'"
        ]
    },
    {
        id: 14, category: 'AND / OR / NOT',
        question: 'Lấy sản phẩm "Rau củ" VÀ tồn kho > 100 (product_name, stock_quantity).',
        hint: 'WHERE category = ... AND stock_quantity > ...',
        expectedQuery: "SELECT product_name, stock_quantity FROM Products WHERE category = 'Rau củ' AND stock_quantity > 100",
    },
    {
        id: 15, category: 'AND / OR / NOT',
        question: 'Lấy nhân viên phòng "Kinh doanh" VÀ lương > 14 triệu (employee_name, department, salary).',
        hint: 'WHERE department = ... AND salary > ...',
        expectedQuery: "SELECT employee_name, department, salary FROM Employees WHERE department = 'Kinh doanh' AND salary > 14000000",
    },

    // ===== CHỦ ĐỀ 4: ORDER BY (4 câu) =====
    {
        id: 16, category: 'ORDER BY',
        question: 'Sắp xếp sản phẩm theo giá TĂNG dần (product_name, price).',
        hint: 'ORDER BY price ASC',
        expectedQuery: "SELECT product_name, price FROM Products ORDER BY price ASC",
        expectedQueries: ["SELECT product_name, price FROM Products ORDER BY price"]
    },
    {
        id: 17, category: 'ORDER BY',
        question: 'Sắp xếp sản phẩm theo giá GIẢM dần (product_name, price).',
        hint: 'ORDER BY price DESC',
        expectedQuery: "SELECT product_name, price FROM Products ORDER BY price DESC",
    },
    {
        id: 18, category: 'ORDER BY',
        question: 'Sắp xếp đơn hàng theo ngày đặt MỚI nhất (order_id, order_date, total_amount).',
        hint: 'ORDER BY order_date DESC',
        expectedQuery: "SELECT order_id, order_date, total_amount FROM Orders ORDER BY order_date DESC",
    },
    {
        id: 19, category: 'ORDER BY',
        question: 'Sắp xếp nhân viên theo lương GIẢM dần (employee_name, salary).',
        hint: 'ORDER BY salary DESC',
        expectedQuery: "SELECT employee_name, salary FROM Employees ORDER BY salary DESC",
    },

    // ===== CHỦ ĐỀ 5: DISTINCT (3 câu) =====
    {
        id: 20, category: 'DISTINCT',
        question: 'Lấy danh sách loại sản phẩm KHÔNG trùng lặp (category).',
        hint: 'SELECT DISTINCT ...',
        expectedQuery: "SELECT DISTINCT category FROM Products",
    },
    {
        id: 21, category: 'DISTINCT',
        question: 'Lấy danh sách thành phố KHÔNG trùng lặp của khách hàng (city).',
        hint: 'SELECT DISTINCT ...',
        expectedQuery: "SELECT DISTINCT city FROM Customers",
    },
    {
        id: 22, category: 'DISTINCT',
        question: 'Lấy danh sách trạng thái đơn hàng KHÔNG trùng lặp (status).',
        hint: 'SELECT DISTINCT ...',
        expectedQuery: "SELECT DISTINCT status FROM Orders",
    },

    // ===== CHỦ ĐỀ 6: LIKE (4 câu) =====
    {
        id: 23, category: 'LIKE',
        question: 'Lấy sản phẩm có tên BẮT ĐẦU bằng "Thịt" (product_name, price).',
        hint: "LIKE 'Thịt%' - dấu % ở cuối",
        expectedQuery: "SELECT product_name, price FROM Products WHERE product_name LIKE 'Thịt%'",
    },
    {
        id: 24, category: 'LIKE',
        question: 'Lấy khách hàng có email CHỨA "gmail" (customer_name, email).',
        hint: "LIKE '%gmail%' - dấu % ở cả 2 đầu",
        expectedQuery: "SELECT customer_name, email FROM Customers WHERE email LIKE '%gmail%'",
    },
    {
        id: 25, category: 'LIKE',
        question: 'Lấy nhà cung cấp có tên BẮT ĐẦU bằng "Nông" (supplier_name, city).',
        hint: "LIKE 'Nông%'",
        expectedQuery: "SELECT supplier_name, city FROM Suppliers WHERE supplier_name LIKE 'Nông%'",
    },
    {
        id: 26, category: 'LIKE',
        question: 'Lấy sản phẩm có tên CHỨA "Sữa" (product_name, price).',
        hint: "LIKE '%Sữa%'",
        expectedQuery: "SELECT product_name, price FROM Products WHERE product_name LIKE '%Sữa%'",
    },

    // ===== CHỦ ĐỀ 7: IN / BETWEEN (4 câu) =====
    {
        id: 27, category: 'IN / BETWEEN',
        question: 'Lấy sản phẩm loại "Thịt" hoặc "Hải sản" dùng IN (product_name, category, price).',
        hint: "WHERE category IN ('...', '...')",
        expectedQuery: "SELECT product_name, category, price FROM Products WHERE category IN ('Thịt', 'Hải sản')",
    },
    {
        id: 28, category: 'IN / BETWEEN',
        question: 'Lấy sản phẩm có giá từ 30000 đến 100000 (product_name, price).',
        hint: 'WHERE price BETWEEN ... AND ...',
        expectedQuery: "SELECT product_name, price FROM Products WHERE price BETWEEN 30000 AND 100000",
        expectedQueries: ["SELECT product_name, price FROM Products WHERE price >= 30000 AND price <= 100000"]
    },
    {
        id: 29, category: 'IN / BETWEEN',
        question: 'Lấy đơn hàng có tổng tiền từ 300000 đến 600000 (order_id, total_amount).',
        hint: 'WHERE total_amount BETWEEN ... AND ...',
        expectedQuery: "SELECT order_id, total_amount FROM Orders WHERE total_amount BETWEEN 300000 AND 600000",
        expectedQueries: ["SELECT order_id, total_amount FROM Orders WHERE total_amount >= 300000 AND total_amount <= 600000"]
    },
    {
        id: 30, category: 'IN / BETWEEN',
        question: 'Lấy khách hàng ở "Hà Nội" hoặc "Hồ Chí Minh" dùng IN (customer_name, city).',
        hint: "WHERE city IN (...)",
        expectedQuery: "SELECT customer_name, city FROM Customers WHERE city IN ('Hà Nội', 'Hồ Chí Minh')",
    },

    // ===== CHỦ ĐỀ 8: Aliases (AS) (3 câu) =====
    {
        id: 31, category: 'Aliases (AS)',
        question: 'Lấy sản phẩm với alias: TenSP (product_name), Gia (price).',
        hint: 'SELECT ... AS TenSP, ... AS Gia',
        expectedQuery: "SELECT product_name AS TenSP, price AS Gia FROM Products",
        expectedQueries: ["SELECT product_name TenSP, price Gia FROM Products"]
    },
    {
        id: 32, category: 'Aliases (AS)',
        question: 'Lấy khách hàng với alias: TenKH (customer_name), ThanhPho (city), Email (email).',
        hint: 'Dùng AS để đặt tên cột mới',
        expectedQuery: "SELECT customer_name AS TenKH, city AS ThanhPho, email AS Email FROM Customers",
        expectedQueries: ["SELECT customer_name TenKH, city ThanhPho, email Email FROM Customers"]
    },
    {
        id: 33, category: 'Aliases (AS)',
        question: 'Lấy đơn hàng với alias: MaDH (order_id), NgayDat (order_date), TongTien (total_amount).',
        hint: 'Dùng AS cho từng cột',
        expectedQuery: "SELECT order_id AS MaDH, order_date AS NgayDat, total_amount AS TongTien FROM Orders",
        expectedQueries: ["SELECT order_id MaDH, order_date NgayDat, total_amount TongTien FROM Orders"]
    },

    // ===== CHỦ ĐỀ 9: Aggregate Functions (6 câu) =====
    {
        id: 34, category: 'Aggregate Functions',
        question: 'Đếm tổng số sản phẩm trong bảng Products (alias: tong_sp).',
        hint: 'SELECT COUNT(*) AS ...',
        expectedQuery: "SELECT COUNT(*) AS tong_sp FROM Products",
        expectedQueries: ["SELECT COUNT(*) tong_sp FROM Products"]
    },
    {
        id: 35, category: 'Aggregate Functions',
        question: 'Tính tổng doanh thu tất cả đơn hàng (alias: tong_doanh_thu).',
        hint: 'SELECT SUM(total_amount) AS ...',
        expectedQuery: "SELECT SUM(total_amount) AS tong_doanh_thu FROM Orders",
        expectedQueries: ["SELECT SUM(total_amount) tong_doanh_thu FROM Orders"]
    },
    {
        id: 36, category: 'Aggregate Functions',
        question: 'Tính giá trung bình sản phẩm (alias: gia_tb).',
        hint: 'SELECT AVG(price) AS ...',
        expectedQuery: "SELECT AVG(price) AS gia_tb FROM Products",
        expectedQueries: ["SELECT AVG(price) gia_tb FROM Products"]
    },
    {
        id: 37, category: 'Aggregate Functions',
        question: 'Tìm giá thấp nhất và cao nhất của sản phẩm (alias: gia_min, gia_max).',
        hint: 'SELECT MIN(...), MAX(...)',
        expectedQuery: "SELECT MIN(price) AS gia_min, MAX(price) AS gia_max FROM Products",
        expectedQueries: ["SELECT MIN(price) gia_min, MAX(price) gia_max FROM Products"]
    },
    {
        id: 38, category: 'Aggregate Functions',
        question: 'Đếm số đơn hàng "Completed" (alias: so_don_completed).',
        hint: 'COUNT(*) kết hợp WHERE',
        expectedQuery: "SELECT COUNT(*) AS so_don_completed FROM Orders WHERE status = 'Completed'",
        expectedQueries: ["SELECT COUNT(*) so_don_completed FROM Orders WHERE status = 'Completed'"]
    },
    {
        id: 39, category: 'Aggregate Functions',
        question: 'Tính tổng tiền đơn hàng "Pending" (alias: tong_pending).',
        hint: 'SUM kết hợp WHERE',
        expectedQuery: "SELECT SUM(total_amount) AS tong_pending FROM Orders WHERE status = 'Pending'",
        expectedQueries: ["SELECT SUM(total_amount) tong_pending FROM Orders WHERE status = 'Pending'"]
    },

    // ===== CHỦ ĐỀ 10: GROUP BY (5 câu) =====
    {
        id: 40, category: 'GROUP BY',
        question: 'Đếm số sản phẩm theo từng loại (category, so_sp).',
        hint: 'GROUP BY category',
        expectedQuery: "SELECT category, COUNT(*) AS so_sp FROM Products GROUP BY category",
        expectedQueries: ["SELECT category, COUNT(*) so_sp FROM Products GROUP BY category"]
    },
    {
        id: 41, category: 'GROUP BY',
        question: 'Tổng tiền đơn hàng theo từng khách hàng (customer_id, tong_tien).',
        hint: 'GROUP BY customer_id',
        expectedQuery: "SELECT customer_id, SUM(total_amount) AS tong_tien FROM Orders GROUP BY customer_id",
        expectedQueries: ["SELECT customer_id, SUM(total_amount) tong_tien FROM Orders GROUP BY customer_id"]
    },
    {
        id: 42, category: 'GROUP BY',
        question: 'Đếm số đơn hàng theo trạng thái (status, so_don).',
        hint: 'GROUP BY status',
        expectedQuery: "SELECT status, COUNT(*) AS so_don FROM Orders GROUP BY status",
        expectedQueries: ["SELECT status, COUNT(*) so_don FROM Orders GROUP BY status"]
    },
    {
        id: 43, category: 'GROUP BY',
        question: 'Tính giá trung bình sản phẩm theo loại (category, gia_tb).',
        hint: 'SELECT category, AVG(price) AS ...',
        expectedQuery: "SELECT category, AVG(price) AS gia_tb FROM Products GROUP BY category",
        expectedQueries: ["SELECT category, AVG(price) gia_tb FROM Products GROUP BY category"]
    },
    {
        id: 44, category: 'GROUP BY',
        question: 'Đếm nhân viên theo phòng ban (department, so_nv).',
        hint: 'GROUP BY department',
        expectedQuery: "SELECT department, COUNT(*) AS so_nv FROM Employees GROUP BY department",
        expectedQueries: ["SELECT department, COUNT(*) so_nv FROM Employees GROUP BY department"]
    },

    // ===== CHỦ ĐỀ 11: HAVING (4 câu) =====
    {
        id: 45, category: 'HAVING',
        question: 'Loại sản phẩm có NHIỀU HƠN 3 sản phẩm (category, so_sp).',
        hint: 'GROUP BY ... HAVING COUNT(*) > 3',
        expectedQuery: "SELECT category, COUNT(*) AS so_sp FROM Products GROUP BY category HAVING COUNT(*) > 3",
        expectedQueries: ["SELECT category, COUNT(*) so_sp FROM Products GROUP BY category HAVING COUNT(*) > 3"]
    },
    {
        id: 46, category: 'HAVING',
        question: 'Khách hàng có tổng đơn > 500000 (customer_id, tong_tien).',
        hint: 'GROUP BY ... HAVING SUM(...) > ...',
        expectedQuery: "SELECT customer_id, SUM(total_amount) AS tong_tien FROM Orders GROUP BY customer_id HAVING SUM(total_amount) > 500000",
        expectedQueries: ["SELECT customer_id, SUM(total_amount) tong_tien FROM Orders GROUP BY customer_id HAVING SUM(total_amount) > 500000"]
    },
    {
        id: 47, category: 'HAVING',
        question: 'Loại sản phẩm có giá trung bình > 50000 (category, gia_tb).',
        hint: 'GROUP BY ... HAVING AVG(price) > ...',
        expectedQuery: "SELECT category, AVG(price) AS gia_tb FROM Products GROUP BY category HAVING AVG(price) > 50000",
        expectedQueries: ["SELECT category, AVG(price) gia_tb FROM Products GROUP BY category HAVING AVG(price) > 50000"]
    },
    {
        id: 48, category: 'HAVING',
        question: 'Phòng ban có NHIỀU HƠN 2 nhân viên (department, so_nv).',
        hint: 'GROUP BY ... HAVING COUNT(*) > 2',
        expectedQuery: "SELECT department, COUNT(*) AS so_nv FROM Employees GROUP BY department HAVING COUNT(*) > 2",
        expectedQueries: ["SELECT department, COUNT(*) so_nv FROM Employees GROUP BY department HAVING COUNT(*) > 2"]
    },

    // ===== CHỦ ĐỀ 12: INNER JOIN (5 câu) =====
    {
        id: 49, category: 'INNER JOIN',
        question: 'Lấy đơn hàng kèm tên khách hàng (order_id, order_date, customer_name).',
        hint: 'JOIN Orders với Customers qua customer_id',
        expectedQuery: "SELECT Orders.order_id, Orders.order_date, Customers.customer_name FROM Orders INNER JOIN Customers ON Orders.customer_id = Customers.customer_id",
        expectedQueries: [
            "SELECT o.order_id, o.order_date, c.customer_name FROM Orders o INNER JOIN Customers c ON o.customer_id = c.customer_id",
            "SELECT o.order_id, o.order_date, c.customer_name FROM Orders o JOIN Customers c ON o.customer_id = c.customer_id"
        ]
    },
    {
        id: 50, category: 'INNER JOIN',
        question: 'Lấy tên sản phẩm kèm tên nhà cung cấp (product_name, supplier_name).',
        hint: 'JOIN Products với Suppliers qua supplier_id',
        expectedQuery: "SELECT Products.product_name, Suppliers.supplier_name FROM Products INNER JOIN Suppliers ON Products.supplier_id = Suppliers.supplier_id",
        expectedQueries: [
            "SELECT p.product_name, s.supplier_name FROM Products p INNER JOIN Suppliers s ON p.supplier_id = s.supplier_id",
            "SELECT p.product_name, s.supplier_name FROM Products p JOIN Suppliers s ON p.supplier_id = s.supplier_id"
        ]
    },
    {
        id: 51, category: 'INNER JOIN',
        question: 'Lấy chi tiết đơn hàng kèm tên sản phẩm (detail_id, product_name, quantity).',
        hint: 'JOIN OrderDetails với Products',
        expectedQuery: "SELECT OrderDetails.detail_id, Products.product_name, OrderDetails.quantity FROM OrderDetails INNER JOIN Products ON OrderDetails.product_id = Products.product_id",
        expectedQueries: [
            "SELECT od.detail_id, p.product_name, od.quantity FROM OrderDetails od INNER JOIN Products p ON od.product_id = p.product_id",
            "SELECT od.detail_id, p.product_name, od.quantity FROM OrderDetails od JOIN Products p ON od.product_id = p.product_id"
        ]
    },
    {
        id: 52, category: 'INNER JOIN',
        question: 'Lấy chi tiết đơn hàng với ngày đặt (detail_id, order_date, quantity, unit_price).',
        hint: 'JOIN OrderDetails với Orders',
        expectedQuery: "SELECT OrderDetails.detail_id, Orders.order_date, OrderDetails.quantity, OrderDetails.unit_price FROM OrderDetails INNER JOIN Orders ON OrderDetails.order_id = Orders.order_id",
        expectedQueries: ["SELECT od.detail_id, o.order_date, od.quantity, od.unit_price FROM OrderDetails od INNER JOIN Orders o ON od.order_id = o.order_id"]
    },
    {
        id: 53, category: 'INNER JOIN',
        question: 'Lấy nhân viên kèm tên quản lý - SELF JOIN (employee_name, manager_name).',
        hint: 'SELF JOIN: Employees e JOIN Employees m ON e.manager_id = m.employee_id',
        expectedQuery: "SELECT e.employee_name, m.employee_name AS manager_name FROM Employees e INNER JOIN Employees m ON e.manager_id = m.employee_id",
        expectedQueries: [
            "SELECT e.employee_name, m.employee_name manager_name FROM Employees e JOIN Employees m ON e.manager_id = m.employee_id",
            "SELECT emp.employee_name, mgr.employee_name AS manager_name FROM Employees emp INNER JOIN Employees mgr ON emp.manager_id = mgr.employee_id"
        ]
    },

    // ===== CHỦ ĐỀ 13: LEFT JOIN (4 câu) =====
    {
        id: 54, category: 'LEFT JOIN',
        question: 'TẤT CẢ khách hàng và đơn hàng (nếu có) - customer_name, order_id, total_amount.',
        hint: 'LEFT JOIN giữ TẤT CẢ dữ liệu bảng bên trái',
        expectedQuery: "SELECT Customers.customer_name, Orders.order_id, Orders.total_amount FROM Customers LEFT JOIN Orders ON Customers.customer_id = Orders.customer_id",
        expectedQueries: ["SELECT c.customer_name, o.order_id, o.total_amount FROM Customers c LEFT JOIN Orders o ON c.customer_id = o.customer_id"]
    },
    {
        id: 55, category: 'LEFT JOIN',
        question: 'Sản phẩm CHƯA được đặt hàng (product_id, product_name) - dùng IS NULL.',
        hint: 'LEFT JOIN rồi WHERE ... IS NULL',
        expectedQuery: "SELECT Products.product_id, Products.product_name FROM Products LEFT JOIN OrderDetails ON Products.product_id = OrderDetails.product_id WHERE OrderDetails.detail_id IS NULL",
        expectedQueries: [
            "SELECT p.product_id, p.product_name FROM Products p LEFT JOIN OrderDetails od ON p.product_id = od.product_id WHERE od.detail_id IS NULL",
            "SELECT p.product_id, p.product_name FROM Products p LEFT JOIN OrderDetails od ON p.product_id = od.product_id WHERE od.product_id IS NULL"
        ]
    },
    {
        id: 56, category: 'LEFT JOIN',
        question: 'Khách hàng CHƯA CÓ đơn nào (customer_id, customer_name).',
        hint: 'LEFT JOIN + WHERE order_id IS NULL',
        expectedQuery: "SELECT Customers.customer_id, Customers.customer_name FROM Customers LEFT JOIN Orders ON Customers.customer_id = Orders.customer_id WHERE Orders.order_id IS NULL",
        expectedQueries: ["SELECT c.customer_id, c.customer_name FROM Customers c LEFT JOIN Orders o ON c.customer_id = o.customer_id WHERE o.order_id IS NULL"]
    },
    {
        id: 57, category: 'LEFT JOIN',
        question: 'TẤT CẢ nhân viên kèm tên quản lý (nếu có) - employee_name, position, manager_name.',
        hint: 'SELF LEFT JOIN với Employees',
        expectedQuery: "SELECT e.employee_name, e.position, m.employee_name AS manager_name FROM Employees e LEFT JOIN Employees m ON e.manager_id = m.employee_id",
        expectedQueries: ["SELECT e.employee_name, e.position, m.employee_name manager_name FROM Employees e LEFT JOIN Employees m ON e.manager_id = m.employee_id"]
    },

    // ===== CHỦ ĐỀ 14: JOIN + WHERE (5 câu) =====
    {
        id: 58, category: 'JOIN + WHERE',
        question: 'Đơn "Completed" kèm tên khách (order_id, customer_name, total_amount).',
        hint: 'JOIN rồi WHERE status = ...',
        expectedQuery: "SELECT Orders.order_id, Customers.customer_name, Orders.total_amount FROM Orders INNER JOIN Customers ON Orders.customer_id = Customers.customer_id WHERE Orders.status = 'Completed'",
        expectedQueries: [
            "SELECT o.order_id, c.customer_name, o.total_amount FROM Orders o INNER JOIN Customers c ON o.customer_id = c.customer_id WHERE o.status = 'Completed'",
            "SELECT o.order_id, c.customer_name, o.total_amount FROM Orders o JOIN Customers c ON o.customer_id = c.customer_id WHERE o.status = 'Completed'"
        ]
    },
    {
        id: 59, category: 'JOIN + WHERE',
        question: 'Sản phẩm "Hải sản" kèm nhà cung cấp (product_name, price, supplier_name).',
        hint: 'WHERE category = ... sau khi JOIN',
        expectedQuery: "SELECT Products.product_name, Products.price, Suppliers.supplier_name FROM Products INNER JOIN Suppliers ON Products.supplier_id = Suppliers.supplier_id WHERE Products.category = 'Hải sản'",
        expectedQueries: ["SELECT p.product_name, p.price, s.supplier_name FROM Products p JOIN Suppliers s ON p.supplier_id = s.supplier_id WHERE p.category = 'Hải sản'"]
    },
    {
        id: 60, category: 'JOIN + WHERE',
        question: 'Đơn "Completed" VÀ tổng > 400000 kèm khách (order_id, customer_name, total_amount).',
        hint: 'WHERE với AND kết hợp 2 điều kiện',
        expectedQuery: "SELECT Orders.order_id, Customers.customer_name, Orders.total_amount FROM Orders INNER JOIN Customers ON Orders.customer_id = Customers.customer_id WHERE Orders.status = 'Completed' AND Orders.total_amount > 400000",
        expectedQueries: ["SELECT o.order_id, c.customer_name, o.total_amount FROM Orders o JOIN Customers c ON o.customer_id = c.customer_id WHERE o.status = 'Completed' AND o.total_amount > 400000"]
    },
    {
        id: 61, category: 'JOIN + WHERE',
        question: 'Sản phẩm tên bắt đầu "Thịt" kèm NCC (product_name, price, supplier_name).',
        hint: 'JOIN + WHERE LIKE',
        expectedQuery: "SELECT Products.product_name, Products.price, Suppliers.supplier_name FROM Products INNER JOIN Suppliers ON Products.supplier_id = Suppliers.supplier_id WHERE Products.product_name LIKE 'Thịt%'",
        expectedQueries: ["SELECT p.product_name, p.price, s.supplier_name FROM Products p JOIN Suppliers s ON p.supplier_id = s.supplier_id WHERE p.product_name LIKE 'Thịt%'"]
    },
    {
        id: 62, category: 'JOIN + WHERE',
        question: 'Đơn của khách ở "Hà Nội", "Hồ Chí Minh" (order_id, customer_name, city, total_amount).',
        hint: 'JOIN + WHERE city IN (...)',
        expectedQuery: "SELECT Orders.order_id, Customers.customer_name, Customers.city, Orders.total_amount FROM Orders INNER JOIN Customers ON Orders.customer_id = Customers.customer_id WHERE Customers.city IN ('Hà Nội', 'Hồ Chí Minh')",
        expectedQueries: ["SELECT o.order_id, c.customer_name, c.city, o.total_amount FROM Orders o JOIN Customers c ON o.customer_id = c.customer_id WHERE c.city IN ('Hà Nội', 'Hồ Chí Minh')"]
    },

    // ===== CHỦ ĐỀ 15: JOIN + ORDER BY (3 câu) =====
    {
        id: 63, category: 'JOIN + ORDER BY',
        question: 'Đơn hàng kèm khách, sắp theo ngày MỚI nhất (order_id, customer_name, order_date).',
        hint: 'JOIN + ORDER BY ... DESC',
        expectedQuery: "SELECT Orders.order_id, Customers.customer_name, Orders.order_date FROM Orders INNER JOIN Customers ON Orders.customer_id = Customers.customer_id ORDER BY Orders.order_date DESC",
        expectedQueries: ["SELECT o.order_id, c.customer_name, o.order_date FROM Orders o JOIN Customers c ON o.customer_id = c.customer_id ORDER BY o.order_date DESC"]
    },
    {
        id: 64, category: 'JOIN + ORDER BY',
        question: 'Sản phẩm kèm NCC, sắp theo giá TĂNG dần (product_name, price, supplier_name).',
        hint: 'JOIN + ORDER BY price ASC',
        expectedQuery: "SELECT Products.product_name, Products.price, Suppliers.supplier_name FROM Products INNER JOIN Suppliers ON Products.supplier_id = Suppliers.supplier_id ORDER BY Products.price ASC",
        expectedQueries: [
            "SELECT p.product_name, p.price, s.supplier_name FROM Products p JOIN Suppliers s ON p.supplier_id = s.supplier_id ORDER BY p.price ASC",
            "SELECT p.product_name, p.price, s.supplier_name FROM Products p JOIN Suppliers s ON p.supplier_id = s.supplier_id ORDER BY p.price"
        ]
    },
    {
        id: 65, category: 'JOIN + ORDER BY',
        question: 'Chi tiết đơn kèm sản phẩm, theo số lượng GIẢM (product_name, quantity, unit_price).',
        hint: 'JOIN + ORDER BY quantity DESC',
        expectedQuery: "SELECT Products.product_name, OrderDetails.quantity, OrderDetails.unit_price FROM OrderDetails INNER JOIN Products ON OrderDetails.product_id = Products.product_id ORDER BY OrderDetails.quantity DESC",
        expectedQueries: ["SELECT p.product_name, od.quantity, od.unit_price FROM OrderDetails od JOIN Products p ON od.product_id = p.product_id ORDER BY od.quantity DESC"]
    },

    // ===== CHỦ ĐỀ 16: JOIN + Aggregate (5 câu) =====
    {
        id: 66, category: 'JOIN + Aggregate',
        question: 'Đếm số chi tiết đơn của "Thịt Bò Úc" (alias: so_luong).',
        hint: 'JOIN + COUNT + WHERE product_name = ...',
        expectedQuery: "SELECT COUNT(*) AS so_luong FROM OrderDetails INNER JOIN Products ON OrderDetails.product_id = Products.product_id WHERE Products.product_name = 'Thịt Bò Úc'",
        expectedQueries: ["SELECT COUNT(*) so_luong FROM OrderDetails od JOIN Products p ON od.product_id = p.product_id WHERE p.product_name = 'Thịt Bò Úc'"]
    },
    {
        id: 67, category: 'JOIN + Aggregate',
        question: 'Tổng doanh thu đơn hàng khách ở "Hà Nội" (alias: tong_doanh_thu).',
        hint: 'JOIN + SUM + WHERE city = ...',
        expectedQuery: "SELECT SUM(Orders.total_amount) AS tong_doanh_thu FROM Orders INNER JOIN Customers ON Orders.customer_id = Customers.customer_id WHERE Customers.city = 'Hà Nội'",
        expectedQueries: [
            "SELECT SUM(o.total_amount) AS tong_doanh_thu FROM Orders o JOIN Customers c ON o.customer_id = c.customer_id WHERE c.city = 'Hà Nội'",
            "SELECT SUM(o.total_amount) tong_doanh_thu FROM Orders o JOIN Customers c ON o.customer_id = c.customer_id WHERE c.city = 'Hà Nội'"
        ]
    },
    {
        id: 68, category: 'JOIN + Aggregate',
        question: 'Giá trung bình sản phẩm của "Vinamilk" (alias: gia_tb).',
        hint: 'JOIN + AVG + WHERE supplier_name = ...',
        expectedQuery: "SELECT AVG(Products.price) AS gia_tb FROM Products INNER JOIN Suppliers ON Products.supplier_id = Suppliers.supplier_id WHERE Suppliers.supplier_name = 'Vinamilk'",
        expectedQueries: [
            "SELECT AVG(p.price) AS gia_tb FROM Products p JOIN Suppliers s ON p.supplier_id = s.supplier_id WHERE s.supplier_name = 'Vinamilk'",
            "SELECT AVG(p.price) gia_tb FROM Products p JOIN Suppliers s ON p.supplier_id = s.supplier_id WHERE s.supplier_name = 'Vinamilk'"
        ]
    },
    {
        id: 69, category: 'JOIN + Aggregate',
        question: 'Đếm số đơn của mỗi khách hàng kèm tên (customer_name, so_don). Dùng GROUP BY.',
        hint: 'JOIN + COUNT + GROUP BY',
        expectedQuery: "SELECT Customers.customer_name, COUNT(*) AS so_don FROM Orders INNER JOIN Customers ON Orders.customer_id = Customers.customer_id GROUP BY Customers.customer_name",
        expectedQueries: [
            "SELECT c.customer_name, COUNT(*) AS so_don FROM Orders o JOIN Customers c ON o.customer_id = c.customer_id GROUP BY c.customer_name",
            "SELECT c.customer_name, COUNT(*) so_don FROM Orders o JOIN Customers c ON o.customer_id = c.customer_id GROUP BY c.customer_name"
        ]
    },
    {
        id: 70, category: 'JOIN + Aggregate',
        question: 'Tổng doanh thu theo tên khách, chỉ lấy khách có tổng > 500000 (customer_name, tong_tien). Dùng HAVING.',
        hint: 'JOIN + SUM + GROUP BY + HAVING',
        expectedQuery: "SELECT Customers.customer_name, SUM(Orders.total_amount) AS tong_tien FROM Orders INNER JOIN Customers ON Orders.customer_id = Customers.customer_id GROUP BY Customers.customer_name HAVING SUM(Orders.total_amount) > 500000",
        expectedQueries: [
            "SELECT c.customer_name, SUM(o.total_amount) AS tong_tien FROM Orders o JOIN Customers c ON o.customer_id = c.customer_id GROUP BY c.customer_name HAVING SUM(o.total_amount) > 500000",
            "SELECT c.customer_name, SUM(o.total_amount) tong_tien FROM Orders o JOIN Customers c ON o.customer_id = c.customer_id GROUP BY c.customer_name HAVING SUM(o.total_amount) > 500000"
        ]
    },

    // ===== CHỦ ĐỀ 17: Multi-table JOIN (3 câu) =====
    {
        id: 71, category: 'Multi-table JOIN',
        question: 'Tên khách, ngày đặt, tên SP, số lượng - JOIN 4 bảng (customer_name, order_date, product_name, quantity).',
        hint: 'JOIN Orders→Customers→OrderDetails→Products',
        expectedQuery: "SELECT Customers.customer_name, Orders.order_date, Products.product_name, OrderDetails.quantity FROM Orders INNER JOIN Customers ON Orders.customer_id = Customers.customer_id INNER JOIN OrderDetails ON Orders.order_id = OrderDetails.order_id INNER JOIN Products ON OrderDetails.product_id = Products.product_id",
        expectedQueries: ["SELECT c.customer_name, o.order_date, p.product_name, od.quantity FROM Orders o JOIN Customers c ON o.customer_id = c.customer_id JOIN OrderDetails od ON o.order_id = od.order_id JOIN Products p ON od.product_id = p.product_id"]
    },
    {
        id: 72, category: 'Multi-table JOIN',
        question: 'Khách "Hà Nội", đơn "Completed", SP "Thịt", sắp theo ngày mới (customer_name, order_date, product_name).',
        hint: 'JOIN 4 bảng + WHERE + ORDER BY DESC',
        expectedQuery: "SELECT Customers.customer_name, Orders.order_date, Products.product_name FROM Orders INNER JOIN Customers ON Orders.customer_id = Customers.customer_id INNER JOIN OrderDetails ON Orders.order_id = OrderDetails.order_id INNER JOIN Products ON OrderDetails.product_id = Products.product_id WHERE Customers.city = 'Hà Nội' AND Orders.status = 'Completed' AND Products.category = 'Thịt' ORDER BY Orders.order_date DESC",
        expectedQueries: ["SELECT c.customer_name, o.order_date, p.product_name FROM Orders o JOIN Customers c ON o.customer_id = c.customer_id JOIN OrderDetails od ON o.order_id = od.order_id JOIN Products p ON od.product_id = p.product_id WHERE c.city = 'Hà Nội' AND o.status = 'Completed' AND p.category = 'Thịt' ORDER BY o.order_date DESC"]
    },
    {
        id: 73, category: 'Multi-table JOIN',
        question: 'Tên NCC, tên SP, số lượng đặt, ngày đặt - JOIN 4 bảng (supplier_name, product_name, quantity, order_date).',
        hint: 'JOIN Suppliers→Products→OrderDetails→Orders',
        expectedQuery: "SELECT Suppliers.supplier_name, Products.product_name, OrderDetails.quantity, Orders.order_date FROM Products INNER JOIN Suppliers ON Products.supplier_id = Suppliers.supplier_id INNER JOIN OrderDetails ON Products.product_id = OrderDetails.product_id INNER JOIN Orders ON OrderDetails.order_id = Orders.order_id",
        expectedQueries: ["SELECT s.supplier_name, p.product_name, od.quantity, o.order_date FROM Products p JOIN Suppliers s ON p.supplier_id = s.supplier_id JOIN OrderDetails od ON p.product_id = od.product_id JOIN Orders o ON od.order_id = o.order_id"]
    },

    // ===== CHỦ ĐỀ 18: Subqueries (4 câu) =====
    {
        id: 74, category: 'Subqueries',
        question: 'Lấy sản phẩm có giá CAO HƠN giá trung bình (product_name, price).',
        hint: 'WHERE price > (SELECT AVG(price) FROM Products)',
        expectedQuery: "SELECT product_name, price FROM Products WHERE price > (SELECT AVG(price) FROM Products)",
    },
    {
        id: 75, category: 'Subqueries',
        question: 'Lấy khách hàng đã đặt đơn > 500000 - dùng IN (customer_name, city).',
        hint: 'WHERE customer_id IN (SELECT ... WHERE total_amount > ...)',
        expectedQuery: "SELECT customer_name, city FROM Customers WHERE customer_id IN (SELECT customer_id FROM Orders WHERE total_amount > 500000)",
    },
    {
        id: 76, category: 'Subqueries',
        question: 'Lấy sản phẩm có giá BẰNG giá cao nhất (product_name, price).',
        hint: 'WHERE price = (SELECT MAX(price) FROM Products)',
        expectedQuery: "SELECT product_name, price FROM Products WHERE price = (SELECT MAX(price) FROM Products)",
    },
    {
        id: 77, category: 'Subqueries',
        question: 'Lấy khách hàng CHƯA đặt đơn nào - dùng NOT IN (customer_id, customer_name).',
        hint: 'WHERE customer_id NOT IN (SELECT customer_id FROM Orders)',
        expectedQuery: "SELECT customer_id, customer_name FROM Customers WHERE customer_id NOT IN (SELECT customer_id FROM Orders)",
    },
];
