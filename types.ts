export type Page = 'home' | 'messages' | 'notifications' | 'profile' | 'settings';

export interface User {
  id: string;
  name: string;
  handle: string;
  email: string;
  avatarUrl: string;
  profileCoverUrl: string;
  bio?: string;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  timestamp: string;
}

export interface Post {
  id: string;
  user: User;
  timestamp: string;
  content: string;
  imageUrl?: string;
  likes: number;
  isLiked: boolean;
  comments: Comment[];
  shares: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  participants: User[];
  messages: ChatMessage[];
}
