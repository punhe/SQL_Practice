
import { BookOpen, Package, Users, FileText, ShoppingCart, Truck, User, CheckCircle, ChevronRight, RotateCcw, Trophy, LogOut } from 'lucide-react';
import { Exercise } from '../data';

interface SidebarProps {
    exercises: Exercise[];
    completedExercises: number[];
    activeExercise: Exercise | null;
    onShowTable: (name: string) => void;
    onExerciseClick: (ex: Exercise) => void;
    onResetProgress: () => void;
    userName: string;
    onLogout: () => void;
}

const tables = [
    { name: 'Products', icon: Package },
    { name: 'Customers', icon: Users },
    { name: 'Orders', icon: FileText },
    { name: 'OrderDetails', icon: ShoppingCart },
    { name: 'Suppliers', icon: Truck },
    { name: 'Employees', icon: User },
];

export function Sidebar({
    exercises,
    completedExercises,
    activeExercise,
    onShowTable,
    onExerciseClick,
    onResetProgress,
    userName,
    onLogout
}: SidebarProps) {
    const categories = [...new Set(exercises.map(ex => ex.category))];
    const progressPercent = Math.round((completedExercises.length / exercises.length) * 100);

    return (
        <aside className="w-80 bg-white border-r border-slate-200 flex flex-col h-screen fixed left-0 top-0 overflow-hidden shadow-sm z-20">
            {/* Header */}
            <div className="p-4 border-b border-slate-200 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <div className="bg-white/20 p-2 rounded-lg">
                            <BookOpen size={20} />
                        </div>
                        <div>
                            <h1 className="font-bold text-sm">SQL Practice</h1>
                            <p className="text-indigo-200 text-[10px]">Luyện tập truy vấn SQL</p>
                        </div>
                    </div>
                </div>

                {/* User Info */}
                <div className="flex items-center justify-between bg-white/10 rounded-lg px-3 py-2 mb-3">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                            <User size={12} />
                        </div>
                        <span className="text-xs font-medium truncate max-w-[140px]">{userName}</span>
                    </div>
                    <button
                        onClick={onLogout}
                        className="text-white/70 hover:text-white hover:bg-white/10 p-1.5 rounded-md transition-colors"
                        title="Đổi tài khoản"
                    >
                        <LogOut size={14} />
                    </button>
                </div>

                {/* Tables Quick Access */}
                <div className="flex flex-wrap gap-1 mb-3">
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
                <div className="flex items-center justify-between text-xs text-indigo-200 font-medium">
                    <span className="flex items-center gap-1"><Trophy size={12} /> Tiến độ</span>
                    <span className="font-bold text-white">{completedExercises.length}/{exercises.length} ({progressPercent}%)</span>
                </div>
                <div className="w-full bg-white/20 h-2 rounded-full mt-1.5 overflow-hidden">
                    <div
                        className="bg-green-400 h-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                    ></div>
                </div>
            </div>

            {/* Exercise List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-4 scroll-smooth">
                {categories.map((cat) => {
                    const catExercises = exercises.filter(e => e.category === cat);
                    if (catExercises.length === 0) return null;
                    const completedInCat = catExercises.filter(e => completedExercises.includes(e.id)).length;

                    return (
                        <div key={cat}>
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-2 flex items-center justify-between">
                                <span>{cat}</span>
                                <span className="text-[9px] font-mono text-slate-300">{completedInCat}/{catExercises.length}</span>
                            </h3>
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
            <div className="p-3 border-t border-slate-200 bg-slate-50">
                <button
                    onClick={onResetProgress}
                    className="w-full py-2 text-xs text-slate-500 hover:text-red-600 font-medium flex items-center justify-center gap-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                >
                    <RotateCcw size={12} />
                    Đặt lại tiến độ
                </button>
            </div>
        </aside>
    );
}
