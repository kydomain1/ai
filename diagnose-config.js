#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 AI Image Generator - 配置诊断工具\n');

// 检查环境变量文件
const envPath = path.join(process.cwd(), '.env.local');
let envExists = false;
let envContent = '';

if (fs.existsSync(envPath)) {
  envExists = true;
  envContent = fs.readFileSync(envPath, 'utf8');
  console.log('✅ .env.local 文件存在');
} else {
  console.log('❌ .env.local 文件不存在');
  console.log('💡 运行以下命令创建配置文件：');
  console.log('   node quick-setup.js');
  console.log('   node create-stripe-env.js');
  console.log('   node create-env.js');
  process.exit(1);
}

// 解析环境变量
const envVars = {};
const lines = envContent.split('\n');
lines.forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const [key, ...valueParts] = trimmed.split('=');
    if (key && valueParts.length > 0) {
      envVars[key] = valueParts.join('=');
    }
  }
});

console.log('\n📋 环境变量检查：\n');

// 必需的 Supabase 变量
const requiredSupabaseVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY'
];

console.log('🔵 Supabase 配置：');
requiredSupabaseVars.forEach(varName => {
  const value = envVars[varName];
  if (value && value !== `your_${varName.toLowerCase()}`) {
    console.log(`  ✅ ${varName}: ${value.substring(0, 20)}...`);
  } else {
    console.log(`  ❌ ${varName}: 未配置或使用默认值`);
  }
});

// 必需的 Stripe 变量
const requiredStripeVars = [
  'STRIPE_SECRET_KEY',
  'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
  'STRIPE_PRICE_BASIC_ID',
  'STRIPE_PRICE_PRO_ID'
];

console.log('\n💳 Stripe 配置：');
requiredStripeVars.forEach(varName => {
  const value = envVars[varName];
  if (value && value !== `your_${varName.toLowerCase()}`) {
    console.log(`  ✅ ${varName}: ${value.substring(0, 20)}...`);
  } else {
    console.log(`  ❌ ${varName}: 未配置或使用默认值`);
  }
});

// 可选变量
const optionalVars = [
  'STRIPE_WEBHOOK_SECRET',
  'STRIPE_PRICE_BASIC_ANNUAL_ID',
  'STRIPE_PRICE_PRO_ANNUAL_ID',
  'NEXT_PUBLIC_APP_URL',
  'SUPABASE_SERVICE_ROLE_KEY'
];

console.log('\n🔵 可选配置：');
optionalVars.forEach(varName => {
  const value = envVars[varName];
  if (value && value !== `your_${varName.toLowerCase()}`) {
    console.log(`  ✅ ${varName}: 已配置`);
  } else {
    console.log(`  ⚠️  ${varName}: 未配置 (可选)`);
  }
});

// 检查配置完整性
const missingRequired = [];
requiredSupabaseVars.concat(requiredStripeVars).forEach(varName => {
  const value = envVars[varName];
  if (!value || value === `your_${varName.toLowerCase()}`) {
    missingRequired.push(varName);
  }
});

console.log('\n📊 诊断结果：\n');

if (missingRequired.length === 0) {
  console.log('✅ 所有必需的环境变量都已正确配置！');
  console.log('🚀 你现在可以运行 npm run dev 启动应用');
} else {
  console.log('❌ 发现以下必需的环境变量未配置：');
  missingRequired.forEach(varName => {
    console.log(`   - ${varName}`);
  });
  console.log('\n💡 请编辑 .env.local 文件并填入正确的值');
  console.log('📖 配置指南：');
  console.log('   - STRIPE_SETUP_GUIDE.md');
  console.log('   - SUPABASE_SETUP.md');
}

console.log('\n🔧 快速修复命令：');
console.log('   node create-stripe-env.js  # 配置 Stripe');
console.log('   node create-env.js         # 配置 Supabase');
console.log('   node quick-setup.js        # 创建基础配置');
