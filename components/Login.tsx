import React, { useState } from 'react';
import { Icon } from './Icon';
import { useAppContext } from '../contexts/AppContext';
import { Loader } from './Loader';

export const Login: React.FC = () => {
    const { signInWithEmail, signInWithGoogle } = useAppContext();
    const [email, setEmail] = useState('alex.johnson@example.com');
    const [password, setPassword] = useState('password123');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await signInWithEmail(email, password);
        } catch (err: any) {
            setError(err.message || "Failed to sign in.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError(null);
        setLoading(true);
         try {
            await signInWithGoogle();
        } catch (err: any) {
            setError(err.message || "Failed to sign in with Google.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('https://picsum.photos/seed/bg/1920/1080')", filter: 'blur(10px)'}}></div>
             <div className="w-full max-w-md bg-white/20 dark:bg-black/20 backdrop-blur-2xl border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl p-8 animate-fade-in-up">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <Icon path="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A11.953 11.953 0 0112 13.5c-2.998 0-5.74 1.1-7.843 2.918" className="w-10 h-10 text-purple-500 dark:text-purple-400" />
                        <h1 className="text-4xl font-bold ml-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">Geo</h1>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300">Welcome back! Connect with your world.</p>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full bg-black/5 dark:bg-white/5 text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all border-transparent"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password"className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full bg-black/5 dark:bg-white/5 text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all border-transparent"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg disabled:opacity-75 disabled:scale-100 flex items-center justify-center"
                    >
                       {loading ? <Loader size="sm" /> : 'Sign In'}
                    </button>
                    <div className="relative flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-300 dark:border-slate-600"></div>
                        </div>
                        <div className="relative bg-white/20 dark:bg-slate-800/50 px-2 text-sm text-slate-500 dark:text-slate-400 backdrop-blur-sm">OR</div>
                    </div>
                     <button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold py-3 px-6 rounded-lg transition-colors shadow-md disabled:opacity-75"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 48 48" > <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.222 0-9.618-3.319-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.021 35.596 44 30.023 44 24c0-1.341-.138-2.65-.389-3.917z"></path> </svg>
                        Sign in with Google
                    </button>
                </form>

                <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-8">
                    Don't have an account? <a href="#" className="font-semibold text-purple-600 dark:text-purple-400 hover:underline">Sign Up</a>
                </p>
            </div>
        </div>
    );
};