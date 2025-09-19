# 🔑 Replicate API Token 设置指南

## 第一步：获取Replicate API Token

### 1. 访问Replicate网站
打开浏览器，访问：https://replicate.com/

### 2. 注册或登录账户
- 如果没有账户，点击"Sign up"注册
- 如果已有账户，点击"Sign in"登录

### 3. 获取API Token
1. 登录后，点击右上角的头像
2. 选择"Account settings"
3. 在左侧菜单中点击"API tokens"
4. 点击"Create token"按钮
5. 复制生成的API token（格式类似：`r8_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`）

## 第二步：配置环境变量

### 1. 打开.env.local文件
在项目根目录下已经创建了`.env.local`文件，用文本编辑器打开它。

### 2. 替换API Token
将文件中的：
```
REPLICATE_API_TOKEN=your_replicate_api_token_here
```

替换为你的真实token：
```
REPLICATE_API_TOKEN=r8_你的真实token
```

### 3. 保存文件
保存`.env.local`文件。

## 第三步：重启开发服务器

### 1. 停止当前服务器
在终端中按 `Ctrl+C` 停止当前运行的开发服务器。

### 2. 重新启动
运行以下命令重启服务器：
```bash
npm run dev
```

## 第四步：测试API连接

### 1. 访问工具页面
打开浏览器，访问：http://localhost:3002/tool

### 2. 使用调试工具
- 点击"Test Connection"按钮测试基本连接
- 点击"Test Full Flow"按钮测试完整流程

### 3. 测试图片生成
1. 在Prompt框中输入：`A beautiful sunset over mountains`
2. 选择图片数量：1
3. 选择图片尺寸：512×512 (1:1)
4. 点击"Generate Images"按钮

## 常见问题解决

### ❌ "API token not configured"
- 检查`.env.local`文件是否存在
- 确认API token格式正确（以`r8_`开头）
- 重启开发服务器

### ❌ "Authentication failed"
- 确认API token是否复制完整
- 检查token是否有效（可能已过期）
- 在Replicate网站重新生成token

### ❌ "Quota exceeded"
- 检查Replicate账户余额
- 查看使用配额限制
- 考虑升级账户计划

## 成本信息

- Replicate按使用量计费
- flux-dev模型大约每张图片 $0.003-0.012
- 建议先小量测试
- 可在Replicate dashboard查看使用情况

## 安全提醒

⚠️ **重要**：
- 不要将`.env.local`文件提交到Git仓库
- 不要在代码中硬编码API token
- 不要分享你的API token给他人

## 完成设置后

设置完成后，你就可以：
✅ 生成AI图片
✅ 选择不同尺寸和数量
✅ 下载生成的图片
✅ 查看生成历史
