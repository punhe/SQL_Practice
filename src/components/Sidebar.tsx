
import { BookOpen, LogOut, Timer, Package, Users, FileText, ShoppingCart, Truck, User, CheckCircle, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Exercise } from '../data';

interface Prize {
    id: number;
    emoji: string;
    name: string;
    image?: string;
}

interface SidebarProps {
    userName: string;
    timeRemaining: number;
    exercises: Exercise[];
    completedExercises: number[];
    activeExercise: Exercise | null;
    selectedPrize: number | null;
    prizes: Prize[];
    onLogout: () => void;
    onShowTable: (name: string) => void;
    onExerciseClick: (ex: Exercise) => void;
    onEndExam: () => void;
}

// Table info
const tables = [
    { name: 'Products', icon: Package },
    { name: 'Customers', icon: Users },
    { name: 'Orders', icon: FileText },
    { name: 'OrderDetails', icon: ShoppingCart },
    { name: 'Suppliers', icon: Truck },
    { name: 'Employees', icon: User },
];

export function Sidebar({
    userName,
    timeRemaining,
    exercises,
    completedExercises,
    activeExercise,
    selectedPrize,
    prizes,
    onLogout,
    onShowTable,
    onExerciseClick,
    onEndExam
}: SidebarProps) {
    const categories = [...new Set(exercises.map(ex => ex.category))];

    // Format time
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <aside className="w-80 bg-white border-r border-slate-200 flex flex-col h-screen fixed left-0 top-0 overflow-hidden shadow-sm z-20">
            {/* Header with Timer */}
            <div className="p-4 border-b border-slate-200 bg-indigo-600 text-white">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <div className="bg-white/20 p-2 rounded-lg">
                            <BookOpen size={20} />
                        </div>
                        <div>
                            <h1 className="font-bold text-sm">SQL JOIN Exam</h1>
                            <p className="text-indigo-200 text-[10px]">Xin chào, {userName}</p>
                        </div>
                    </div>
                    <button
                        onClick={onLogout}
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                        title="Lưu & Thoát"
                    >
                        <LogOut size={16} />
                    </button>
                </div>

                {/* Timer */}
                <div className={`flex items-center justify-center gap-2 py-3 rounded-lg font-mono text-2xl font-bold ${timeRemaining <= 300 ? 'bg-red-500 animate-pulse' : 'bg-white/10'
                    }`}>
                    <Timer size={20} className={timeRemaining <= 300 ? 'text-white' : 'text-indigo-200'} />
                    <span>{formatTime(timeRemaining)}</span>
                </div>

                {/* Tables Quick Access */}
                <div className="flex flex-wrap gap-1 mt-3">
                    {tables.map(t => (
                        <button
                            key={t.name}
                            onClick={() => onShowTable(t.name)}
                            className="flex items-center gap-1 bg-white/15 hover:bg-white/25 px-2 py-1 rounded-md text-[9px] font-medium transition-colors"
                        >
                            <t.icon size={10} />
                            {t.name}
                        </button>
                    ))}
                </div>

                {/* Progress */}
                <div className="flex items-center justify-between text-xs text-indigo-200 font-medium mt-3">
                    <span>Tiến độ</span>
                    <span className="font-bold text-white">{completedExercises.length}/{exercises.length}</span>
                </div>
                <div className="w-full bg-white/20 h-2 rounded-full mt-1.5 overflow-hidden">
                    <div
                        className="bg-green-400 h-full transition-all duration-500"
                        style={{ width: `${(completedExercises.length / exercises.length) * 100}%` }}
                    ></div>
                </div>

                {/* Prize Preview - Blur based on progress */}
                {selectedPrize && (
                    <div className="mt-3 bg-white/10 rounded-lg p-3">
                        <p className="text-[10px] text-indigo-200 mb-2">🎁 Phần quà của bạn</p>
                        <div
                            className="flex items-center justify-center py-2 rounded-lg bg-white/10 transition-all duration-500 overflow-hidden"
                            style={{
                                filter: `blur(${Math.max(0, 8 - (completedExercises.length / exercises.length) * 8)}px)`,
                            }}
                        >
                            {(() => {
                                const prize = prizes.find(p => p.id === selectedPrize);
                                return prize ? (
                                    <img src={prize.image} alt="Prize" className="w-12 h-12 object-contain" />
                                ) : null;
                            })()}
                        </div>
                        <p className="text-[10px] text-indigo-200 mt-1 text-center">
                            {completedExercises.length >= exercises.length
                                ? '✨ Đã mở khóa!'
                                : `Trả lời đúng để mở khóa (${completedExercises.length}/${exercises.length})`
                            }
                        </p>
                    </div>
                )}
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
                                            onClick={() => onExerciseClick(ex)}
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
                    onClick={onEndExam}
                    className="w-full py-2.5 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 text-sm"
                >
                    <CheckCircle2 size={16} />
                    Nộp bài
                </button>
            </div>
        </aside>
    );
}
