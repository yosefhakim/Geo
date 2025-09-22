import React from 'react';
import { Icon } from './Icon';
import { useTranslations } from '../hooks/useTranslations';

const PageWrapper: React.FC<{title: string, icon: string, children: React.ReactNode}> = ({title, icon, children}) => (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 animate-fade-in-up">
        <div className="flex items-center gap-4 mb-6">
            <Icon path={icon} className="w-10 h-10 text-purple-500 dark:text-purple-400" />
            <h1 className="text-3xl font-bold">{title}</h1>
        </div>
        <div className="bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-black/10 dark:border-white/10 rounded-xl shadow-lg p-6 min-h-[300px] flex items-center justify-center">
            {children}
        </div>
    </div>
);


export const Notifications: React.FC = () => {
  const t = useTranslations();
  return (
    <PageWrapper title={t.sidebar.notifications} icon="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.341 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9">
      <div className="text-center text-slate-500 dark:text-slate-400">
        <p className="text-lg">{t.notifications.noNew}</p>
        <p>{t.notifications.description}</p>
      </div>
    </PageWrapper>
  );
};