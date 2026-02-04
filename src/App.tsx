
import { useState, useEffect } from 'react';
import alasql from 'alasql';
import {
    initialProducts, initialCustomers, initialOrders, initialOrderDetails, initialSuppliers,
    exercises, Exercise
} from './data';
import { Play, RotateCcw, Database, CheckCircle2, AlertCircle, ChevronRight, Code2, CheckCircle, Lightbulb, ShoppingCart, Package, Users, FileText, Truck } from 'lucide-react';

function App() {
    const [query, setQuery] = useState<string>('SELECT * FROM Products');
    const [results, setResults] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [activeExercise, setActiveExercise] = useState<Exercise | null>(exercises[0]);
    const [isInitialized, setIsInitialized] = useState(false);
    const [completedExercises, setCompletedExercises] = useState<number[]>([]);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const [showHint, setShowHint] = useState(false);
    const [showCelebration, setShowCelebration] = useState(false);

    // DB Modal State
    const [showDbModal, setShowDbModal] = useState(false);
    const [dbData, setDbData] = useState<any[]>([]);
    const [selectedTable, setSelectedTable] = useState<string>('Products');

    // Initialize Database
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

            setIsInitialized(true);
        }
    }, [isInitialized]);

    const normalizeSQL = (sql: string) => {
        const keywords = [
            'Products', 'Customers', 'Orders', 'OrderDetails', 'Suppliers',
            'product_id', 'product_name', 'category', 'price', 'stock_quantity', 'supplier_id',
            'customer_id', 'customer_name', 'email', 'phone', 'city', 'join_date',
            'order_id', 'order_date', 'total_amount', 'status',
            'detail_id', 'quantity', 'unit_price',
            'supplier_name', 'contact_name'
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
        if (!currentExercise.expectedQuery) return;

        try {
            const expectedRes = alasql(currentExercise.expectedQuery);
            const userStr = JSON.stringify(userResults);
            const expectedStr = JSON.stringify(expectedRes);

            if (userStr === expectedStr) {
                setFeedback({ type: 'success', message: 'Đúng rồi! Tuyệt vời! 🎉' });
                if (!completedExercises.includes(currentExercise.id)) {
                    const newCompleted = [...completedExercises, currentExercise.id];
                    setCompletedExercises(newCompleted);
                    // Check if all exercises completed
                    if (newCompleted.length === exercises.length) {
                        setTimeout(() => setShowCelebration(true), 500);
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

    // Table info for sidebar
    const tables = [
        { name: 'Products', icon: Package, count: initialProducts.length },
        { name: 'Customers', icon: Users, count: initialCustomers.length },
        { name: 'Orders', icon: FileText, count: initialOrders.length },
        { name: 'OrderDetails', icon: ShoppingCart, count: initialOrderDetails.length },
        { name: 'Suppliers', icon: Truck, count: initialSuppliers.length },
    ];

    // Group exercises by category
    const categories = [...new Set(exercises.map(ex => ex.category))];

    return (
        <div className="min-h-screen flex text-slate-800 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
            {/* Sidebar */}
            <aside className="w-80 bg-white border-r border-slate-200 flex flex-col h-screen fixed left-0 top-0 overflow-hidden shadow-xl z-20">
                <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-white/20 p-2.5 rounded-xl">
                            <ShoppingCart size={26} />
                        </div>
                        <div>
                            <h1 className="font-bold text-lg tracking-tight">Fresh Shop</h1>
                            <p className="text-emerald-100 text-xs">SQL Practice - Cửa hàng thực phẩm</p>
                        </div>
                    </div>

                    {/* Tables Quick Access */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                        {tables.map(t => (
                            <button
                                key={t.name}
                                onClick={() => showTable(t.name)}
                                className="flex items-center gap-1 bg-white/15 hover:bg-white/25 px-2 py-1 rounded-md text-[10px] font-medium transition-colors"
                                title={`Xem bảng ${t.name}`}
                            >
                                <t.icon size={10} />
                                {t.name}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-emerald-100 font-medium uppercase tracking-wider mt-4">
                        <span>Tiến độ</span>
                        <span>{completedExercises.length}/{exercises.length}</span>
                    </div>
                    <div className="w-full bg-emerald-900/30 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div
                            className="bg-yellow-400 h-full transition-all duration-500"
                            style={{ width: `${(completedExercises.length / exercises.length) * 100}%` }}
                        ></div>
                    </div>
                </div>

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
                                                    ? 'bg-emerald-50 text-emerald-700 shadow-sm ring-1 ring-emerald-200'
                                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                                    }`}
                                            >
                                                <div className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[8px] transition-colors ${isCompleted
                                                    ? 'bg-emerald-500 text-white'
                                                    : isActive ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                                                    }`}>
                                                    {isCompleted ? <CheckCircle size={10} /> : ex.id}
                                                </div>
                                                <span className="line-clamp-2 pr-3 leading-tight">{ex.question}</span>
                                                {isActive && <ChevronRight size={12} className="ml-auto absolute right-2 top-2.5 text-emerald-400" />}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-80 p-5 max-w-7xl mx-auto flex flex-col h-screen overflow-hidden">

                {/* Header / Question Area */}
                <div className="mb-4 flex-shrink-0">
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                            <Code2 size={80} />
                        </div>
                        <div className="relative z-10 w-full">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide">
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
                                title="Reset Database"
                            >
                                <RotateCcw size={12} /> Reset DB
                            </button>
                        </div>
                        <div className="relative group">
                            <textarea
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full h-32 p-4 font-mono text-sm outline-none resize-none bg-[#1a1a2e] text-[#cdd6f4] selection:bg-emerald-500/50"
                                spellCheck="false"
                                placeholder="-- Viết câu lệnh SQL ở đây..."
                            />
                            <button
                                onClick={() => runQuery(query)}
                                className="absolute bottom-3 right-3 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-1.5 rounded-lg font-medium shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 active:scale-95 z-10 text-sm"
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
                                        className="text-[10px] text-slate-400 hover:text-emerald-600 font-medium flex items-center gap-1 hover:underline underline-offset-2"
                                    >
                                        <t.icon size={10} />
                                        {t.name}
                                    </button>
                                ))}
                            </div>
                            <span className="text-[10px] text-slate-400">5 bảng dữ liệu</span>
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
                        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-gradient-to-r from-emerald-50 to-teal-50">
                            <h3 className="font-bold text-slate-700 flex items-center gap-2">
                                <Database size={18} className="text-emerald-600" />
                                Bảng {selectedTable} ({dbData.length} dòng)
                            </h3>
                            <div className="flex items-center gap-2">
                                {tables.map(t => (
                                    <button
                                        key={t.name}
                                        onClick={() => showTable(t.name)}
                                        className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${selectedTable === t.name
                                            ? 'bg-emerald-600 text-white'
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
                                        <tr key={i} className="hover:bg-emerald-50/50 transition-colors border-b border-slate-100 last:border-0">
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

            {/* Celebration Modal */}
            {showCelebration && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md">
                    <div className="bg-white rounded-3xl shadow-2xl p-10 text-center max-w-md relative overflow-hidden animate-bounce-in">
                        {/* Confetti Background */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute top-0 left-1/4 w-3 h-3 bg-yellow-400 rounded-full animate-confetti-1"></div>
                            <div className="absolute top-0 left-1/2 w-2 h-2 bg-pink-500 rounded-full animate-confetti-2"></div>
                            <div className="absolute top-0 left-3/4 w-4 h-4 bg-emerald-400 rounded-full animate-confetti-3"></div>
                            <div className="absolute top-0 left-1/3 w-2 h-2 bg-blue-500 rounded-full animate-confetti-4"></div>
                            <div className="absolute top-0 right-1/4 w-3 h-3 bg-purple-500 rounded-full animate-confetti-5"></div>
                            <div className="absolute top-0 left-10 w-2 h-2 bg-red-400 rounded-full animate-confetti-6"></div>
                            <div className="absolute top-0 right-10 w-3 h-3 bg-orange-400 rounded-full animate-confetti-7"></div>
                        </div>

                        <div className="relative z-10">
                            <div className="text-7xl mb-4 animate-bounce">🎉</div>
                            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mb-3">
                                iuuuuuu, giõiiiiiiiii
                            </h2>
                            <p className="text-slate-600 mb-6">
                                Bạn đã hoàn thành tất cả <span className="font-bold text-emerald-600">30 câu hỏi</span>! 🌟
                            </p>
                            <div className="flex justify-center gap-3">
                                <button
                                    onClick={() => setShowCelebration(false)}
                                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/30 transition-all active:scale-95"
                                >
                                    Tuyệt vời! 🚀
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
