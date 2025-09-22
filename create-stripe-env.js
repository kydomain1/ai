#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('💳 Stripe Dashboard 环境变量配置助手\n');

const questions = [
  {
    key: 'STRIPE_SECRET_KEY',
    question: '请输入你的 Stripe Secret Key (sk_test_...): ',
    validate: (value) => value.startsWith('sk_test_') || value.startsWith('sk_live_')
  },
  {
    key: 'STRIPE_PUBLISHABLE_KEY',
    question: '请输入你的 Stripe Publishable Key (pk_test_...): ',
    validate: (value) => value.startsWith('pk_test_') || value.startsWith('pk_live_')
  },
  {
    key: 'STRIPE_WEBHOOK_SECRET',
    question: '请输入你的 Stripe Webhook Secret (whsec_...): ',
    validate: (value) => value.startsWith('whsec_')
  },
  {
    key: 'STRIPE_PRICE_BASIC_ID',
    question: '请输入 Basic Plan 的 Price ID (price_...): ',
    validate: (value) => value.startsWith('price_')
  },
  {
    key: 'STRIPE_PRICE_PRO_ID',
    question: '请输入 Pro Plan 的 Price ID (price_...): ',
    validate: (value) => value.startsWith('price_')
  },
  {
    key: 'APP_URL',
    question: '请输入你的应用 URL (例如: http://localhost:3000): ',
    validate: (value) => value.startsWith('http'),
    default: 'http://localhost:3000'
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
    if (answer.trim() === '') {
      if (question.default) {
        answers[question.key] = question.default;
        askQuestion(index + 1);
        return;
      }
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
  // 检查是否已存在 .env.local 文件
  const envPath = path.join(process.cwd(), '.env.local');
  let existingContent = '';
  
  if (fs.existsSync(envPath)) {
    existingContent = fs.readFileSync(envPath, 'utf8');
  }

  // 创建新的环境变量内容
  const stripeEnvContent = `# Stripe 配置
STRIPE_SECRET_KEY=${answers.STRIPE_SECRET_KEY}
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${answers.STRIPE_PUBLISHABLE_KEY}
STRIPE_WEBHOOK_SECRET=${answers.STRIPE_WEBHOOK_SECRET}

# Stripe Price IDs
STRIPE_PRICE_BASIC_ID=${answers.STRIPE_PRICE_BASIC_ID}
STRIPE_PRICE_PRO_ID=${answers.STRIPE_PRICE_PRO_ID}

# App 配置
NEXT_PUBLIC_APP_URL=${answers.APP_URL}
`;

  // 如果已存在 .env.local，则合并内容
  let finalContent = existingContent;
  
  if (existingContent) {
    // 移除现有的 Stripe 相关配置
    const lines = existingContent.split('\n');
    const filteredLines = lines.filter(line => {
      return !line.startsWith('STRIPE_') && 
             !line.startsWith('NEXT_PUBLIC_STRIPE_') && 
             !line.startsWith('NEXT_PUBLIC_APP_URL') &&
             !line.trim().startsWith('# Stripe');
    });
    finalContent = filteredLines.join('\n') + '\n' + stripeEnvContent;
  } else {
    finalContent = stripeEnvContent;
  }

  try {
    fs.writeFileSync(envPath, finalContent);
    console.log('\n✅ .env.local 文件已更新成功！');
    console.log('\n📋 接下来的步骤：');
    console.log('1. 在 Stripe Dashboard 中创建产品和价格');
    console.log('2. 设置 Webhook 端点');
    console.log('3. 运行 npm run dev 启动开发服务器');
    console.log('4. 测试支付流程');
    console.log('\n📖 详细配置指南请查看: STRIPE_SETUP_GUIDE.md');
  } catch (error) {
    console.error('❌ 更新 .env.local 文件失败:', error.message);
  }

  rl.close();
}

// 开始配置
askQuestion(0);
