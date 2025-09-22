# Stripe 订阅支付设置指南

## 1. 环境变量配置

在 `.env.local` 文件中添加以下环境变量：

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Stripe Price IDs (在 Stripe Dashboard 中创建)
STRIPE_PRICE_BASIC_ID=price_your_basic_price_id
STRIPE_PRICE_PRO_ID=price_your_pro_price_id

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

## 2. Stripe Dashboard 设置

### 创建产品和价格

1. 登录 [Stripe Dashboard](https://dashboard.stripe.com)
2. 进入 Products 页面
3. 创建两个产品：

**Basic Plan:**
- 产品名称: "AI Image Generation - Basic"
- 价格: $14.99/月
- 计费周期: Monthly
- 复制 Price ID 到 `STRIPE_PRICE_BASIC_ID`

**Pro Plan:**
- 产品名称: "AI Image Generation - Pro"
- 价格: $29.99/月
- 计费周期: Monthly
- 复制 Price ID 到 `STRIPE_PRICE_PRO_ID`

### 设置 Webhook

1. 进入 Webhooks 页面
2. 添加端点: `https://yourdomain.com/api/webhook`
3. 选择事件:
   - `invoice.paid`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. 复制 Webhook Secret 到 `STRIPE_WEBHOOK_SECRET`

## 3. 数据库迁移

运行以下命令应用数据库迁移：

```bash
# 如果使用 Supabase CLI
supabase db push

# 或者手动执行 SQL 文件
# 1. supabase/migrations/20241220000002_create_subscriptions_table.sql
# 2. supabase/migrations/20241220000003_add_credits_function.sql
```

## 4. 测试流程

1. 启动开发服务器: `npm run dev`
2. 访问定价页面
3. 点击 "Choose Basic Plan" 或 "Choose Pro Plan"
4. 使用 Stripe 测试卡号: `4242 4242 4242 4242`
5. 完成支付后检查:
   - 用户积分是否更新
   - subscriptions 表是否创建记录

## 5. 测试卡号

- 成功支付: `4242 4242 4242 4242`
- 需要验证: `4000 0025 0000 3155`
- 拒绝支付: `4000 0000 0000 0002`

## 6. 生产环境部署

1. 更新环境变量为生产环境值
2. 在 Stripe Dashboard 中切换到 Live 模式
3. 更新 webhook 端点为生产域名
4. 确保 HTTPS 配置正确

## 7. 功能说明

- **订阅创建**: 用户选择计划后跳转到 Stripe Checkout
- **支付成功**: webhook 监听 `invoice.paid` 事件
- **积分更新**: 支付成功后自动添加对应积分
- **订阅管理**: 支持订阅状态更新和取消
- **错误处理**: 完整的错误提示和重试机制
