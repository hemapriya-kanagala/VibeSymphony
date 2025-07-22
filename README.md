# 🎵 VibeSymphony: Find Music That Actually Gets You

> *"You know that feeling when you just can't find the right music? We built this for that."*

VibeSymphony is an AI-powered web application that understands your complex emotions and finds Spotify playlists that actually match your vibe. No categories, no checkboxes – just describe how you're feeling in your own words.

## 🌟 Why This Exists

Sometimes you're feeling "tired but hopeful" or "anxiously excited about tomorrow" – those complex, in-between emotions that don't fit into simple categories. Regular music apps just don't get these nuanced feelings that make you... well, you.

We built this because we were tired of spending forever scrolling through Spotify, trying to find something that matched our exact mood. Your feelings are complex, and your music should understand that.

## ✨ Features

### 🧠 **Smart Mood Understanding**
- **Natural conversation**: Just type how you're feeling – "overwhelmed but trying to stay positive"
- **Complex emotions**: Understands mixed feelings and subtle emotional states
- **Real understanding**: Reads between the lines like a friend who really listens
- **No categories**: Your feelings don't fit in boxes, so we don't use them

### 🎼 **Perfect Playlist Matching**
- **AI-powered discovery**: Uses Google's Gemini AI to understand your mood
- **Spotify integration**: Searches through millions of real playlists
- **Actual matches**: Not just close – that "how did they know?" kind of perfect
- **Safe content**: Family-friendly playlists that match your vibe

### 💾 **Personal Music Journal**
- **Save discoveries**: Keep track of your favorite mood-music combinations
- **Your journey**: See how your musical tastes evolve with your feelings
- **Private & secure**: Only you can see your saved vibes
- **No judgment**: A safe space for all your moods

### 🎨 **Feels Good to Use**
- **Works everywhere**: Looks great on your phone, tablet, or computer
- **Smooth interactions**: Animations that feel natural and responsive
- **Easy to use**: Designed so anyone can find their perfect playlist
- **Beautiful design**: Clean, modern interface that doesn't get in the way

## 🏗️ Architecture & Technology Stack

### **Frontend**
- **React 18** with TypeScript for type-safe, modern UI development
- **Vite** for lightning-fast development and optimized builds
- **Tailwind CSS** for utility-first styling and responsive design
- **Framer Motion** for smooth, engaging animations
- **Lucide React** for beautiful, consistent iconography
- **React Router** for seamless navigation

### **Backend & APIs**
- **Supabase** for database, authentication, and edge functions
- **PostgreSQL** for robust, relational data storage
- **Row Level Security (RLS)** for data protection
- **Google Gemini AI** for advanced natural language processing
- **Spotify Web API** for real-time playlist discovery

### **Infrastructure**
- **Supabase Edge Functions** (Deno runtime) for serverless API endpoints
- **TypeScript** throughout for type safety and developer experience
- **ESLint** for code quality and consistency
- **PostCSS & Autoprefixer** for CSS optimization

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have:
- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control
- A **Supabase** account
- A **Google Cloud** account (for Gemini AI)
- A **Spotify Developer** account

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/vibesymphony.git
cd vibesymphony
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# API Keys for Edge Functions (set these in Supabase Dashboard)
GEMINI_API_KEY=your_gemini_api_key
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```

### 4. Database Setup

The database schema is automatically managed through Supabase migrations. The main table structure:

```sql
-- mood_reports table
CREATE TABLE mood_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  mood_text text NOT NULL,
  vibe_title text NOT NULL,
  motivational_message text NOT NULL,
  playlist_links jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE mood_reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read own mood reports" 
  ON mood_reports FOR SELECT 
  TO authenticated 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own mood reports" 
  ON mood_reports FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anonymous users can create mood reports" 
  ON mood_reports FOR INSERT 
  TO anon 
  WITH CHECK (user_id IS NULL);
