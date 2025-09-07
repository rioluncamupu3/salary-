# Deploying to Vercel

This document provides instructions for deploying the Pocket Pocket application to Vercel.

## Prerequisites

- A [Vercel](https://vercel.com) account
- Git repository with your project (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### Option 1: Deploy from the Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Log in to your Vercel account
3. Click "Add New..." → "Project"
4. Import your Git repository
5. Configure your project:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
6. Click "Deploy"

### Option 2: Deploy using Vercel CLI

1. Install Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Log in to Vercel:
   ```
   vercel login
   ```

3. Navigate to your project directory and run:
   ```
   vercel
   ```

4. Follow the prompts to configure your project

5. For subsequent deployments, use:
   ```
   vercel --prod
   ```

## Configuration

The project includes a `vercel.json` file with the following configuration:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "github": {
    "silent": true
  }
}
```

This configuration ensures:

- All routes are handled by the SPA (Single Page Application)
- The correct build command is used
- The output directory is properly set
- Vercel recognizes the project as a Vite application

## Environment Variables

If your application requires environment variables, you can set them in the Vercel dashboard:

1. Go to your project in the Vercel dashboard
2. Navigate to "Settings" → "Environment Variables"
3. Add your environment variables

## Troubleshooting

- If you encounter build errors, check the build logs in the Vercel dashboard
- Ensure all dependencies are properly listed in your package.json
- Verify that your application works locally with `npm run build && npm run preview`

## Custom Domains

To add a custom domain to your Vercel deployment:

1. Go to your project in the Vercel dashboard
2. Navigate to "Settings" → "Domains"
3. Add your domain and follow the verification steps