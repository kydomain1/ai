# Supabase 设置指南

## 1. 环境变量配置

创建 `.env.local` 文件并添加以下配置：

```bash
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google OAuth 配置 (在 Supabase Dashboard 中配置)
SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID=your_google_client_id
SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET=your_google_client_secret
```

## 2. 安装依赖

```bash
npm install @supabase/supabase-js
```

## 3. 数据库迁移

```bash
# 启动 Supabase 本地开发环境
supabase start

# 应用迁移
supabase db push
```

## 4. Google OAuth 设置

1. 在 [Google Cloud Console](https://console.cloud.google.com/) 中创建 OAuth 2.0 客户端 ID
2. 在 Supabase Dashboard > Authentication > Providers 中启用 Google 提供商
3. 配置重定向 URL: `http://localhost:3000/auth/callback`

## 5. 用户表结构

已创建的用户表包含以下字段：
- `id` (UUID, 主键) - 关联 auth.users.id
- `avatar_url` (TEXT) - 用户头像URL
- `email` (TEXT, 唯一) - 用户邮箱
- `credits` (INTEGER, 默认10) - 用户积分
- `created_at` (TIMESTAMP) - 创建时间
- `updated_at` (TIMESTAMP) - 更新时间

## 6. 用户创建机制

- **手动创建**：用户记录在应用代码中手动创建，而不是通过数据库触发器
- **自动检查**：每次用户登录时，系统会检查用户是否存在
- **首次登录**：如果用户不存在，系统会自动创建用户记录
- **默认积分**：新用户默认获得 10 积分

## 7. 安全策略

- 用户只能查看和修改自己的数据
- 用户记录通过应用代码创建，提供更好的控制
- 自动更新 updated_at 时间戳
