
import { useState, useEffect, useCallback, useRef } from 'react';
import alasql from 'alasql';
import {
    initialProducts, initialCustomers, initialOrders, initialOrderDetails, initialSuppliers, initialEmployees,
    exercises, Exercise
} from './data';
import {
    ExamSession,
    createExamSession, getActiveSession, updateExamSession, completeExamSession
} from './supabase';
import { LoginScreen } from './components/LoginScreen';
import { PickPrizeScreen } from './components/PickPrizeScreen';
import { ResultScreen } from './components/ResultScreen';
import { Sidebar } from './components/Sidebar';
import { SqlWorkspace } from './components/SqlWorkspace';
import { DatabaseModal } from './components/DatabaseModal';

// Exam Config
const EXAM_DURATION_MINUTES = 60; // 60 phút cho bài thi

function App() {
    // ========== EXAM STATE ==========
    const [examMode, setExamMode] = useState<'login' | 'pick-prize' | 'exam' | 'result'>('login');
    const [userName, setUserName] = useState<string>('');
    const [currentSession, setCurrentSession] = useState<ExamSession | null>(null);
    const [timeRemaining, setTimeRemaining] = useState<number>(EXAM_DURATION_MINUTES * 60);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // ========== PRIZE MINI-GAME STATE ==========
    const [selectedPrize, setSelectedPrize] = useState<number | null>(null);
    const [isFlipping, setIsFlipping] = useState<boolean>(false);

    // 9 phần quà với emoji và tên và ảnh
    const prizes = [
        { id: 1, emoji: '🎁', name: 'Hộp quà bí ẩn', image: '/download.jpg' },
        { id: 2, emoji: '🏆', name: 'Cúp vàng', image: '/hong-tra-sua-kim-tuyen.png' },
        { id: 3, emoji: '💎', name: 'Kim cương', image: '/mon-7-1691221823-6409-1691221866.jpg' },
        { id: 4, emoji: '🌟', name: 'Ngôi sao may mắn', image: '/mon-7-1691221823-6409-1691221866.jpg' },
        { id: 5, emoji: '🎯', name: 'Mục tiêu hoàn hảo', image: '/muc-bento-gia-bao-nhieu-mua-muc-bento-o-dau-vua-re-vua-chat-luong-202009071019512795.jpg' },
        { id: 6, emoji: '🚀', name: 'Tên lửa thành công', image: '/thuc-hu-trung-ga-ung-la-than-duoc-tri-benh-2-12295123.jpg' },
        { id: 7, emoji: '🎨', name: 'Bảng màu sáng tạo', image: '/unnamed.jpg' },
        { id: 8, emoji: '📚', name: 'Kho tàng tri thức', image: '/muc-bento-gia-bao-nhieu-mua-muc-bento-o-dau-vua-re-vua-chat-luong-202009071019512795.jpg' },
        { id: 9, emoji: '🦄', name: 'Kỳ lân huyền thoại', image: '/muc-bento-gia-bao-nhieu-mua-muc-bento-o-dau-vua-re-vua-chat-luong-202009071019512795.jpg' },
    ];

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

    // ========== INITIALIZE DATABASE ==========
    useEffect(() => {
        if (!isInitialized) {
            // Products
            alasql('DROP TABLE IF EXISTS Products');
            alasql('CREATE TABLE Products (product_id INT, product_name STRING, category STRING, price NUMBER, stock_quantity INT, supplier_id INT)');
            alasql.tables.Products.data = [...initialProducts];

            // Customers
            alasql('DROP TABLE IF EXISTS Customers');
            alasql('CREATE TABLE Customers (customer_id INT, customer_name STRING, email STRING, phone STRING, city STRING, join_date STRING)');
            alasql.tables.Customers.data = [...initialCustomers];

            // Orders
            alasql('DROP TABLE IF EXISTS Orders');
            alasql('CREATE TABLE Orders (order_id INT, customer_id INT, order_date STRING, total_amount NUMBER, status STRING)');
            alasql.tables.Orders.data = [...initialOrders];

            // OrderDetails
            alasql('DROP TABLE IF EXISTS OrderDetails');
            alasql('CREATE TABLE OrderDetails (detail_id INT, order_id INT, product_id INT, quantity INT, unit_price NUMBER)');
            alasql.tables.OrderDetails.data = [...initialOrderDetails];

            // Suppliers
            alasql('DROP TABLE IF EXISTS Suppliers');
            alasql('CREATE TABLE Suppliers (supplier_id INT, supplier_name STRING, contact_name STRING, phone STRING, city STRING)');
            alasql.tables.Suppliers.data = [...initialSuppliers];

            // Employees - cho Self Join
            alasql('DROP TABLE IF EXISTS Employees');
            alasql('CREATE TABLE Employees (employee_id INT, employee_name STRING, position STRING, manager_id INT, salary NUMBER, department STRING)');
            alasql.tables.Employees.data = [...initialEmployees];

            setIsInitialized(true);
        }
    }, [isInitialized]);

    // ========== TIMER LOGIC ==========
    useEffect(() => {
        if (examMode === 'exam' && timeRemaining > 0) {
            timerRef.current = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1) {
                        // Hết giờ
                        handleEndExam();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [examMode, timeRemaining]);

    // ========== SAVE SESSION TO SUPABASE ==========
    const saveSessionToSupabase = useCallback(async () => {
        if (!currentSession?.id) return;

        const elapsed = (EXAM_DURATION_MINUTES * 60) - timeRemaining;
        await updateExamSession(currentSession.id, {
            completed_questions: completedExercises,
            correct_answers: completedExercises.length,
            duration_seconds: elapsed
        });
    }, [currentSession, completedExercises, timeRemaining]);

    // Auto-save every 30 seconds
    useEffect(() => {
        if (examMode === 'exam' && currentSession?.id) {
            const autoSave = setInterval(() => {
                saveSessionToSupabase();
            }, 30000);

            return () => clearInterval(autoSave);
        }
    }, [examMode, currentSession, saveSessionToSupabase]);

    // ========== EXAM HANDLERS ==========
    const handleStartExam = async () => {
        if (!userName.trim()) {
            alert('Vui lòng nhập tên của bạn!');
            return;
        }

        // Check for existing session
        const existingSession = await getActiveSession(userName);
        if (existingSession) {
            // Resume session - skip pick-prize, go straight to exam
            setCurrentSession(existingSession);
            setCompletedExercises(existingSession.completed_questions || []);
            const elapsed = existingSession.duration_seconds || 0;
            setTimeRemaining(Math.max(0, (EXAM_DURATION_MINUTES * 60) - elapsed));
            setExamMode('exam');
            setActiveExercise(exercises[0]);
            setQuery(`-- ${exercises[0].question}\n`);
        } else {
            // New session - go to pick-prize first
            setSelectedPrize(null);
            setExamMode('pick-prize');
        }
    };

    const handlePrizeSelect = async (prizeId: number) => {
        if (isFlipping || selectedPrize !== null) return;

        setIsFlipping(true);
        setSelectedPrize(prizeId);

        // Wait for connection/animation, then start exam
        setTimeout(async () => {
            // Create new session
            const newSession = await createExamSession(userName);
            if (newSession) {
                setCurrentSession(newSession);
                setCompletedExercises([]);
                setTimeRemaining(EXAM_DURATION_MINUTES * 60);
            }

            setExamMode('exam');
            setActiveExercise(exercises[0]);
            setQuery(`-- ${exercises[0].question}\n`);
            setIsFlipping(false);
        }, 1000); // Wait 1s
    };

    const handleEndExam = async () => {
        if (timerRef.current) clearInterval(timerRef.current);

        if (currentSession?.id) {
            const elapsed = (EXAM_DURATION_MINUTES * 60) - timeRemaining;
            await completeExamSession(currentSession.id, completedExercises.length, elapsed);
        }

        setExamMode('result');
    };

    const handleLogout = async () => {
        if (examMode === 'exam' && currentSession?.id) {
            await saveSessionToSupabase();
        }
        setExamMode('login');
        setCurrentSession(null);
        setCompletedExercises([]);
        setTimeRemaining(EXAM_DURATION_MINUTES * 60);
        setQuery('SELECT * FROM Products');
        setResults([]);
        setError(null);
        setFeedback(null);
        setSelectedPrize(null);
    };

    const handleRestartExam = async () => {
        const newSession = await createExamSession(userName);
        if (newSession) {
            setCurrentSession(newSession);
            setCompletedExercises([]);
            setTimeRemaining(EXAM_DURATION_MINUTES * 60);
            setExamMode('exam');
            setActiveExercise(exercises[0]);
            setQuery(`-- ${exercises[0].question}\n`);
            setResults([]);
            setError(null);
            setFeedback(null);
        }
    };

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
        // Lấy danh sách các query đúng
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

            // Kiểm tra với từng đáp án đúng
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

                    // Auto-save khi trả lời đúng
                    if (currentSession?.id) {
                        updateExamSession(currentSession.id, {
                            completed_questions: newCompleted,
                            correct_answers: newCompleted.length
                        });
                    }
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

    const showTable = (tableName: string) => {
        const data = alasql(`SELECT * FROM ${tableName}`);
        setDbData(data as any[]);
        setSelectedTable(tableName);
        setShowDbModal(true);
    };

    // ========== RENDER ==========
    if (examMode === 'login') {
        return (
            <LoginScreen
                userName={userName}
                setUserName={setUserName}
                onStartExam={handleStartExam}
                examDuration={EXAM_DURATION_MINUTES}
                exercises={exercises}
            />
        );
    }

    if (examMode === 'pick-prize') {
        return (
            <PickPrizeScreen
                prizes={prizes}
                selectedPrize={selectedPrize}
                isFlipping={isFlipping}
                onPrizeSelect={handlePrizeSelect}
            />
        );
    }

    if (examMode === 'result') {
        return (
            <ResultScreen
                userName={userName}
                score={completedExercises.length}
                total={exercises.length}
                timeRemaining={timeRemaining}
                examDurationMinutes={EXAM_DURATION_MINUTES}
                selectedPrize={selectedPrize}
                prizes={prizes}
                onRestart={handleRestartExam}
                onLogout={handleLogout}
            />
        );
    }

    // Exam Screen
    return (
        <div className="min-h-screen flex text-slate-800 bg-slate-100">
            <Sidebar
                userName={userName}
                timeRemaining={timeRemaining}
                exercises={exercises}
                completedExercises={completedExercises}
                activeExercise={activeExercise}
                selectedPrize={selectedPrize}
                prizes={prizes}
                onLogout={handleLogout}
                onShowTable={showTable}
                onExerciseClick={handleExerciseClick}
                onEndExam={handleEndExam}
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
