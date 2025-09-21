# 环境变量配置指南

## 创建环境变量文件

在项目根目录创建 `.env.local` 文件，并添加以下配置：

```bash
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Hugging Face API 配置
HUGGINGFACE_API_KEY=your-huggingface-api-key

# R2 存储配置
R2_ENDPOINT_URL=https://your-account-id.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=your-access-key-id
R2_SECRET_ACCESS_KEY=your-secret-access-key
R2_BUCKET_NAME=your-bucket-name
R2_PUBLIC_URL=https://your-public-domain.com

# 其他配置
NODE_ENV=development
```

## R2 配置获取方法

### 1. 登录 Cloudflare Dashboard
访问 [Cloudflare Dashboard](https://dash.cloudflare.com/)

### 2. 进入 R2 对象存储
1. 在左侧菜单中找到 "R2 Object Storage"
2. 点击进入 R2 管理页面

### 3. 创建存储桶（如果还没有）
1. 点击 "Create bucket"
2. 输入存储桶名称（例如：ai-generated-images）
3. 选择位置（建议选择离用户最近的区域）
4. 点击 "Create bucket"

### 4. 获取 API 密钥
1. 在 R2 页面，点击 "Manage R2 API tokens"
2. 点击 "Create API token"
3. 选择 "Custom token"
4. 配置权限：
   - Token name: `AI Image Generator`
   - Permissions: `Object:Edit` 和 `Object:Read`
   - Account resources: `Include - All accounts`
   - Zone resources: `Include - All zones`
5. 点击 "Create API token"
6. 复制生成的 `Access Key ID` 和 `Secret Access Key`

### 5. 获取 Endpoint URL
1. 在 R2 页面，点击你的存储桶
2. 在 "Settings" 标签页中找到 "S3 API"
3. 复制 "Account ID" 和 "S3 API" 信息
4. Endpoint URL 格式：`https://[account-id].r2.cloudflarestorage.com`

### 6. 设置公开访问
1. 在存储桶设置中，找到 "Public access"
2. 启用 "Allow Access"
3. 设置自定义域名（可选）或使用默认的 R2.dev 域名
4. 如果使用自定义域名，在 `R2_PUBLIC_URL` 中填入你的域名

## 验证配置

配置完成后，运行以下命令验证：

```bash
node test-r2-config.js
```

如果配置正确，您应该看到：
- ✅ 所有环境变量都已设置
- ✅ R2 连接成功
- ✅ 目标存储桶存在

## 故障排除

### 常见问题

1. **环境变量未加载**
   - 确保文件名为 `.env.local`（不是 `.env`）
   - 确保文件在项目根目录
   - 重启开发服务器

2. **R2 连接失败**
   - 检查 API 密钥是否正确
   - 确认存储桶名称正确
   - 验证 Endpoint URL 格式

3. **权限错误**
   - 确保 API 密钥有正确的权限
   - 检查存储桶的公开访问设置

## 下一步

配置完成后，重启开发服务器：

```bash
npm run dev
```

然后测试图片生成功能，检查控制台日志确认图片是否成功上传到 R2。
