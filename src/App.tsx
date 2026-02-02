
import { useState, useEffect } from 'react';
import alasql from 'alasql';
import { initialStudents, exercises, Exercise } from './data';
import { Play, RotateCcw, Database, CheckCircle2, AlertCircle, ChevronRight, Code2, Timer, Trophy, CheckCircle } from 'lucide-react';

function App() {
    const [query, setQuery] = useState<string>('SELECT * FROM Students');
    const [results, setResults] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [activeExercise, setActiveExercise] = useState<Exercise | null>(exercises[0]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Quiz State
    const [quizStarted, setQuizStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes
    const [completedExercises, setCompletedExercises] = useState<number[]>([]);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

    // DB Modal State
    const [showDbModal, setShowDbModal] = useState(false);
    const [dbData, setDbData] = useState<any[]>([]);

    // Initialize Database
    useEffect(() => {
        if (!isInitialized) {
            alasql('DROP TABLE IF EXISTS Students; CREATE TABLE Students (student_id INT, full_name STRING, age INT, gender STRING, gpa NUMBER, city STRING, major STRING, admission_date STRING)');
            alasql.tables.Students.data = [...initialStudents];
            setIsInitialized(true);
            // Don't run initial query automatically in quiz mode might be cleaner, but let's keep it empty or default
        }
    }, [isInitialized]);

    // Timer Logic
    useEffect(() => {
        let timer: NodeJS.Timeout;
        const allCompleted = exercises.length > 0 && completedExercises.length === exercises.length;

        if (quizStarted && timeLeft > 0 && !allCompleted) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [quizStarted, timeLeft, completedExercises.length]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const normalizeSQL = (sql: string) => {
        const keywords = [
            'Students',
            'student_id', 'full_name', 'age', 'gender', 'gpa', 'city', 'major', 'admission_date'
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
            // Run expected query on the same data
            // Note: deeply cloning data or resetting might be needed if queries modify data, 
            // but here we are doing SELECTs only so it's fine.
            const expectedRes = alasql(currentExercise.expectedQuery);

            // Simple Comparison: Stringify
            // Sort keys to ensure object order doesn't matter (though alasql usually consistent)
            // Actually strictly comparing rows content.
            const userStr = JSON.stringify(userResults);
            const expectedStr = JSON.stringify(expectedRes);

            if (userStr === expectedStr) {
                setFeedback({ type: 'success', message: 'Correct! Great job. 🎉' });
                if (!completedExercises.includes(currentExercise.id)) {
                    setCompletedExercises([...completedExercises, currentExercise.id]);
                }
            } else {
                setFeedback({ type: 'error', message: 'Incorrect result. Try again!' });
            }
        } catch (e) {
            console.error(e);
            setFeedback({ type: 'error', message: 'Error checking answer.' });
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

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setResults([]);
            setError(err.message || 'An error occurred');
        }
    };

    const handleExerciseClick = (ex: Exercise) => {
        setActiveExercise(ex);
        setQuery(`-- ${ex.question}\nSELECT * FROM Students`);
        setResults([]);
        setError(null);
        setFeedback(null);
    };

    const resetDatabase = () => {
        alasql('DELETE FROM Students');
        alasql.tables.Students.data = [...initialStudents];
        setResults([]);
        setError(null);
        setFeedback(null);
        setQuery('SELECT * FROM Students');
    };

    const formatHeader = (key: string) => key;

    const allCompleted = exercises.length > 0 && completedExercises.length === exercises.length;

    if (allCompleted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-pink-50 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
                    <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
                </div>

                <div className="bg-white/90 backdrop-blur-xl p-12 rounded-3xl shadow-2xl border border-pink-100 text-center max-w-lg w-full relative z-10 animate-in zoom-in-75 duration-500">
                    <div className="text-7xl mb-6 animate-bounce">💖</div>
                    <h1 className="text-4xl font-extrabold text-pink-500 mb-4 tracking-tight drop-shadow-sm">
                        Cậu giõiiii quá,<br />iuuuuuuu
                    </h1>
                    <p className="text-slate-600 text-lg mb-8 font-medium">
                        Xuất sắc hoàn thành toàn bộ {exercises.length} câu hỏi!<br />
                        <span className="text-sm text-slate-400 mt-2 block">Thời gian còn lại: {formatTime(timeLeft)}</span>
                    </p>
                    <button
                        onClick={() => {
                            setCompletedExercises([]);
                            setQuizStarted(false);
                            setTimeLeft(60 * 60);
                            setResults([]);
                            setQuery('SELECT * FROM Students');
                        }}
                        className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3.5 px-8 rounded-full shadow-lg shadow-pink-500/30 transition-all hover:scale-105 active:scale-95"
                    >
                        Chơi lại nha
                    </button>
                </div>
            </div>
        );
    }

    if (!quizStarted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
                {/* Background blobs */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

                <div className="bg-white/80 backdrop-blur-xl p-10 rounded-2xl shadow-xl border border-slate-200 text-center max-w-md w-full relative z-10">
                    <div className="bg-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-600">
                        <Trophy size={40} />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">SQL Challenge</h1>
                    <p className="text-slate-500 mb-8">
                        Test your SQL skills with {exercises.length} practical exercises.
                        You have 60 minutes to complete as many as you can!
                    </p>
                    <button
                        onClick={() => setQuizStarted(true)}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        <Play size={20} fill="currentColor" />
                        Start Quiz
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex text-slate-800 bg-slate-50">
            {/* Sidebar */}
            <aside className="w-80 bg-white border-r border-slate-200 flex flex-col h-screen fixed left-0 top-0 overflow-hidden shadow-xl z-20">
                <div className="p-6 border-b border-slate-100 bg-indigo-600 text-white">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Database size={20} className="text-indigo-200" />
                            <h1 className="font-bold text-lg tracking-tight">Thí sinh: Thẻo Páo</h1>
                        </div>
                        <div className="bg-indigo-500/50 px-2.5 py-1 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 border border-indigo-400/30">
                            <Timer size={12} />
                            {formatTime(timeLeft)}
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-indigo-200 font-medium uppercase tracking-wider">
                        <span>Progress</span>
                        <span>{completedExercises.length}/{exercises.length}</span>
                    </div>
                    <div className="w-full bg-indigo-900/30 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div
                            className="bg-green-400 h-full transition-all duration-500"
                            style={{ width: `${(completedExercises.length / exercises.length) * 100}%` }}
                        ></div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth">
                    {['Basic Comparison', 'Logic (AND/OR)', 'Range (BETWEEN)', 'Set (IN)', 'String Search (LIKE)', 'NULL Handling'].map((cat) => {
                        const catExercises = exercises.filter(e => e.category === cat);
                        if (catExercises.length === 0) return null;

                        return (
                            <div key={cat}>
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">{cat}</h3>
                                <div className="space-y-1">
                                    {catExercises.map(ex => {
                                        const isCompleted = completedExercises.includes(ex.id);
                                        const isActive = activeExercise?.id === ex.id;

                                        return (
                                            <button
                                                key={ex.id}
                                                onClick={() => handleExerciseClick(ex)}
                                                className={`w-full text-left px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-start gap-3 group relative ${isActive
                                                    ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200'
                                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                                    }`}
                                            >
                                                <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] transition-colors ${isCompleted
                                                    ? 'bg-green-500 text-white'
                                                    : isActive ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'
                                                    }`}>
                                                    {isCompleted ? <CheckCircle size={12} /> : ex.id}
                                                </div>
                                                <span className="line-clamp-2 pr-4">{ex.question}</span>
                                                {isActive && <ChevronRight size={14} className="ml-auto absolute right-2 top-3.5 text-indigo-400" />}
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
            <main className="flex-1 ml-80 p-6 max-w-7xl mx-auto flex flex-col h-screen overflow-hidden">

                {/* Header / Question Area */}
                <div className="mb-4 flex-shrink-0">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                            <Code2 size={100} />
                        </div>
                        <div className="relative z-10 w-full">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wide">
                                        Exercise {activeExercise?.id}
                                    </span>
                                    <span className="text-slate-400 text-xs font-medium uppercase tracking-wide">
                                        {activeExercise?.category}
                                    </span>
                                </div>
                                {/* Feedback area */}
                                {feedback && (
                                    <div className={`px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2 ${feedback.type === 'success'
                                        ? 'bg-green-100 text-green-700 border border-green-200'
                                        : 'bg-red-100 text-red-700 border border-red-200'
                                        }`}>
                                        {feedback.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                                        {feedback.message}
                                    </div>
                                )}
                            </div>
                            <h2 className="text-xl font-bold text-slate-800 leading-snug max-w-4xl">
                                {activeExercise?.question || "Select an exercise to start"}
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Editor & Actions */}
                <div className="flex flex-col flex-1 gap-4 min-h-0">

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
                                className="w-full h-40 p-4 font-mono text-sm outline-none resize-none bg-[#1e1e2e] text-[#cdd6f4] selection:bg-indigo-500/50"
                                spellCheck="false"
                                placeholder="-- Type your SQL query here..."
                            />
                            <button
                                onClick={() => runQuery(query)}
                                className="absolute bottom-4 right-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium shadow-xl shadow-indigo-500/20 transition-all flex items-center gap-2 active:scale-95 z-10"
                            >
                                <Play size={16} fill="currentColor" /> Run Query
                            </button>
                        </div>
                        <div className="bg-slate-50 px-4 py-2 border-t border-slate-200 flex justify-end">
                            <button
                                onClick={() => {
                                    const data = alasql('SELECT * FROM Students');
                                    setDbData(data as any[]);
                                    setShowDbModal(true);
                                }}
                                className="text-xs text-slate-500 hover:text-indigo-600 font-medium flex items-center gap-1 hover:underline underline-offset-2"
                            >
                                <Database size={12} />
                                Thí sinh nhấn vào đây để kiểm tra dữ liệu hiện tại (Check DB)
                            </button>
                        </div>
                    </div>

                    {/* Results Area */}
                    <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col min-h-0 overflow-hidden">

                        {error ? (
                            <div className="flex items-center justify-center p-8 text-red-500 gap-3 bg-red-50/50 h-full">
                                <div className="p-3 bg-red-100 rounded-full">
                                    <AlertCircle size={24} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-red-700">Query Error</span>
                                    <span className="font-mono text-sm">{error}</span>
                                </div>
                            </div>
                        ) : results.length > 0 ? (
                            <div className="flex flex-col h-full">
                                <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex justify-between items-center flex-shrink-0">
                                    <span className="text-xs font-bold text-slate-500 flex items-center gap-2 uppercase tracking-wide">
                                        Result Preview
                                    </span>
                                    <span className="text-xs font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-sm">
                                        {results.length} row{results.length !== 1 ? 's' : ''}
                                    </span>
                                </div>
                                <div className="overflow-auto flex-1 pb-4">
                                    <table className="w-full text-left text-sm border-collapse">
                                        <thead className="bg-slate-50 sticky top-0 z-10 shadow-sm text-xs uppercase tracking-wider text-slate-500 font-semibold">
                                            <tr>
                                                {Object.keys(results[0]).map((key) => (
                                                    <th key={key} className="p-3 border-b border-r border-slate-200 last:border-r-0 whitespace-nowrap bg-slate-50">
                                                        {formatHeader(key)}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {results.map((row, i) => (
                                                <tr key={i} className="hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0 group">
                                                    {Object.values(row).map((val: any, j) => (
                                                        <td key={j} className="p-3 border-r border-slate-100 last:border-r-0 text-slate-600 group-hover:text-slate-800">
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
                            <div className="flex flex-col items-center justify-center h-full text-slate-300 gap-4">
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100">
                                    <Database size={40} className="opacity-20" />
                                </div>
                                <p className="font-medium text-sm">Run a query to see results here</p>
                            </div>
                        )}
                    </div>

                </div>
            </main>

            {/* Database Modal */}
            {showDbModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[80vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                            <h3 className="font-bold text-slate-700 flex items-center gap-2">
                                <Database size={18} className="text-indigo-600" />
                                Current Database (Students Table)
                            </h3>
                            <button
                                onClick={() => setShowDbModal(false)}
                                className="p-1 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>
                        </div>
                        <div className="overflow-auto p-0">
                            <table className="w-full text-left text-sm border-collapse">
                                <thead className="bg-slate-50 sticky top-0 z-10 shadow-sm text-xs uppercase tracking-wider text-slate-500 font-semibold">
                                    <tr>
                                        {dbData.length > 0 && Object.keys(dbData[0]).map((key) => (
                                            <th key={key} className="p-3 border-b border-r border-slate-200 last:border-r-0 whitespace-nowrap bg-slate-50">
                                                {formatHeader(key)}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {dbData.map((row, i) => (
                                        <tr key={i} className="hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
                                            {Object.values(row).map((val: any, j) => (
                                                <td key={j} className="p-3 border-r border-slate-100 last:border-r-0 text-slate-600">
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
                                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-medium text-sm transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
