import React, { useState, useRef, useEffect } from 'react';
import { Icon } from './Icon';
import { useTranslations } from '../hooks/useTranslations';
import { useAppContext } from '../contexts/AppContext';
import { mockConversations } from '../constants';
import { Conversation, ChatMessage, User } from '../types';

const ConversationListItem: React.FC<{ conversation: Conversation; isActive: boolean; onClick: () => void; currentUser: User }> = ({ conversation, isActive, onClick, currentUser }) => {
  const otherParticipant = conversation.participants.find(p => p.id !== currentUser.id);
  const lastMessage = conversation.messages[conversation.messages.length - 1];

  if (!otherParticipant) return null;

  return (
    <button onClick={onClick} className={`w-full text-left flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-purple-500/20' : 'hover:bg-black/5 dark:hover:bg-white/10'}`}>
      <img src={otherParticipant.avatarUrl} alt={otherParticipant.name} className="w-12 h-12 rounded-full" />
      <div className="ml-3 rtl:mr-3 rtl:ml-0 flex-grow overflow-hidden">
        <p className="font-semibold truncate">{otherParticipant.name}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{lastMessage?.text}</p>
      </div>
    </button>
  );
};

const ChatBubble: React.FC<{ message: ChatMessage; isCurrentUser: boolean }> = ({ message, isCurrentUser }) => (
  <div className={`flex items-end gap-2 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
    <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${isCurrentUser ? 'bg-purple-500 text-white rounded-br-lg' : 'bg-slate-200 dark:bg-slate-700 rounded-bl-lg'}`}>
      <p>{message.text}</p>
      <p className={`text-xs mt-1 ${isCurrentUser ? 'text-purple-200' : 'text-slate-500'}`}>{message.timestamp}</p>
    </div>
  </div>
);

export const Messages: React.FC = () => {
  const t = useTranslations();
  const { currentUser } = useAppContext();
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(mockConversations[0]?.id || null);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedConversation = conversations.find(c => c.id === selectedConversationId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConversation?.messages]);

  if (!currentUser) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversationId) return;

    const message: ChatMessage = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setConversations(prev => prev.map(c => 
      c.id === selectedConversationId 
        ? { ...c, messages: [...c.messages, message] }
        : c
    ));
    setNewMessage('');
  };

  const otherParticipant = selectedConversation?.participants.find(p => p.id !== currentUser.id);

  return (
    <div className="w-full max-w-6xl mx-auto h-[calc(100vh-6rem)] py-6 px-4">
      <div className="bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-black/10 dark:border-white/10 rounded-xl shadow-lg h-full flex animate-fade-in-up">
        {/* Conversation List */}
        <div className="w-1/3 border-r rtl:border-l rtl:border-r-0 border-black/10 dark:border-white/10 overflow-y-auto p-3">
          <h2 className="text-xl font-bold p-3 mb-2">{t.sidebar.messages}</h2>
          <div className="space-y-2">
            {conversations.map(conv => (
              <ConversationListItem
                key={conv.id}
                conversation={conv}
                isActive={conv.id === selectedConversationId}
                onClick={() => setSelectedConversationId(conv.id)}
                currentUser={currentUser}
              />
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="w-2/3 flex flex-col">
          {selectedConversation && otherParticipant ? (
            <>
              <div className="flex items-center p-4 border-b border-black/10 dark:border-white/10">
                <img src={otherParticipant.avatarUrl} alt={otherParticipant.name} className="w-10 h-10 rounded-full" />
                <p className="font-bold ml-3 rtl:mr-3 rtl:ml-0">{otherParticipant.name}</p>
              </div>
              <div className="flex-grow p-4 overflow-y-auto space-y-4">
                {selectedConversation.messages.map(msg => (
                  <ChatBubble key={msg.id} message={msg} isCurrentUser={msg.senderId === currentUser.id} />
                ))}
                <div ref={messagesEndRef} />
              </div>
              <div className="p-4 border-t border-black/10 dark:border-white/10">
                <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    placeholder={t.messages.placeholder}
                    className="w-full bg-black/5 dark:bg-white/5 text-slate-800 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  />
                  <button type="submit" className="p-3 rounded-full bg-purple-500 hover:bg-purple-600 transition-colors disabled:bg-slate-600" disabled={!newMessage.trim()}>
                    <Icon path="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" className="w-5 h-5 text-white" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-grow flex items-center justify-center text-slate-500 dark:text-slate-400">
              <p>{t.messages.selectConversation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
