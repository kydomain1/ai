#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Supabase 配置助手\n');

const questions = [
  {
    key: 'SUPABASE_URL',
    question: '请输入你的 Supabase 项目 URL (例如: https://your-project-ref.supabase.co): ',
    validate: (value) => value.includes('supabase.co')
  },
  {
    key: 'SUPABASE_ANON_KEY',
    question: '请输入你的 Supabase 匿名密钥: ',
    validate: (value) => value.length > 20
  },
  {
    key: 'GOOGLE_CLIENT_ID',
    question: '请输入你的 Google OAuth 客户端 ID (可选，稍后配置): ',
    validate: () => true,
    optional: true
  },
  {
    key: 'GOOGLE_CLIENT_SECRET',
    question: '请输入你的 Google OAuth 客户端密钥 (可选，稍后配置): ',
    validate: () => true,
    optional: true
  }
];

const answers = {};

function askQuestion(index) {
  if (index >= questions.length) {
    createEnvFile();
    return;
  }

  const question = questions[index];
  
  rl.question(question.question, (answer) => {
    if (answer.trim() === '' && question.optional) {
      answers[question.key] = '';
      askQuestion(index + 1);
      return;
    }

    if (answer.trim() === '' && !question.optional) {
      console.log('❌ 此字段为必填项，请重新输入\n');
      askQuestion(index);
      return;
    }

    if (!question.validate(answer.trim())) {
      console.log('❌ 输入格式不正确，请重新输入\n');
      askQuestion(index);
      return;
    }

    answers[question.key] = answer.trim();
    askQuestion(index + 1);
  });
}

function createEnvFile() {
  const envContent = `# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=${answers.SUPABASE_URL}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${answers.SUPABASE_ANON_KEY}

# Google OAuth 配置
SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID=${answers.GOOGLE_CLIENT_ID || 'your-google-client-id'}
SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET=${answers.GOOGLE_CLIENT_SECRET || 'your-google-client-secret'}
`;

  const envPath = path.join(process.cwd(), '.env.local');
  
  try {
    fs.writeFileSync(envPath, envContent);
    console.log('\n✅ .env.local 文件已创建成功！');
    console.log('\n📋 接下来的步骤：');
    console.log('1. 在 Supabase Dashboard 中执行数据库迁移 SQL');
    console.log('2. 配置 Google OAuth');
    console.log('3. 运行 npm run dev 启动开发服务器');
    console.log('\n📖 详细配置指南请查看: SUPABASE_CONFIG_GUIDE.md');
  } catch (error) {
    console.error('❌ 创建 .env.local 文件失败:', error.message);
  }

  rl.close();
}

// 开始配置
askQuestion(0);
