import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 调试信息
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Present' : 'Missing');

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 用户类型定义
export interface User {
  id: string;
  avatar_url: string | null;
  email: string;
  credits: number;
  created_at: string;
  updated_at: string;
}

// 认证相关函数
export const auth = {
  // 使用 Google 登录
  signInWithGoogle: async () => {
    const redirectUrl = typeof window !== 'undefined' 
      ? `${window.location.origin}/auth/callback`
      : `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/callback`;
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
      },
    });
    return { data, error };
  },

  // 登出
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // 获取当前用户
  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  // 监听认证状态变化
  onAuthStateChange: (callback: (event: string, session: { user: unknown } | null) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  },
};

// 用户数据相关函数
export const userData = {
  // 创建新用户
  createUser: async (user: {
    id: string;
    email: string;
    avatar_url?: string;
    credits?: number;
  }) => {
    const { data, error } = await supabase
      .from('users')
      .insert({
        id: user.id,
        email: user.email,
        avatar_url: user.avatar_url || null,
        credits: user.credits || 10, // 默认10积分
      })
      .select()
      .single();
    return { data, error };
  },

  // 检查用户是否存在
  checkUserExists: async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .eq('id', userId)
      .single();
    return { data: !!data, error };
  },

  // 获取用户信息
  getUserProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    return { data, error };
  },

  // 更新用户信息
  updateUserProfile: async (userId: string, updates: Partial<User>) => {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    return { data, error };
  },

  // 更新用户积分
  updateCredits: async (userId: string, credits: number) => {
    const { data, error } = await supabase
      .from('users')
      .update({ credits })
      .eq('id', userId)
      .select()
      .single();
    return { data, error };
  },

  // 减少积分
  deductCredits: async (userId: string, amount: number) => {
    const { data: user, error: fetchError } = await supabase
      .from('users')
      .select('credits')
      .eq('id', userId)
      .single();

    if (fetchError) return { data: null, error: fetchError };

    const newCredits = Math.max(0, user.credits - amount);
    
    const { data, error } = await supabase
      .from('users')
      .update({ credits: newCredits })
      .eq('id', userId)
      .select()
      .single();
    
    return { data, error };
  },
};
