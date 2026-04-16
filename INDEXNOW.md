# IndexNow Integration Documentation

## Overview
IndexNow is automatically integrated into ADTL Africa's website to notify search engines of new or updated content instantly. This ensures faster indexing compared to traditional crawling methods.

## Configuration

### API Key
- **Key**: `8f0122d23de2402ebac56108da25a71d`
- **Location**: Hosted at `/public/8f0122d23de2402ebac56108da25a71d.txt`
- **Public URL**: `https://adtlafrica.org/8f0122d23de2402ebac56108da25a71d.txt`

### Environment Variables
Add to `.env.local`:
```
INDEXNOW_KEY=8f0122d23de2402ebac56108da25a71d
NEXT_PUBLIC_SITE_URL=https://adtlafrica.org
```

## Automatic Submissions

### Blog Posts
When a blog post is **published**, it is automatically submitted to IndexNow:
- **Trigger**: Blog post creation or update with `published: true`
- **URL Format**: `https://adtlafrica.org/blog/{slug}`
- **Handler**: `/api/blog/route.ts` (POST) and `/api/blog-post/[id]/route.ts` (PUT)

### Important Pages
All important pages are included in bulk submissions:
- Home page
- About
- Services
- Resources
- Our People
- Blog
- Partnership
- Career
- Contact

## Manual API Endpoints

### 1. Submit Individual URLs
**POST** `/api/indexnow`

Request body:
```json
{
  "urls": [
    "https://adtlafrica.org/blog/my-post",
    "https://adtlafrica.org/resources/guide-1"
  ]
}
```

Response (Success):
```json
{
  "success": true,
  "status": 200,
  "message": "Successfully submitted 2 URLs to IndexNow"
}
```

Rate limit: 1 request per minute per IP

### 2. Bulk Submit Important Pages
**GET** `/api/indexnow`

This endpoint submits all important sitemap URLs at once.

Response (Success):
```json
{
  "success": true,
  "status": 200,
  "message": "Successfully submitted 9 URLs to IndexNow"
}
```

Rate limit: 1 request per 5 minutes per IP

## Error Handling

| Status | Code | Meaning |
|--------|------|---------|
| 200 | Ok | URLs submitted successfully |
| 400 | Bad request | Invalid format or missing required fields |
| 403 | Forbidden | Key validation failed |
| 422 | Unprocessable Entity | URLs don't belong to host or key mismatch |
| 429 | Too Many Requests | Rate limit exceeded |
| 503 | Service Unavailable | IndexNow not configured |

## Logging

All IndexNow submissions are logged with:
- Submission status
- Number of URLs submitted
- Error details (if any)
- IP address (for rate limiting)

Check logs in: `/src/lib/server-logger.ts`

## Verification

To verify URLs are being received by search engines:
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Sign in and add/verify your domain
3. Check the IndexNow report to see submitted URLs

## Production Checklist

✅ API key generated and hosted at root
✅ Automatic submission on blog post publish
✅ Manual API endpoints available
✅ Rate limiting implemented
✅ Error handling and logging in place
✅ Environment variables configured
✅ No API credentials in code (uses env variables)
✅ HTTPS required for submissions
✅ Validation of all URLs before submission

## Code Structure

- **Core Service**: `/src/lib/indexnow.ts`
  - `submitToIndexNow()` - Submit URLs to IndexNow API
  - `submitSingleUrlToIndexNow()` - Submit single URL
  - `generateSitemapUrls()` - Generate important page URLs

- **API Routes**: `/src/app/api/indexnow/route.ts`
  - POST - Submit custom URLs
  - GET - Submit bulk important pages

- **Integrations**:
  - `/src/app/api/blog/route.ts` - Auto-submit on post creation
  - `/src/app/api/blog-post/[id]/route.ts` - Auto-submit on post update
  - `/src/lib/env.ts` - Configuration management

## Future Enhancements

1. Submit resource updates to IndexNow when resources are created/updated
2. Submit job listings when new careers are posted
3. Bulk submission of all blog posts when running heavy content updates
4. Dashboard widget showing recent IndexNow submissions
5. Webhook to notify on submission failures
