import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, Page } from '../types';
import { mockUsers } from '../constants';
import { auth } from '../services/firebase';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User as FirebaseUser,
} from 'firebase/auth';

type Theme = 'light' | 'dark';
type Locale = 'en' | 'ar';

interface AppContextType {
  isAuthenticated: boolean;
  currentUser: User | null;
  loadingAuth: boolean;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => void;
  updateUserProfile: (updatedData: Partial<User>) => void;
  page: Page;
  setPage: (page: Page) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(true);
  const [page, setPage] = useState<Page>('home');
  const [theme, setTheme] = useState<Theme>('dark');
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Find the corresponding mock user. In a real app, you'd fetch this from your database.
        const appUser = Object.values(mockUsers).find(u => u.email === firebaseUser.email);
        if (appUser) {
          setCurrentUser(appUser);
          setIsAuthenticated(true);
        } else {
          // If user signs in with an email not in mockUsers, for this demo we'll create a temporary user profile
           const newUser: User = {
                id: firebaseUser.uid,
                name: firebaseUser.displayName || 'New User',
                handle: firebaseUser.email?.split('@')[0] || 'newuser',
                email: firebaseUser.email!,
                avatarUrl: firebaseUser.photoURL || `https://i.pravatar.cc/150?u=${firebaseUser.uid}`,
                profileCoverUrl: 'https://picsum.photos/seed/newuser/1000/300',
                bio: 'Welcome to Geo!',
            };
            setCurrentUser(newUser);
            setIsAuthenticated(true);
        }
      } else {
        setCurrentUser(null);
        setIsAuthenticated(false);
      }
      setLoadingAuth(false);
    });

    return () => unsubscribe();
  }, []);
  
  const signInWithEmail = async (email: string, pass: string) => {
      await signInWithEmailAndPassword(auth, email, pass);
  };
  
  const signInWithGoogle = async () => {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
    setPage('home');
  };
  
  const updateUserProfile = (updatedData: Partial<User>) => {
    // In a real app, this would also update the user data in your database
    if(currentUser) {
        setCurrentUser(prevUser => ({
            ...prevUser!,
            ...updatedData,
        }));
    }
  };

  const contextValue: AppContextType = {
    isAuthenticated,
    currentUser,
    loadingAuth,
    signInWithEmail,
    signInWithGoogle,
    logout,
    updateUserProfile,
    page,
    setPage,
    theme,
    setTheme,
    locale,
    setLocale,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
