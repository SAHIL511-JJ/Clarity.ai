# Script to add Google OAuth environment variables
# This will append the new variables to .env.local

$envFile = "c:\ai-chat-app\.env.local"

# New environment variables to add
$newVars = @"

# ===== GOOGLE OAUTH (Added for authentication) =====
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET

# NextAuth Configuration
NEXTAUTH_SECRET=YOUR_NEXTAUTH_SECRET
NEXTAUTH_URL=http://localhost:3000
"@

# Append to .env.local
Add-Content -Path $envFile -Value $newVars

Write-Host "✅ Environment variables added successfully!" -ForegroundColor Green
