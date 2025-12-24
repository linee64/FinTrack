import React from 'react';
import { LayoutDashboard, Wallet, GraduationCap, User } from 'lucide-react';

interface HeaderProps {
  activeTab: 'dashboard' | 'expenses' | 'learning';
  onTabChange: (tab: 'dashboard' | 'expenses' | 'learning') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  return (
    <header className="bg-white border-b border-gray-100 px-4 py-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-50">
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg text-gray-900">FinTrack KZ</span>
        </div>
        
        {/* Mobile User Profile (visible only on mobile) */}
        <div className="md:hidden w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold border-2 border-white shadow-sm text-xs">
          AK
        </div>
      </div>

      <nav className="relative grid grid-cols-3 bg-gray-50 p-1 rounded-xl isolate w-full max-w-[420px]">
        {/* Slider Animation */}
        <div 
          className="absolute top-1 bottom-1 left-1 bg-white rounded-lg shadow-sm transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] -z-10"
          style={{
            width: 'calc((100% - 0.5rem) / 3)',
            transform: `translateX(${
              activeTab === 'dashboard' ? '0%' : 
              activeTab === 'expenses' ? '100%' : 
              '200%'
            })`
          }}
        />

        <button 
          onClick={() => onTabChange('dashboard')}
          className={`flex items-center justify-center gap-2 py-2 rounded-lg font-medium transition-colors duration-300 ${
            activeTab === 'dashboard' 
              ? 'text-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span className="text-sm">Главная</span>
        </button>
        <button 
          onClick={() => onTabChange('expenses')}
          className={`flex items-center justify-center gap-2 py-2 rounded-lg font-medium transition-colors duration-300 ${
            activeTab === 'expenses' 
              ? 'text-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Wallet className="w-4 h-4" />
          <span className="text-sm">Расходы</span>
        </button>
        <button 
          onClick={() => onTabChange('learning')}
          className={`flex items-center justify-center gap-2 py-2 rounded-lg font-medium transition-colors duration-300 ${
            activeTab === 'learning' 
              ? 'text-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span className="text-sm">Обучение</span>
        </button>
      </nav>

      <div className="hidden md:flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-xs text-gray-500">Пользователь</p>
          <p className="text-sm font-semibold text-gray-900">Айгуль К.</p>
        </div>
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold border-2 border-white shadow-sm">
          AK
        </div>
      </div>
    </header>
  );
};
