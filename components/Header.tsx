import React from 'react';
import { BellIcon, MagnifyingGlassIcon } from './Icons';
import { User } from '../types';

interface HeaderProps {
    user: User;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="h-20 bg-white shadow-sm flex-shrink-0 flex items-center justify-between px-6 lg:px-8">
      <div className="relative">
        <span className="absolute inset-y-0 right-0 flex items-center pr-3">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </span>
        <input
          type="text"
          placeholder="بحث..."
          className="w-full md:w-64 bg-gray-100 rounded-full py-2 pr-10 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>
      <div className="flex items-center space-x-6">
        <button className="relative text-gray-500 hover:text-teal-600">
          <BellIcon className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="flex items-center space-x-3">
          <img
            src={`https://picsum.photos/seed/${user.username}/40/40`}
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-sm">{user.name}</p>
            <p className="text-xs text-gray-500">{user.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
