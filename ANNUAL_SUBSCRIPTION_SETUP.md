# 年度订阅功能设置指南

## 🔧 问题修复

年度订阅（annual）板块下的支付按钮没有反应的问题已经修复。主要修复内容：

### 1. **StripeCheckout 组件更新**
- 添加了 `isAnnual` 属性支持
- 修改 API 调用以传递年度订阅信息

### 2. **Pricing 组件更新**
- 传递 `isAnnual` 状态给 StripeCheckout 组件

### 3. **Stripe 配置更新**
- 重构 `PLAN_CONFIG` 以支持月度/年度订阅
- 添加年度订阅的价格 ID 配置

### 4. **API 路由更新**
- `create-subscription` API 支持年度订阅
- `verify-payment` API 正确处理年度订阅

### 5. **数据库更新**
- 添加 `billing_period` 字段到 subscriptions 表

## 🚀 环境变量配置

需要在 `.env.local` 文件中添加以下环境变量：

```bash
# 月度订阅价格 ID
STRIPE_PRICE_BASIC_MONTHLY_ID=price_xxxxx
STRIPE_PRICE_PRO_MONTHLY_ID=price_xxxxx

# 年度订阅价格 ID
STRIPE_PRICE_BASIC_ANNUAL_ID=price_xxxxx
STRIPE_PRICE_PRO_ANNUAL_ID=price_xxxxx
```

## 📋 Stripe 设置步骤

### 1. **创建年度订阅产品**
1. 登录 Stripe Dashboard
2. 进入 Products 页面
3. 为每个计划创建年度版本：
   - Basic Annual: $9.6/月 (年付 $115.2，节省 20%)
   - Pro Annual: $19.2/月 (年付 $230.4，节省 20%)

### 2. **获取价格 ID**
1. 创建产品后，复制价格 ID
2. 将价格 ID 添加到环境变量中

### 3. **测试年度订阅**
1. 启动开发服务器
2. 访问定价页面
3. 切换到 "Annual" 标签
4. 测试支付流程

## 🔍 功能验证

### 测试步骤：
1. **切换订阅周期**：在定价页面切换月度/年度
2. **检查价格显示**：年度订阅应显示 20% 折扣
3. **测试支付流程**：完成年度订阅支付
4. **验证数据库**：检查订阅记录中的 billing_period 字段

### 预期结果：
- ✅ 年度订阅按钮正常工作
- ✅ 价格正确显示（20% 折扣）
- ✅ 支付流程顺利完成
- ✅ 数据库正确记录年度订阅信息

## 🛠️ 数据库迁移

运行以下命令应用数据库迁移：

```bash
# 如果使用 Supabase CLI
supabase db push

# 或者直接在 Supabase Dashboard 中运行 SQL
```

## 📝 代码变更总结

### 修改的文件：
1. `app/components/StripeCheckout.tsx` - 添加年度订阅支持
2. `app/components/Pricing.tsx` - 传递年度订阅状态
3. `app/lib/stripe.ts` - 重构计划配置
4. `app/api/create-subscription/route.ts` - 支持年度订阅
5. `app/api/verify-payment/route.ts` - 处理年度订阅验证
6. `supabase/migrations/20241220000004_add_billing_period_to_subscriptions.sql` - 数据库迁移

### 新增功能：
- 年度订阅支持
- 20% 年度折扣
- 灵活的计费周期配置
- 完整的年度订阅支付流程

## ⚠️ 注意事项

1. **环境变量**：确保所有年度订阅的价格 ID 都已正确配置
2. **Stripe 产品**：确保在 Stripe 中创建了对应的年度订阅产品
3. **数据库迁移**：运行数据库迁移以添加 billing_period 字段
4. **测试**：在生产环境部署前充分测试年度订阅功能

现在年度订阅功能应该可以正常工作了！
