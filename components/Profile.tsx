import React, { useState } from 'react';
import { Post, User } from '../types';
import { PostCard } from './PostCard';
import { ProfileHeader } from './ProfileHeader';
import { EditProfileModal } from './EditProfileModal';
import { useTranslations } from '../hooks/useTranslations';
import { useAppContext } from '../contexts/AppContext';

interface ProfileProps {
  user: User;
  posts: Post[];
  onToggleLike: (postId: string) => void;
  onAddComment: (postId: string, commentText: string) => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, posts, onToggleLike, onAddComment }) => {
  const t = useTranslations();
  const { currentUser } = useAppContext();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const isCurrentUser = currentUser?.id === user.id;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 animate-fade-in-up">
       {isCurrentUser && isEditModalOpen && <EditProfileModal user={user} onClose={() => setIsEditModalOpen(false)} />}
      <ProfileHeader 
        user={user}
        isCurrentUser={isCurrentUser}
        onEditProfile={isCurrentUser ? () => setIsEditModalOpen(true) : undefined}
      />
      <h2 className="text-2xl font-bold mb-4 ml-2 rtl:mr-2 rtl:ml-0">{t.profile.yourPosts}</h2>
      <div>
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={post.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms`, opacity: 0 }}>
                <PostCard 
                  post={post}
                  onToggleLike={onToggleLike}
                  onAddComment={onAddComment}
                />
            </div>
          ))
        ) : (
          <div className="bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-black/10 dark:border-white/10 rounded-xl shadow-lg p-10 text-center text-slate-500 dark:text-slate-400">
            <p>{t.profile.noPosts}</p>
          </div>
        )}
      </div>
    </div>
  );
};
