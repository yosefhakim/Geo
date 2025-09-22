import React, { useState } from 'react';
import { User } from '../types';
import { useAppContext } from '../contexts/AppContext';
import { useTranslations } from '../hooks/useTranslations';
import { Icon } from './Icon';

interface EditProfileModalProps {
  user: User;
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ user, onClose }) => {
  const { updateUserProfile } = useAppContext();
  const t = useTranslations();
  const [name, setName] = useState(user.name);
  const [handle, setHandle] = useState(user.handle);
  const [bio, setBio] = useState(user.bio || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name, handle, bio });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white/50 dark:bg-black/50 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-xl shadow-lg w-full max-w-lg animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{t.settings.profile.title}</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10">
              <Icon path="M6 18L18 6M6 6l12 12" className="w-6 h-6" />
            </button>
          </div>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">{t.settings.profile.name}</label>
              <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="w-full bg-slate-200/80 dark:bg-slate-700/80 rounded-md p-2 border-transparent focus:ring-2 focus:ring-purple-500" />
            </div>
            <div>
              <label htmlFor="handle" className="block text-sm font-medium mb-1">{t.settings.profile.handle}</label>
              <input type="text" id="handle" value={handle} onChange={e => setHandle(e.target.value)} className="w-full bg-slate-200/80 dark:bg-slate-700/80 rounded-md p-2 border-transparent focus:ring-2 focus:ring-purple-500" />
            </div>
            <div>
              <label htmlFor="bio" className="block text-sm font-medium mb-1">{t.settings.profile.bio}</label>
              <textarea id="bio" value={bio} onChange={e => setBio(e.target.value)} rows={3} className="w-full bg-slate-200/80 dark:bg-slate-700/80 rounded-md p-2 border-transparent focus:ring-2 focus:ring-purple-500 resize-none"></textarea>
            </div>
            <div className="flex justify-end gap-4 pt-2">
                 <button type="button" onClick={onClose} className="bg-slate-200/80 dark:bg-slate-700/80 hover:bg-slate-300 dark:hover:bg-slate-600 font-bold py-2 px-4 rounded-md transition-colors">{t.editProfile.cancel}</button>
                 <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition-colors">{t.settings.profile.saveButton}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
