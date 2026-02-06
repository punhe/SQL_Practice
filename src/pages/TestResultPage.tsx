
import { ResultScreen } from '../components/ResultScreen';

// Sample prizes for preview
const samplePrizes = [
    { id: 1, emoji: '🎁', name: 'Hộp quà bí ẩn', image: '/download.jpg' },
    { id: 2, emoji: '🏆', name: 'Cúp vàng', image: '/hong-tra-sua-kim-tuyen.png' },
    { id: 3, emoji: '💎', name: 'Kim cương', image: '/mon-7-1691221823-6409-1691221866.jpg' },
    { id: 4, emoji: '🌟', name: 'Ngôi sao may mắn', image: '/mon-7-1691221823-6409-1691221866.jpg' },
    { id: 5, emoji: '🎯', name: 'Mục tiêu hoàn hảo', image: '/muc-bento-gia-bao-nhieu-mua-muc-bento-o-dau-vua-re-vua-chat-luong-202009071019512795.jpg' },
    { id: 6, emoji: '🚀', name: 'Tên lửa thành công', image: '/thuc-hu-trung-ga-ung-la-than-duoc-tri-benh-2-12295123.jpg' },
    { id: 7, emoji: '🎨', name: 'Bảng màu sáng tạo', image: '/unnamed.jpg' },
    { id: 8, emoji: '📚', name: 'Kho tàng tri thức', image: '/muc-bento-gia-bao-nhieu-mua-muc-bento-o-dau-vua-re-vua-chat-luong-202009071019512795.jpg' },
    { id: 9, emoji: '🦄', name: 'Kỳ lân huyền thoại', image: '/muc-bento-gia-bao-nhieu-mua-muc-bento-o-dau-vua-re-vua-chat-luong-202009071019512795.jpg' },
];

export function TestResultPage() {
    // Mock data for preview
    const mockData = {
        userName: 'Nguyễn Văn A',
        score: 25,
        total: 30,
        timeRemaining: 3600, // 1 hour remaining (means used 1 hour of 2 hours)
        examDurationMinutes: 120,
        selectedPrize: 3,
        prizes: samplePrizes,
    };

    return (
        <ResultScreen
            userName={mockData.userName}
            score={mockData.score}
            total={mockData.total}
            timeRemaining={mockData.timeRemaining}
            examDurationMinutes={mockData.examDurationMinutes}
            selectedPrize={mockData.selectedPrize}
            prizes={mockData.prizes}
            onRestart={() => {
                alert('Bấm "Làm lại" (đây là chế độ preview)');
            }}
            onLogout={() => {
                window.location.href = '/';
            }}
            isPreview={true}
        />
    );
}
