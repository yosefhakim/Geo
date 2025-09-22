import React, { useState } from 'react';
import { User, Post } from '../types';
import { Icon } from './Icon';
import { useTranslations } from '../hooks/useTranslations';
import { useAppContext } from '../contexts/AppContext';

interface CreatePostProps {
  onAddPost: (post: { content: string, imageUrl?: string }) => void;
}

export const CreatePost: React.FC<CreatePostProps> = ({ onAddPost }) => {
  const [content, setContent] = useState('');
  const { currentUser } = useAppContext();
  const t = useTranslations();

  if (!currentUser) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    onAddPost({ content });
    setContent('');
  };

  return (
    <div className="bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-black/10 dark:border-white/10 p-4 rounded-xl shadow-lg mb-6 animate-fade-in-up">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start space-x-4 rtl:space-x-reverse">
          <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-12 h-12 rounded-full" />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            // FIX: The translation for 'placeholder' is a string, not a function. Using String.replace() to insert the user's name.
            placeholder={t.createPost.placeholder.replace('{name}', currentUser.name)}
            className="w-full bg-black/5 dark:bg-white/5 text-slate-800 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[60px] resize-y transition-all"
          />
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-1 rtl:space-x-reverse">
            <button type="button" className="text-slate-500 dark:text-slate-400 hover:text-purple-500 dark:hover:text-purple-400 p-2 rounded-full transition-colors">
              <Icon path="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
            </button>
             <button type="button" className="text-slate-500 dark:text-slate-400 hover:text-purple-500 dark:hover:text-purple-400 p-2 rounded-full transition-colors">
               <Icon path="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </button>
            <button type="button" className="text-slate-500 dark:text-slate-400 hover:text-purple-500 dark:hover:text-purple-400 p-2 rounded-full transition-colors">
               <Icon path="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </button>
          </div>
          <button
            type="submit"
            disabled={!content.trim()}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-6 rounded-full transition-all transform hover:scale-105 shadow-lg disabled:from-slate-500 disabled:to-slate-600 disabled:cursor-not-allowed disabled:scale-100"
          >
            {t.createPost.postButton}
          </button>
        </div>
      </form>
    </div>
  );
};