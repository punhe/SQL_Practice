
import { Trophy, CheckCircle, XCircle, RotateCcw, LogOut } from 'lucide-react';

interface Prize {
    id: number;
    emoji: string;
    name: string;
    image?: string;
}

interface ResultScreenProps {
    userName: string;
    score: number;
    total: number;
    timeRemaining: number;
    examDurationMinutes: number;
    selectedPrize: number | null;
    prizes: Prize[];
    onRestart: () => void;
    onLogout: () => void;
}

export function ResultScreen({
    userName,
    score,
    total,
    timeRemaining,
    examDurationMinutes,
    selectedPrize,
    prizes,
    onRestart,
    onLogout
}: ResultScreenProps) {
    const percentage = Math.round((score / total) * 100);
    const elapsed = (examDurationMinutes * 60) - timeRemaining;
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
            <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-lg border border-slate-200 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-500 rounded-full mb-5">
                    <Trophy size={40} className="text-white" />
                </div>

                <h1 className="text-2xl font-bold text-slate-800 mb-1">Kết quả bài thi</h1>
                <p className="text-slate-500 mb-5">Xin chúc mừng, {userName}!</p>
                <p className="text-slate-500 mb-5">iuu quó, giõiii quáaa</p>

                <div className="bg-slate-50 rounded-lg p-5 mb-5 border border-slate-200">
                    <div className="text-5xl font-bold text-indigo-600 mb-2">
                        {score}/{total}
                    </div>
                    <div className="text-slate-600">
                        Điểm số: <span className="text-slate-800 font-semibold">{percentage}%</span>
                    </div>
                    <div className="text-slate-600 mt-1">
                        Thời gian: <span className="text-slate-800 font-semibold">{mins}:{secs.toString().padStart(2, '0')}</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <CheckCircle size={24} className="text-green-600 mx-auto mb-2" />
                        <div className="text-green-700 font-bold text-xl">{score}</div>
                        <div className="text-green-600 text-xs">Câu đúng</div>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                        <XCircle size={24} className="text-red-600 mx-auto mb-2" />
                        <div className="text-red-700 font-bold text-xl">{total - score}</div>
                        <div className="text-red-600 text-xs">Câu chưa làm</div>
                    </div>
                </div>

                {/* Prize Reveal */}
                {selectedPrize && (
                    <div className="bg-amber-50 rounded-lg p-4 mb-5 border border-amber-200">
                        <p className="text-amber-700 text-sm font-medium mb-2">🎁 Phần quà của bạn</p>
                        <div
                            className="flex items-center justify-center gap-4 py-2"
                            style={{
                                filter: `blur(${Math.max(0, 8 - (score / total) * 8)}px)`,
                            }}
                        >
                            {(() => {
                                const prize = prizes.find(p => p.id === selectedPrize);
                                return prize ? (
                                    <img src={prize.image} alt="Prize" className="w-20 h-20 object-contain" />
                                ) : null;
                            })()}
                            <span className="text-lg font-semibold text-amber-800">
                                {prizes.find(p => p.id === selectedPrize)?.name}
                            </span>
                        </div>
                        <p className="text-amber-600 text-xs mt-2">
                            {score >= total
                                ? '🎉 Chúc mừng! Bạn đã mở khóa hoàn toàn phần quà!'
                                : `Mở khóa ${Math.round((score / total) * 100)}% - Làm lại để mở khóa thêm!`
                            }
                        </p>
                    </div>
                )}

                <div className="flex gap-3">
                    <button
                        onClick={onRestart}
                        className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        <RotateCcw size={18} />
                        Làm lại
                    </button>
                    <button
                        onClick={onLogout}
                        className="flex-1 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        <LogOut size={18} />
                        Thoát
                    </button>
                </div>
            </div>
        </div>
    );
}
