'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase, User, auth, userData } from '../lib/supabase';

interface AuthContextType {
  user: SupabaseUser | null;
  userProfile: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 获取用户详细信息
  const fetchUserProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }, []);

  // 创建新用户
  const createUserProfile = useCallback(async (user: SupabaseUser) => {
    try {
      const { data, error } = await userData.createUser({
        id: user.id,
        email: user.email || '',
        avatar_url: user.user_metadata?.avatar_url || null,
        credits: 10, // 新用户默认10积分
      });

      if (error) {
        console.error('Error creating user profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error creating user profile:', error);
      return null;
    }
  }, []);

  // 确保用户存在（如果不存在则创建）
  const ensureUserExists = useCallback(async (user: SupabaseUser) => {
    try {
      console.log('Checking user existence for:', user.id);
      
      // 先检查用户是否存在
      const { data: userExists, error: checkError } = await userData.checkUserExists(user.id);
      
      if (checkError) {
        console.error('Error checking user existence:', checkError);
        console.error('Error details:', JSON.stringify(checkError, null, 2));
        return null;
      }

      console.log('User exists:', userExists);

      if (!userExists) {
        // 用户不存在，创建新用户
        console.log('Creating new user profile for:', user.email);
        return await createUserProfile(user);
      } else {
        // 用户存在，获取用户信息
        return await fetchUserProfile(user.id);
      }
    } catch (error) {
      console.error('Error ensuring user exists:', error);
      return null;
    }
  }, [createUserProfile, fetchUserProfile]);

  // 刷新用户资料
  const refreshUserProfile = async () => {
    if (user) {
      const profile = await fetchUserProfile(user.id);
      setUserProfile(profile);
    }
  };

  // Google 登录
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const { error } = await auth.signInWithGoogle();
      if (error) {
        console.error('Error signing in with Google:', error);
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
    } finally {
      setLoading(false);
    }
  };

  // 登出
  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
      } else {
        setUser(null);
        setUserProfile(null);
      }
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 获取初始用户状态
    const getInitialUser = async () => {
      try {
        const { user: currentUser } = await auth.getCurrentUser();
        setUser(currentUser);

        if (currentUser) {
          const profile = await ensureUserExists(currentUser);
          setUserProfile(profile);
        }
      } catch (error) {
        console.error('Error getting initial user:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialUser();

    // 监听认证状态变化
    const { data: { subscription } } = auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // 确保用户存在，如果不存在则创建
        const profile = await ensureUserExists(session.user);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [ensureUserExists]);

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    signInWithGoogle,
    signOut,
    refreshUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
