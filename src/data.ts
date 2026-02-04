
// ========== FRESH SHOP DATABASE ==========

export interface Product {
    product_id: number;
    product_name: string;
    category: string;
    price: number;
    stock_quantity: number;
    supplier_id: number;
}

export interface Customer {
    customer_id: number;
    customer_name: string;
    email: string;
    phone: string;
    city: string;
    join_date: string;
}

export interface Order {
    order_id: number;
    customer_id: number;
    order_date: string;
    total_amount: number;
    status: string;
}

export interface OrderDetail {
    detail_id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    unit_price: number;
}

export interface Supplier {
    supplier_id: number;
    supplier_name: string;
    contact_name: string;
    phone: string;
    city: string;
}

// ========== INITIAL DATA ==========

export const initialProducts: Product[] = [
    { product_id: 1, product_name: 'Táo Fuji', category: 'Trái cây', price: 45000, stock_quantity: 150, supplier_id: 1 },
    { product_id: 2, product_name: 'Cam Sành', category: 'Trái cây', price: 35000, stock_quantity: 200, supplier_id: 1 },
    { product_id: 3, product_name: 'Chuối Già', category: 'Trái cây', price: 25000, stock_quantity: 180, supplier_id: 2 },
    { product_id: 4, product_name: 'Xoài Cát', category: 'Trái cây', price: 55000, stock_quantity: 80, supplier_id: 2 },
    { product_id: 5, product_name: 'Rau Muống', category: 'Rau củ', price: 8000, stock_quantity: 100, supplier_id: 3 },
    { product_id: 6, product_name: 'Cải Thìa', category: 'Rau củ', price: 12000, stock_quantity: 90, supplier_id: 3 },
    { product_id: 7, product_name: 'Cà Rốt', category: 'Rau củ', price: 15000, stock_quantity: 120, supplier_id: 3 },
    { product_id: 8, product_name: 'Khoai Tây', category: 'Rau củ', price: 18000, stock_quantity: 200, supplier_id: 4 },
    { product_id: 9, product_name: 'Thịt Bò Úc', category: 'Thịt', price: 280000, stock_quantity: 50, supplier_id: 5 },
    { product_id: 10, product_name: 'Thịt Heo Ba Chỉ', category: 'Thịt', price: 120000, stock_quantity: 70, supplier_id: 5 },
    { product_id: 11, product_name: 'Gà Ta Nguyên Con', category: 'Thịt', price: 150000, stock_quantity: 40, supplier_id: 5 },
    { product_id: 12, product_name: 'Cá Hồi Na Uy', category: 'Hải sản', price: 350000, stock_quantity: 30, supplier_id: 6 },
    { product_id: 13, product_name: 'Tôm Sú', category: 'Hải sản', price: 180000, stock_quantity: 60, supplier_id: 6 },
    { product_id: 14, product_name: 'Mực Ống', category: 'Hải sản', price: 200000, stock_quantity: 45, supplier_id: 6 },
    { product_id: 15, product_name: 'Sữa Tươi Vinamilk', category: 'Sữa', price: 32000, stock_quantity: 300, supplier_id: 7 },
    { product_id: 16, product_name: 'Sữa Chua Vinamilk', category: 'Sữa', price: 28000, stock_quantity: 250, supplier_id: 7 },
    { product_id: 17, product_name: 'Phô Mai Con Bò Cười', category: 'Sữa', price: 45000, stock_quantity: 100, supplier_id: 7 },
    { product_id: 18, product_name: 'Trứng Gà Ta', category: 'Trứng', price: 40000, stock_quantity: 200, supplier_id: 8 },
    { product_id: 19, product_name: 'Trứng Vịt', category: 'Trứng', price: 35000, stock_quantity: 150, supplier_id: 8 },
    { product_id: 20, product_name: 'Nước Mắm Phú Quốc', category: 'Gia vị', price: 65000, stock_quantity: 80, supplier_id: 9 },
];

