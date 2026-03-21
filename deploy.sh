#!/bin/bash

# Deployment script for Mira project
# Usage: ./deploy.sh [commit-message]

set -e

echo "🚀 Starting deployment process..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git not initialized. Initializing..."
    git init
    git remote add origin https://github.com/rajapandey/mira.git
fi

# Get commit message or use default
COMMIT_MESSAGE=${1:-"Auto deploy $(date '+%Y-%m-%d %H:%M:%S')"}

echo "📝 Commit message: $COMMIT_MESSAGE"

# Stage all changes
echo "📋 Staging changes..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "ℹ️  No changes to commit. Skipping..."
else
    # Commit changes
    echo "💾 Committing changes..."
    git commit -m "$COMMIT_MESSAGE"
    
    # Push to GitHub
    echo "📤 Pushing to GitHub..."
    git push origin main
fi

# Build the project
echo "🔨 Building project..."
npm run build

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment completed successfully!"
echo "🔗 Check your Vercel dashboard for the deployment URL"
