import React, { useState } from 'react';
import { MOCK_USERS } from '../constants';
import { User, UserRole } from '../types';
import { PlusIcon, PencilIcon, TrashIcon } from '../components/Icons';

const UsersView: React.FC = () => {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleOpenModal = (user: User | null) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleSaveUser = (userData: Omit<User, 'id'>) => {
    if (selectedUser) {
      // Edit
      setUsers(users.map(u => u.id === selectedUser.id ? { ...selectedUser, ...userData } : u));
    } else {
      // Add
      const newUser: User = {
        id: Date.now(),
        ...userData,
      };
      setUsers([...users, newUser]);
    }
    handleCloseModal();
  };

  const handleDeleteUser = (id: number) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المستخدم؟ لا يمكن التراجع عن هذا الإجراء.')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">إدارة المستخدمين</h2>
        <button onClick={() => handleOpenModal(null)} className="flex items-center gap-2 px-4 py-2 text-white bg-teal-500 rounded-lg shadow hover:bg-teal-600">
          <PlusIcon className="w-5 h-5" />
          إضافة مستخدم جديد
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">الاسم</th>
              <th scope="col" className="px-6 py-3">اسم المستخدم</th>
              <th scope="col" className="px-6 py-3">الدور</th>
              <th scope="col" className="px-6 py-3">الهاتف</th>
              <th scope="col" className="px-6 py-3">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold text-gray-900">{user.name}</td>
                <td className="px-6 py-4">{user.username}</td>
                <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.role === UserRole.Admin ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>{user.role}</span>
                </td>
                <td className="px-6 py-4">{user.phone || 'N/A'}</td>
                <td className="px-6 py-4 flex items-center space-x-2">
                   <button onClick={() => handleOpenModal(user)} className="p-2 text-gray-500 hover:text-yellow-600" title="تعديل"><PencilIcon className="w-5 h-5"/></button>
                   {user.role !== UserRole.Admin && (
                    <button onClick={() => handleDeleteUser(user.id)} className="p-2 text-gray-500 hover:text-red-600" title="حذف"><TrashIcon className="w-5 h-5"/></button>
                   )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && <UserModal user={selectedUser} onClose={handleCloseModal} onSave={handleSaveUser} />}
    </div>
  );
};

// UserModal Component
interface UserModalProps {
  user: User | null;
  onClose: () => void;
  onSave: (userData: Omit<User, 'id'>) => void;
}

const UserModal: React.FC<UserModalProps> = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    username: user?.username || '',
    password: user?.password || '',
    role: user?.role || UserRole.Doctor,
    phone: user?.phone || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user && !formData.password) {
        alert("كلمة المرور مطلوبة للمستخدمين الجدد.");
        return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h3 className="text-2xl font-bold mb-6">{user ? 'تعديل بيانات المستخدم' : 'إضافة مستخدم جديد'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">الاسم الكامل</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">اسم المستخدم</label>
              <input type="text" name="username" value={formData.username} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">كلمة المرور</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder={user ? "اتركه فارغاً لعدم التغيير" : "********"} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-700">الدور</label>
              <select name="role" value={formData.role} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
                {Object.values(UserRole).map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-700">رقم الهاتف</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
            </div>
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">إلغاء</button>
            <button type="submit" className="px-4 py-2 bg-teal-500 text-white rounded-lg shadow hover:bg-teal-600">حفظ</button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default UsersView;
