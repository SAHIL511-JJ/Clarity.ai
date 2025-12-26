# AI Chat App

A premium glass-themed AI chat application built with Next.js 16, featuring modern UI/UX and powered by AI models. This application provides a sleek, responsive interface for AI-powered conversations with authentication and user management.

## ✨ Features

- 🗨️ Real-time AI chat interface with smooth interactions and premium glass-themed UI
- 🎨 Enhanced messaging layout with dedicated `ChatWindow` and `ChatInput` components
- 🎨 Glassmorphism design with elegant visual effects
- 🔐 Authentication powered by Supabase
- 💬 Conversation history management
- 📱 Responsive design for all devices
- ⚡ Fast and optimized performance with Next.js 16
- 🔧 Modern architecture with TypeScript
- 🎯 Clean, user-friendly interface

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Authentication**: [Supabase](https://supabase.io/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **AI Integration**: DeepSeek API (configured via environment variables)
- **Database**: [Prisma ORM](https://www.prisma.io/) with Supabase
- **UI Components**: Custom React components with Framer Motion animations

## 🚀 Quick Start on Windows

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.17.0 or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

### Installation on Windows

1. **Clone the repository** (if you haven't already):
   ```cmd
   git clone <repository-url>
   cd ai-chat-app
   ```

2. **Install dependencies**:
   ```cmd
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**:
   
   Create a `.env.local` file in the root directory and add the following:
   ```env
   # Supabase configuration (already points to the shared project)
   NEXT_PUBLIC_SUPABASE_URL=https://vaimtycswihebffxhvul.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=USE_OWNER_PROVIDED_ANON_KEY
   SUPABASE_SERVICE_ROLE_KEY=USE_OWNER_PROVIDED_SERVICE_ROLE_KEY

   # OpenRouter configuration (replace the key with your own)
   OPENROUTER_API_KEY=REPLACE_WITH_YOUR_OPENROUTER_KEY
   OPENROUTER_MODEL=deepseek/deepseek-r1:latest
   OPENROUTER_APP_NAME=AI Chat App
   NEXT_PUBLIC_APP_URL=http://localhost:3000

   # Database URL (if using a separate database)
   DATABASE_URL=your_database_url

   # NextAuth configuration (if using NextAuth)
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   ```

4. **Set up database** (if using Prisma):
   ```cmd
   npx prisma db push
   # or to generate and apply migrations
   npx prisma migrate dev
   ```

5. **Run the development server**:
   ```cmd
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration for Windows

### Installing Dependencies
On Windows, you might encounter some issues with native dependencies. If you face installation problems:

1. For bcrypt (used for password hashing), you might need to install build tools:
   ```cmd
   npm install --global windows-build-tools
   # or install Visual Studio Build Tools manually
   ```

2. If you encounter issues with Prisma on Windows:
   ```cmd
   npx prisma generate
   npx prisma db push
   ```

### Environment Variables Setup on Windows
You can set environment variables in Windows using one of these methods:

**Method 1: Using Command Prompt**
```cmd
set NEXT_PUBLIC_SUPABASE_URL=your_value
npm run dev
```

**Method 2: Using PowerShell**
```powershell
$env:NEXT_PUBLIC_SUPABASE_URL="your_value"
npm run dev
```

**Method 3: Using .env.local file** (Recommended - create this file in the root folder)
```
NEXT_PUBLIC_SUPABASE_URL=https://vaimtycswihebffxhvul.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=USE_OWNER_PROVIDED_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=USE_OWNER_PROVIDED_SERVICE_ROLE_KEY
OPENROUTER_API_KEY=REPLACE_WITH_YOUR_OPENROUTER_KEY
OPENROUTER_MODEL=deepseek/deepseek-r1:latest
OPENROUTER_APP_NAME=AI Chat App
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL=your_database_url
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

## 📁 Project Structure

```
ai-chat-app/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── chat/              # Chat interface
│   │   ├── components/    # Chat-specific components
│   │   └── [id]/          # Dynamic chat routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable React components
│   ├── ui/                # UI-specific components
│   ├── ThemeProvider.tsx  # Theme context provider
│   └── Loader.tsx         # Loading component
├── lib/                   # Utility functions and libraries
├── public/                # Static assets
├── styles/                # Global styles
├── prisma/                # Database schema and migrations
├── next.config.ts         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── package.json           # Dependencies and scripts
```

## 🧪 Available Scripts

### Development
```bash
npm run dev
```
Starts the development server on [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm run build
```
Builds the application for production deployment

### Production Server
```bash
npm run start
```
Starts the production server after building the application

### Linting
```bash
npm run lint
```
Checks for code style issues and potential bugs

## 🤖 AI Integration

The application is configured to work with AI models (currently set up for DeepSeek). To customize the AI provider:

1. Update the API endpoint in the chat components
2. Modify the environment variables with your AI provider's API key
3. Adjust the request/response handling in the API routes

## 🔐 Authentication

The application uses Supabase for authentication. Features include:

- User registration and login
- Session management
- Protected routes
- User profile management

## 💾 Database

The application uses Prisma ORM with Supabase PostgreSQL database. To manage your database:

```bash
# Generate Prisma client
npx prisma generate

# Create a new migration
npx prisma migrate dev

# Push schema changes to database (without creating migration)
npx prisma db push

# Open Prisma Studio to view data
npx prisma studio
```

## 🎨 Styling

The application uses Tailwind CSS with custom glass-themed components. The glass effect is achieved through:

- Backdrop filters for blur effects
- Translucent backgrounds
- Careful layering for depth
- Modern color palette

## 🚀 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SAHIL511-JJ/ai-integration)

The easiest way to deploy this application is through [Vercel](https://vercel.com). See our comprehensive [Vercel Deployment Guide](VERCEL_DEPLOY.md) for step-by-step instructions.

**Quick Steps:**
1. Push your code to GitHub
2. Import your repository on Vercel
3. Add environment variables (see [.env.example](.env.example))
4. Deploy!

**Required Environment Variables for Vercel:**
- `GROQ_API_KEY` - Your Groq API key
- `GROQ_MODEL` - AI model (e.g., `llama-3.3-70b-versatile`)
- `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
- `NEXT_PUBLIC_APP_URL` - Your Vercel app URL

For detailed deployment instructions, troubleshooting, and post-deployment configuration, see [VERCEL_DEPLOY.md](VERCEL_DEPLOY.md).

### Other Platforms
This application can also be deployed on platforms that support Next.js 16:

- Netlify
- AWS
- Google Cloud
- Azure
- Docker containers

## 🐛 Troubleshooting (Windows-specific)

### Common Issues and Solutions

1. **Node-gyp build errors**
   - Install Windows Build Tools: `npm install --global windows-build-tools`
   - Or install Visual Studio Build Tools manually

2. **Permission errors with Prisma**
   - Run PowerShell as Administrator
   - Use `npx prisma generate --schema=prisma/schema.prisma`

3. **Environment variables not being recognized**
   - Ensure your `.env.local` file is in the correct location (root of project)
   - Restart your development server after adding environment variables

4. **Port already in use**
   - Use a different port: `npm run dev -- -p 3001`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter issues or have questions:

1. Check the [Issues](https://github.com/your-username/ai-chat-app/issues) page
2. Create a new issue with detailed information about your problem
3. Include your environment details (OS, Node.js version, etc.)
4. Provide steps to reproduce the issue

## 👨‍💻 Author

Sahil Lamture - [Your GitHub Profile](https://github.com/SAHIL511-JJ)

## ⭐ Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Authenticated with [Supabase](https://supabase.io/)
- Powered by [DeepSeek API](https://www.deepseek.com/)