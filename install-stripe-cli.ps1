# Stripe CLI 安装脚本
Write-Host "🚀 正在安装 Stripe CLI..." -ForegroundColor Green

# 创建 stripe 目录
$stripeDir = "C:\stripe"
if (!(Test-Path $stripeDir)) {
    New-Item -ItemType Directory -Path $stripeDir -Force
    Write-Host "✅ 创建目录: $stripeDir" -ForegroundColor Green
}

# 下载最新版本的 Stripe CLI
$downloadUrl = "https://github.com/stripe/stripe-cli/releases/latest/download/stripe_1.21.8_windows_x86_64.zip"
$zipFile = "$env:TEMP\stripe-cli.zip"

Write-Host "📥 正在下载 Stripe CLI..." -ForegroundColor Yellow
try {
    Invoke-WebRequest -Uri $downloadUrl -OutFile $zipFile -UseBasicParsing
    Write-Host "✅ 下载完成" -ForegroundColor Green
} catch {
    Write-Host "❌ 下载失败: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# 解压文件
Write-Host "📦 正在解压文件..." -ForegroundColor Yellow
try {
    Expand-Archive -Path $zipFile -DestinationPath $stripeDir -Force
    Write-Host "✅ 解压完成" -ForegroundColor Green
} catch {
    Write-Host "❌ 解压失败: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# 清理临时文件
Remove-Item $zipFile -Force

# 检查安装
$stripeExe = "$stripeDir\stripe.exe"
if (Test-Path $stripeExe) {
    Write-Host "✅ Stripe CLI 安装成功!" -ForegroundColor Green
    Write-Host "📍 安装位置: $stripeExe" -ForegroundColor Cyan
    
    # 添加到 PATH（需要管理员权限）
    Write-Host "🔧 正在添加到 PATH..." -ForegroundColor Yellow
    $currentPath = [Environment]::GetEnvironmentVariable("PATH", "User")
    if ($currentPath -notlike "*$stripeDir*") {
        [Environment]::SetEnvironmentVariable("PATH", "$currentPath;$stripeDir", "User")
        Write-Host "✅ 已添加到用户 PATH" -ForegroundColor Green
    } else {
        Write-Host "ℹ️  PATH 中已存在 Stripe CLI" -ForegroundColor Blue
    }
    
    # 测试安装
    Write-Host "🧪 测试安装..." -ForegroundColor Yellow
    & $stripeExe --version
    
    Write-Host "`n🎉 安装完成！" -ForegroundColor Green
    Write-Host "📋 接下来的步骤：" -ForegroundColor Cyan
    Write-Host "1. 重新启动 PowerShell 或命令提示符" -ForegroundColor White
    Write-Host "2. 运行: stripe login" -ForegroundColor White
    Write-Host "3. 运行: stripe listen --forward-to localhost:3002/api/webhook" -ForegroundColor White
    
} else {
    Write-Host "❌ 安装失败，找不到 stripe.exe" -ForegroundColor Red
    exit 1
}
