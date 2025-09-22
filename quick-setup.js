#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 AI Image Generator - 快速环境配置\n');

// 检查是否已存在 .env.local
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  console.log('✅ .env.local 文件已存在');
  console.log('📋 请确保以下环境变量已正确配置：');
  console.log('');
  console.log('必需的 Stripe 变量：');
  console.log('- STRIPE_SECRET_KEY');
  console.log('- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY');
  console.log('- STRIPE_PRICE_BASIC_ID');
  console.log('- STRIPE_PRICE_PRO_ID');
  console.log('');
  console.log('必需的 Supabase 变量：');
  console.log('- NEXT_PUBLIC_SUPABASE_URL');
  console.log('- NEXT_PUBLIC_SUPABASE_ANON_KEY');
  console.log('');
  console.log('可选变量：');
  console.log('- STRIPE_WEBHOOK_SECRET');
  console.log('- STRIPE_PRICE_BASIC_ANNUAL_ID');
  console.log('- STRIPE_PRICE_PRO_ANNUAL_ID');
  console.log('- NEXT_PUBLIC_APP_URL');
  console.log('');
  console.log('💡 如果缺少任何变量，请运行：');
  console.log('   node create-stripe-env.js  # 配置 Stripe');
  console.log('   node create-env.js         # 配置 Supabase');
  process.exit(0);
}

// 创建基础环境变量文件
const envContent = `# AI Image Generator 环境配置
# 请根据你的实际配置替换以下值

# Supabase 配置 (必需)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe 配置 (必需)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Stripe Price IDs (必需 - 在 Stripe Dashboard 中创建)
STRIPE_PRICE_BASIC_ID=price_your_basic_price_id
STRIPE_PRICE_PRO_ID=price_your_pro_price_id
STRIPE_PRICE_BASIC_ANNUAL_ID=price_your_basic_annual_price_id
STRIPE_PRICE_PRO_ANNUAL_ID=price_your_pro_annual_price_id

# App 配置
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Google OAuth 配置 (可选)
SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID=your-google-client-id
SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET=your-google-client-secret
`;

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local 文件已创建');
  console.log('');
  console.log('📋 接下来的步骤：');
  console.log('1. 编辑 .env.local 文件，填入你的实际配置值');
  console.log('2. 在 Supabase Dashboard 中执行数据库迁移');
  console.log('3. 在 Stripe Dashboard 中创建产品和价格');
  console.log('4. 运行 npm run dev 启动开发服务器');
  console.log('');
  console.log('💡 快速配置命令：');
  console.log('   node create-stripe-env.js  # 交互式配置 Stripe');
  console.log('   node create-env.js         # 交互式配置 Supabase');
  console.log('');
  console.log('📖 详细配置指南：');
  console.log('   - STRIPE_SETUP_GUIDE.md');
  console.log('   - SUPABASE_SETUP.md');
} catch (error) {
  console.error('❌ 创建 .env.local 文件失败:', error.message);
  process.exit(1);
}
