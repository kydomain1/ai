# Supabase 配置指南

## 步骤 1: 创建 Supabase 项目

1. 访问 [Supabase Dashboard](https://supabase.com/dashboard)
2. 点击 "New Project"
3. 选择组织（如果没有，先创建一个）
4. 填写项目信息：
   - 项目名称：`ai-image`
   - 数据库密码：设置一个强密码
   - 地区：选择离你最近的地区
5. 点击 "Create new project"
6. 等待项目创建完成（通常需要 1-2 分钟）

## 步骤 2: 获取项目配置

1. 在项目仪表板中，点击左侧菜单的 "Settings"
2. 点击 "API"
3. 复制以下信息：
   - Project URL
   - Project API keys → anon public

## 步骤 3: 创建 .env.local 文件

在项目根目录创建 `.env.local` 文件：

```bash
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Google OAuth 配置 (稍后配置)
SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID=your-google-client-id
SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET=your-google-client-secret
```

## 步骤 4: 配置数据库

1. 在 Supabase Dashboard 中，点击左侧菜单的 "SQL Editor"
2. 点击 "New query"
3. 复制并粘贴以下 SQL 代码：

```sql
-- 创建用户表
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    avatar_url TEXT,
    email TEXT UNIQUE NOT NULL,
    credits INTEGER DEFAULT 10 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS users_email_idx ON public.users(email);
CREATE INDEX IF NOT EXISTS users_credits_idx ON public.users(credits);

-- 启用行级安全策略
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 创建策略：用户只能查看和修改自己的数据
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- 创建函数：自动更新 updated_at 时间戳
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 创建触发器：自动更新 updated_at 字段
CREATE OR REPLACE TRIGGER handle_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
```

4. 点击 "Run" 执行 SQL

## 步骤 5: 配置 Google OAuth

### 5.1 在 Google Cloud Console 中配置

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目或选择现有项目
3. 启用 Google+ API：
   - 点击 "APIs & Services" → "Library"
   - 搜索 "Google+ API" 并启用
4. 创建 OAuth 2.0 客户端 ID：
   - 点击 "APIs & Services" → "Credentials"
   - 点击 "Create Credentials" → "OAuth 2.0 Client ID"
   - 选择 "Web application"
   - 添加授权重定向 URI：
     - `http://localhost:3000/auth/callback`
     - `http://localhost:3001/auth/callback`
     - `https://your-domain.com/auth/callback` (生产环境)
5. 复制客户端 ID 和客户端密钥

### 5.2 在 Supabase 中配置 Google OAuth

1. 在 Supabase Dashboard 中，点击左侧菜单的 "Authentication"
2. 点击 "Providers"
3. 找到 "Google" 并点击启用
4. 填入 Google OAuth 配置：
   - Client ID: 从 Google Cloud Console 复制的客户端 ID
   - Client Secret: 从 Google Cloud Console 复制的客户端密钥
5. 点击 "Save"

## 步骤 6: 测试配置

1. 启动开发服务器：
   ```bash
   npm run dev
   ```

2. 访问 http://localhost:3000 或 http://localhost:3001

3. 点击 Header 右侧的 "Google 登录" 按钮

4. 如果配置正确，应该会跳转到 Google 登录页面

## 故障排除

### 常见问题

1. **"Invalid redirect URI" 错误**：
   - 确保在 Google Cloud Console 中添加了正确的重定向 URI
   - 检查端口号是否正确（3000 或 3001）

2. **"Client ID not found" 错误**：
   - 确保在 Supabase 中正确配置了 Google OAuth
   - 检查客户端 ID 和密钥是否正确

3. **数据库连接错误**：
   - 检查 `.env.local` 文件中的 Supabase URL 和密钥
   - 确保 Supabase 项目正在运行

4. **用户表不存在**：
   - 确保在 Supabase SQL Editor 中执行了用户表创建 SQL

### 检查配置

运行以下命令检查配置：

```bash
# 检查环境变量
npm run dev

# 查看控制台输出，应该看到：
# - Environments: .env.local
# - 没有 Supabase 连接错误
```

## 完成！

配置完成后，你的应用将具备：
- ✅ Google 登录功能
- ✅ 用户数据存储
- ✅ 积分系统
- ✅ 安全的用户认证
