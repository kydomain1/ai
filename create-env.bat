@echo off
echo # Supabase 配置 > .env.local
echo NEXT_PUBLIC_SUPABASE_URL=https://auuxaapaoquncipgswxb.supabase.co >> .env.local
echo NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1dXhhYXBhb3F1bmNpcGdzd3hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzMzIxMzksImV4cCI6MjA3MzkwODEzOX0.vjGYw9ly5fbmwzF-KR2FckQ_8ER2Qadz3hP5E32wCww >> .env.local
echo. >> .env.local
echo # Replicate API 配置 >> .env.local
echo REPLICATE_API_TOKEN=r8_RnVZsmRWAFK0U4xohytTHhXsJ3rewn63Blxyg >> .env.local
echo. >> .env.local
echo # 应用配置 >> .env.local
echo NEXT_PUBLIC_APP_URL=http://localhost:3000 >> .env.local
echo. >> .env.local
echo # Cloudflare R2 配置 >> .env.local
echo R2_ENDPOINT_URL=https://a86b7f2b20d627f1735a95fb923660d2.r2.cloudflarestorage.com >> .env.local
echo R2_ACCESS_KEY_ID=4fa67c0ad13984a139ebde686e2073cc >> .env.local
echo R2_SECRET_ACCESS_KEY=157f4a77a405e999852f9ca8e805d7a86db8408bb6fb7950c4b5cac163cae10f >> .env.local
echo R2_BUCKET_NAME=z-ai >> .env.local
echo. >> .env.local
echo HUGGINGFACE_API_KEY=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 >> .env.local
echo # Stripe Price IDs >> .env.local
echo STRIPE_PRICE_BASIC_ID=price_1S9zOmQBkbqoIMjENokJHAKV >> .env.local
echo STRIPE_PRICE_PRO_ID=price_1S9zRtQBkbqoIMjE9HHQhu5k >> .env.local
echo. >> .env.local
echo # Stripe 密钥配置 >> .env.local
echo STRIPE_SECRET_KEY=sk_test_51S9fG0QBkbqoIMjEexI7SUsKb8Zn7VzxyBqMTJekx8UQOfkRMJWYdcKmRrHSmPzIJ1x103azRK9kA4DvAfomgfC1009TkGxzHO >> .env.local
echo NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51S9fG0QBkbqoIMjE8qgacZwxiHNvdl6wmruTx5KXLNX9jC38HyCI7EfWD7giUTtMhtVYQoFcgJ9SsapLA7TYZQbe00tWV4BYd2 >> .env.local
echo STRIPE_WEBHOOK_SECRET=whsec_384697637135566f25f574c456d154965c8bbc16d71d1113179fbaefcf778e78 >> .env.local
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
