import React, { useState } from 'react';
import { MOCK_CHILDREN } from '../constants';
import { Child, ChildStatus } from '../types';
import { PencilIcon, TrashIcon, PlusIcon } from '../components/Icons';

const statusColorMap = {
  [ChildStatus.Active]: 'bg-green-100 text-green-800',
  [ChildStatus.Inactive]: 'bg-red-100 text-red-800',
  [ChildStatus.Pending]: 'bg-yellow-100 text-yellow-800',
};

const ChildrenView: React.FC = () => {
  const [children, setChildren] = useState<Child[]>(MOCK_CHILDREN);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);

  const handleOpenModal = (child: Child | null = null) => {
    setSelectedChild(child);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedChild(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logic to add/update child would go here
    handleCloseModal();
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">إدارة الأطفال</h2>
        <button onClick={() => handleOpenModal()} className="flex items-center bg-teal-500 text-white px-4 py-2 rounded-lg shadow hover:bg-teal-600 transition-colors">
          <PlusIcon className="w-5 h-5 me-2" />
          إضافة طفل جديد
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
        <table className="w-full text-right">
          <thead className="border-b-2 border-gray-200">
            <tr>
              <th className="p-3 text-sm font-semibold tracking-wide">رقم الملف</th>
              <th className="p-3 text-sm font-semibold tracking-wide">الاسم الكامل</th>
              <th className="p-3 text-sm font-semibold tracking-wide">المختص</th>
              <th className="p-3 text-sm font-semibold tracking-wide">هاتف الولي</th>
              <th className="p-3 text-sm font-semibold tracking-wide">الحالة</th>
              <th className="p-3 text-sm font-semibold tracking-wide">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {children.map((child) => (
              <tr key={child.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-3 text-sm">{child.fileNumber}</td>
                <td className="p-3 text-sm font-semibold">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <img src={child.photoUrl} alt={child.name} className="w-10 h-10 rounded-full object-cover"/>
                    <span>{child.name}</span>
                  </div>
                </td>
                <td className="p-3 text-sm">{child.specialist}</td>
                <td className="p-3 text-sm" dir="ltr">{child.guardianPhone}</td>
                <td className="p-3">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColorMap[child.status]}`}>
                    {child.status}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex space-x-2">
                    <button onClick={() => handleOpenModal(child)} className="text-blue-500 hover:text-blue-700">
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg" dir="rtl">
            <h3 className="text-2xl font-bold mb-6">{selectedChild ? 'تعديل ملف طفل' : 'إضافة طفل جديد'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input type="text" placeholder="الاسم الكامل" defaultValue={selectedChild?.name} className="p-2 border rounded" required />
                <input type="number" placeholder="العمر" defaultValue={selectedChild?.age} className="p-2 border rounded" required />
                <input type="text" placeholder="الحالة / التشخيص" defaultValue={selectedChild?.condition} className="p-2 border rounded col-span-2" required />
                <input type="text" placeholder="اسم المختص" defaultValue={selectedChild?.specialist} className="p-2 border rounded" required />
                <input type="tel" placeholder="هاتف الولي" defaultValue={selectedChild?.guardianPhone} className="p-2 border rounded" required />
                <input type="text" placeholder="رقم الملف" defaultValue={selectedChild?.fileNumber} className="p-2 border rounded" required />
                 <select defaultValue={selectedChild?.status} className="p-2 border rounded" required>
                    <option value={ChildStatus.Active}>نشط</option>
                    <option value={ChildStatus.Inactive}>غير نشط</option>
                    <option value={ChildStatus.Pending}>في الانتظار</option>
                </select>
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">صورة الطفل</label>
                    <input type="file" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"/>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">إلغاء</button>
                <button type="submit" className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">حفظ</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChildrenView;
