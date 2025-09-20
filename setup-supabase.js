#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 开始设置 Supabase 认证系统...\n');

// 检查是否存在 .env.local 文件
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('📝 创建 .env.local 文件...');
  const envContent = `# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google OAuth 配置 (在 Supabase Dashboard 中配置)
SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID=your_google_client_id
SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET=your_google_client_secret
`;
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local 文件已创建');
} else {
  console.log('⚠️  .env.local 文件已存在，请手动添加 Supabase 配置');
}

console.log('\n📋 接下来的步骤：');
console.log('1. 安装依赖: npm install');
console.log('2. 在 Supabase Dashboard 中创建项目');
console.log('3. 更新 .env.local 文件中的 Supabase URL 和密钥');
console.log('4. 在 Supabase Dashboard 中启用 Google OAuth');
console.log('5. 在 Google Cloud Console 中配置 OAuth 客户端');
console.log('6. 运行数据库迁移: supabase db push');
console.log('7. 启动开发服务器: npm run dev');

console.log('\n🎉 设置完成！');
