import React from 'react';
import { MOCK_USERS } from '../constants';
import { UserRole } from '../types';

const roleColorMap = {
    [UserRole.Admin]: 'bg-purple-100 text-purple-800',
    [UserRole.Doctor]: 'bg-blue-100 text-blue-800',
    [UserRole.Educator]: 'bg-indigo-100 text-indigo-800',
    [UserRole.Staff]: 'bg-gray-100 text-gray-800',
    [UserRole.Parent]: 'bg-green-100 text-green-800',
    [UserRole.User]: 'bg-teal-100 text-teal-800',
};


const UsersView: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">إدارة المستخدمين</h2>
      <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
        <table className="w-full text-right min-w-[600px]">
          <thead className="border-b-2 border-gray-200">
            <tr>
              <th className="p-3 text-sm font-semibold">الاسم</th>
              <th className="p-3 text-sm font-semibold">الصلاحية</th>
              <th className="p-3 text-sm font-semibold">البريد الإلكتروني</th>
              <th className="p-3 text-sm font-semibold">رقم الهاتف</th>
              <th className="p-3 text-sm font-semibold">آخر تسجيل دخول</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_USERS.map((user) => (
              <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-3 text-sm font-semibold">{user.name}</td>
                <td className="p-3">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${roleColorMap[user.role]}`}>{user.role}</span>
                </td>
                <td className="p-3 text-sm text-gray-600">{user.email}</td>
                <td className="p-3 text-sm text-gray-600" dir="ltr">{user.phone}</td>
                <td className="p-3 text-sm text-gray-500">{user.lastLogin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersView;
