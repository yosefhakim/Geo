import React from 'react';
import { Icon } from './Icon';
import { Page } from '../types';
import { useAppContext } from '../contexts/AppContext';
import { useTranslations } from '../hooks/useTranslations';

interface SidebarLinkProps {
  iconPath: string;
  label: string;
  page: Page;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ iconPath, label, page }) => {
    const { page: activePage, setPage } = useAppContext();
    const isActive = activePage === page;
    return (
      <button 
        onClick={() => setPage(page)}
        className={`flex items-center justify-center lg:justify-start w-full p-3 my-1 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400
        ${isActive 
          ? 'bg-purple-600/50 dark:bg-purple-600/50 text-white shadow-lg' 
          : 'text-slate-500 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white'}`}
      >
        <Icon path={iconPath} className="w-6 h-6" />
        <span className="ml-4 rtl:mr-4 rtl:ml-0 font-semibold hidden lg:inline">{label}</span>
      </button>
    );
};

export const Sidebar: React.FC = () => {
  const t = useTranslations();
  return (
    <aside className="w-16 lg:w-64 p-2 lg:p-4 fixed top-0 left-0 rtl:left-auto rtl:right-0 h-full bg-white/20 dark:bg-black/20 backdrop-blur-xl border-r rtl:border-l rtl:border-r-0 border-black/10 dark:border-white/10 flex flex-col z-20">
      <div className="flex items-center justify-center lg:justify-start mb-10 p-2">
        <Icon path="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A11.953 11.953 0 0112 13.5c-2.998 0-5.74 1.1-7.843 2.918" className="w-8 h-8 text-purple-500 dark:text-purple-400" />
        <h1 className="text-2xl font-bold ml-2 rtl:mr-2 rtl:ml-0 hidden lg:inline bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">{t.appName}</h1>
      </div>
      <nav className="flex flex-col">
        <SidebarLink iconPath="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" label={t.sidebar.home} page="home" />
        <SidebarLink iconPath="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" label={t.sidebar.messages} page="messages" />
        <SidebarLink iconPath="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.341 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" label={t.sidebar.notifications} page="notifications" />
        <SidebarLink iconPath="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" label={t.sidebar.profile} page="profile" />
        <SidebarLink iconPath="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" label={t.sidebar.settings} page="settings" />
      </nav>
    </aside>
  );
};