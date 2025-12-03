# Script to add Google OAuth environment variables
# This will append the new variables to .env.local

$envFile = "c:\ai-chat-app\.env.local"

# New environment variables to add
$newVars = @"

# ===== GOOGLE OAUTH (Added for authentication) =====
GOOGLE_CLIENT_ID=1044865840144-qlcs29jf2ana63t4e9gsfo5onm676832.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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

# NextAuth Configuration
NEXTAUTH_SECRET=++nSTKTYrMOkCIWztspLR78R8iVPXIx46uX2OzWdA4w=
NEXTAUTH_URL=http://localhost:3000
"@

# Append to .env.local
Add-Content -Path $envFile -Value $newVars

Write-Host "✅ Environment variables added successfully!" -ForegroundColor Green
