// 简单的API测试脚本
const http = require('http');

const postData = JSON.stringify({
  prompt: 'a beautiful sunset over mountains, digital art',
  imageCount: 1,
  imageSize: '512x512'
});

const options = {
  hostname: 'localhost',
  port: 3004,
  path: '/api/generate-image',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('🧪 Starting Replicate API test...');
console.log('📡 Sending request to:', `http://${options.hostname}:${options.port}${options.path}`);
console.log('📝 Request data:', postData);

const req = http.request(options, (res) => {
  console.log('📊 Response status code:', res.statusCode);
  console.log('📋 Response headers:', res.headers);
  
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('📄 Response data:');
    try {
      const jsonData = JSON.parse(data);
      console.log(JSON.stringify(jsonData, null, 2));
      
      if (jsonData.success) {
        console.log('✅ API test successful!');
        console.log(`🎨 Generated ${jsonData.images.length} images`);
        jsonData.images.forEach((image, index) => {
          console.log(`  Image ${index + 1}: ${image.url}`);
        });
      } else {
        console.log('❌ API test failed:', jsonData.error);
      }
    } catch (error) {
      console.log('❌ Failed to parse response data:', error.message);
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('💥 Request failed:', error.message);
});

req.write(postData);
req.end();
