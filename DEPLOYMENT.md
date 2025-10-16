# Deployment Guide

This guide covers different deployment options for the Cline Next.js application.

## Prerequisites

Before deploying, ensure:
- Your code builds successfully: `npm run build`
- No linting errors: `npm run lint`
- All environment variables are configured
- Database (if any) is set up and accessible

## Deployment Options

### 1. Vercel (Recommended)

Vercel is the easiest and most optimized platform for Next.js applications.

#### Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

#### Deploy via Git Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Configure environment variables
5. Deploy

**Environment Variables on Vercel:**
- Go to Project Settings → Environment Variables
- Add your variables:
  - `NODE_ENV=production`
  - `API_VERSION=1.0.0`
  - Add any custom variables

### 2. Docker

Deploy using Docker containers.

#### Create Dockerfile

Already included in the project root:

```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
RUN npm ci --only=production

EXPOSE 3000
CMD ["npm", "start"]
```

#### Build and Run

```bash
# Build the image
docker build -t cline-app .

# Run the container
docker run -p 3000:3000 -e NODE_ENV=production cline-app

# Run with environment variables
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e API_VERSION=1.0.0 \
  cline-app
```

#### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - API_VERSION=1.0.0
    restart: unless-stopped
```

Run with Docker Compose:
```bash
docker-compose up -d
```

### 3. AWS

#### AWS Elastic Beanstalk

1. Install AWS EB CLI:
```bash
pip install awsebcli
```

2. Initialize and deploy:
```bash
eb init -p node.js cline-app
eb create cline-env
eb deploy
```

#### AWS ECS (Elastic Container Service)

1. Build and push Docker image to ECR
2. Create ECS cluster
3. Define task definition
4. Create service and deploy

### 4. Google Cloud Platform

#### Cloud Run

```bash
# Build and push to GCR
gcloud builds submit --tag gcr.io/PROJECT_ID/cline-app

# Deploy to Cloud Run
gcloud run deploy cline-app \
  --image gcr.io/PROJECT_ID/cline-app \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### 5. DigitalOcean

#### App Platform

1. Connect your GitHub repository
2. Configure build settings:
   - Build Command: `npm run build`
   - Run Command: `npm start`
3. Set environment variables
4. Deploy

#### Droplet (VPS)

```bash
# SSH into your droplet
ssh root@your-droplet-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and setup
git clone https://github.com/0x-m1cro/Cfork.git
cd Cfork
npm install
npm run build

# Install PM2 for process management
npm install -g pm2

# Start the application
pm2 start npm --name "cline-app" -- start

# Save PM2 configuration
pm2 save
pm2 startup
```

### 6. Netlify

While Netlify is optimized for static sites, you can deploy Next.js:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

**Note**: Netlify may have limitations with Next.js server features.

### 7. Railway

1. Go to [railway.app](https://railway.app)
2. Create new project from GitHub repo
3. Railway auto-detects Next.js
4. Set environment variables
5. Deploy

### 8. Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create cline-app

# Deploy
git push heroku main

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set API_VERSION=1.0.0
```

## Environment Variables

### Required Variables

```env
NODE_ENV=production
```

### Optional Variables

```env
API_VERSION=1.0.0
PORT=3000
```

### Setting Environment Variables

Different platforms have different methods:

**Vercel**: Project Settings → Environment Variables
**Docker**: Use `-e` flag or `docker-compose.yml`
**AWS**: Configuration in console or CLI
**Heroku**: `heroku config:set VAR_NAME=value`

## SSL/HTTPS

Most platforms (Vercel, Railway, Netlify) provide automatic SSL certificates.

For custom deployments:
- Use Let's Encrypt for free SSL certificates
- Configure Nginx as reverse proxy with SSL
- Use Cloudflare for SSL and CDN

## Custom Domain

1. Add custom domain in your platform's settings
2. Update DNS records:
   - **A Record**: Point to server IP
   - **CNAME**: Point to platform subdomain
3. Wait for DNS propagation (can take 24-48 hours)

## CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '20'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run linter
      run: npm run lint
      
    - name: Build
      run: npm run build
      
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## Monitoring and Logging

### Recommended Tools

- **Vercel Analytics**: Built-in for Vercel deployments
- **Sentry**: Error tracking and monitoring
- **LogRocket**: Session replay and monitoring
- **DataDog**: APM and infrastructure monitoring

### Basic Logging Setup

The application includes basic console logging. For production:

1. Use structured logging (e.g., Winston, Pino)
2. Send logs to centralized service (e.g., CloudWatch, Papertrail)
3. Set up alerts for critical errors

## Database Integration

For production, replace in-memory storage:

### Recommended Databases

- **PostgreSQL** with Prisma ORM
- **MongoDB** with Mongoose
- **Supabase** (PostgreSQL + Auth)
- **PlanetScale** (MySQL)
- **Firebase Firestore**

### Example with Prisma

```bash
npm install @prisma/client
npm install -D prisma

npx prisma init
```

## Performance Optimization

Before deploying:

1. Enable caching in `next.config.js`
2. Optimize images (use Next.js Image component)
3. Add CDN for static assets
4. Enable gzip compression
5. Monitor Core Web Vitals

## Security Checklist

- [ ] Remove console.logs in production
- [ ] Set secure environment variables
- [ ] Enable HTTPS/SSL
- [ ] Add rate limiting
- [ ] Implement authentication (if needed)
- [ ] Add CSRF protection
- [ ] Validate all inputs
- [ ] Keep dependencies updated

## Rollback Strategy

Always have a rollback plan:

1. Keep previous deployments accessible
2. Use feature flags for gradual rollouts
3. Monitor deployment metrics
4. Have automated health checks
5. Document rollback procedures

## Post-Deployment Checklist

- [ ] Verify application is accessible
- [ ] Test all API endpoints
- [ ] Check error logs
- [ ] Verify environment variables
- [ ] Test authentication (if applicable)
- [ ] Monitor performance metrics
- [ ] Set up alerts and monitoring

## Support

For deployment issues:
- Check platform-specific documentation
- Review deployment logs
- Test locally: `npm run build && npm start`
- Verify environment variables
- Check firewall and security group settings

---

Choose the deployment option that best fits your needs and scale. Vercel is recommended for most Next.js applications due to its optimization and ease of use.
