import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './views/DashboardView';
import ChildrenView from './views/ChildrenView';
import AppointmentsView from './views/AppointmentsView';
import FinancialsView from './views/FinancialsView';
import UsersView from './views/UsersView';
import SettingsView from './views/SettingsView';
import LoginView from './components/LoginView';
import AttendanceView from './views/AttendanceView';
import CommunicationView from './views/CommunicationView';
import { Page, User } from './types';

const ReportsView: React.FC = () => (
    <div>
        <h2 className="text-3xl font-bold">الإحصائيات والتقارير</h2>
        <p className="mt-4">هذه الصفحة قيد التطوير.</p>
    </div>
);

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activePage, setActivePage] = useState<Page>('dashboard');

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
    setActivePage('dashboard');
  };

  const renderContent = () => {
    if (!user) return null;
    switch (activePage) {
      case 'dashboard':
        return <DashboardView user={user} />;
      case 'children':
        return <ChildrenView />;
      case 'appointments':
        return <AppointmentsView />;
      case 'attendance':
        return <AttendanceView />;
      case 'financials':
        return <FinancialsView user={user} />;
      case 'reports':
        return <ReportsView />; 
      case 'users':
        return <UsersView />;
      case 'communication':
        return <CommunicationView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView user={user} />;
    }
  };

  if (!user) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans" dir="rtl">
      <Sidebar activePage={activePage} setActivePage={setActivePage} user={user} onLogout={handleLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
