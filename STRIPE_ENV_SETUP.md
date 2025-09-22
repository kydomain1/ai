# Stripe 环境变量配置指南

## 快速配置

### 方法一：使用配置助手脚本

运行以下命令来交互式配置 Stripe 环境变量：

```bash
node create-stripe-env.js
```

### 方法二：手动配置

创建 `.env.local` 文件并添加以下环境变量：

```env
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe 配置
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Stripe Price IDs (在 Stripe Dashboard 中创建)
STRIPE_PRICE_BASIC_ID=price_your_basic_price_id
STRIPE_PRICE_PRO_ID=price_your_pro_price_id

# App 配置
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Google OAuth 配置 (可选)
SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID=your-google-client-id
SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET=your-google-client-secret
```

## 如何获取 Stripe 环境变量

### 1. Stripe Secret Key 和 Publishable Key

1. 登录 [Stripe Dashboard](https://dashboard.stripe.com)
2. 进入 **Developers** > **API keys**
3. 复制以下密钥：
   - **Secret key** (sk_test_...) → `STRIPE_SECRET_KEY`
   - **Publishable key** (pk_test_...) → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

### 2. 创建产品和价格

1. 进入 **Products** 页面
2. 创建两个产品：

**Basic Plan:**
- 产品名称: "AI Image Generation - Basic"
- 价格: $14.99/月
- 计费周期: Monthly
- 复制 Price ID → `STRIPE_PRICE_BASIC_ID`

**Pro Plan:**
- 产品名称: "AI Image Generation - Pro"
- 价格: $29.99/月
- 计费周期: Monthly
- 复制 Price ID → `STRIPE_PRICE_PRO_ID`

### 3. 设置 Webhook

1. 进入 **Developers** > **Webhooks**
2. 点击 **Add endpoint**
3. 输入端点 URL: `https://yourdomain.com/api/webhook`
4. 选择以下事件：
   - `invoice.paid`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. 复制 **Signing secret** (whsec_...) → `STRIPE_WEBHOOK_SECRET`

## 环境变量说明

| 变量名 | 说明 | 示例值 |
|--------|------|--------|
| `STRIPE_SECRET_KEY` | Stripe 私钥 | `sk_test_51...` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe 公钥 | `pk_test_51...` |
| `STRIPE_WEBHOOK_SECRET` | Webhook 签名密钥 | `whsec_...` |
| `STRIPE_PRICE_BASIC_ID` | Basic 计划价格 ID | `price_...` |
| `STRIPE_PRICE_PRO_ID` | Pro 计划价格 ID | `price_...` |
| `NEXT_PUBLIC_APP_URL` | 应用 URL | `http://localhost:3000` |

## 测试配置

配置完成后，运行以下命令测试：

```bash
npm run dev
```

访问定价页面，使用测试卡号 `4242 4242 4242 4242` 进行测试支付。

## 生产环境

部署到生产环境时，请确保：

1. 使用 Live 模式的 Stripe 密钥
2. 更新 `NEXT_PUBLIC_APP_URL` 为生产域名
3. 更新 Webhook 端点为生产 URL
4. 确保 HTTPS 配置正确
