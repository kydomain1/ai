# Create .env.local file
$envContent = @"
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Replicate API Configuration
REPLICATE_API_TOKEN=your_replicate_api_token_here

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Cloudflare R2 Configuration
R2_ENDPOINT_URL=your_r2_endpoint_url_here
R2_ACCESS_KEY_ID=your_r2_access_key_id_here
R2_SECRET_ACCESS_KEY=your_r2_secret_access_key_here
R2_BUCKET_NAME=your_r2_bucket_name_here

# Hugging Face API Configuration
HUGGINGFACE_API_KEY=your_huggingface_api_key_here

# Stripe Price IDs
STRIPE_PRICE_BASIC_ID=your_stripe_basic_price_id_here
STRIPE_PRICE_PRO_ID=your_stripe_pro_price_id_here

# Stripe Secret Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here
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
