# Deployment Guide - India Heritage Project

## Project Overview
This is a React-based educational web application featuring Indian heritage and cultural content. The project is deployed on **Vercel** with automated builds and deployments.

## Live Deployment
📱 **Production URL**: [https://indiaheritage.vercel.app](https://indiaheritage.vercel.app)

## Deployment Architecture

### Platform: Vercel
- **Framework**: React (Node.js)
- **Build Command**: `cd ject && npm install && npm run build`
- **Output Directory**: `ject/dist`
- **Node Version**: 18.x (automatically managed)

## Deployment Configuration

The deployment is configured via `vercel.json` with the following features:

1. **Build Optimization**
   - Automatic build from the `ject` subdirectory
   - Optimized output to `ject/dist`

2. **Performance**
   - Regional deployment to IAD1 (Northern Virginia)
   - Optimized for low-latency responses

3. **Rewrites & Routing**
   - API routes properly configured
   - SPA (Single Page Application) routing support
   - Fallback to `index.html` for client-side routing

## How Deployment Works

### Automatic Deployment

Every time you push changes to the `main` branch:

1. GitHub triggers Vercel webhook
2. Vercel clones the repository
3. Runs build command: `cd ject && npm install && npm run build`
4. Deploys to production automatically

### Manual Deployment

To manually redeploy:

```bash
# Using Vercel CLI (if installed)
vercel --prod
```

## Local Testing Before Deployment

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup & Run Locally

```bash
# Navigate to project directory
cd ject

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

### Testing the Build

```bash
# Build production version
cd ject && npm run build

# Test build locally (if available)
npm install -g serve
serve -s dist
```

## Project Structure

```
Example/
├── ject/                    # Main React application
│   ├── src/
│   │   ├── admin/          # Admin dashboard
│   │   ├── assets/         # Images and static assets
│   │   ├── components/     # Reusable React components
│   │   ├── context/        # React Context API files
│   │   ├── database/       # Database-related code
│   │   ├── frontend/       # Frontend pages
│   │   └── services/       # API services
│   ├── public/             # Public assets
│   ├── package.json        # Dependencies
│   └── index.html          # Entry point
├── vercel.json            # Vercel configuration
└── DEPLOYMENT.md          # This file
```

## Environment Variables

### Required Variables

Add these to Vercel Project Settings > Environment Variables:

```
REACT_APP_API_URL=<your-api-endpoint>
```

### Setting Env Variables in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Settings > Environment Variables
4. Add variables for Production, Preview, and Development

## Monitoring & Logs

### Access Deployment Logs

1. Visit [Vercel Dashboard](https://vercel.com/dashboard)
2. Select "Example" project
3. Go to "Deployments" tab
4. Click any deployment to see build logs

### Check Deployment Status

```
GitHub > Settings > Deployments
```

## Troubleshooting

### Build Failures

**Issue**: Build command fails

**Solutions**:
- Check `package.json` for correct scripts
- Verify all dependencies are listed
- Check for syntax errors in source code
- Review build logs in Vercel dashboard

### Performance Issues

- Analyze with Vercel Analytics
- Check Web Vitals metrics
- Optimize images in `public/` folder
- Consider code splitting

### 404 Errors on Refresh

**Issue**: Routes show 404 when refreshed

**Solution**: Already configured in `vercel.json` with SPA routing:
```json
"rewrites": [{
  "source": "/(.*)",
  "destination": "/index.html"
}]
```

## Performance Optimization Tips

1. **Image Optimization**
   - Use WebP format
   - Lazy load images
   - Compress before upload

2. **Code Splitting**
   - Use React.lazy() for routes
   - Split large bundles

3. **Caching**
   - Leverage browser caching
   - Set proper cache headers in vercel.json

## Rollback Procedure

If deployment has issues:

1. Go to Vercel Dashboard > Deployments
2. Find the previous stable deployment
3. Click the three dots (...)
4. Select "Promote to Production"

## Continuous Integration

### Current Setup
- Automatic builds on push to `main`
- Preview deployments for pull requests
- Production deployment after merge

### GitHub Actions (Optional Future Setup)

Consider adding GitHub Actions for:
- Automated testing
- Code quality checks
- Security scanning

## Security Considerations

- Never commit `.env` files
- Use Vercel secrets for sensitive data
- Keep dependencies updated
- Regular security audits

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **React Docs**: https://react.dev
- **Vercel CLI**: https://vercel.com/cli
- **GitHub Actions**: https://github.com/features/actions

## Quick Commands

```bash
# Clone repository
git clone https://github.com/SaiReddy31083/Example.git
cd Example

# Setup
cd ject
npm install

# Development
npm start

# Build
npm run build

# Deploy (with Vercel CLI)
vercel --prod
```

---

**Last Updated**: November 30, 2025
**Maintained By**: SaiReddy31083
