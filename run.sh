#!/bin/bash

# Local development script for Mira project
# Usage: ./run.sh [port]

set -e

# Default port
PORT=${1:-3000}

echo "🏠 Starting local development server..."
echo "📍 Port: $PORT"
echo "🌐 URL: http://localhost:$PORT"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if .env.local exists, create if not
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << EOF
# Local Environment Variables
NEXT_PUBLIC_APP_URL=http://localhost:$PORT
NEXT_PUBLIC_API_BASE_URL=http://localhost:$PORT/api
NODE_ENV=development
EOF
    echo "✅ Created .env.local with default values"
fi

# Start the development server
echo "🚀 Starting Next.js development server..."
npm run dev -- --port $PORT
