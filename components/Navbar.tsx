import React from 'react';
import { Icon } from './Icon';
import { useAppContext } from '../contexts/AppContext';
import { useTranslations } from '../hooks/useTranslations';

export const Navbar: React.FC = () => {
  const { currentUser } = useAppContext();
  const t = useTranslations();

  if (!currentUser) return null;

  return (
    <header className="fixed top-0 w-[calc(100%-4rem)] lg:w-[calc(100%-16rem)] right-0 rtl:left-0 rtl:right-auto h-16 bg-white/20 dark:bg-black/20 backdrop-blur-xl border-b border-black/10 dark:border-white/10 z-10 transition-all duration-300">
      <div className="flex items-center justify-between h-full px-6">
        {/* Search Bar */}
        <div className="relative w-full max-w-lg">
          <div className="absolute inset-y-0 left-0 rtl:right-0 rtl:left-auto pl-3 rtl:pr-3 rtl:pl-0 flex items-center pointer-events-none">
            <Icon path="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" className="w-5 h-5 text-slate-500 dark:text-slate-400" />
          </div>
          <input
            type="text"
            placeholder={t.navbar.searchPlaceholder}
            className="w-full bg-black/5 dark:bg-white/5 text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 rounded-full py-2 pl-10 rtl:pr-10 rtl:pl-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <button className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
            <Icon path="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.341 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" className="w-6 h-6 text-slate-600 dark:text-slate-300" />
          </button>
          <div className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
            <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-10 h-10 rounded-full" />
            <span className="font-semibold hidden sm:inline">{currentUser.name}</span>
          </div>
        </div>
      </div>
    </header>
  );
};