
import { BookOpen, User, Database, Award, PlayCircle, Code } from 'lucide-react';

interface LoginScreenProps {
    userName: string;
    setUserName: (val: string) => void;
    onStart: () => void;
}

export function LoginScreen({ userName, setUserName, onStart }: LoginScreenProps) {
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && userName.trim()) {
            onStart();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
            <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-lg border border-slate-200">
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-xl mb-4">
                        <BookOpen size={32} className="text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800 mb-1">SQL Practice</h1>
                    <p className="text-slate-500 text-sm">Luyện tập truy vấn SQL - Tiến độ được lưu tự động</p>
                </div>

                <div className="space-y-5">
                    <div>
                        <label className="block text-slate-700 text-sm font-medium mb-2">
                            <User size={14} className="inline mr-2" />
                            Tên của bạn
                        </label>
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Nhập tên để bắt đầu..."
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            autoFocus
                        />
                    </div>

                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <h3 className="text-slate-800 font-semibold mb-3 flex items-center gap-2">
                            <Code size={16} className="text-indigo-600" />
                            Thông tin
                        </h3>
                        <ul className="text-slate-600 text-sm space-y-2">
                            <li className="flex items-center gap-2">
                                <Database size={14} className="text-blue-500" />
                                Luyện tập SQL tự do, không giới hạn thời gian
                            </li>
                            <li className="flex items-center gap-2">
                                <Award size={14} className="text-purple-500" />
                                Tiến độ lưu riêng cho từng tên
                            </li>
                        </ul>
                    </div>

                    <button
                        onClick={onStart}
                        disabled={!userName.trim()}
                        className={`w-full py-3 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 ${userName.trim()
                                ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer'
                                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                            }`}
                    >
                        <PlayCircle size={20} />
                        Bắt đầu luyện tập
                    </button>
                </div>
            </div>
        </div>
    );
}
