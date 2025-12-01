# Deploy to Vercel 🚀

Your AI Chat App is ready for deployment! Follow these steps to get it live on Vercel's free tier.

## Prerequisites

Before deploying, ensure you have:
- A GitHub account with your code pushed to a repository
- A Vercel account (sign up at [vercel.com](https://vercel.com))
- API keys for at least one AI provider (Groq recommended for free tier)

---

## Step 1: Push to GitHub

Ensure all your latest changes are committed and pushed:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push
```

---

## Step 2: Deploy on Vercel

### 2.1 Import Your Project

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Import your `ai-chat-app` repository from GitHub
4. Vercel will auto-detect it as a **Next.js** project

### 2.2 Configure Environment Variables

In the **"Configure Project"** screen, expand **"Environment Variables"** and add the following:

#### Required Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `GROQ_API_KEY` | `gsk_...` | Your Groq API key ([get one here](https://console.groq.com)) |
| `GROQ_MODEL` | `llama-3.3-70b-versatile` | The AI model to use |
| `NEXTAUTH_SECRET` | Generate with: `openssl rand -base64 32` | Secret for NextAuth authentication |
| `NEXT_PUBLIC_APP_URL` | `https://your-app.vercel.app` | Your Vercel app URL (update after first deploy) |

#### Optional: Alternative AI Providers

Choose one or configure multiple providers:

**Google Gemini:**
- `GEMINI_API_KEY` - Your Gemini API key
- `GEMINI_MODEL` - `gemini-2.5-flash`

**OpenRouter:**
- `OPENROUTER_API_KEY` - Your OpenRouter API key
- `OPENROUTER_MODEL` - `google/gemini-flash-1.5`
- `OPENROUTER_APP_NAME` - `AI Chat App`

**HuggingFace:**
- `HF_TOKEN` - Your HuggingFace token
- `HF_MODEL` - `google/gemma-2b-it`

### 2.3 Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (~2-3 minutes)
3. Vercel will provide you with a live URL (e.g., `https://ai-chat-app-xyz.vercel.app`)

---

## Step 3: Post-Deployment Configuration

### Update NEXT_PUBLIC_APP_URL

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Update `NEXT_PUBLIC_APP_URL` with your actual Vercel URL
4. Redeploy the project (Vercel → Deployments → three dots → Redeploy)

---

## Verification Checklist

After deployment, verify:

- ✅ App loads at your Vercel URL
- ✅ Chat interface is visible and responsive
- ✅ Send button is clickable (always enabled)
- ✅ Messages send successfully and AI responds
- ✅ UI renders correctly on mobile and desktop
- ✅ No console errors in browser DevTools

---

## Important Notes

### 🔄 In-Memory Storage
- The app uses **in-memory storage** (no database)
- Chat history **resets on server restarts**
- This is expected behavior for Vercel's serverless environment
- For persistent storage, consider adding a database (Supabase, MongoDB, etc.)

### 🔑 API Key Security
- **Never commit** `.env` or `.env.local` files to git
- Environment variables are safely stored in Vercel's dashboard
- Rotate API keys regularly for security

### 🌐 Public Access
- Anyone with your Vercel URL can use the app
- Monitor your API usage to avoid hitting rate limits
- Consider adding authentication for production use

### 📊 Rate Limits
- **Groq**: Generous free tier, but monitor usage
- **Gemini**: Check Google Cloud quotas
- **OpenRouter**: Pay-per-use model

---

## Troubleshooting

### Build Fails

**Error: Missing environment variables**
- Ensure all required variables are set in Vercel dashboard
- Check for typos in variable names

**Error: Build timeout**
- This is rare with Next.js apps
- Try redeploying or contact Vercel support

### Runtime Errors

**AI not responding**
- Verify API keys are correct in Vercel dashboard
- Check API provider status pages
- Review Vercel function logs (Vercel → Deployments → View Function Logs)

**UI not loading**
- Check browser console for errors
- Verify `NEXT_PUBLIC_APP_URL` is set correctly
- Clear browser cache and hard refresh

### Performance Issues

**Slow response times**
- Groq is typically very fast (~500ms)
- Check your API provider's status
- Consider upgrading to a paid tier for better performance

---

## Next Steps

🎉 **Congratulations!** Your AI chat app is now live!

**Recommended improvements:**
- Add user authentication (NextAuth is already configured)
- Integrate a database for persistent chat history
- Add rate limiting to prevent abuse
- Customize the UI with your branding
- Add analytics (Vercel Analytics, Google Analytics)
- Set up a custom domain

**Share your app:**
- Copy your Vercel URL and share it with friends
- Add it to your portfolio or resume
- Tweet about it and tag @vercel!

---

## Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Groq API**: [console.groq.com/docs](https://console.groq.com/docs)

Need help? Check the [GitHub Issues](https://github.com/SAHIL511-JJ/ai-integration/issues) or create a new one.
