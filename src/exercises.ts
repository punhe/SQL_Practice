// 30 BÀI TẬP SQL - TẬP TRUNG VÀO JOIN KẾT HỢP CÁC KIẾN THỨC KHÁC

export interface Exercise {
    id: number;
    category: string;
    question: string;
    hint: string;
    expectedQuery?: string;
    expectedQueries?: string[];
}

export const exercises: Exercise[] = [
    // === INNER JOIN CƠ BẢN (5 câu) ===
    {
        id: 1,
        category: 'INNER JOIN',
        question: 'Lấy danh sách đơn hàng kèm tên khách hàng (order_id, order_date, customer_name).',
        hint: 'Dùng INNER JOIN giữa Orders và Customers',
        expectedQuery: "SELECT Orders.order_id, Orders.order_date, Customers.customer_name FROM Orders INNER JOIN Customers ON Orders.customer_id = Customers.customer_id",
        expectedQueries: [
            "SELECT o.order_id, o.order_date, c.customer_name FROM Orders o INNER JOIN Customers c ON o.customer_id = c.customer_id",
            "SELECT o.order_id, o.order_date, c.customer_name FROM Orders AS o INNER JOIN Customers AS c ON o.customer_id = c.customer_id"
        ]
    },
    {
        id: 2,
        category: 'INNER JOIN',
        question: 'Lấy tên sản phẩm kèm tên nhà cung cấp (product_name, supplier_name).',
        hint: 'JOIN Products với Suppliers qua supplier_id',
        expectedQuery: "SELECT Products.product_name, Suppliers.supplier_name FROM Products INNER JOIN Suppliers ON Products.supplier_id = Suppliers.supplier_id",
        expectedQueries: [
            "SELECT p.product_name, s.supplier_name FROM Products p INNER JOIN Suppliers s ON p.supplier_id = s.supplier_id",
            "SELECT p.product_name, s.supplier_name FROM Products p JOIN Suppliers s ON p.supplier_id = s.supplier_id"
        ]
    },
    {
        id: 3,
        category: 'INNER JOIN',
        question: 'Lấy chi tiết đơn hàng kèm tên sản phẩm (detail_id, product_name, quantity).',
        hint: 'JOIN OrderDetails với Products',
        expectedQuery: "SELECT OrderDetails.detail_id, Products.product_name, OrderDetails.quantity FROM OrderDetails INNER JOIN Products ON OrderDetails.product_id = Products.product_id",
        expectedQueries: [
            "SELECT od.detail_id, p.product_name, od.quantity FROM OrderDetails od INNER JOIN Products p ON od.product_id = p.product_id",
            "SELECT od.detail_id, p.product_name, od.quantity FROM OrderDetails od JOIN Products p ON od.product_id = p.product_id"
        ]
    },
    {
        id: 4,
        category: 'INNER JOIN',
        question: 'Lấy chi tiết đơn hàng với ngày đặt (detail_id, order_date, quantity, unit_price).',
        hint: 'JOIN OrderDetails với Orders',
        expectedQuery: "SELECT OrderDetails.detail_id, Orders.order_date, OrderDetails.quantity, OrderDetails.unit_price FROM OrderDetails INNER JOIN Orders ON OrderDetails.order_id = Orders.order_id",
        expectedQueries: [
            "SELECT od.detail_id, o.order_date, od.quantity, od.unit_price FROM OrderDetails od INNER JOIN Orders o ON od.order_id = o.order_id"
        ]
    },
    {
        id: 5,
        category: 'INNER JOIN',
        question: 'Lấy nhân viên kèm tên quản lý - SELF JOIN (employee_name, manager_name).',
        hint: 'SELF JOIN: Employees e JOIN Employees m',
        expectedQuery: "SELECT e.employee_name, m.employee_name AS manager_name FROM Employees e INNER JOIN Employees m ON e.manager_id = m.employee_id",
        expectedQueries: [
            "SELECT e.employee_name, m.employee_name manager_name FROM Employees e JOIN Employees m ON e.manager_id = m.employee_id",
            "SELECT emp.employee_name, mgr.employee_name AS manager_name FROM Employees emp INNER JOIN Employees mgr ON emp.manager_id = mgr.employee_id"
        ]
    },

    // === JOIN + WHERE (5 câu) ===
    {
        id: 6,
        category: 'JOIN + WHERE',
        question: 'Lấy đơn hàng "Completed" kèm tên khách (order_id, customer_name, total_amount).',
        hint: 'JOIN rồi WHERE status = ...',
        expectedQuery: "SELECT Orders.order_id, Customers.customer_name, Orders.total_amount FROM Orders INNER JOIN Customers ON Orders.customer_id = Customers.customer_id WHERE Orders.status = 'Completed'",
        expectedQueries: [
            "SELECT o.order_id, c.customer_name, o.total_amount FROM Orders o INNER JOIN Customers c ON o.customer_id = c.customer_id WHERE o.status = 'Completed'",
            "SELECT o.order_id, c.customer_name, o.total_amount FROM Orders o JOIN Customers c ON o.customer_id = c.customer_id WHERE o.status = 'Completed'"
        ]
    },
    {
        id: 7,
        category: 'JOIN + WHERE',
        question: 'Lấy sản phẩm "Hải sản" kèm nhà cung cấp (product_name, price, supplier_name).',
        hint: 'WHERE category = ... sau khi JOIN',
        expectedQuery: "SELECT Products.product_name, Products.price, Suppliers.supplier_name FROM Products INNER JOIN Suppliers ON Products.supplier_id = Suppliers.supplier_id WHERE Products.category = 'Hải sản'",
        expectedQueries: [
            "SELECT p.product_name, p.price, s.supplier_name FROM Products p JOIN Suppliers s ON p.supplier_id = s.supplier_id WHERE p.category = 'Hải sản'"
        ]
    },
    {
        id: 8,
        category: 'JOIN + AND',
        question: 'Lấy đơn "Completed" VÀ total > 400000 (order_id, customer_name, total_amount).',
        hint: 'WHERE với AND kết hợp 2 điều kiện',
        expectedQuery: "SELECT Orders.order_id, Customers.customer_name, Orders.total_amount FROM Orders INNER JOIN Customers ON Orders.customer_id = Customers.customer_id WHERE Orders.status = 'Completed' AND Orders.total_amount > 400000",
        expectedQueries: [
            "SELECT o.order_id, c.customer_name, o.total_amount FROM Orders o JOIN Customers c ON o.customer_id = c.customer_id WHERE o.status = 'Completed' AND o.total_amount > 400000"
        ]
    },
    {
        id: 9,
        category: 'JOIN + OR',
        question: 'Lấy đơn "Pending" HOẶC "Cancelled" kèm khách (order_id, customer_name, status).',
        hint: 'WHERE với OR giữa 2 status',
        expectedQuery: "SELECT Orders.order_id, Customers.customer_name, Orders.status FROM Orders INNER JOIN Customers ON Orders.customer_id = Customers.customer_id WHERE Orders.status = 'Pending' OR Orders.status = 'Cancelled'",
        expectedQueries: [
            "SELECT o.order_id, c.customer_name, o.status FROM Orders o JOIN Customers c ON o.customer_id = c.customer_id WHERE o.status = 'Pending' OR o.status = 'Cancelled'",
            "SELECT o.order_id, c.customer_name, o.status FROM Orders o JOIN Customers c ON o.customer_id = c.customer_id WHERE o.status IN ('Pending', 'Cancelled')"
        ]
    },
    {
        id: 10,
        category: 'JOIN + NOT',
        question: 'Lấy sản phẩm KHÔNG phải "Sữa" kèm NCC (product_name, category, supplier_name).',
        hint: 'WHERE category <> hoặc NOT',
        expectedQuery: "SELECT Products.product_name, Products.category, Suppliers.supplier_name FROM Products INNER JOIN Suppliers ON Products.supplier_id = Suppliers.supplier_id WHERE Products.category <> 'Sữa'",
        expectedQueries: [
            "SELECT p.product_name, p.category, s.supplier_name FROM Products p JOIN Suppliers s ON p.supplier_id = s.supplier_id WHERE p.category <> 'Sữa'",
            "SELECT p.product_name, p.category, s.supplier_name FROM Products p JOIN Suppliers s ON p.supplier_id = s.supplier_id WHERE NOT p.category = 'Sữa'",
            "SELECT p.product_name, p.category, s.supplier_name FROM Products p JOIN Suppliers s ON p.supplier_id = s.supplier_id WHERE p.category != 'Sữa'"
        ]
    },

    // === JOIN + ORDER BY (3 câu) ===
    {
        id: 11,
        category: 'JOIN + ORDER BY',
        question: 'Đơn hàng kèm khách, sắp theo ngày mới nhất (order_id, customer_name, order_date).',
        hint: 'ORDER BY ... DESC',
        expectedQuery: "SELECT Orders.order_id, Customers.customer_name, Orders.order_date FROM Orders INNER JOIN Customers ON Orders.customer_id = Customers.customer_id ORDER BY Orders.order_date DESC",
        expectedQueries: [
            "SELECT o.order_id, c.customer_name, o.order_date FROM Orders o JOIN Customers c ON o.customer_id = c.customer_id ORDER BY o.order_date DESC"
        ]
    },
    {
        id: 12,
        category: 'JOIN + ORDER BY',
        question: 'Sản phẩm kèm NCC, sắp theo giá tăng dần (product_name, price, supplier_name).',
        hint: 'ORDER BY price ASC',
        expectedQuery: "SELECT Products.product_name, Products.price, Suppliers.supplier_name FROM Products INNER JOIN Suppliers ON Products.supplier_id = Suppliers.supplier_id ORDER BY Products.price ASC",
        expectedQueries: [
            "SELECT p.product_name, p.price, s.supplier_name FROM Products p JOIN Suppliers s ON p.supplier_id = s.supplier_id ORDER BY p.price ASC",
            "SELECT p.product_name, p.price, s.supplier_name FROM Products p JOIN Suppliers s ON p.supplier_id = s.supplier_id ORDER BY p.price"
        ]
    },
    {
        id: 13,
        category: 'JOIN + ORDER BY',
        question: 'Chi tiết đơn kèm sản phẩm, theo quantity giảm (product_name, quantity, unit_price).',
        hint: 'ORDER BY quantity DESC',
        expectedQuery: "SELECT Products.product_name, OrderDetails.quantity, OrderDetails.unit_price FROM OrderDetails INNER JOIN Products ON OrderDetails.product_id = Products.product_id ORDER BY OrderDetails.quantity DESC",
        expectedQueries: [
            "SELECT p.product_name, od.quantity, od.unit_price FROM OrderDetails od JOIN Products p ON od.product_id = p.product_id ORDER BY od.quantity DESC"
        ]
    },

    // === JOIN + LIKE (2 câu) ===
    {
        id: 14,
        category: 'JOIN + LIKE',
        question: 'Sản phẩm tên bắt đầu "Thịt" kèm NCC (product_name, price, supplier_name).',
        hint: 'LIKE với ký tự % ở cuối',
        expectedQuery: "SELECT Products.product_name, Products.price, Suppliers.supplier_name FROM Products INNER JOIN Suppliers ON Products.supplier_id = Suppliers.supplier_id WHERE Products.product_name LIKE 'Thịt%'",
        expectedQueries: [
            "SELECT p.product_name, p.price, s.supplier_name FROM Products p JOIN Suppliers s ON p.supplier_id = s.supplier_id WHERE p.product_name LIKE 'Thịt%'"
        ]
    },
    {
        id: 15,
        category: 'JOIN + LIKE',
        question: 'Khách có email chứa "gmail" kèm đơn hàng (customer_name, email, order_id).',
        hint: 'LIKE với % ở cả 2 đầu',
        expectedQuery: "SELECT Customers.customer_name, Customers.email, Orders.order_id FROM Customers INNER JOIN Orders ON Customers.customer_id = Orders.customer_id WHERE Customers.email LIKE '%gmail%'",
        expectedQueries: [
            "SELECT c.customer_name, c.email, o.order_id FROM Customers c JOIN Orders o ON c.customer_id = o.customer_id WHERE c.email LIKE '%gmail%'"
        ]
    },

    // === JOIN + IN / BETWEEN (3 câu) ===
    {
        id: 16,
        category: 'JOIN + IN',
        question: 'Sản phẩm "Thịt", "Hải sản", "Trứng" kèm NCC (product_name, category, supplier_name).',
        hint: 'WHERE category IN (...)',
        expectedQuery: "SELECT Products.product_name, Products.category, Suppliers.supplier_name FROM Products INNER JOIN Suppliers ON Products.supplier_id = Suppliers.supplier_id WHERE Products.category IN ('Thịt', 'Hải sản', 'Trứng')",
        expectedQueries: [
            "SELECT p.product_name, p.category, s.supplier_name FROM Products p JOIN Suppliers s ON p.supplier_id = s.supplier_id WHERE p.category IN ('Thịt', 'Hải sản', 'Trứng')"
        ]
    },
    {
        id: 17,
        category: 'JOIN + BETWEEN',
        question: 'Đơn có tổng tiền 300000-600000 kèm khách (order_id, customer_name, total_amount).',
        hint: 'WHERE ... BETWEEN ... AND ...',
        expectedQuery: "SELECT Orders.order_id, Customers.customer_name, Orders.total_amount FROM Orders INNER JOIN Customers ON Orders.customer_id = Customers.customer_id WHERE Orders.total_amount BETWEEN 300000 AND 600000",
        expectedQueries: [
            "SELECT o.order_id, c.customer_name, o.total_amount FROM Orders o JOIN Customers c ON o.customer_id = c.customer_id WHERE o.total_amount BETWEEN 300000 AND 600000",
            "SELECT o.order_id, c.customer_name, o.total_amount FROM Orders o JOIN Customers c ON o.customer_id = c.customer_id WHERE o.total_amount >= 300000 AND o.total_amount <= 600000"
        ]
    },
    {
        id: 18,
        category: 'JOIN + IN',
        question: 'Đơn của khách ở "Hà Nội", "Hồ Chí Minh" (order_id, customer_name, city, total_amount).',
        hint: 'WHERE city IN (...)',
        expectedQuery: "SELECT Orders.order_id, Customers.customer_name, Customers.city, Orders.total_amount FROM Orders INNER JOIN Customers ON Orders.customer_id = Customers.customer_id WHERE Customers.city IN ('Hà Nội', 'Hồ Chí Minh')",
        expectedQueries: [
            "SELECT o.order_id, c.customer_name, c.city, o.total_amount FROM Orders o JOIN Customers c ON o.customer_id = c.customer_id WHERE c.city IN ('Hà Nội', 'Hồ Chí Minh')"
        ]
    },

    // === LEFT JOIN (4 câu) ===
    {
        id: 19,
        category: 'LEFT JOIN',
        question: 'TẤT CẢ khách hàng và đơn hàng của họ (nếu có) - customer_name, order_id, total_amount.',
        hint: 'Dùng LEFT JOIN thay vì INNER JOIN',
        expectedQuery: "SELECT Customers.customer_name, Orders.order_id, Orders.total_amount FROM Customers LEFT JOIN Orders ON Customers.customer_id = Orders.customer_id",
        expectedQueries: [
            "SELECT c.customer_name, o.order_id, o.total_amount FROM Customers c LEFT JOIN Orders o ON c.customer_id = o.customer_id"
        ]
    },
    {
        id: 20,
        category: 'LEFT JOIN',
        question: 'Sản phẩm CHƯA được đặt hàng (product_id, product_name) - dùng IS NULL.',
        hint: 'LEFT JOIN rồi WHERE ... IS NULL',
        expectedQuery: "SELECT Products.product_id, Products.product_name FROM Products LEFT JOIN OrderDetails ON Products.product_id = OrderDetails.product_id WHERE OrderDetails.detail_id IS NULL",
        expectedQueries: [
            "SELECT p.product_id, p.product_name FROM Products p LEFT JOIN OrderDetails od ON p.product_id = od.product_id WHERE od.detail_id IS NULL",
            "SELECT p.product_id, p.product_name FROM Products p LEFT JOIN OrderDetails od ON p.product_id = od.product_id WHERE od.product_id IS NULL"
        ]
    },
    {
        id: 21,
        category: 'LEFT JOIN',
        question: 'Khách hàng CHƯA CÓ đơn nào (customer_id, customer_name).',
        hint: 'LEFT JOIN + WHERE order_id IS NULL',
        expectedQuery: "SELECT Customers.customer_id, Customers.customer_name FROM Customers LEFT JOIN Orders ON Customers.customer_id = Orders.customer_id WHERE Orders.order_id IS NULL",
        expectedQueries: [
            "SELECT c.customer_id, c.customer_name FROM Customers c LEFT JOIN Orders o ON c.customer_id = o.customer_id WHERE o.order_id IS NULL"
        ]
    },
    {
        id: 22,
        category: 'LEFT JOIN',
        question: 'TẤT CẢ nhân viên kèm tên quản lý (nếu có) - employee_name, position, manager_name.',
        hint: 'SELF LEFT JOIN với Employees',
        expectedQuery: "SELECT e.employee_name, e.position, m.employee_name AS manager_name FROM Employees e LEFT JOIN Employees m ON e.manager_id = m.employee_id",
        expectedQueries: [
            "SELECT e.employee_name, e.position, m.employee_name manager_name FROM Employees e LEFT JOIN Employees m ON e.manager_id = m.employee_id",
            "SELECT emp.employee_name, emp.position, mgr.employee_name AS manager_name FROM Employees emp LEFT JOIN Employees mgr ON emp.manager_id = mgr.employee_id"
        ]
    },

    // === JOIN + Aliases (2 câu) ===
    {
        id: 23,
        category: 'JOIN + Aliases',
        question: 'Đơn hàng kèm khách với alias: TenKH, MaDH, NgayDat, TongTien.',
        hint: 'Dùng AS để đặt tên cột',
        expectedQuery: "SELECT Customers.customer_name AS TenKH, Orders.order_id AS MaDH, Orders.order_date AS NgayDat, Orders.total_amount AS TongTien FROM Orders INNER JOIN Customers ON Orders.customer_id = Customers.customer_id",
        expectedQueries: [
            "SELECT c.customer_name AS TenKH, o.order_id AS MaDH, o.order_date AS NgayDat, o.total_amount AS TongTien FROM Orders o JOIN Customers c ON o.customer_id = c.customer_id",
            "SELECT c.customer_name TenKH, o.order_id MaDH, o.order_date NgayDat, o.total_amount TongTien FROM Orders o JOIN Customers c ON o.customer_id = c.customer_id"
        ]
    },
    {
        id: 24,
        category: 'JOIN + Aliases',
        question: 'Sản phẩm kèm NCC với alias: TenSP, Gia, NhaCungCap, ThanhPho.',
        hint: 'Dùng AS cho tên cột mới',
        expectedQuery: "SELECT Products.product_name AS TenSP, Products.price AS Gia, Suppliers.supplier_name AS NhaCungCap, Suppliers.city AS ThanhPho FROM Products INNER JOIN Suppliers ON Products.supplier_id = Suppliers.supplier_id",
        expectedQueries: [
            "SELECT p.product_name AS TenSP, p.price AS Gia, s.supplier_name AS NhaCungCap, s.city AS ThanhPho FROM Products p JOIN Suppliers s ON p.supplier_id = s.supplier_id",
            "SELECT p.product_name TenSP, p.price Gia, s.supplier_name NhaCungCap, s.city ThanhPho FROM Products p JOIN Suppliers s ON p.supplier_id = s.supplier_id"
        ]
    },

    // === JOIN + Aggregate (4 câu) ===
    {
        id: 25,
        category: 'JOIN + COUNT',
        question: 'Đếm số chi tiết đơn của sản phẩm "Thịt Bò Úc" (dùng alias: so_luong).',
        hint: 'SELECT COUNT(*) AS ... WHERE product_name = ...',
        expectedQuery: "SELECT COUNT(*) AS so_luong FROM OrderDetails INNER JOIN Products ON OrderDetails.product_id = Products.product_id WHERE Products.product_name = 'Thịt Bò Úc'",
        expectedQueries: [
            "SELECT COUNT(*) so_luong FROM OrderDetails od JOIN Products p ON od.product_id = p.product_id WHERE p.product_name = 'Thịt Bò Úc'"
        ]
    },
    {
        id: 26,
        category: 'JOIN + SUM',
        question: 'Tổng doanh thu đơn hàng khách ở "Hà Nội" (alias: tong_doanh_thu).',
        hint: 'SELECT SUM(total_amount) AS ...',
        expectedQuery: "SELECT SUM(Orders.total_amount) AS tong_doanh_thu FROM Orders INNER JOIN Customers ON Orders.customer_id = Customers.customer_id WHERE Customers.city = 'Hà Nội'",
        expectedQueries: [
            "SELECT SUM(o.total_amount) AS tong_doanh_thu FROM Orders o JOIN Customers c ON o.customer_id = c.customer_id WHERE c.city = 'Hà Nội'",
            "SELECT SUM(o.total_amount) tong_doanh_thu FROM Orders o JOIN Customers c ON o.customer_id = c.customer_id WHERE c.city = 'Hà Nội'"
        ]
    },
    {
        id: 27,
        category: 'JOIN + AVG',
        question: 'Giá trung bình sản phẩm của "Vinamilk" (alias: gia_tb).',
        hint: 'SELECT AVG(price) AS ...',
        expectedQuery: "SELECT AVG(Products.price) AS gia_tb FROM Products INNER JOIN Suppliers ON Products.supplier_id = Suppliers.supplier_id WHERE Suppliers.supplier_name = 'Vinamilk'",
        expectedQueries: [
            "SELECT AVG(p.price) AS gia_tb FROM Products p JOIN Suppliers s ON p.supplier_id = s.supplier_id WHERE s.supplier_name = 'Vinamilk'",
            "SELECT AVG(p.price) gia_tb FROM Products p JOIN Suppliers s ON p.supplier_id = s.supplier_id WHERE s.supplier_name = 'Vinamilk'"
        ]
    },
    {
        id: 28,
        category: 'JOIN + MIN/MAX',
        question: 'Đơn hàng "Completed" có giá trị nhỏ/lớn nhất (min_order, max_order).',
        hint: 'SELECT MIN(...), MAX(...) WHERE status = ...',
        expectedQuery: "SELECT MIN(Orders.total_amount) AS min_order, MAX(Orders.total_amount) AS max_order FROM Orders INNER JOIN Customers ON Orders.customer_id = Customers.customer_id WHERE Orders.status = 'Completed'",
        expectedQueries: [
            "SELECT MIN(o.total_amount) AS min_order, MAX(o.total_amount) AS max_order FROM Orders o JOIN Customers c ON o.customer_id = c.customer_id WHERE o.status = 'Completed'",
            "SELECT MIN(o.total_amount) min_order, MAX(o.total_amount) max_order FROM Orders o JOIN Customers c ON o.customer_id = c.customer_id WHERE o.status = 'Completed'"
        ]
    },

    // === JOIN Kết hợp nhiều bảng (2 câu) ===
    {
        id: 29,
        category: 'JOIN Kết hợp',
        question: 'Tên khách, ngày đặt, tên SP, số lượng - JOIN 4 bảng (customer_name, order_date, product_name, quantity).',
        hint: 'JOIN Orders-Customers-OrderDetails-Products',
        expectedQuery: "SELECT Customers.customer_name, Orders.order_date, Products.product_name, OrderDetails.quantity FROM Orders INNER JOIN Customers ON Orders.customer_id = Customers.customer_id INNER JOIN OrderDetails ON Orders.order_id = OrderDetails.order_id INNER JOIN Products ON OrderDetails.product_id = Products.product_id",
        expectedQueries: [
            "SELECT c.customer_name, o.order_date, p.product_name, od.quantity FROM Orders o JOIN Customers c ON o.customer_id = c.customer_id JOIN OrderDetails od ON o.order_id = od.order_id JOIN Products p ON od.product_id = p.product_id"
        ]
    },
    {
        id: 30,
        category: 'JOIN Kết hợp',
        question: 'Khách "Hà Nội", đơn "Completed", SP "Thịt", sắp theo ngày mới (customer_name, order_date, product_name).',
        hint: 'JOIN 4 bảng + WHERE + ORDER BY DESC',
        expectedQuery: "SELECT Customers.customer_name, Orders.order_date, Products.product_name FROM Orders INNER JOIN Customers ON Orders.customer_id = Customers.customer_id INNER JOIN OrderDetails ON Orders.order_id = OrderDetails.order_id INNER JOIN Products ON OrderDetails.product_id = Products.product_id WHERE Customers.city = 'Hà Nội' AND Orders.status = 'Completed' AND Products.category = 'Thịt' ORDER BY Orders.order_date DESC",
        expectedQueries: [
            "SELECT c.customer_name, o.order_date, p.product_name FROM Orders o JOIN Customers c ON o.customer_id = c.customer_id JOIN OrderDetails od ON o.order_id = od.order_id JOIN Products p ON od.product_id = p.product_id WHERE c.city = 'Hà Nội' AND o.status = 'Completed' AND p.category = 'Thịt' ORDER BY o.order_date DESC"
        ]
    },
];