```

### 5. API Configuration

#### **Supabase Setup**
1. Create a new Supabase project
2. Copy your project URL and anon key to `.env`
3. Set up the environment variables in Supabase Dashboard → Settings → Environment Variables:
   - `GEMINI_API_KEY`
   - `SPOTIFY_CLIENT_ID`
   - `SPOTIFY_CLIENT_SECRET`

#### **Google Gemini AI Setup**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your Supabase environment variables

#### **Spotify API Setup**
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Copy Client ID and Client Secret
4. Add them to your Supabase environment variables

### 6. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🔧 Development Guide

### **Project Structure**

```
vibesymphony/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx       # Custom button component
│   │   └── Layout.tsx       # Main layout wrapper
│   ├── hooks/               # Custom React hooks
│   │   └── useAuth.ts       # Authentication hook
│   ├── lib/                 # Utility libraries
│   │   └── supabase.ts      # Supabase client configuration
│   ├── pages/               # Page components
│   │   ├── Home.tsx         # Landing page
│   │   ├── About.tsx        # About page
│   │   ├── Describe.tsx     # Mood input page
│   │   ├── Report.tsx       # Results page
│   │   ├── Login.tsx        # Authentication pages
│   │   └── Signup.tsx
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # App entry point
│   └── index.css            # Global styles
├── supabase/
│   ├── functions/           # Edge functions
│   │   └── process-mood/    # Main mood processing function
│   └── migrations/          # Database migrations
├── public/                  # Static assets
├── package.json
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

### **Key Components**

#### **Mood Processing Flow**
1. **User Input** → Mood text entered on `/describe` page
2. **Sanitization** → Input cleaned and validated for safety
3. **AI Analysis** → Gemini AI interprets emotional complexity
4. **Playlist Search** → Spotify API searches for matching playlists
5. **Content Filtering** → Results filtered for appropriateness
6. **Response Assembly** → Safe, structured response returned
7. **Display** → Results shown on `/report` page
8. **Optional Save** → Authenticated users can save to journal

#### **Safety Systems**

The application implements multiple layers of content safety:

```typescript
// Input sanitization
function sanitizeContent(text: string): string {
  // Remove harmful patterns, limit length, escape HTML
}

// Content appropriateness checking
function isAppropriateContent(text: string): boolean {
  // Check against comprehensive filter lists
}

// Playlist filtering
function isAppropriatePlaylist(playlist: any): boolean {
  // Multi-layer playlist content validation
}
```

### **Adding New Features**

#### **Adding a New Page**
1. Create component in `src/pages/`
2. Add route to `src/App.tsx`
3. Update navigation in `src/components/Layout.tsx`

#### **Adding New Mood Patterns**
Update the psychological mood mapping in `supabase/functions/process-mood/index.ts`:

```typescript
const psychologicalMoodMap = {
  'your_pattern|alternative_pattern': 'spotify_search_terms',
  // Add your new patterns here
};
```

#### **Extending the Database**
1. Create new migration file in `supabase/migrations/`
2. Update TypeScript types in `src/lib/supabase.ts`
3. Update relevant components

### **Testing Strategy**

#### **Manual Testing Checklist**
- [ ] Mood input with various emotional states
- [ ] Inappropriate content filtering
- [ ] Authentication flow
- [ ] Playlist saving and retrieval
- [ ] Responsive design across devices
- [ ] Error handling and fallbacks

#### **Edge Cases to Test**
- Empty or very long mood inputs
- Malicious input attempts
- API failures (Gemini, Spotify)
- Network connectivity issues
- Authentication edge cases

## 🛡️ Security & Safety

### **Content Safety**
- **Multi-layer filtering** prevents inappropriate content
- **Input sanitization** protects against XSS and injection attacks
- **Output validation** ensures safe responses
- **Fallback systems** provide safe defaults when APIs fail

### **Data Protection**
- **Row Level Security** ensures users only access their data
- **No sensitive data logging** in production
- **Secure API key management** through Supabase environment variables
- **HTTPS enforcement** for all communications

