# 本地 Webhook 配置指南

## 方法一：使用 Stripe CLI（推荐）

### 1. 安装 Stripe CLI

**Windows 安装：**
1. 访问 [Stripe CLI GitHub Releases](https://github.com/stripe/stripe-cli/releases)
2. 下载 `stripe_X.X.X_windows_x86_64.zip`
3. 解压到 `C:\stripe\` 目录
4. 将 `C:\stripe\` 添加到系统 PATH 环境变量

**验证安装：**
```bash
stripe --version
```

### 2. 登录 Stripe CLI
```bash
stripe login
```
这会打开浏览器进行身份验证。

### 3. 启动本地 webhook 转发
```bash
stripe listen --forward-to localhost:3000/api/webhook
```

### 4. 复制 Webhook Secret
运行上述命令后，会显示类似以下内容：
```
> Ready! Your webhook signing secret is whsec_1234567890abcdef...
```
复制这个 `whsec_...` 密钥到 `.env.local` 文件中的 `STRIPE_WEBHOOK_SECRET`。

## 方法二：使用 ngrok（备选方案）

### 1. 安装 ngrok
1. 访问 [ngrok.com](https://ngrok.com)
2. 注册账户并下载 ngrok
3. 解压到任意目录

### 2. 启动 ngrok
```bash
ngrok http 3000
```

### 3. 获取公网 URL
ngrok 会显示类似：
```
Forwarding    https://abc123.ngrok.io -> http://localhost:3000
```

### 4. 在 Stripe Dashboard 配置 Webhook
1. 进入 [Stripe Dashboard](https://dashboard.stripe.com) > Developers > Webhooks
2. 点击 "Add endpoint"
3. 输入端点 URL: `https://abc123.ngrok.io/api/webhook`
4. 选择事件：
   - `invoice.paid`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. 复制 Signing secret 到 `.env.local`

## 方法三：使用本地测试（最简单）

### 1. 创建测试 webhook 端点
在 `app/api/webhook/route.ts` 中添加测试日志：

```typescript
export async function POST(request: Request) {
  const body = await request.text();
  console.log('Webhook received:', body);
  
  // 测试模式：直接返回成功
  if (process.env.NODE_ENV === 'development') {
    return Response.json({ received: true });
  }
  
  // 生产环境的实际 webhook 处理逻辑...
}
```

### 2. 使用 Stripe CLI 测试
```bash
stripe trigger invoice.paid
```

## 推荐的本地开发流程

1. **安装 Stripe CLI**
2. **启动开发服务器**：
   ```bash
   npm run dev
   ```
3. **在另一个终端启动 webhook 转发**：
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook
   ```
4. **复制 webhook secret 到 .env.local**
5. **测试支付流程**

## 测试 Webhook

### 使用 Stripe CLI 测试
```bash
# 测试发票支付事件
stripe trigger invoice.paid

# 测试订阅更新事件
stripe trigger customer.subscription.updated

# 测试订阅删除事件
stripe trigger customer.subscription.deleted
```

### 使用测试卡号
- 成功支付：`4242 4242 4242 4242`
- 需要验证：`4000 0025 0000 3155`
- 拒绝支付：`4000 0000 0000 0002`

## 环境变量配置

确保 `.env.local` 包含：
```env
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_from_stripe_cli
```

## 故障排除

1. **端口冲突**：确保 3000 端口未被占用
2. **防火墙**：确保本地防火墙允许连接
3. **SSL 证书**：本地开发使用 HTTP，生产环境需要 HTTPS
4. **事件类型**：确保选择了正确的事件类型
