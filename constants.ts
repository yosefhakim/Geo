import { User, Post, Conversation } from './types';

export const mockUsers: Record<string, User> = {
  user1: {
    id: 'user1',
    name: 'Alex Johnson',
    handle: 'alexj',
    email: 'alex.johnson@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=alexj',
    profileCoverUrl: 'https://picsum.photos/seed/cover1/1000/300',
    bio: 'Frontend developer and coffee enthusiast. Exploring the world one component at a time.',
  },
  user2: {
    id: 'user2',
    name: 'Maria Garcia',
    handle: 'mariag',
    email: 'maria.garcia@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=mariag',
    profileCoverUrl: 'https://picsum.photos/seed/cover2/1000/300',
    bio: 'Fitness enthusiast and nature lover.',
  },
  user3: {
    id: 'user3',
    name: 'Chen Wei',
    handle: 'chenw',
    email: 'chen.wei@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=chenw',
    profileCoverUrl: 'https://picsum.photos/seed/cover3/1000/300',
    bio: 'Artist and designer, finding beauty in simplicity.',
  },
};

export const initialPosts: Post[] = [
  {
    id: 'post1',
    user: mockUsers['user2'],
    timestamp: '2 hours ago',
    content: 'Just finished a 10km run! The weather was perfect. Feeling energized and ready for the week ahead. 🏃‍♀️ #fitness #running #morningmotivation',
    imageUrl: 'https://picsum.photos/seed/run/800/500',
    likes: 128,
    isLiked: false,
    shares: 12,
    comments: [
      {
        id: 'comment1',
        user: mockUsers['user1'],
        text: 'Wow, amazing! Keep it up!',
        timestamp: '1 hour ago',
      },
      {
        id: 'comment2',
        user: mockUsers['user3'],
        text: 'Inspiring! I need to get back to my routine.',
        timestamp: '45 minutes ago',
      },
    ],
  },
  {
    id: 'post2',
    user: mockUsers['user3'],
    timestamp: '5 hours ago',
    content: 'Spent the afternoon exploring the new art exhibit downtown. This piece was particularly striking. It\'s incredible how art can evoke so many different emotions. If you\'re in the area, I highly recommend checking it out. What a wonderful way to spend a Sunday! 🎨✨',
    imageUrl: 'https://picsum.photos/seed/art/800/600',
    likes: 256,
    isLiked: true,
    shares: 34,
    comments: [],
  },
  {
    id: 'post3',
    user: mockUsers['user1'],
    timestamp: '1 day ago',
    content: 'Here is a very long post to demonstrate the layout. The recent advancements in front-end development, particularly with frameworks like React and the styling power of Tailwind CSS, are enabling developers to build incredibly complex and beautiful user interfaces with unprecedented speed and efficiency. The component-based architecture promotes reusability and maintainability, while utility-first CSS frameworks allow for rapid prototyping and design system implementation without ever leaving your HTML. This shift in paradigm allows teams to focus more on user experience, animations, and creating delightful interactions, rather than getting bogged down in writing custom CSS. It is a complex but exciting journey ahead for developers, designers, and society as a whole.',
    likes: 98,
    isLiked: false,
    shares: 5,
    comments: [
        {
            id: 'comment3',
            user: mockUsers['user2'],
            text: 'Great summary of the current state of front-end!',
            timestamp: '20 hours ago',
        }
    ],
  },
];


export const mockConversations: Conversation[] = [
  {
    id: 'conv1',
    participants: [mockUsers['user1'], mockUsers['user2']],
    messages: [
      { id: 'msg1', senderId: 'user2', text: 'Hey Alex! Loved your latest post about frontend development. Really insightful!', timestamp: '10:30 AM' },
      { id: 'msg2', senderId: 'user1', text: 'Thanks Maria! Glad you enjoyed it. I was hoping it would spark some good discussions.', timestamp: '10:32 AM' },
      { id: 'msg3', senderId: 'user2', text: 'It definitely did. I shared it with my team. By the way, how was your weekend?', timestamp: '10:33 AM' },
    ],
  },
  {
    id: 'conv2',
    participants: [mockUsers['user1'], mockUsers['user3']],
    messages: [
      { id: 'msg4', senderId: 'user3', text: 'That photo from the art exhibit was stunning!', timestamp: 'Yesterday' },
      { id: 'msg5', senderId: 'user1', text: 'I know, right? The artist is incredibly talented. You should check it out if you have time.', timestamp: 'Yesterday' },
    ],
  },
];
