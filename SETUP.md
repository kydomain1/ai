# AI Image Generator Setup Guide

## Environment Configuration

To use the AI image generation feature, you need to configure your Replicate API token.

### 1. Get Replicate API Token

1. Visit [Replicate.com](https://replicate.com/)
2. Sign up or log in to your account
3. Go to [Account Settings > API Tokens](https://replicate.com/account/api-tokens)
4. Create a new API token
5. Copy the token

### 2. Configure Environment Variables

Create a `.env.local` file in the project root and add your API token:

```env
# Replicate API Token
REPLICATE_API_TOKEN=r8_your_api_token_here

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Install Dependencies

Make sure all dependencies are installed:

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

### 5. Test the API

1. Navigate to `http://localhost:3000/tool`
2. Enter a prompt (e.g., "A beautiful sunset over mountains")
3. Select image count and size
4. Click "Generate Images"

## API Usage

The application uses the `black-forest-labs/flux-dev` model from Replicate, which supports:

- **Input**: Text prompts up to 500 characters
- **Output**: 1-4 high-quality images
- **Sizes**: Various aspect ratios (1:1, 3:2, 2:3, 16:9, 9:16)
- **Resolution**: Up to 1536x1024 pixels

## Troubleshooting

### Common Issues

1. **"API token not configured" error**
   - Make sure `.env.local` file exists
   - Check that `REPLICATE_API_TOKEN` is correctly set
   - Restart the development server after adding environment variables

2. **"Authentication failed" error**
   - Verify your API token is correct
   - Check if your Replicate account has sufficient credits

3. **"Quota exceeded" error**
   - Check your Replicate account usage and billing
   - Consider upgrading your plan if needed

4. **Network errors**
   - Check your internet connection
   - Verify Replicate service status

### Cost Information

- Each image generation consumes credits from your Replicate account
- Check [Replicate Pricing](https://replicate.com/pricing) for current rates
- Monitor your usage in the Replicate dashboard

## Development Notes

- The API route is located at `/app/api/generate-image/route.ts`
- Client-side logic is in `/app/lib/api-client.ts`
- Image generation is handled asynchronously with proper error handling
- Generated images are displayed in real-time in the output area
