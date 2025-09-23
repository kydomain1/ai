# 免费图片生成API设置指南

## 🆓 推荐的免费API选项

### 1. Hugging Face Inference API (推荐)

**优点：**
- 完全免费，无需信用卡
- 支持多种Stable Diffusion模型
- 每月有免费额度
- 稳定可靠

**设置步骤：**

1. 访问 [Hugging Face](https://huggingface.co/)
2. 注册免费账户
3. 前往 [Settings > Access Tokens](https://huggingface.co/settings/tokens)
4. 创建新的Access Token
5. 将token添加到 `.env.local` 文件：

```env
# 添加到 .env.local 文件
HUGGINGFACE_API_KEY=your_huggingface_token_here
```

**免费额度：**
- 每月30,000个字符的免费额度
- 足够个人和小型项目使用

### 2. Replicate API (备选)

**优点：**
- 提供免费试用额度
- 支持多种AI模型
- 按使用量付费

**设置步骤：**

1. 访问 [Replicate](https://replicate.com/)
2. 注册账户
3. 获取API token
4. 添加到环境变量：

```env
# 添加到 .env.local 文件
REPLICATE_API_TOKEN=your_replicate_token_here
```

### 3. Stability AI API (备选)

**优点：**
- 高质量的Stable Diffusion模型
- 有免费试用额度

**设置步骤：**

1. 访问 [Stability AI Platform](https://platform.stability.ai/)
2. 注册账户
3. 获取API key
4. 添加到环境变量：

```env
# 添加到 .env.local 文件
STABILITY_API_KEY=your_stability_key_here
```

## 🔧 当前实现

项目已经集成了Hugging Face API，具有以下特性：

- ✅ 自动回退机制：如果API失败，会使用本地图片
- ✅ 支持多张图片生成
- ✅ 支持多种图片尺寸
- ✅ 错误处理和日志记录

## 📝 使用方法

1. 获取Hugging Face API token
2. 添加到 `.env.local` 文件
3. 重启开发服务器
4. 在工具页面测试图片生成

## 🚀 立即开始

1. 访问 https://huggingface.co/settings/tokens
2. 创建新的Access Token
3. 复制token
4. 在项目根目录的 `.env.local` 文件中添加：
   ```
   
   你的tokbangen
   ```
5. 重启服务器：`npm run dev`

## 💡 提示

- 如果没有API token，系统会自动使用本地图片作为演示
- 建议先使用Hugging Face，因为它完全免费
- 可以根据需要切换到其他API提供商
