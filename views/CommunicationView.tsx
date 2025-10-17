import React, { useState } from 'react';
import { MOCK_MESSAGES, MOCK_CHILDREN } from '../constants';
import { CommunicationMessage } from '../types';

const CommunicationView: React.FC = () => {
    const [messages, setMessages] = useState<CommunicationMessage[]>(MOCK_MESSAGES);
    const [selectedChildId, setSelectedChildId] = useState<number | null>(MOCK_CHILDREN[0]?.id || null);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (!newMessage.trim() || !selectedChildId) return;

        const newMsg: CommunicationMessage = {
            id: Date.now(),
            childId: selectedChildId,
            authorId: 1, // Assume current user is admin
            authorName: 'د. أحمد محمود',
            timestamp: new Date().toISOString(),
            content: newMessage,
        };

        setMessages([...messages, newMsg]);
        setNewMessage('');
    };
    
    const filteredMessages = messages
        .filter(m => m.childId === selectedChildId)
        .sort((a,b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">التواصل والملاحظات</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[70vh]">
                <div className="lg:col-span-1 bg-white rounded-lg shadow overflow-y-auto">
                     <h3 className="text-lg font-semibold p-4 border-b">الأطفال</h3>
                     <ul>
                        {MOCK_CHILDREN.map(child => (
                            <li key={child.id}>
                                <button
                                    onClick={() => setSelectedChildId(child.id)}
                                    className={`w-full text-right p-4 border-b hover:bg-teal-50 ${selectedChildId === child.id ? 'bg-teal-100' : ''}`}
                                >
                                    {child.name}
                                </button>
                            </li>
                        ))}
                     </ul>
                </div>

                <div className="lg:col-span-2 bg-white rounded-lg shadow flex flex-col">
                   {selectedChildId ? (
                    <>
                        <div className="p-4 border-b">
                            <h3 className="text-lg font-semibold">الملاحظات الخاصة بـ {MOCK_CHILDREN.find(c=>c.id === selectedChildId)?.name}</h3>
                        </div>
                        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                            {filteredMessages.map(msg => (
                                <div key={msg.id} className={`flex flex-col ${msg.authorId === 1 ? 'items-end' : 'items-start'}`}>
                                    <div className={`p-3 rounded-lg max-w-lg ${msg.authorId === 1 ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                        <p className="text-sm">{msg.content}</p>
                                    </div>
                                    <span className="text-xs text-gray-500 mt-1">{msg.authorName} - {new Date(msg.timestamp).toLocaleString('ar-DZ')}</span>
                                </div>
                            ))}
                             {filteredMessages.length === 0 && <p className="text-center text-gray-500">لا توجد ملاحظات لهذا الطفل بعد.</p>}
                        </div>
                        <div className="p-4 border-t bg-gray-50">
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="اكتب ملاحظة جديدة..."
                                    className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                                <button onClick={handleSendMessage} className="px-6 py-2 text-white bg-teal-500 rounded-full shadow hover:bg-teal-600">إرسال</button>
                            </div>
                        </div>
                    </>
                   ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500">الرجاء اختيار طفل لعرض الملاحظات.</p>
                    </div>
                   )}
                </div>
            </div>
        </div>
    );
};

export default CommunicationView;
