import React, { useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { Feed } from './components/Feed';
import { Messages } from './components/Messages';
import { Notifications } from './components/Notifications';
import { Profile } from './components/Profile';
import { Settings } from './components/Settings';
import { Login } from './components/Login';
import { Loader } from './components/Loader';
import { mockUsers, initialPosts } from './constants';
import { Post, Page, Comment } from './types';
import { useAppContext } from './contexts/AppContext';

function App() {
  const { isAuthenticated, currentUser, page, setPage, locale, theme, loadingAuth } = useAppContext();
  const [posts, setPosts] = React.useState<Post[]>(initialPosts);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [locale, theme]);

  if (loadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!isAuthenticated || !currentUser) {
    return <Login />;
  }

  const handleAddPost = (newPostData: { content: string, imageUrl?: string }) => {
    const post: Post = {
      id: `post_${Date.now()}`,
      user: currentUser,
      timestamp: 'Just now',
      content: newPostData.content,
      imageUrl: newPostData.imageUrl,
      likes: 0,
      shares: 0,
      comments: [],
      isLiked: false,
    };
    setPosts(prevPosts => [post, ...prevPosts]);
  };

  const handleToggleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
        };
      }
      return post;
    }));
  };

  const handleAddComment = (postId: string, commentText: string) => {
    const newComment: Comment = {
      id: `comment_${Date.now()}`,
      user: currentUser,
      text: commentText,
      timestamp: 'Just now',
    };
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newComment],
        };
      }
      return post;
    }));
  };
  
  const renderPage = () => {
    switch (page) {
      case 'home':
        return <Feed posts={posts} onAddPost={handleAddPost} onToggleLike={handleToggleLike} onAddComment={handleAddComment} />;
      case 'messages':
        return <Messages />;
      case 'notifications':
        return <Notifications />;
      case 'profile':
        return <Profile user={currentUser} posts={posts.filter(p => p.user.id === currentUser.id)} onToggleLike={handleToggleLike} onAddComment={handleAddComment} />;
      case 'settings':
        return <Settings />;
      default:
        return <Feed posts={posts} onAddPost={handleAddPost} onToggleLike={handleToggleLike} onAddComment={handleAddComment}/>;
    }
  };

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="pl-16 lg:pl-64 rtl:pr-16 rtl:lg:pr-64 rtl:pl-0 rtl:lg:pl-0 transition-all duration-300">
        <Navbar />
        <main className="pt-20">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
