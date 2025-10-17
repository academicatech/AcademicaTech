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
import { Page, User } from './types';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('dashboard');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardView user={currentUser!} />;
      case 'children':
        return <ChildrenView />;
      case 'appointments':
        return <AppointmentsView />;
      case 'financials':
        return <FinancialsView />;
      case 'users':
        return <UsersView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView user={currentUser!} />;
    }
  };

  if (!currentUser) {
    return <LoginView onLogin={setCurrentUser} />;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex text-gray-800">
      <Sidebar activePage={activePage} setActivePage={setActivePage} user={currentUser} />
      <div className="flex-1 flex flex-col">
        <Header user={currentUser} />
        <main className="p-6 lg:p-8 flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
