import React, { useState } from 'react';
import { Post, User } from '../types';
import { CreatePost } from './CreatePost';
import { PostCard } from './PostCard';
import { ProfileHeader } from './ProfileHeader';
import { EditProfileModal } from './EditProfileModal';
import { useAppContext } from '../contexts/AppContext';

interface FeedProps {
  posts: Post[];
  onAddPost: (post: { content: string, imageUrl?: string }) => void;
  onToggleLike: (postId: string) => void;
  onAddComment: (postId: string, commentText: string) => void;
}

export const Feed: React.FC<FeedProps> = ({ posts, onAddPost, onToggleLike, onAddComment }) => {
  const { currentUser } = useAppContext();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if(!currentUser) return null;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6">
      {isEditModalOpen && <EditProfileModal user={currentUser} onClose={() => setIsEditModalOpen(false)} />}
      <ProfileHeader 
        user={currentUser} 
        isCurrentUser={true}
        onEditProfile={() => setIsEditModalOpen(true)}
      />
      <CreatePost onAddPost={onAddPost} />
      <div>
        {posts.map((post, index) => (
          <div key={post.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms`, opacity: 0 }}>
            <PostCard 
              post={post}
              onToggleLike={onToggleLike}
              onAddComment={onAddComment}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