### **AI Safety**
- **Temperature control** (0.3) for consistent, safe responses
- **Token limits** prevent excessive generation
- **Safety settings** enabled for Gemini AI
- **Response validation** prevents hallucinations

## 🚀 Deployment

### **Production Deployment**

1. **Build the application**:
```bash
npm run build
```

2. **Deploy to your preferred platform**:
   - **Netlify**: Connect your GitHub repo for automatic deployments
   - **Vercel**: Import project and configure environment variables
   - **Supabase Hosting**: Use Supabase's built-in hosting

3. **Configure environment variables** in your hosting platform

4. **Set up custom domain** (optional)

### **Environment Variables for Production**
Ensure all environment variables are properly set in your hosting platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

And in Supabase Dashboard:
- `GEMINI_API_KEY`
- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`

## 🤝 Contributing

We'd love your help making this better! Here's how you can contribute:

### **Types of Contributions**
- 🐛 **Fix bugs** – Help us squash those pesky issues
- ✨ **Add features** – Got an idea that would make this better?
- 🎨 **Improve design** – Make it even more beautiful and usable
- 📚 **Update docs** – Help others understand how to use this
- 🧪 **Test things** – Find edge cases and help us improve quality
- 🌍 **Make it accessible** – Help everyone enjoy great music

### **Development Workflow**
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### **Code Standards**
- Follow existing TypeScript and React patterns
- Use Tailwind CSS for styling
- Ensure responsive design
- Add appropriate error handling
- Include JSDoc comments for complex functions
- Test your changes thoroughly

### **Commit Message Convention**
```
type(scope): description

feat(mood): add support for complex emotional states
fix(auth): resolve login redirect issue
docs(readme): update setup instructions
style(ui): improve button hover animations
```

## 🎯 Roadmap

### **What's Next**
- [ ] **Better mood understanding** – Even smarter AI that gets your feelings
- [ ] **More music sources** – Beyond Spotify to Apple Music, YouTube, etc.
- [ ] **Mood patterns** – Show you how your musical tastes change over time
- [ ] **Share your vibes** – Let friends discover your mood-music combinations
- [ ] **Mobile app** – Take your vibe finder everywhere
- [ ] **Playlist creation** – Generate custom playlists, not just find existing ones

## 🔧 Troubleshooting

### **Common Issues**

#### **"No playlists found" or fallback playlists only**
- Check Spotify API credentials in Supabase environment variables
- Verify Spotify app is not in development mode restrictions
- Ensure network connectivity to Spotify API

#### **Gemini AI not working**
- Verify Gemini API key is correctly set in Supabase
- Check API quota and billing status in Google Cloud Console
- Ensure safety settings allow content generation

#### **Authentication issues**
- Verify Supabase URL and anon key in `.env`
- Check email confirmation settings in Supabase Auth
- Ensure RLS policies are correctly configured

#### **Build or deployment errors**
- Clear node_modules and reinstall dependencies
- Check for TypeScript errors with `npm run lint`
- Verify all environment variables are set

### **Getting Help**

1. **Check the documentation** in this README
2. **Search existing issues** on GitHub
3. **Create a new issue** with detailed information:
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser and device information
   - Console errors (if any)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for advanced natural language processing
- **Spotify** for their comprehensive music API
- **Supabase** for backend infrastructure and authentication
- **Open-source community** for all the amazing tools that made this possible
- **Everyone who's ever spent way too long looking for the right music** – this is for you

## 💝 Show Some Love

If this helped you find some great music, consider:

- ⭐ **Starring** the repository
- 🐛 **Telling us about bugs** or ideas for improvement
- 🤝 **Contributing** if you're into that
- 💬 **Sharing** with friends who also struggle to find the right music

---

**VibeSymphony** - *Finally, music that gets your weird, specific moods* 🎵

Made with 💜 by people who spend way too much time looking for the perfect song.

---
