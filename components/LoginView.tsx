import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { MOCK_USERS } from '../constants';

interface LoginViewProps {
  onLogin: (user: User) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'user'>('user');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const credentials = {
      admin: { username: 'admin', pass: 'admin', userRole: UserRole.Admin },
      user: { username: '12345', pass: '12345', userRole: UserRole.Doctor },
    };

    const targetUser = role === 'admin' ? credentials.admin : credentials.user;

    if (username === targetUser.username && password === targetUser.pass) {
      const user = MOCK_USERS.find(u => u.username === targetUser.username);
      if (user) {
        onLogin(user);
      } else {
        setError('لم يتم العثور على المستخدم في البيانات التجريبية.');
      }
    } else {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-teal-600">عيادتي الأرطوفونية</h1>
          <p className="mt-2 text-gray-500">تسجيل الدخول إلى حسابك</p>
        </div>
        <form className="space-y-6" onSubmit={handleLogin}>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div className="space-y-4">
            <div>
              <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-700">الدخول كـ:</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as 'admin' | 'user')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="user">مستخدم</option>
                <option value="admin">مسؤول</option>
              </select>
            </div>
            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">اسم المستخدم</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={role === 'admin' ? 'admin' : '12345'}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label htmlFor="password"className="block mb-2 text-sm font-medium text-gray-700">كلمة المرور</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-teal-600 rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              تسجيل الدخول
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginView;