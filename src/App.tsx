
import { useState, useEffect, useCallback, useRef } from 'react';
import alasql from 'alasql';
import {
    initialProducts, initialCustomers, initialOrders, initialOrderDetails, initialSuppliers, initialEmployees,
    exercises, Exercise
} from './data';
import {
    supabase, ExamSession,
    createExamSession, getActiveSession, updateExamSession, completeExamSession, getExamHistory
} from './supabase';
import {
    Play, RotateCcw, Database, CheckCircle2, AlertCircle, ChevronRight, Code2, CheckCircle,
    Lightbulb, ShoppingCart, Package, Users, FileText, Truck, Timer, Trophy, History,
    User, LogOut, PlayCircle, Clock, Award, Target, XCircle, Pause, BookOpen
} from 'lucide-react';

// Exam Config
const EXAM_DURATION_MINUTES = 45; // 45 phút cho bài thi

function App() {
    // ========== EXAM STATE ==========
    const [examMode, setExamMode] = useState<'login' | 'exam' | 'result'>('login');
    const [userName, setUserName] = useState<string>('');
    const [currentSession, setCurrentSession] = useState<ExamSession | null>(null);
    const [examHistory, setExamHistory] = useState<ExamSession[]>([]);
    const [timeRemaining, setTimeRemaining] = useState<number>(EXAM_DURATION_MINUTES * 60);
    const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

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

    // History Modal
    const [showHistoryModal, setShowHistoryModal] = useState(false);

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
        if (examMode === 'exam' && !isTimerPaused && timeRemaining > 0) {
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
    }, [examMode, isTimerPaused, timeRemaining]);

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
            // Resume session
            setCurrentSession(existingSession);
            setCompletedExercises(existingSession.completed_questions || []);
            const elapsed = existingSession.duration_seconds || 0;
            setTimeRemaining(Math.max(0, (EXAM_DURATION_MINUTES * 60) - elapsed));
        } else {
            // Create new session
            const newSession = await createExamSession(userName);
            if (newSession) {
                setCurrentSession(newSession);
                setCompletedExercises([]);
                setTimeRemaining(EXAM_DURATION_MINUTES * 60);
            }
        }

        setExamMode('exam');
        setActiveExercise(exercises[0]);
        setQuery(`-- ${exercises[0].question}\n`);
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
    };

    const handleViewHistory = async () => {
        const history = await getExamHistory(userName);
        setExamHistory(history);
        setShowHistoryModal(true);
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

    const formatHeader = (key: string) => key;

    const showTable = (tableName: string) => {
        const data = alasql(`SELECT * FROM ${tableName}`);
        setDbData(data as any[]);
        setSelectedTable(tableName);
        setShowDbModal(true);
    };

    // Format time
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Table info
    const tables = [
        { name: 'Products', icon: Package, count: initialProducts.length },
        { name: 'Customers', icon: Users, count: initialCustomers.length },
        { name: 'Orders', icon: FileText, count: initialOrders.length },
        { name: 'OrderDetails', icon: ShoppingCart, count: initialOrderDetails.length },
        { name: 'Suppliers', icon: Truck, count: initialSuppliers.length },
        { name: 'Employees', icon: User, count: initialEmployees.length },
    ];

    const categories = [...new Set(exercises.map(ex => ex.category))];

    // ========== LOGIN SCREEN ==========
    if (examMode === 'login') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="relative z-10 bg-white/10 backdrop-blur-xl rounded-3xl p-10 max-w-lg w-full border border-white/20 shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl mb-4 shadow-lg shadow-emerald-500/30">
                            <BookOpen size={40} className="text-white" />
                        </div>
                        <h1 className="text-3xl font-black text-white mb-2">SQL JOIN Practice</h1>
                        <p className="text-purple-200 text-sm">Bài thi thực hành SQL - Tập trung vào JOIN</p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-purple-200 text-sm font-medium mb-2">
                                <User size={14} className="inline mr-2" />
                                Tên của bạn
                            </label>
                            <input
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleStartExam()}
                                placeholder="Nhập tên để bắt đầu..."
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                            />
                        </div>

                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                                <Target size={16} className="text-emerald-400" />
                                Thông tin bài thi
                            </h3>
                            <ul className="text-purple-200 text-sm space-y-2">
                                <li className="flex items-center gap-2">
                                    <Timer size={14} className="text-yellow-400" />
                                    Thời gian: {EXAM_DURATION_MINUTES} phút
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle size={14} className="text-emerald-400" />
                                    Số câu hỏi: {exercises.length} câu
                                </li>
                                <li className="flex items-center gap-2">
                                    <Database size={14} className="text-blue-400" />
                                    Chủ đề: JOIN (Inner, Left, Right, Full, Self)
                                </li>
                                <li className="flex items-center gap-2">
                                    <Award size={14} className="text-pink-400" />
                                    Tiến độ được lưu tự động
                                </li>
                            </ul>
                        </div>

                        <button
                            onClick={handleStartExam}
                            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <PlayCircle size={20} />
                            Bắt đầu làm bài
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ========== RESULT SCREEN ==========
    if (examMode === 'result') {
        const score = completedExercises.length;
        const total = exercises.length;
        const percentage = Math.round((score / total) * 100);
        const elapsed = (EXAM_DURATION_MINUTES * 60) - timeRemaining;
        const mins = Math.floor(elapsed / 60);
        const secs = elapsed % 60;

        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
                </div>

                <div className="relative z-10 bg-white/10 backdrop-blur-xl rounded-3xl p-10 max-w-lg w-full border border-white/20 shadow-2xl text-center">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-6 shadow-lg shadow-yellow-500/30">
                        <Trophy size={50} className="text-white" />
                    </div>

                    <h1 className="text-3xl font-black text-white mb-2">Kết quả bài thi</h1>
                    <p className="text-purple-200 mb-6">Xin chúc mừng, {userName}!</p>

                    <div className="bg-white/10 rounded-2xl p-6 mb-6">
                        <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-2">
                            {score}/{total}
                        </div>
                        <div className="text-purple-200">
                            Điểm số: <span className="text-white font-bold">{percentage}%</span>
                        </div>
                        <div className="text-purple-200 mt-2">
                            Thời gian: <span className="text-white font-bold">{mins}:{secs.toString().padStart(2, '0')}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-emerald-500/20 rounded-xl p-4 border border-emerald-500/30">
                            <CheckCircle size={24} className="text-emerald-400 mx-auto mb-2" />
                            <div className="text-emerald-400 font-bold text-xl">{score}</div>
                            <div className="text-emerald-200 text-xs">Câu đúng</div>
                        </div>
                        <div className="bg-red-500/20 rounded-xl p-4 border border-red-500/30">
                            <XCircle size={24} className="text-red-400 mx-auto mb-2" />
                            <div className="text-red-400 font-bold text-xl">{total - score}</div>
                            <div className="text-red-200 text-xs">Câu chưa làm</div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={handleRestartExam}
                            className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                            <RotateCcw size={18} />
                            Làm lại
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 border border-white/20"
                        >
                            <LogOut size={18} />
                            Thoát
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ========== EXAM SCREEN ==========
    return (
        <div className="min-h-screen flex text-slate-800 bg-gradient-to-br from-slate-50 via-white to-indigo-50">
            {/* Sidebar */}
            <aside className="w-80 bg-white border-r border-slate-200 flex flex-col h-screen fixed left-0 top-0 overflow-hidden shadow-xl z-20">
                {/* Header with Timer */}
                <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="bg-white/20 p-2 rounded-lg">
                                <BookOpen size={20} />
                            </div>
                            <div>
                                <h1 className="font-bold text-sm">SQL JOIN Exam</h1>
                                <p className="text-purple-100 text-[10px]">Xin chào, {userName}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                            title="Lưu & Thoát"
                        >
                            <LogOut size={16} />
                        </button>
                    </div>

                    {/* Timer */}
                    <div className={`flex items-center justify-center gap-2 py-3 rounded-xl font-mono text-2xl font-bold ${timeRemaining <= 300 ? 'bg-red-500/30 animate-pulse' : 'bg-white/10'
                        }`}>
                        <Timer size={20} className={timeRemaining <= 300 ? 'text-red-300' : 'text-yellow-300'} />
                        <span>{formatTime(timeRemaining)}</span>
                    </div>

                    {/* Tables Quick Access */}
                    <div className="flex flex-wrap gap-1 mt-3">
                        {tables.map(t => (
                            <button
                                key={t.name}
                                onClick={() => showTable(t.name)}
                                className="flex items-center gap-1 bg-white/15 hover:bg-white/25 px-2 py-1 rounded-md text-[9px] font-medium transition-colors"
                            >
                                <t.icon size={10} />
                                {t.name}
                            </button>
                        ))}
                    </div>

                    {/* Progress */}
                    <div className="flex items-center justify-between text-xs text-purple-100 font-medium mt-3">
                        <span>Tiến độ</span>
                        <span className="font-bold text-white">{completedExercises.length}/{exercises.length}</span>
                    </div>
                    <div className="w-full bg-white/20 h-2 rounded-full mt-1.5 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-yellow-400 to-orange-400 h-full transition-all duration-500"
                            style={{ width: `${(completedExercises.length / exercises.length) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Exercise List */}
                <div className="flex-1 overflow-y-auto p-3 space-y-4 scroll-smooth">
                    {categories.map((cat) => {
                        const catExercises = exercises.filter(e => e.category === cat);
                        if (catExercises.length === 0) return null;

                        return (
                            <div key={cat}>
                                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">{cat}</h3>
                                <div className="space-y-0.5">
                                    {catExercises.map(ex => {
                                        const isCompleted = completedExercises.includes(ex.id);
                                        const isActive = activeExercise?.id === ex.id;

                                        return (
                                            <button
                                                key={ex.id}
                                                onClick={() => handleExerciseClick(ex)}
                                                className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-medium transition-all duration-200 flex items-start gap-2 group relative ${isActive
                                                    ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200'
                                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                                    }`}
                                            >
                                                <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[9px] transition-colors ${isCompleted
                                                    ? 'bg-emerald-500 text-white'
                                                    : isActive ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'
                                                    }`}>
                                                    {isCompleted ? <CheckCircle size={12} /> : ex.id}
                                                </div>
                                                <span className="line-clamp-2 pr-3 leading-tight">{ex.question}</span>
                                                {isActive && <ChevronRight size={12} className="ml-auto absolute right-2 top-2.5 text-indigo-400" />}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Actions */}
                <div className="p-3 border-t border-slate-200 bg-slate-50 space-y-2">
                    <button
                        onClick={handleEndExam}
                        className="w-full py-2.5 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 text-sm"
                    >
                        <CheckCircle2 size={16} />
                        Nộp bài
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-80 p-5 max-w-7xl mx-auto flex flex-col h-screen overflow-hidden">

                {/* Question Area */}
                <div className="mb-4 flex-shrink-0">
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                            <Code2 size={80} />
                        </div>
                        <div className="relative z-10 w-full">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-lg text-xs font-bold">
                                        Câu {activeExercise?.id}
                                    </span>
                                    <span className="text-slate-400 text-xs font-medium uppercase tracking-wide">
                                        {activeExercise?.category}
                                    </span>
                                </div>
                                {feedback && (
                                    <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${feedback.type === 'success'
                                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                        : 'bg-red-100 text-red-700 border border-red-200'
                                        }`}>
                                        {feedback.type === 'success' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                                        {feedback.message}
                                    </div>
                                )}
                            </div>
                            <h2 className="text-lg font-bold text-slate-800 leading-snug max-w-4xl mb-2">
                                {activeExercise?.question || "Chọn một bài tập để bắt đầu"}
                            </h2>

                            {activeExercise?.hint && (
                                <button
                                    onClick={() => setShowHint(!showHint)}
                                    className="text-xs text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1 transition-colors"
                                >
                                    <Lightbulb size={12} />
                                    {showHint ? 'Ẩn gợi ý' : 'Xem gợi ý'}
                                </button>
                            )}
                            {showHint && activeExercise?.hint && (
                                <div className="mt-2 p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 font-mono">
                                    💡 {activeExercise.hint}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Editor & Actions */}
                <div className="flex flex-col flex-1 gap-3 min-h-0">

                    <div className="flex flex-col gap-0 shadow-sm rounded-xl overflow-hidden border border-slate-300 bg-white flex-shrink-0">
                        <div className="bg-slate-100 px-4 py-2 border-b border-slate-300 flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">SQL Editor</span>
                            <button
                                onClick={resetDatabase}
                                className="text-xs flex items-center gap-1 text-slate-500 hover:text-red-600 transition-colors font-medium px-2 py-1 hover:bg-slate-200 rounded"
                            >
                                <RotateCcw size={12} /> Reset DB
                            </button>
                        </div>
                        <div className="relative group">
                            <textarea
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full h-32 p-4 font-mono text-sm outline-none resize-none bg-[#1e1e3f] text-[#a5d6ff] selection:bg-indigo-500/50"
                                spellCheck="false"
                                placeholder="-- Viết câu lệnh SQL ở đây..."
                            />
                            <button
                                onClick={() => runQuery(query)}
                                className="absolute bottom-3 right-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-5 py-1.5 rounded-lg font-medium shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 active:scale-95 z-10 text-sm"
                            >
                                <Play size={14} fill="currentColor" /> Chạy Query
                            </button>
                        </div>
                        <div className="bg-slate-50 px-4 py-1.5 border-t border-slate-200 flex justify-between items-center">
                            <div className="flex gap-2">
                                {tables.map(t => (
                                    <button
                                        key={t.name}
                                        onClick={() => showTable(t.name)}
                                        className="text-[10px] text-slate-400 hover:text-indigo-600 font-medium flex items-center gap-1 hover:underline underline-offset-2"
                                    >
                                        <t.icon size={10} />
                                        {t.name}
                                    </button>
                                ))}
                            </div>
                            <span className="text-[10px] text-slate-400">{tables.length} bảng dữ liệu</span>
                        </div>
                    </div>

                    {/* Results Area */}
                    <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col min-h-0 overflow-hidden">

                        {error ? (
                            <div className="flex items-center justify-center p-6 text-red-500 gap-3 bg-red-50/50 h-full">
                                <div className="p-2.5 bg-red-100 rounded-full">
                                    <AlertCircle size={20} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-red-700 text-sm">Lỗi Query</span>
                                    <span className="font-mono text-xs">{error}</span>
                                </div>
                            </div>
                        ) : results.length > 0 ? (
                            <div className="flex flex-col h-full">
                                <div className="bg-slate-50 px-4 py-1.5 border-b border-slate-200 flex justify-between items-center flex-shrink-0">
                                    <span className="text-xs font-bold text-slate-500 flex items-center gap-2 uppercase tracking-wide">
                                        Kết quả
                                    </span>
                                    <span className="text-xs font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-sm">
                                        {results.length} dòng
                                    </span>
                                </div>
                                <div className="overflow-auto flex-1">
                                    <table className="w-full text-left text-xs border-collapse">
                                        <thead className="bg-slate-50 sticky top-0 z-10 shadow-sm text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                                            <tr>
                                                {Object.keys(results[0]).map((key) => (
                                                    <th key={key} className="p-2.5 border-b border-r border-slate-200 last:border-r-0 whitespace-nowrap bg-slate-50">
                                                        {formatHeader(key)}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {results.map((row, i) => (
                                                <tr key={i} className="hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0 group">
                                                    {Object.values(row).map((val: any, j) => (
                                                        <td key={j} className="p-2.5 border-r border-slate-100 last:border-r-0 text-slate-600 group-hover:text-slate-800">
                                                            {val === null ? <span className="text-slate-300 italic">NULL</span> : String(val)}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-slate-300 gap-3">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100">
                                    <Database size={32} className="opacity-20" />
                                </div>
                                <p className="font-medium text-xs">Chạy query để xem kết quả</p>
                            </div>
                        )}
                    </div>

                </div>
            </main>

            {/* Database Modal */}
            {showDbModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[85vh] flex flex-col overflow-hidden">
                        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-gradient-to-r from-indigo-50 to-purple-50">
                            <h3 className="font-bold text-slate-700 flex items-center gap-2">
                                <Database size={18} className="text-indigo-600" />
                                Bảng {selectedTable} ({dbData.length} dòng)
                            </h3>
                            <div className="flex items-center gap-2">
                                {tables.map(t => (
                                    <button
                                        key={t.name}
                                        onClick={() => showTable(t.name)}
                                        className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${selectedTable === t.name
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                                    >
                                        {t.name}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setShowDbModal(false)}
                                    className="ml-2 p-1 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                </button>
                            </div>
                        </div>
                        <div className="overflow-auto p-0 flex-1">
                            <table className="w-full text-left text-xs border-collapse">
                                <thead className="bg-slate-50 sticky top-0 z-10 shadow-sm text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                                    <tr>
                                        {dbData.length > 0 && Object.keys(dbData[0]).map((key) => (
                                            <th key={key} className="p-2.5 border-b border-r border-slate-200 last:border-r-0 whitespace-nowrap bg-slate-50">
                                                {formatHeader(key)}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {dbData.map((row: any, i: number) => (
                                        <tr key={i} className="hover:bg-indigo-50/50 transition-colors border-b border-slate-100 last:border-0">
                                            {Object.values(row).map((val: any, j: number) => (
                                                <td key={j} className="p-2.5 border-r border-slate-100 last:border-r-0 text-slate-600">
                                                    {val === null ? <span className="text-slate-300 italic">NULL</span> : String(val)}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-3 border-t border-slate-200 bg-slate-50 flex justify-end">
                            <button
                                onClick={() => setShowDbModal(false)}
                                className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-medium text-xs transition-colors"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