export const initialCustomers: Customer[] = [
    { customer_id: 1, customer_name: 'Nguyễn Văn An', email: 'an.nguyen@gmail.com', phone: '0901234567', city: 'Hà Nội', join_date: '2023-01-15' },
    { customer_id: 2, customer_name: 'Trần Thị Bình', email: 'binh.tran@gmail.com', phone: '0912345678', city: 'Hồ Chí Minh', join_date: '2023-02-20' },
    { customer_id: 3, customer_name: 'Lê Văn Cường', email: 'cuong.le@yahoo.com', phone: '0923456789', city: 'Đà Nẵng', join_date: '2023-03-10' },
    { customer_id: 4, customer_name: 'Phạm Thị Dung', email: 'dung.pham@gmail.com', phone: '0934567890', city: 'Hà Nội', join_date: '2023-04-05' },
    { customer_id: 5, customer_name: 'Hoàng Văn Em', email: 'em.hoang@hotmail.com', phone: '0945678901', city: 'Hồ Chí Minh', join_date: '2023-05-12' },
    { customer_id: 6, customer_name: 'Đỗ Thị Phương', email: 'phuong.do@gmail.com', phone: '0956789012', city: 'Cần Thơ', join_date: '2023-06-18' },
    { customer_id: 7, customer_name: 'Vũ Văn Giang', email: 'giang.vu@gmail.com', phone: '0967890123', city: 'Hải Phòng', join_date: '2023-07-22' },
    { customer_id: 8, customer_name: 'Ngô Thị Hương', email: 'huong.ngo@yahoo.com', phone: '0978901234', city: 'Hà Nội', join_date: '2023-08-30' },
    { customer_id: 9, customer_name: 'Bùi Văn Khang', email: 'khang.bui@gmail.com', phone: '0989012345', city: 'Hồ Chí Minh', join_date: '2024-01-08' },
    { customer_id: 10, customer_name: 'Đặng Thị Linh', email: 'linh.dang@gmail.com', phone: '0990123456', city: 'Đà Nẵng', join_date: '2024-02-14' },
];

export const initialOrders: Order[] = [
    { order_id: 1, customer_id: 1, order_date: '2024-01-05', total_amount: 450000, status: 'Completed' },
    { order_id: 2, customer_id: 2, order_date: '2024-01-06', total_amount: 280000, status: 'Completed' },
    { order_id: 3, customer_id: 1, order_date: '2024-01-10', total_amount: 650000, status: 'Completed' },
    { order_id: 4, customer_id: 3, order_date: '2024-01-12', total_amount: 120000, status: 'Cancelled' },
    { order_id: 5, customer_id: 4, order_date: '2024-01-15', total_amount: 890000, status: 'Completed' },
    { order_id: 6, customer_id: 5, order_date: '2024-01-18', total_amount: 350000, status: 'Pending' },
    { order_id: 7, customer_id: 2, order_date: '2024-01-20', total_amount: 420000, status: 'Completed' },
    { order_id: 8, customer_id: 6, order_date: '2024-01-22', total_amount: 180000, status: 'Completed' },
    { order_id: 9, customer_id: 7, order_date: '2024-01-25', total_amount: 560000, status: 'Pending' },
    { order_id: 10, customer_id: 8, order_date: '2024-01-28', total_amount: 720000, status: 'Completed' },
    { order_id: 11, customer_id: 1, order_date: '2024-02-01', total_amount: 310000, status: 'Completed' },
    { order_id: 12, customer_id: 9, order_date: '2024-02-05', total_amount: 480000, status: 'Completed' },
    { order_id: 13, customer_id: 10, order_date: '2024-02-08', total_amount: 250000, status: 'Pending' },
    { order_id: 14, customer_id: 3, order_date: '2024-02-10', total_amount: 1200000, status: 'Completed' },
    { order_id: 15, customer_id: 4, order_date: '2024-02-12', total_amount: 95000, status: 'Cancelled' },
];

