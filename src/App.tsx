
import { useState, useEffect, useCallback } from 'react';
import alasql from 'alasql';
import {
    initialProducts, initialCustomers, initialOrders, initialOrderDetails, initialSuppliers, initialEmployees,
    exercises, Exercise
} from './data';
import { Sidebar } from './components/Sidebar';
import { SqlWorkspace } from './components/SqlWorkspace';
import { DatabaseModal } from './components/DatabaseModal';
import { LoginScreen } from './components/LoginScreen';

// Helper: tạo localStorage key riêng cho từng user
const getProgressKey = (userName: string) => `sql_practice_completed_${userName.trim().toLowerCase()}`;

function App() {
    // ========== AUTH STATE ==========
    const [userName, setUserName] = useState<string>('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // ========== SQL PRACTICE STATE ==========
    const [query, setQuery] = useState<string>('SELECT * FROM Products');
    const [results, setResults] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [activeExercise, setActiveExercise] = useState<Exercise | null>(exercises[0]);
    const [isInitialized, setIsInitialized] = useState(false);
    const [completedExercises, setCompletedExercises] = useState<number[]>([]);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const [showHint, setShowHint] = useState(false);

    // DB Modal State
    const [showDbModal, setShowDbModal] = useState(false);
    const [dbData, setDbData] = useState<any[]>([]);
    const [selectedTable, setSelectedTable] = useState<string>('Products');

    // ========== KHÔI PHỤC PHIÊN ĐĂNG NHẬP ==========
    useEffect(() => {
        const savedUser = localStorage.getItem('sql_practice_current_user');
        if (savedUser) {
            setUserName(savedUser);
            setIsLoggedIn(true);
        }
    }, []);

    // ========== LOAD PROGRESS TỪ LOCALSTORAGE (theo user) ==========
    useEffect(() => {
        if (isLoggedIn && userName) {
            const key = getProgressKey(userName);
            const saved = localStorage.getItem(key);
            if (saved) {
                try {
                    setCompletedExercises(JSON.parse(saved));
                } catch (e) {
                    console.error('Error loading progress:', e);
                    setCompletedExercises([]);
                }
            } else {
                setCompletedExercises([]);
            }
        }
    }, [isLoggedIn, userName]);

    // ========== SAVE PROGRESS VÀO LOCALSTORAGE (theo user) ==========
    useEffect(() => {
        if (isLoggedIn && userName) {
            const key = getProgressKey(userName);
            localStorage.setItem(key, JSON.stringify(completedExercises));
        }
    }, [completedExercises, isLoggedIn, userName]);

    // ========== INITIALIZE DATABASE ==========
    useEffect(() => {
        if (!isInitialized) {
            alasql('DROP TABLE IF EXISTS Products');
            alasql('CREATE TABLE Products (product_id INT, product_name STRING, category STRING, price NUMBER, stock_quantity INT, supplier_id INT)');
            alasql.tables.Products.data = [...initialProducts];

            alasql('DROP TABLE IF EXISTS Customers');
            alasql('CREATE TABLE Customers (customer_id INT, customer_name STRING, email STRING, phone STRING, city STRING, join_date STRING)');
            alasql.tables.Customers.data = [...initialCustomers];

            alasql('DROP TABLE IF EXISTS Orders');
            alasql('CREATE TABLE Orders (order_id INT, customer_id INT, order_date STRING, total_amount NUMBER, status STRING)');
            alasql.tables.Orders.data = [...initialOrders];

            alasql('DROP TABLE IF EXISTS OrderDetails');
            alasql('CREATE TABLE OrderDetails (detail_id INT, order_id INT, product_id INT, quantity INT, unit_price NUMBER)');
            alasql.tables.OrderDetails.data = [...initialOrderDetails];

            alasql('DROP TABLE IF EXISTS Suppliers');
            alasql('CREATE TABLE Suppliers (supplier_id INT, supplier_name STRING, contact_name STRING, phone STRING, city STRING)');
            alasql.tables.Suppliers.data = [...initialSuppliers];

            alasql('DROP TABLE IF EXISTS Employees');
            alasql('CREATE TABLE Employees (employee_id INT, employee_name STRING, position STRING, manager_id INT, salary NUMBER, department STRING)');
            alasql.tables.Employees.data = [...initialEmployees];

            setIsInitialized(true);
        }
    }, [isInitialized]);

    // ========== LOGIN / LOGOUT ==========
    const handleLogin = useCallback(() => {
        const trimmedName = userName.trim();
        if (!trimmedName) return;
        setUserName(trimmedName);
        setIsLoggedIn(true);
        localStorage.setItem('sql_practice_current_user', trimmedName);
    }, [userName]);

    const handleLogout = useCallback(() => {
        setIsLoggedIn(false);
        setUserName('');
        setCompletedExercises([]);
        localStorage.removeItem('sql_practice_current_user');
    }, []);

    // ========== SQL LOGIC ==========
    const normalizeSQL = (sql: string) => {
        const keywords = [
            'Products', 'Customers', 'Orders', 'OrderDetails', 'Suppliers', 'Employees',
            'product_id', 'product_name', 'category', 'price', 'stock_quantity', 'supplier_id',
            'customer_id', 'customer_name', 'email', 'phone', 'city', 'join_date',
            'order_id', 'order_date', 'total_amount', 'status',
            'detail_id', 'quantity', 'unit_price',
            'supplier_name', 'contact_name',
            'employee_id', 'employee_name', 'position', 'manager_id', 'salary', 'department'
        ];
        const parts = sql.split(/(')/);
        let inString = false;
        return parts.map(part => {
            if (part === "'") {
                inString = !inString;
                return part;
            }
            if (inString) return part;
            let result = part;
            keywords.forEach(kw => {
                const regex = new RegExp(`\\b${kw}\\b`, 'gi');
                result = result.replace(regex, kw);
            });
            return result;
        }).join('');
    };

    const checkAnswer = (userResults: any[], currentExercise: Exercise) => {
        const validQueries: string[] = [];
        if (currentExercise.expectedQuery) {
            validQueries.push(currentExercise.expectedQuery);
        }
        if (currentExercise.expectedQueries) {
            validQueries.push(...currentExercise.expectedQueries);
        }

        if (validQueries.length === 0) return;

        try {
            const userStr = JSON.stringify(userResults);

            let isCorrect = false;
            for (const expectedQuery of validQueries) {
                try {
                    const expectedRes = alasql(expectedQuery);
                    const expectedStr = JSON.stringify(expectedRes);
                    if (userStr === expectedStr) {
                        isCorrect = true;
                        break;
                    }
                } catch (e) {
                    console.error('Error checking query:', expectedQuery, e);
                }
            }

            if (isCorrect) {
                setFeedback({ type: 'success', message: 'Đúng rồi! Tuyệt vời! 🎉' });
                if (!completedExercises.includes(currentExercise.id)) {
                    const newCompleted = [...completedExercises, currentExercise.id];
                    setCompletedExercises(newCompleted);
                }
            } else {
                setFeedback({ type: 'error', message: 'Chưa đúng, thử lại nhé!' });
            }
        } catch (e) {
            console.error(e);
            setFeedback({ type: 'error', message: 'Lỗi kiểm tra đáp án.' });
        }
    };

    const runQuery = (sql: string) => {
        try {
            setError(null);
            setFeedback(null);

            const normalizedSql = normalizeSQL(sql);
            const res = alasql(normalizedSql);
            setResults(res as any[]);

            if (activeExercise) {
                checkAnswer(res as any[], activeExercise);
            }
        } catch (err: any) {
            setResults([]);
            setError(err.message || 'An error occurred');
        }
    };

    const handleExerciseClick = (ex: Exercise) => {
        setActiveExercise(ex);
        setQuery(`-- ${ex.question}\n`);
        setResults([]);
        setError(null);
        setFeedback(null);
        setShowHint(false);
    };

    const resetDatabase = () => {
        alasql.tables.Products.data = [...initialProducts];
        alasql.tables.Customers.data = [...initialCustomers];
        alasql.tables.Orders.data = [...initialOrders];
        alasql.tables.OrderDetails.data = [...initialOrderDetails];
        alasql.tables.Suppliers.data = [...initialSuppliers];
        alasql.tables.Employees.data = [...initialEmployees];
        setResults([]);
        setError(null);
        setFeedback(null);
        setQuery('SELECT * FROM Products');
    };

    const resetProgress = () => {
        setCompletedExercises([]);
        if (userName) {
            const key = getProgressKey(userName);
            localStorage.removeItem(key);
        }
    };

    const showTable = (tableName: string) => {
        const data = alasql(`SELECT * FROM ${tableName}`);
        setDbData(data as any[]);
        setSelectedTable(tableName);
        setShowDbModal(true);
    };

    // ========== RENDER ==========

    // Nếu chưa đăng nhập => hiển thị LoginScreen
    if (!isLoggedIn) {
        return (
            <LoginScreen
                userName={userName}
                setUserName={setUserName}
                onStart={handleLogin}
            />
        );
    }

    return (
        <div className="min-h-screen flex text-slate-800 bg-slate-100">
            <Sidebar
                exercises={exercises}
                completedExercises={completedExercises}
                activeExercise={activeExercise}
                onShowTable={showTable}
                onExerciseClick={handleExerciseClick}
                onResetProgress={resetProgress}
                userName={userName}
                onLogout={handleLogout}
            />

            <SqlWorkspace
                activeExercise={activeExercise}
                query={query}
                setQuery={setQuery}
                onRunQuery={runQuery}
                resetDatabase={resetDatabase}
                feedback={feedback}
                showHint={showHint}
                setShowHint={setShowHint}
                error={error}
                results={results}
                onShowTable={showTable}
            />

            <DatabaseModal
                isOpen={showDbModal}
                onClose={() => setShowDbModal(false)}
                data={dbData}
                tableName={selectedTable}
            />
        </div>
    );
}

export default App;
