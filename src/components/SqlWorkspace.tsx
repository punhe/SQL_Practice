
import { Code2, CheckCircle2, AlertCircle, Lightbulb, RotateCcw, Play, Database, Package, Users, FileText, ShoppingCart, Truck, User } from 'lucide-react';
import { Exercise } from '../data';

// Table info must match App.tsx or use props
// For simplicity I will redefine it here or use what is passed. 
// I will redefine icon map for rendering.
const tableIcons: Record<string, any> = {
    'Products': Package,
    'Customers': Users,
    'Orders': FileText,
    'OrderDetails': ShoppingCart,
    'Suppliers': Truck,
    'Employees': User
};

interface SqlWorkspaceProps {
    activeExercise: Exercise | null;
    query: string;
    setQuery: (val: string) => void;
    onRunQuery: (val: string) => void;
    resetDatabase: () => void;
    feedback: { type: 'success' | 'error', message: string } | null;
    showHint: boolean;
    setShowHint: (val: boolean) => void;
    error: string | null;
    results: any[];
    onShowTable: (name: string) => void;
}

export function SqlWorkspace({
    activeExercise,
    query,
    setQuery,
    onRunQuery,
    resetDatabase,
    feedback,
    showHint,
    setShowHint,
    error,
    results,
    onShowTable
}: SqlWorkspaceProps) {
    const tableNames = ['Products', 'Customers', 'Orders', 'OrderDetails', 'Suppliers', 'Employees'];
    const formatHeader = (key: string) => key;

    return (
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
                            onClick={() => onRunQuery(query)}
                            className="absolute bottom-3 right-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-5 py-1.5 rounded-lg font-medium shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 active:scale-95 z-10 text-sm"
                        >
                            <Play size={14} fill="currentColor" /> Chạy Query
                        </button>
                    </div>
                    <div className="bg-slate-50 px-4 py-1.5 border-t border-slate-200 flex justify-between items-center">
                        <div className="flex gap-2">
                            {tableNames.map(name => {
                                const Icon = tableIcons[name] || Package;
                                return (
                                    <button
                                        key={name}
                                        onClick={() => onShowTable(name)}
                                        className="text-[10px] text-slate-400 hover:text-indigo-600 font-medium flex items-center gap-1 hover:underline underline-offset-2"
                                    >
                                        <Icon size={10} />
                                        {name}
                                    </button>
                                );
                            })}
                        </div>
                        <span className="text-[10px] text-slate-400">{tableNames.length} bảng dữ liệu</span>
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
    );
}
