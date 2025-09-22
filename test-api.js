const fetch = require('node-fetch');

async function testAPI() {
  try {
    console.log('🧪 开始测试 Replicate API...');
    
    const response = await fetch('http://localhost:3004/api/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: 'a beautiful sunset over mountains, digital art',
        imageCount: 1,
        imageSize: '512x512'
      })
    });
    
    const data = await response.json();
    
    console.log('📊 API 响应状态:', response.status);
    console.log('📋 API 响应数据:');
    console.log(JSON.stringify(data, null, 2));
    
    if (data.success) {
      console.log('✅ API 测试成功！');
      console.log(`🎨 生成了 ${data.images.length} 张图片`);
      data.images.forEach((image, index) => {
        console.log(`  图片 ${index + 1}: ${image.url}`);
      });
    } else {
      console.log('❌ API 测试失败:', data.error);
    }
    
  } catch (error) {
    console.error('💥 测试过程中出现错误:', error.message);
  }
}

testAPI();
