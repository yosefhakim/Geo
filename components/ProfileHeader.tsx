import React from 'react';
import { User } from '../types';
import { useTranslations } from '../hooks/useTranslations';

interface ProfileHeaderProps {
  user: User;
  isCurrentUser: boolean;
  onEditProfile?: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, isCurrentUser, onEditProfile }) => {
  const t = useTranslations();
  return (
    <div className="bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-black/10 dark:border-white/10 rounded-xl overflow-hidden mb-6 shadow-lg animate-fade-in-up">
      <div className="relative h-48 md:h-64">
        <img src={user.profileCoverUrl} alt="Cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-6 rtl:right-6 rtl:left-auto translate-y-1/2">
          <img src={user.avatarUrl} alt={user.name} className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-slate-200 dark:border-slate-800 ring-4 ring-purple-500/50" />
        </div>
        {isCurrentUser && (
            <button
              onClick={onEditProfile}
              className="absolute bottom-4 right-4 bg-white/30 dark:bg-black/30 backdrop-blur-md text-white font-semibold py-2 px-4 rounded-lg border border-white/20 hover:bg-white/50 dark:hover:bg-black/50 transition-colors"
            >
              {t.profile.editProfile}
            </button>
        )}
      </div>
      <div className="pt-16 md:pt-20 pb-4 px-6">
        <h2 className="text-2xl md:text-3xl font-bold">{user.name}</h2>
        <p className="text-purple-600 dark:text-purple-300">@{user.handle}</p>
        {user.bio && <p className="mt-2 text-slate-700 dark:text-slate-300">{user.bio}</p>}
      </div>
    </div>
  );
};
