
import { X } from 'lucide-react';

interface DatabaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: any[];
    tableName: string;
}

export function DatabaseModal({ isOpen, onClose, data, tableName }: DatabaseModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-xl w-full max-w-4xl max-h-[80vh] flex flex-col shadow-2xl animate-fade-in">
                <div className="flex items-center justify-between p-4 border-b border-slate-200">
                    <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                        <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-sm">Table</span>
                        {tableName}
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className="overflow-auto p-0 flex-1">
                    {data.length > 0 ? (
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-500 uppercase bg-slate-50 sticky top-0 z-10">
                                <tr>
                                    {Object.keys(data[0]).map((key) => (
                                        <th key={key} className="px-6 py-3 font-semibold border-b border-slate-200">
                                            {key}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {data.map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                                        {Object.values(row).map((val: any, j) => (
                                            <td key={j} className="px-6 py-3 text-slate-700">
                                                {val === null ? <span className="text-slate-400 italic">NULL</span> : String(val)}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-8 text-center text-slate-500">
                            Table is empty
                        </div>
                    )}
                </div>
                <div className="p-3 border-t border-slate-200 bg-slate-50 text-xs text-slate-500 text-right rounded-b-xl">
                    {data.length} rows loaded
                </div>
            </div>
        </div>
    );
}
