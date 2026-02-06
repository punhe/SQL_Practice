
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

export interface Employee {
    employee_id: number;
    employee_name: string;
    position: string;
    manager_id: number | null;
    salary: number;
    department: string;
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

// Thêm bảng Employees cho SELF JOIN
export const initialEmployees: Employee[] = [
    { employee_id: 1, employee_name: 'Nguyễn Minh Quản', position: 'Giám đốc', manager_id: null, salary: 50000000, department: 'Ban Giám Đốc' },
    { employee_id: 2, employee_name: 'Trần Văn Trưởng', position: 'Trưởng phòng Kinh doanh', manager_id: 1, salary: 30000000, department: 'Kinh doanh' },
    { employee_id: 3, employee_name: 'Lê Thị Hà', position: 'Trưởng phòng Kho', manager_id: 1, salary: 28000000, department: 'Kho vận' },
    { employee_id: 4, employee_name: 'Phạm Anh Tuấn', position: 'Nhân viên Kinh doanh', manager_id: 2, salary: 15000000, department: 'Kinh doanh' },
    { employee_id: 5, employee_name: 'Hoàng Thị Mai', position: 'Nhân viên Kinh doanh', manager_id: 2, salary: 14000000, department: 'Kinh doanh' },
    { employee_id: 6, employee_name: 'Vũ Văn Nam', position: 'Nhân viên Kho', manager_id: 3, salary: 12000000, department: 'Kho vận' },
    { employee_id: 7, employee_name: 'Đỗ Thị Lan', position: 'Nhân viên Kho', manager_id: 3, salary: 11000000, department: 'Kho vận' },
    { employee_id: 8, employee_name: 'Ngô Quốc Bảo', position: 'Thực tập sinh', manager_id: 4, salary: 5000000, department: 'Kinh doanh' },
];

// ========== EXERCISES ==========
// Import từ file riêng để dễ quản lý
export { exercises, type Exercise } from './exercises';