export const initialOrderDetails: OrderDetail[] = [
    { detail_id: 1, order_id: 1, product_id: 1, quantity: 2, unit_price: 45000 },
    { detail_id: 2, order_id: 1, product_id: 9, quantity: 1, unit_price: 280000 },
    { detail_id: 3, order_id: 2, product_id: 12, quantity: 1, unit_price: 350000 },
    { detail_id: 4, order_id: 3, product_id: 10, quantity: 2, unit_price: 120000 },
    { detail_id: 5, order_id: 3, product_id: 13, quantity: 2, unit_price: 180000 },
    { detail_id: 6, order_id: 4, product_id: 5, quantity: 5, unit_price: 8000 },
    { detail_id: 7, order_id: 4, product_id: 6, quantity: 5, unit_price: 12000 },
    { detail_id: 8, order_id: 5, product_id: 9, quantity: 3, unit_price: 280000 },
    { detail_id: 9, order_id: 6, product_id: 15, quantity: 5, unit_price: 32000 },
    { detail_id: 10, order_id: 6, product_id: 16, quantity: 5, unit_price: 28000 },
    { detail_id: 11, order_id: 7, product_id: 11, quantity: 2, unit_price: 150000 },
    { detail_id: 12, order_id: 7, product_id: 18, quantity: 3, unit_price: 40000 },
    { detail_id: 13, order_id: 8, product_id: 2, quantity: 3, unit_price: 35000 },
    { detail_id: 14, order_id: 8, product_id: 3, quantity: 3, unit_price: 25000 },
    { detail_id: 15, order_id: 9, product_id: 14, quantity: 2, unit_price: 200000 },
    { detail_id: 16, order_id: 10, product_id: 12, quantity: 2, unit_price: 350000 },
    { detail_id: 17, order_id: 11, product_id: 4, quantity: 4, unit_price: 55000 },
    { detail_id: 18, order_id: 11, product_id: 7, quantity: 3, unit_price: 15000 },
    { detail_id: 19, order_id: 12, product_id: 17, quantity: 4, unit_price: 45000 },
    { detail_id: 20, order_id: 12, product_id: 20, quantity: 3, unit_price: 65000 },
];

export const initialSuppliers: Supplier[] = [
    { supplier_id: 1, supplier_name: 'Nông Trại Đà Lạt', contact_name: 'Nguyễn Hữu Tâm', phone: '0281234567', city: 'Đà Lạt' },
    { supplier_id: 2, supplier_name: 'Vườn Cây Bến Tre', contact_name: 'Trần Minh Tuấn', phone: '0282345678', city: 'Bến Tre' },
    { supplier_id: 3, supplier_name: 'HTX Rau An Toàn', contact_name: 'Lê Thị Mai', phone: '0283456789', city: 'Hà Nội' },
    { supplier_id: 4, supplier_name: 'Nông Sản Tây Nguyên', contact_name: 'Phạm Văn Hùng', phone: '0284567890', city: 'Đắk Lắk' },
    { supplier_id: 5, supplier_name: 'Thịt Sạch Việt', contact_name: 'Hoàng Đức Long', phone: '0285678901', city: 'Hà Nội' },
    { supplier_id: 6, supplier_name: 'Hải Sản Phan Thiết', contact_name: 'Đỗ Thanh Hải', phone: '0286789012', city: 'Bình Thuận' },
    { supplier_id: 7, supplier_name: 'Vinamilk', contact_name: 'Vũ Thị Hoa', phone: '0287890123', city: 'Hồ Chí Minh' },
    { supplier_id: 8, supplier_name: 'Trại Gà Đông Anh', contact_name: 'Ngô Quang Vinh', phone: '0288901234', city: 'Hà Nội' },
    { supplier_id: 9, supplier_name: 'Nước Mắm Phú Quốc', contact_name: 'Bùi Văn Thành', phone: '0289012345', city: 'Kiên Giang' },
];

// ========== EXERCISES ==========

export interface Exercise {
    id: number;
    category: string;
    question: string;
    hint: string;
    expectedQuery?: string;
}

