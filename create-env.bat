@echo off
echo # Supabase Configuration > .env.local
echo NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here >> .env.local
echo NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here >> .env.local
echo. >> .env.local
echo # Replicate API Configuration >> .env.local
echo REPLICATE_API_TOKEN=your_replicate_api_token_here >> .env.local
echo. >> .env.local
echo # Application Configuration >> .env.local
echo NEXT_PUBLIC_APP_URL=http://localhost:3000 >> .env.local
echo. >> .env.local
echo # Cloudflare R2 Configuration >> .env.local
echo R2_ENDPOINT_URL=your_r2_endpoint_url_here >> .env.local
echo R2_ACCESS_KEY_ID=your_r2_access_key_id_here >> .env.local
echo R2_SECRET_ACCESS_KEY=your_r2_secret_access_key_here >> .env.local
echo R2_BUCKET_NAME=your_r2_bucket_name_here >> .env.local
echo. >> .env.local
echo # Hugging Face API Configuration >> .env.local
echo HUGGINGFACE_API_KEY=your_huggingface_api_key_here >> .env.local
echo # Stripe Price IDs >> .env.local
echo STRIPE_PRICE_BASIC_ID=your_stripe_basic_price_id_here >> .env.local
echo STRIPE_PRICE_PRO_ID=your_stripe_pro_price_id_here >> .env.local
echo. >> .env.local
echo # Stripe Secret Configuration >> .env.local
echo STRIPE_SECRET_KEY=your_stripe_secret_key_here >> .env.local
echo NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here >> .env.local
echo STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here >> .env.local
echo.
echo ✅ .env.local 文件创建成功！
echo 📋 包含的配置：
echo - Supabase URL 和密钥
echo - Replicate API
echo - Cloudflare R2 存储
echo - Stripe 支付配置
echo - Hugging Face API
echo.
echo 现在可以运行 npm run dev 启动开发服务器
pause
