# Cloudflare R2 配置指南

## 获取 R2 凭据

### 1. 访问 Cloudflare Dashboard
- 登录到 [Cloudflare Dashboard](https://dash.cloudflare.com/)
- 选择您的账户

### 2. 进入 R2 对象存储
- 在左侧菜单中点击 "R2 Object Storage"
- 点击 "Manage R2 API tokens"

### 3. 创建 API Token
- 点击 "Create API token"
- 填写以下信息：
  - **Token name**: `ai-image-app` (或您喜欢的名称)
  - **Permissions**: 选择 "Object Read & Write"
  - **Bucket**: 选择 "z-ai" 或 "All buckets"
- 点击 "Create API token"
- **重要**: 复制并保存 Access Key ID 和 Secret Access Key

### 4. 获取公开 URL
- 在 R2 页面中，点击您的 bucket "z-ai"
- 点击 "Settings" 标签
- 在 "Public access" 部分，点击 "Allow access"
- 复制 "Custom domain" 或 "R2.dev subdomain" 的 URL

### 5. 更新环境变量
将以下信息更新到 `.env.local` 文件中：

```env
# Cloudflare R2 配置
R2_ENDPOINT_URL=https://a86b7f2b20d627f1735a95fb923660d2.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=你的_Access_Key_ID
R2_SECRET_ACCESS_KEY=你的_Secret_Access_Key
R2_BUCKET_NAME=z-ai
R2_PUBLIC_URL=你的_公开_URL
```

## 示例配置

```env
# Cloudflare R2 配置
R2_ENDPOINT_URL=https://a86b7f2b20d627f1735a95fb923660d2.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=abc123def456ghi789
R2_SECRET_ACCESS_KEY=xyz789uvw456rst123
R2_BUCKET_NAME=z-ai
R2_PUBLIC_URL=https://pub-1234567890abcdef.r2.dev
```

## 功能说明

配置完成后，系统将：
1. 使用 Replicate 生成 AI 图片
2. 自动下载生成的图片
3. 上传到您的 Cloudflare R2 存储桶
4. 在输出区域显示 R2 的公开 URL

## 注意事项

- 确保 R2 bucket 已启用公开访问
- 定期检查 API token 的权限
- 监控存储使用量和费用
