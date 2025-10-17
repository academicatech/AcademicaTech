import React from 'react';
import { Page, User, UserRole } from '../types';
import { HomeIcon, UserGroupIcon, CalendarIcon, CurrencyDollarIcon, UsersIcon, CogIcon, ChatBubbleBottomCenterTextIcon, DocumentChartBarIcon, DocumentCheckIcon, ArrowLeftOnRectangleIcon } from './Icons';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  user: User;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, user, onLogout }) => {
  const navItems = [
    { id: 'dashboard', label: 'الرئيسية', icon: <HomeIcon />, adminOnly: false },
    { id: 'children', label: 'إدارة الأطفال', icon: <UserGroupIcon />, adminOnly: false },
    { id: 'appointments', label: 'المواعيد والجلسات', icon: <CalendarIcon />, adminOnly: false },
    { id: 'attendance', label: 'الحضور والغياب', icon: <DocumentCheckIcon />, adminOnly: false },
    { id: 'financials', label: 'المستحقات المالية', icon: <CurrencyDollarIcon />, adminOnly: false },
    { id: 'reports', label: 'الإحصائيات والتقارير', icon: <DocumentChartBarIcon />, adminOnly: false },
    { id: 'users', label: 'إدارة المستخدمين', icon: <UsersIcon />, adminOnly: true },
    { id: 'communication', label: 'التواصل والملاحظات', icon: <ChatBubbleBottomCenterTextIcon />, adminOnly: false },
    { id: 'settings', label: 'الإعدادات', icon: <CogIcon />, adminOnly: true },
  ] as const;

  const availableNavItems = navItems.filter(item => !item.adminOnly || user.role === UserRole.Admin);

  return (
    <aside className="w-64 bg-white shadow-md flex-shrink-0 flex flex-col">
      <div className="h-20 flex items-center justify-center border-b">
        <h1 className="text-xl font-extrabold text-teal-600">عيادتي الأرطوفونية</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2 flex flex-col">
        <div>
            {availableNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 mb-2 ${
                  activePage === item.id
                    ? 'bg-teal-500 text-white shadow'
                    : 'text-gray-600 hover:bg-teal-50 hover:text-teal-600'
                }`}
              >
                <span className="w-6 h-6 me-3">{item.icon}</span>
                {item.label}
              </button>
            ))}
        </div>
        <div className="mt-auto">
            <button
                onClick={onLogout}
                className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
            >
                <span className="w-6 h-6 me-3"><ArrowLeftOnRectangleIcon /></span>
                تسجيل الخروج
            </button>
        </div>
      </nav>
      <div className="px-4 py-4 border-t text-center text-xs text-gray-500">
        <p>تم تصميم وتطوير النظام بواسطة</p>
        <a
          href="https://facebook.com/nadir.ouaddah"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-teal-600 hover:underline"
        >
          نذير وضاح
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;