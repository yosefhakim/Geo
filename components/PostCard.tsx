import React, { useState } from 'react';
import { Post, Comment, User } from '../types';
import { Icon } from './Icon';
import { useAppContext } from '../contexts/AppContext';
import { useTranslations } from '../hooks/useTranslations';

interface PostCardProps {
  post: Post;
  onToggleLike: (postId: string) => void;
  onAddComment: (postId: string, commentText: string) => void;
}

const PostActionButton: React.FC<{ iconPath: string; label: string | number; colorClass: string; active?: boolean; onClick?: () => void }> = 
({ iconPath, label, colorClass, active = false, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center justify-center space-x-2 rtl:space-x-reverse transition-colors p-2 rounded-lg w-full
    ${active ? `${colorClass} bg-opacity-20` : 'text-slate-500 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/10'}`}
  >
    <Icon path={iconPath} className={`w-5 h-5 ${active ? colorClass : ''}`} />
    <span className="text-sm font-semibold">{label}</span>
  </button>
);

const CommentView: React.FC<{comment: Comment}> = ({ comment }) => (
    <div className="flex items-start space-x-3 rtl:space-x-reverse py-2">
        <img src={comment.user.avatarUrl} alt={comment.user.name} className="w-8 h-8 rounded-full mt-1" />
        <div>
            <div className="bg-black/5 dark:bg-white/5 p-2 rounded-lg">
                <p className="font-semibold text-sm text-gray-900 dark:text-white">{comment.user.name}</p>
                <p className="text-sm text-gray-700 dark:text-slate-300">{comment.text}</p>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">{comment.timestamp}</p>
        </div>
    </div>
);

export const PostCard: React.FC<PostCardProps> = ({ post, onToggleLike, onAddComment }) => {
    const [commentText, setCommentText] = useState('');
    const [showComments, setShowComments] = useState(false);
    const { currentUser } = useAppContext();
    const t = useTranslations();

    if (!currentUser) return null;

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentText.trim()) return;
        onAddComment(post.id, commentText);
        setCommentText('');
    };

  return (
    <div className="bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-black/10 dark:border-white/10 rounded-xl shadow-lg p-4 sm:p-5 mb-6">
      {/* Post Header */}
      <div className="flex items-center mb-4">
        <img src={post.user.avatarUrl} alt={post.user.name} className="w-12 h-12 rounded-full" />
        <div className="ml-4 rtl:mr-4 rtl:ml-0">
          <p className="font-bold text-gray-900 dark:text-white">{post.user.name}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">@{post.user.handle} · {post.timestamp}</p>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-slate-800 dark:text-slate-200 mb-4 whitespace-pre-wrap">{post.content}</p>
      
      {post.imageUrl && (
        <div className="rounded-lg overflow-hidden mb-4 -mx-5 sm:-mx-5">
          <img src={post.imageUrl} alt="Post content" className="w-full h-auto object-cover" />
        </div>
      )}

      {/* Post Stats */}
      <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400 mb-2 pb-2 border-b border-black/10 dark:border-white/10">
        <button className="hover:underline">{post.likes} {t.post.likes}</button>
        <button className="hover:underline" onClick={() => setShowComments(!showComments)}>{post.comments.length} {t.post.comments}</button>
      </div>

      {/* Post Actions */}
      <div className="grid grid-cols-3 gap-1">
        <PostActionButton 
          iconPath="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
          label={t.post.like}
          colorClass="text-pink-500"
          active={post.isLiked}
          onClick={() => onToggleLike(post.id)}
        />
        <PostActionButton 
            iconPath="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
            label={t.post.comment} 
            colorClass="text-purple-400" 
            onClick={() => setShowComments(!showComments)}
        />
        <PostActionButton 
            iconPath="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" 
            label={t.post.share}
            colorClass="text-green-400" 
        />
      </div>

      {/* Comment Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-black/10 dark:border-white/10">
            <form onSubmit={handleCommentSubmit} className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                <img src={currentUser.avatarUrl} alt="Your avatar" className="w-8 h-8 rounded-full" />
                <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder={t.post.commentPlaceholder}
                    className="w-full bg-black/5 dark:bg-white/5 text-slate-800 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
                 <button type="submit" className="p-2 rounded-full bg-purple-500 hover:bg-purple-600 transition-colors disabled:bg-slate-600" disabled={!commentText.trim()}>
                    <Icon path="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" className="w-5 h-5 text-white" />
                </button>
            </form>
            <div className="space-y-2">
                {post.comments.map(comment => <CommentView key={comment.id} comment={comment}/>)}
            </div>
        </div>
      )}
    </div>
  );
};