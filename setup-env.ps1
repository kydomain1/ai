# 创建 .env.local 文件
$envContent = @"
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=https://auuxaapaoquncipgswxb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1dXhhYXBhb3F1bmNpcGdzd3hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzMzIxMzksImV4cCI6MjA3MzkwODEzOX0.vjGYw9ly5fbmwzF-KR2FckQ_8ER2Qadz3hP5E32wCww

# Replicate API 配置
REPLICATE_API_TOKEN=r8_RnVZsmRWAFK0U4xohytTHhXsJ3rewn63Blxyg

# 应用配置
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Cloudflare R2 配置
R2_ENDPOINT_URL=https://a86b7f2b20d627f1735a95fb923660d2.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=4fa67c0ad13984a139ebde686e2073cc
R2_SECRET_ACCESS_KEY=157f4a77a405e999852f9ca8e805d7a86db8408bb6fb7950c4b5cac163cae10f
R2_BUCKET_NAME=z-ai

HUGGINGFACE_API_KEY=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
# Stripe Price IDs
STRIPE_PRICE_BASIC_ID=price_1S9zOmQBkbqoIMjENokJHAKV
STRIPE_PRICE_PRO_ID=price_1S9zRtQBkbqoIMjE9HHQhu5k

# Stripe 密钥配置
STRIPE_SECRET_KEY=sk_test_51S9fG0QBkbqoIMjEexI7SUsKb8Zn7VzxyBqMTJekx8UQOfkRMJWYdcKmRrHSmPzIJ1x103azRK9kA4DvAfomgfC1009TkGxzHO
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51S9fG0QBkbqoIMjE8qgacZwxiHNvdl6wmruTx5KXLNX9jC38HyCI7EfWD7giUTtMhtVYQoFcgJ9SsapLA7TYZQbe00tWV4BYd2
STRIPE_WEBHOOK_SECRET=whsec_384697637135566f25f574c456d154965c8bbc16d71d1113179fbaefcf778e78
"@

try {
    $envContent | Out-File -FilePath ".env.local" -Encoding UTF8
    Write-Host "✅ .env.local 文件创建成功！" -ForegroundColor Green
    Write-Host "📋 包含的配置：" -ForegroundColor Yellow
    Write-Host "- Supabase URL 和密钥" -ForegroundColor White
    Write-Host "- Replicate API" -ForegroundColor White
    Write-Host "- Cloudflare R2 存储" -ForegroundColor White
    Write-Host "- Stripe 支付配置" -ForegroundColor White
    Write-Host "- Hugging Face API" -ForegroundColor White
    Write-Host ""
    Write-Host "现在可以运行 npm run dev 启动开发服务器" -ForegroundColor Cyan
} catch {
    Write-Host "❌ 创建文件失败: $($_.Exception.Message)" -ForegroundColor Red
}