export const exercises: Exercise[] = [
    // === SELECT Cơ Bản (3 câu) ===
    { id: 1, category: 'SELECT Cơ Bản', question: 'Lấy tất cả thông tin sản phẩm.', hint: 'SELECT * FROM Products', expectedQuery: "SELECT * FROM Products" },
    { id: 2, category: 'SELECT Cơ Bản', question: 'Lấy tên và giá của tất cả sản phẩm.', hint: 'SELECT product_name, price FROM ...', expectedQuery: "SELECT product_name, price FROM Products" },
    { id: 3, category: 'SELECT Cơ Bản', question: 'Lấy danh sách khách hàng (customer_name, city).', hint: 'SELECT col1, col2 FROM Customers', expectedQuery: "SELECT customer_name, city FROM Customers" },

    // === DISTINCT (2 câu) ===
    { id: 4, category: 'DISTINCT', question: 'Lấy danh sách các danh mục sản phẩm không trùng lặp.', hint: 'SELECT DISTINCT category FROM ...', expectedQuery: "SELECT DISTINCT category FROM Products" },
    { id: 5, category: 'DISTINCT', question: 'Lấy danh sách các thành phố của khách hàng không trùng lặp.', hint: 'SELECT DISTINCT city FROM ...', expectedQuery: "SELECT DISTINCT city FROM Customers" },

    // === WHERE (4 câu) ===
    { id: 6, category: 'WHERE', question: 'Tìm sản phẩm có giá lớn hơn 100,000đ.', hint: 'WHERE price > 100000', expectedQuery: "SELECT * FROM Products WHERE price > 100000" },
    { id: 7, category: 'WHERE', question: 'Tìm khách hàng ở thành phố "Hà Nội".', hint: "WHERE city = 'Hà Nội'", expectedQuery: "SELECT * FROM Customers WHERE city = 'Hà Nội'" },
    { id: 8, category: 'WHERE', question: 'Tìm đơn hàng có trạng thái "Completed".', hint: "WHERE status = 'Completed'", expectedQuery: "SELECT * FROM Orders WHERE status = 'Completed'" },
    { id: 9, category: 'WHERE', question: 'Tìm sản phẩm có số lượng tồn kho dưới 50.', hint: 'WHERE stock_quantity < 50', expectedQuery: "SELECT * FROM Products WHERE stock_quantity < 50" },

    // === ORDER BY (2 câu) ===
    { id: 10, category: 'ORDER BY', question: 'Lấy tất cả sản phẩm sắp xếp theo giá tăng dần.', hint: 'ORDER BY price ASC', expectedQuery: "SELECT * FROM Products ORDER BY price ASC" },
    { id: 11, category: 'ORDER BY', question: 'Lấy tất cả đơn hàng sắp xếp theo tổng tiền giảm dần.', hint: 'ORDER BY total_amount DESC', expectedQuery: "SELECT * FROM Orders ORDER BY total_amount DESC" },

    // === AND / OR / NOT (3 câu) ===
    { id: 12, category: 'AND / OR / NOT', question: 'Tìm sản phẩm thuộc danh mục "Trái cây" VÀ giá dưới 50,000đ.', hint: "WHERE category = '...' AND price < ...", expectedQuery: "SELECT * FROM Products WHERE category = 'Trái cây' AND price < 50000" },
    { id: 13, category: 'AND / OR / NOT', question: 'Tìm đơn hàng có trạng thái "Completed" HOẶC "Pending".', hint: "WHERE status = '...' OR status = '...'", expectedQuery: "SELECT * FROM Orders WHERE status = 'Completed' OR status = 'Pending'" },
    { id: 14, category: 'AND / OR / NOT', question: 'Tìm sản phẩm KHÔNG thuộc danh mục "Sữa".', hint: "WHERE category <> 'Sữa'", expectedQuery: "SELECT * FROM Products WHERE category <> 'Sữa'" },

    // === IN / BETWEEN (2 câu) ===
    { id: 15, category: 'IN / BETWEEN', question: 'Tìm sản phẩm thuộc danh mục "Thịt", "Hải sản" hoặc "Trứng".', hint: "WHERE category IN (...)", expectedQuery: "SELECT * FROM Products WHERE category IN ('Thịt', 'Hải sản', 'Trứng')" },
    { id: 16, category: 'IN / BETWEEN', question: 'Tìm đơn hàng có tổng tiền từ 300,000đ đến 600,000đ.', hint: 'WHERE total_amount BETWEEN ... AND ...', expectedQuery: "SELECT * FROM Orders WHERE total_amount BETWEEN 300000 AND 600000" },

    // === LIKE (2 câu) ===
    { id: 17, category: 'LIKE', question: 'Tìm sản phẩm có tên bắt đầu bằng "Thịt".', hint: "WHERE product_name LIKE 'Thịt%'", expectedQuery: "SELECT * FROM Products WHERE product_name LIKE 'Thịt%'" },
    { id: 18, category: 'LIKE', question: 'Tìm khách hàng có email chứa "gmail".', hint: "WHERE email LIKE '%gmail%'", expectedQuery: "SELECT * FROM Customers WHERE email LIKE '%gmail%'" },

    // === Aliases (1 câu) ===
    { id: 19, category: 'Aliases', question: 'Lấy product_name với alias "TenSP" và price với alias "Gia".', hint: 'SELECT col AS alias ...', expectedQuery: "SELECT product_name AS TenSP, price AS Gia FROM Products" },

    // === COUNT (3 câu) ===
    { id: 20, category: 'COUNT', question: 'Đếm tổng số sản phẩm trong hệ thống.', hint: 'SELECT COUNT(*) AS total_products FROM Products', expectedQuery: "SELECT COUNT(*) AS total_products FROM Products" },
    { id: 21, category: 'COUNT', question: 'Đếm số khách hàng ở thành phố "Hà Nội".', hint: "SELECT COUNT(*) AS so_luong FROM Customers WHERE city = '...'", expectedQuery: "SELECT COUNT(*) AS so_luong FROM Customers WHERE city = 'Hà Nội'" },
    { id: 22, category: 'COUNT', question: 'Đếm số đơn hàng có trạng thái "Completed".', hint: "SELECT COUNT(*) AS so_luong FROM Orders WHERE status = '...'", expectedQuery: "SELECT COUNT(*) AS so_luong FROM Orders WHERE status = 'Completed'" },

    // === SUM (3 câu) ===
    { id: 23, category: 'SUM', question: 'Tính tổng doanh thu từ tất cả đơn hàng.', hint: 'SELECT SUM(total_amount) AS total_revenue FROM Orders', expectedQuery: "SELECT SUM(total_amount) AS total_revenue FROM Orders" },
    { id: 24, category: 'SUM', question: 'Tính tổng số lượng tồn kho của tất cả sản phẩm.', hint: 'SELECT SUM(stock_quantity) AS total_stock FROM Products', expectedQuery: "SELECT SUM(stock_quantity) AS total_stock FROM Products" },
    { id: 25, category: 'SUM', question: 'Tính tổng số lượng sản phẩm đã bán trong OrderDetails.', hint: 'SELECT SUM(quantity) AS total_sold FROM OrderDetails', expectedQuery: "SELECT SUM(quantity) AS total_sold FROM OrderDetails" },

    // === AVG (2 câu) ===
    { id: 26, category: 'AVG', question: 'Tính giá trung bình của tất cả sản phẩm.', hint: 'SELECT AVG(price) AS avg_price FROM Products', expectedQuery: "SELECT AVG(price) AS avg_price FROM Products" },
    { id: 27, category: 'AVG', question: 'Tính giá trị trung bình của các đơn hàng.', hint: 'SELECT AVG(total_amount) AS avg_order FROM Orders', expectedQuery: "SELECT AVG(total_amount) AS avg_order FROM Orders" },

    // === MIN / MAX (3 câu) ===
    { id: 28, category: 'MIN / MAX', question: 'Tìm giá sản phẩm thấp nhất và cao nhất.', hint: 'SELECT MIN(price) AS min_price, MAX(price) AS max_price FROM Products', expectedQuery: "SELECT MIN(price) AS min_price, MAX(price) AS max_price FROM Products" },
    { id: 29, category: 'MIN / MAX', question: 'Tìm đơn hàng có giá trị nhỏ nhất.', hint: 'SELECT MIN(total_amount) AS min_order FROM Orders', expectedQuery: "SELECT MIN(total_amount) AS min_order FROM Orders" },
    { id: 30, category: 'MIN / MAX', question: 'Tìm ngày đặt hàng đầu tiên và gần nhất.', hint: 'SELECT MIN(order_date) AS first_order, MAX(order_date) AS last_order FROM Orders', expectedQuery: "SELECT MIN(order_date) AS first_order, MAX(order_date) AS last_order FROM Orders" },
];
