import React from 'react';
import { Icon } from './Icon';
import { useAppContext } from '../contexts/AppContext';
import { useTranslations } from '../hooks/useTranslations';

const SettingsSection: React.FC<{title: string, children: React.ReactNode}> = ({ title, children }) => (
    <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 border-b border-black/10 dark:border-white/10 pb-2">{title}</h2>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);

const ToggleSwitch: React.FC<{checked: boolean, onChange: (checked: boolean) => void}> = ({ checked, onChange }) => (
    <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`${
            checked ? 'bg-purple-600' : 'bg-slate-400 dark:bg-slate-600'
        } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
    >
        <span className={`${
            checked ? 'translate-x-6 rtl:-translate-x-6' : 'translate-x-1 rtl:-translate-x-1'
        } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
        />
    </button>
);


export const Settings: React.FC = () => {
    const { theme, setTheme, locale, setLocale, logout } = useAppContext();
    const t = useTranslations();
    
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 animate-fade-in-up">
        <div className="flex items-center gap-4 mb-8">
            <Icon path="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" className="w-10 h-10 text-purple-500 dark:text-purple-400" />
            <h1 className="text-3xl font-bold">{t.sidebar.settings}</h1>
        </div>
        <div className="bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-black/10 dark:border-white/10 rounded-xl shadow-lg p-6">
            
            {/* Appearance Section */}
            <SettingsSection title={t.settings.appearance.title}>
                <div className="flex justify-between items-center">
                    <label className="font-semibold">{t.settings.appearance.darkMode}</label>
                    <ToggleSwitch checked={theme === 'dark'} onChange={(checked) => setTheme(checked ? 'dark' : 'light')} />
                </div>
            </SettingsSection>

            {/* Language Section */}
            <SettingsSection title={t.settings.language.title}>
                 <div className="flex justify-between items-center">
                    <label htmlFor="language-select" className="font-semibold">{t.settings.language.select}</label>
                    <select
                        id="language-select"
                        value={locale}
                        onChange={(e) => setLocale(e.target.value as 'en' | 'ar')}
                        className="bg-slate-200 dark:bg-slate-700 rounded-md p-2 border-transparent focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="en">English</option>
                        <option value="ar">العربية</option>
                    </select>
                </div>
            </SettingsSection>

            {/* Account Section */}
            <SettingsSection title={t.settings.account.title}>
                 <button onClick={logout} className="w-full text-left text-red-500 font-semibold hover:bg-red-500/10 p-2 rounded-md transition-colors">{t.settings.account.logout}</button>
            </SettingsSection>
        </div>
    </div>
  );
};