
interface Prize {
    id: number;
    emoji: string;
    name: string;
    image?: string;
}

interface PickPrizeScreenProps {
    prizes: Prize[];
    selectedPrize: number | null;
    isFlipping: boolean;
    onPrizeSelect: (id: number) => void;
}

export function PickPrizeScreen({ prizes, selectedPrize, isFlipping, onPrizeSelect }: PickPrizeScreenProps) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
            <div className="bg-white rounded-xl p-8 max-w-2xl w-full shadow-lg border border-slate-200 text-center">
                <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500 rounded-xl mb-4">
                        <span className="text-3xl">🎁</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800 mb-2">Chọn hộp quà bí ẩn!</h1>
                    <p className="text-slate-500 text-sm">
                        Chọn 1 trong 9 hộp quà bên dưới để bắt đầu bài thi.
                        <br />
                        <span className="text-slate-400 text-xs">(Nội dung quà sẽ được hé lộ dần khi bạn làm đúng bài tập!)</span>
                    </p>
                </div>

                {/* 9 Cards Grid với hiệu ứng Flip 3D */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    {prizes.map((prize) => {
                        const isSelected = selectedPrize === prize.id;
                        const shouldFlip = isSelected && isFlipping;

                        return (
                            <div
                                key={prize.id}
                                className={`perspective-1000 h-32 
                                    ${!isFlipping && selectedPrize === null ? 'cursor-pointer' : ''}
                                    ${isFlipping && !isSelected ? 'opacity-40 scale-95' : ''}
                                    ${isSelected ? 'z-10' : ''}
                                `}
                                style={{ transition: 'opacity 0.3s, transform 0.3s' }}
                                onClick={() => {
                                    if (!isFlipping && selectedPrize === null) {
                                        onPrizeSelect(prize.id);
                                    }
                                }}
                            >
                                {/* Card Container - xoay khi được chọn */}
                                <div
                                    className="relative w-full h-full transform-style-preserve-3d"
                                    style={{
                                        transition: 'transform 0.6s ease-in-out',
                                        transform: shouldFlip ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                    }}
                                >
                                    {/* Mặt trước - Hộp quà bí ẩn */}
                                    <div
                                        className={`absolute w-full h-full rounded-xl backface-hidden 
                                            flex flex-col items-center justify-center
                                            border-2 transition-all duration-200
                                            ${!isFlipping && selectedPrize === null
                                                ? 'hover:scale-105 hover:shadow-lg hover:border-indigo-400 border-indigo-100'
                                                : 'border-indigo-100'
                                            }
                                            ${isSelected && !shouldFlip
                                                ? 'ring-4 ring-amber-400 shadow-xl border-amber-300'
                                                : ''
                                            }
                                            bg-gradient-to-br from-indigo-50 to-slate-50
                                        `}
                                    >
                                        <span className="text-4xl mb-2 animate-bounce">🎁</span>
                                        <p className="text-xs font-bold text-slate-400">
                                            Hộp quà #{prize.id}
                                        </p>
                                    </div>

                                    {/* Mặt sau - Phần quà được hé lộ */}
                                    <div
                                        className="absolute w-full h-full rounded-xl backface-hidden rotate-y-180
                                            flex flex-col items-center justify-center
                                            border-2 border-amber-300 ring-4 ring-amber-400 shadow-xl
                                            bg-gradient-to-br from-amber-100 to-yellow-50"
                                    >
                                        <span className="text-4xl mb-2">{prize.emoji}</span>
                                        <p className="text-xs font-bold text-amber-600">
                                            Đã chọn!
                                        </p>
                                        <p className="text-[10px] text-amber-500 mt-1">
                                            {prize.name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {selectedPrize && (
                    <div className="animate-fade-in">
                        <p className="text-amber-600 font-semibold bg-amber-50 p-3 rounded-lg border border-amber-200 inline-block shadow-sm">
                            🎉 Bạn đã chọn: <strong>{prizes.find(p => p.id === selectedPrize)?.name}</strong>
                            <br />
                            <span className="text-sm font-normal text-slate-600">Đang tạo đề thi...</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
