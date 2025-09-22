# 故障排除指南

## 内部服务器错误 (Internal Server Error)

### 问题描述
在尝试进行 Stripe 结账时出现 "Internal server error" 错误。

### 常见原因和解决方案

#### 1. 环境变量未配置

**症状：** 控制台显示 "STRIPE_SECRET_KEY is not defined" 或类似错误

**解决方案：**
```bash
# 快速诊断配置问题
npm run diagnose

# 创建基础配置文件
npm run quick-setup

# 交互式配置 Stripe
npm run config-stripe

# 交互式配置 Supabase
npm run config-env
```

#### 2. Stripe 价格 ID 配置错误

**症状：** 错误信息提到 "Invalid price ID" 或 "Price not found"

**解决方案：**
1. 登录 [Stripe Dashboard](https://dashboard.stripe.com)
2. 进入 **Products** 页面
3. 创建或检查你的产品和价格
4. 确保 `.env.local` 中的价格 ID 正确：
   ```env
   STRIPE_PRICE_BASIC_ID=price_xxxxx
   STRIPE_PRICE_PRO_ID=price_xxxxx
   ```

#### 3. Supabase 认证问题

**症状：** 错误信息提到 "Authentication failed" 或 "User not authenticated"

**解决方案：**
1. 检查 Supabase 项目配置
2. 确保用户已正确登录
3. 验证 Supabase 环境变量：
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

#### 4. 数据库表不存在

**症状：** 错误信息提到 "relation does not exist" 或 "table not found"

**解决方案：**
1. 在 Supabase Dashboard 中执行数据库迁移
2. 运行迁移脚本：
   ```bash
   npm run setup-supabase
   ```

### 调试步骤

#### 步骤 1：检查环境配置
```bash
npm run diagnose
```

#### 步骤 2：查看详细错误信息
1. 打开浏览器开发者工具
2. 查看 Console 标签页
3. 查看 Network 标签页中的 API 请求
4. 检查服务器控制台输出

#### 步骤 3：测试 Stripe 连接
```bash
# 在项目根目录创建测试文件
node -e "
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
stripe.prices.list({limit: 1}).then(console.log).catch(console.error);
"
```

#### 步骤 4：测试 Supabase 连接
```bash
# 在项目根目录创建测试文件
node -e "
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
supabase.from('users').select('count').then(console.log).catch(console.error);
"
```

### 环境变量检查清单

确保以下环境变量已正确配置：

#### 必需的 Stripe 变量
- [ ] `STRIPE_SECRET_KEY` (sk_test_...)
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (pk_test_...)
- [ ] `STRIPE_PRICE_BASIC_ID` (price_...)
- [ ] `STRIPE_PRICE_PRO_ID` (price_...)

#### 必需的 Supabase 变量
- [ ] `NEXT_PUBLIC_SUPABASE_URL` (https://...supabase.co)
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` (eyJ...)

#### 可选变量
- [ ] `STRIPE_WEBHOOK_SECRET` (whsec_...)
- [ ] `STRIPE_PRICE_BASIC_ANNUAL_ID` (price_...)
- [ ] `STRIPE_PRICE_PRO_ANNUAL_ID` (price_...)
- [ ] `NEXT_PUBLIC_APP_URL` (http://localhost:3000)

### 常见错误代码

| 错误代码 | 含义 | 解决方案 |
|---------|------|----------|
| 401 | 未授权 | 检查用户登录状态和 Supabase 配置 |
| 400 | 请求错误 | 检查请求参数和价格 ID |
| 500 | 服务器错误 | 检查环境变量和数据库连接 |
| STRIPE_ERROR | Stripe API 错误 | 检查 Stripe 密钥和价格配置 |

### 获取帮助

如果问题仍然存在：

1. 运行诊断工具：`npm run diagnose`
2. 检查控制台错误信息
3. 查看服务器日志
4. 确认所有环境变量已正确配置
5. 验证 Stripe 和 Supabase 账户状态

### 相关文档

- [Stripe 设置指南](STRIPE_SETUP_GUIDE.md)
- [Supabase 设置指南](SUPABASE_SETUP.md)
- [环境变量配置](STRIPE_ENV_SETUP.md)
