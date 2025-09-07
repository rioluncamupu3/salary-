# Deploying Pocket Pocket to Vercel

## Quick Start Guide

Follow these steps to deploy your Pocket Pocket application to Vercel:

### 1. Push your code to GitHub

If your code is not already on GitHub, create a repository and push your code:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/pocket-pocket.git
git push -u origin main
```

### 2. Connect to Vercel

1. Go to [Vercel](https://vercel.com) and sign up or log in
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure your project:
   - Framework Preset: Vite
   - Build Command: `npm run build` (should be auto-detected)
   - Output Directory: `dist` (should be auto-detected)
   - Root Directory: `pocket-pocket-main` (if your code is in this subdirectory)
5. Click "Deploy"

### 3. Access Your Deployed Application

Once the deployment is complete, Vercel will provide you with a URL to access your application (e.g., `https://pocket-pocket.vercel.app`).

## Project Configuration

This project includes a `vercel.json` file with the following configuration:

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

- All routes are properly handled by the React Router
- The correct build command is used
- The output directory is properly set

## Troubleshooting

### Build Errors

If you encounter build errors during deployment:

1. Check the build logs in the Vercel dashboard
2. Ensure all dependencies are properly listed in your package.json
3. Verify that your application works locally with `npm run build && npm run preview`

### Custom Domain

To add a custom domain to your Vercel deployment:

1. Go to your project in the Vercel dashboard
2. Navigate to "Settings" → "Domains"
3. Add your domain and follow the verification steps

## Data Persistence

This application uses localStorage for data persistence. This means:

- Data is stored in the user's browser
- Data will persist between sessions for the same user on the same device
- Data is not shared between different devices or browsers
- Clearing browser data will remove all stored information

If you need more robust data persistence, consider implementing a backend database solution.