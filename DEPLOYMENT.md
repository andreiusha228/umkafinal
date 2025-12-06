# Deployment Guide for Umka

This guide will help you publish your Umka Next.js project online.

## Prerequisites

Before deploying, make sure you have:
- ✅ A GitHub account (recommended for easy deployment)
- ✅ An OpenAI API key (for the chat functionality)
- ✅ All your code committed to Git

---

## Option 1: Vercel (Recommended - Easiest)

Vercel is made by the creators of Next.js and offers the best experience.

### Steps:

1. **Push your code to GitHub**
   ```bash
   git init  # if not already initialized
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Sign up/Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account

3. **Import your project**
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

4. **Add Environment Variables**
   - In the project settings, go to "Environment Variables"
   - Add: `OPENAI_API_KEY` = your OpenAI API key
   - Make sure to add it for all environments (Production, Preview, Development)

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site will be live at `your-project-name.vercel.app`

### Benefits:
- ✅ Free tier available
- ✅ Automatic deployments on git push
- ✅ Custom domain support
- ✅ SSL certificates included
- ✅ Optimized for Next.js

---

## Option 2: Netlify

### Steps:

1. **Push to GitHub** (same as above)

2. **Sign up at Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub

3. **Deploy**
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repo
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Add environment variable: `OPENAI_API_KEY`

4. **Deploy**
   - Click "Deploy site"
   - Your site will be live at `random-name.netlify.app`

---

## Option 3: Railway

### Steps:

1. **Sign up at Railway**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create new project**
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository

3. **Configure**
   - Railway auto-detects Next.js
   - Add environment variable: `OPENAI_API_KEY`
   - Deploy automatically starts

---

## Option 4: Self-Hosting (VPS/Dedicated Server)

If you have a VPS (DigitalOcean, AWS EC2, etc.):

1. **Install Node.js and npm**
   ```bash
   # On Ubuntu/Debian
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Clone and build**
   ```bash
   git clone <your-repo-url>
   cd umka-nextjs
   npm install
   npm run build
   ```

3. **Set environment variable**
   ```bash
   export OPENAI_API_KEY="your-api-key"
   ```

4. **Run with PM2** (process manager)
   ```bash
   npm install -g pm2
   pm2 start npm --name "umka" -- start
   pm2 save
   pm2 startup
   ```

5. **Set up Nginx** (reverse proxy)
   - Configure Nginx to proxy requests to `localhost:3000`
   - Set up SSL with Let's Encrypt

---

## Environment Variables Required

Make sure to set these in your hosting platform:

- `OPENAI_API_KEY` - Your OpenAI API key (required for chat functionality)

---

## Before Deploying Checklist

- [ ] Test the build locally: `npm run build`
- [ ] Make sure `.env.local` is in `.gitignore` (it should be)
- [ ] Add `OPENAI_API_KEY` to your hosting platform's environment variables
- [ ] Test that the chat API works with your API key
- [ ] Commit and push all changes to GitHub

---

## Custom Domain

All platforms above support custom domains:
- **Vercel**: Project Settings → Domains → Add domain
- **Netlify**: Site Settings → Domain Management
- **Railway**: Settings → Domains

---

## Recommended: Vercel

For Next.js projects, **Vercel is the easiest and most optimized option**. It's free for personal projects and handles everything automatically.

---

## Need Help?

- Vercel Docs: https://nextjs.org/docs/deployment
- Vercel Support: https://vercel.com/support

