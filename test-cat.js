// 测试不同提示词的API
const http = require('http');

const postData = JSON.stringify({
  prompt: 'a cute cat sitting on a chair',
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

console.log('🧪 Testing Hugging Face API - Cat Image...');
console.log('📡 Sending request to:', `http://${options.hostname}:${options.port}${options.path}`);
console.log('📝 Request data:', postData);

const req = http.request(options, (res) => {
  console.log('📊 Response status code:', res.statusCode);
  
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
          // Check if using Hugging Face generated image or local fallback
          if (image.url.startsWith('http')) {
            console.log('  🌟 This is a Hugging Face generated image!');
          } else {
            console.log('  📁 This is a local fallback image');
          }
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
