
import { useState, useEffect } from 'react';
import { Trophy, CheckCircle, XCircle, RotateCcw, LogOut, Star, Sparkles, PartyPopper, Award } from 'lucide-react';

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
    isPreview?: boolean;
}

// Confetti Animation Component
function Confetti() {
    const colors = ['#FCD34D', '#A78BFA', '#34D399', '#F472B6', '#60A5FA', '#FBBF24'];
    const confettiCount = 50;

    return (
        <div className="confetti-container">
            {Array.from({ length: confettiCount }).map((_, i) => (
                <div
                    key={i}
                    className="confetti"
                    style={{
                        left: `${Math.random() * 100}%`,
                        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${3 + Math.random() * 2}s`,
                    }}
                />
            ))}
        </div>
    );
}

// Floating Stars Component
function FloatingStars() {
    return (
        <div className="floating-stars">
            {Array.from({ length: 20 }).map((_, i) => (
                <Star
                    key={i}
                    size={12 + Math.random() * 16}
                    className="floating-star"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${3 + Math.random() * 4}s`,
                    }}
                />
            ))}
        </div>
    );
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
    onLogout,
    isPreview = false
}: ResultScreenProps) {
    const [showContent, setShowContent] = useState(false);
    const [showScore, setShowScore] = useState(false);
    const [showStats, setShowStats] = useState(false);
    const [showPrize, setShowPrize] = useState(false);
    const [animatedScore, setAnimatedScore] = useState(0);

    const percentage = Math.round((score / total) * 100);
    const elapsed = (examDurationMinutes * 60) - timeRemaining;
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;

    // Determine grade and message
    const getGradeInfo = () => {
        if (percentage >= 90) return { grade: 'S+', color: 'from-yellow-400 to-amber-500', message: 'XUẤT SẮC! 🏆', emoji: '👑' };
        if (percentage >= 80) return { grade: 'A', color: 'from-emerald-400 to-green-500', message: 'TUYỆT VỜI! ✨', emoji: '🌟' };
        if (percentage >= 70) return { grade: 'B', color: 'from-blue-400 to-indigo-500', message: 'RẤT GIỎI! 💪', emoji: '🔥' };
        if (percentage >= 60) return { grade: 'C', color: 'from-purple-400 to-violet-500', message: 'TỐT LẮM! 👍', emoji: '💫' };
        if (percentage >= 50) return { grade: 'D', color: 'from-orange-400 to-amber-500', message: 'CỐ GẮNG THÊM! 📚', emoji: '💪' };
        return { grade: 'F', color: 'from-red-400 to-rose-500', message: 'ĐỪNG BỎ CUỘC! 🎯', emoji: '🚀' };
    };

    const gradeInfo = getGradeInfo();

    // Staggered animations
    useEffect(() => {
        const timers = [
            setTimeout(() => setShowContent(true), 100),
            setTimeout(() => setShowScore(true), 500),
            setTimeout(() => setShowStats(true), 1000),
            setTimeout(() => setShowPrize(true), 1500),
        ];

        return () => timers.forEach(clearTimeout);
    }, []);

    // Animated score counter
    useEffect(() => {
        if (showScore) {
            const duration = 1500;
            const steps = 60;
            const increment = score / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= score) {
                    setAnimatedScore(score);
                    clearInterval(timer);
                } else {
                    setAnimatedScore(Math.floor(current));
                }
            }, duration / steps);

            return () => clearInterval(timer);
        }
    }, [showScore, score]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDIwIDAgTCAwIDAgMCAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />

            {/* Confetti for high scores */}
            {percentage >= 70 && <Confetti />}

            {/* Floating Stars */}
            <FloatingStars />

            {/* Glowing orbs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

            {/* Main Card */}
            <div className={`relative z-10 transition-all duration-700 transform ${showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-white/20 text-center relative overflow-hidden">

                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent shimmer" />

                    {/* Preview Badge */}
                    {isPreview && (
                        <div className="absolute top-4 right-4 bg-amber-500/90 text-amber-50 text-xs font-bold px-3 py-1 rounded-full animate-bounce">
                            PREVIEW MODE
                        </div>
                    )}

                    {/* Trophy with Grade */}
                    <div className="relative mb-6">
                        <div className={`inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br ${gradeInfo.color} rounded-full shadow-lg shadow-amber-500/30 trophy-glow`}>
                            <Trophy size={56} className="text-white drop-shadow-lg" />
                        </div>
                        <div className="absolute -top-2 -right-2 animate-bounce">
                            <span className="text-4xl">{gradeInfo.emoji}</span>
                        </div>
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                            <span className={`text-xl font-black bg-gradient-to-r ${gradeInfo.color} bg-clip-text text-transparent`}>
                                {gradeInfo.grade}
                            </span>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                        <PartyPopper className="text-amber-400 animate-wiggle" size={28} />
                        oxhhhhh, giõiiiii , chòi oiii ai mà vừa giỏi vừa dangiu dị ta
                        <PartyPopper className="text-amber-400 animate-wiggle" size={28} style={{ animationDelay: '0.5s' }} />
                    </h1>
                    <p className="text-indigo-200 mb-2">Xin chúc mừng, <span className="font-semibold text-white">{userName}</span>!</p>
                    <p className="text-lg font-medium bg-gradient-to-r from-amber-300 to-pink-300 bg-clip-text text-transparent mb-6">
                        {gradeInfo.message}
                    </p>

                    {/* Score Display */}
                    <div className={`transition-all duration-700 transform ${showScore ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-6 border border-white/10">
                            <div className="relative">
                                {/* Circular Progress */}
                                <div className="relative w-40 h-40 mx-auto mb-4">
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                        <circle
                                            className="text-white/10"
                                            strokeWidth="8"
                                            stroke="currentColor"
                                            fill="transparent"
                                            r="42"
                                            cx="50"
                                            cy="50"
                                        />
                                        <circle
                                            className="text-emerald-400 transition-all duration-1000 ease-out"
                                            strokeWidth="8"
                                            strokeLinecap="round"
                                            stroke="currentColor"
                                            fill="transparent"
                                            r="42"
                                            cx="50"
                                            cy="50"
                                            strokeDasharray={264}
                                            strokeDashoffset={264 - (264 * percentage) / 100}
                                            style={{
                                                filter: 'drop-shadow(0 0 8px rgba(52, 211, 153, 0.5))'
                                            }}
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-5xl font-black text-white">{animatedScore}</span>
                                        <span className="text-indigo-300 text-sm">/ {total}</span>
                                    </div>
                                </div>

                                {/* Stats Row */}
                                <div className="flex justify-center gap-8 text-center">
                                    <div>
                                        <div className="text-3xl font-bold text-emerald-400">{percentage}%</div>
                                        <div className="text-indigo-300 text-sm">Điểm số</div>
                                    </div>
                                    <div className="w-px bg-white/20" />
                                    <div>
                                        <div className="text-3xl font-bold text-amber-400">{mins}:{secs.toString().padStart(2, '0')}</div>
                                        <div className="text-indigo-300 text-sm">Thời gian</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className={`grid grid-cols-2 gap-4 mb-6 transition-all duration-700 transform ${showStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <div className="bg-emerald-500/20 backdrop-blur rounded-xl p-4 border border-emerald-500/30 group hover:bg-emerald-500/30 transition-all hover:scale-105">
                            <CheckCircle size={32} className="text-emerald-400 mx-auto mb-2 group-hover:animate-bounce" />
                            <div className="text-emerald-300 font-bold text-2xl">{score}</div>
                            <div className="text-emerald-200/80 text-sm">Câu đúng</div>
                        </div>
                        <div className="bg-rose-500/20 backdrop-blur rounded-xl p-4 border border-rose-500/30 group hover:bg-rose-500/30 transition-all hover:scale-105">
                            <XCircle size={32} className="text-rose-400 mx-auto mb-2 group-hover:animate-shake" />
                            <div className="text-rose-300 font-bold text-2xl">{total - score}</div>
                            <div className="text-rose-200/80 text-sm">Câu chưa làm</div>
                        </div>
                    </div>

                    {/* Prize Reveal */}
                    {selectedPrize && (
                        <div className={`transition-all duration-700 transform ${showPrize ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur rounded-xl p-5 mb-6 border border-amber-500/30 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent shimmer" />

                                <div className="flex items-center justify-center gap-2 mb-3">
                                    <Sparkles className="text-amber-400 animate-pulse" size={20} />
                                    <p className="text-amber-300 font-semibold">Phần quà của bạn</p>
                                    <Sparkles className="text-amber-400 animate-pulse" size={20} />
                                </div>

                                <div
                                    className="flex items-center justify-center gap-4 py-3 transition-all"
                                    style={{
                                        filter: `blur(${Math.max(0, 8 - (score / total) * 8)}px)`,
                                    }}
                                >
                                    {(() => {
                                        const prize = prizes.find(p => p.id === selectedPrize);
                                        return prize ? (
                                            <img
                                                src={prize.image}
                                                alt="Prize"
                                                className="w-24 h-24 object-contain rounded-lg shadow-lg animate-float"
                                            />
                                        ) : null;
                                    })()}
                                    <span className="text-xl font-bold text-amber-100">
                                        {prizes.find(p => p.id === selectedPrize)?.name}
                                    </span>
                                </div>

                                <div className="flex items-center justify-center gap-2 mt-3">
                                    <Award className="text-amber-400" size={16} />
                                    <p className="text-amber-200/80 text-sm">
                                        {score >= total
                                            ? '🎉 Chúc mừng! Bạn đã mở khóa hoàn toàn!'
                                            : `Đã mở khóa ${Math.round((score / total) * 100)}%`
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={onRestart}
                            className="flex-1 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <RotateCcw size={20} className="group-hover:animate-spin" />
                            Làm lại
                        </button>
                        <button
                            onClick={onLogout}
                            className="flex-1 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 border border-white/20 hover:border-white/30 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <LogOut size={20} />
                            Thoát
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
