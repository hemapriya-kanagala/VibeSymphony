const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface RequestBody {
  moodText: string;
  requestMore?: boolean;
}

interface GeminiResponse {
  vibeTitle: string;
  motivationalMessage: string;
  spotifyQuery: string;
}

interface SpotifyPlaylist {
  name: string;
  url: string;
  imageUrl: string;
  description: string;
}

interface SafeResponse {
  vibeTitle: string;
  motivationalMessage: string;
  playlists: SpotifyPlaylist[];
  canRequestMore?: boolean;
}

// Enhanced content safety filter with proper character handling
function sanitizeContent(text: string): string {
  if (!text || typeof text !== 'string') return '';
  
  // Fix character encoding issues and remove problematic characters
  let cleaned = text
    .replace(/[^\x00-\x7F]/g, '') // Remove non-ASCII characters
    .replace(/\*\*\*[^\s]*/g, '') // Remove censoring artifacts
    .replace(/[<>]/g, '') // Remove HTML brackets
    .replace(/javascript:|data:|vbscript:/gi, '') // Remove script injections
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Remove control characters
    .replace(/�/g, '') // Remove replacement characters
    .trim();
  
  // Remove potentially harmful content
  const unsafePatterns = [
    /\b(sex|sexy|freaky|nsfw|explicit|adult|erotic|kinky|naughty)\b/gi,
    /\b(kill|death|murder|suicide|violence|blood|gore)\b/gi,
    /\b(drug|cocaine|weed|marijuana|meth|heroin)\b/gi,
    /\b(fuck|shit|damn|bitch|ass|hell)\b/gi,
    /[🍑🍆💦👅😏🥵]/g,
  ];
  
  unsafePatterns.forEach(pattern => {
    cleaned = cleaned.replace(pattern, '');
  });
  
  // Limit length and ensure it's reasonable
  cleaned = cleaned.substring(0, 200).trim();
  
  return cleaned || 'Safe Content';
}

// Enhanced content appropriateness checker
function isAppropriateContent(text: string): boolean {
  if (!text || typeof text !== 'string') return false;
  
  const lower = text.toLowerCase();
  
  // Explicit content filters
  const explicitTerms = [
    'sex', 'sexy', 'freaky', 'freak', 'nsfw', 'explicit', 'dirty', 'xxx', 
    'adult', 'erotic', 'sensual', 'seduction', 'bedroom', 'strip', 'pole',
    'twerk', 'ratchet', 'hoe', 'bitch energy', 'bad bitch', 'hot girl',
    'daddy', 'kinky', 'naughty', 'horny', 'wet', 'hard', 'cum', 'orgasm'
  ];
  
  // Violence/harmful content
  const violentTerms = [
    'kill', 'murder', 'death', 'suicide', 'violence', 'blood', 'gore',
    'torture', 'pain', 'hurt', 'weapon', 'gun', 'knife', 'bomb'
  ];
  
  // Drug-related content
  const drugTerms = [
    'cocaine', 'heroin', 'meth', 'crack', 'weed', 'marijuana', 'drug dealer',
    'high', 'stoned', 'blazed', 'trip', 'acid', 'molly', 'ecstasy'
  ];
  
  const allBannedTerms = [...explicitTerms, ...violentTerms, ...drugTerms];
  
  return !allBannedTerms.some(term => lower.includes(term));
}

// Validate and sanitize JSON structure
function validateGeminiResponse(response: any): GeminiResponse {
  const safe = {
    vibeTitle: 'Your Current Vibe',
    motivationalMessage: 'Music understands your feelings 🎵',
    spotifyQuery: 'indie alternative chill'
  };
  
  if (!response || typeof response !== 'object') return safe;
  
  // Validate and sanitize each field
  if (response.vibeTitle && typeof response.vibeTitle === 'string') {
    const sanitized = sanitizeContent(response.vibeTitle);
    if (isAppropriateContent(sanitized) && sanitized.length <= 30) {
      safe.vibeTitle = sanitized;
    }
  }
  
  if (response.motivationalMessage && typeof response.motivationalMessage === 'string') {
    const sanitized = sanitizeContent(response.motivationalMessage);
    if (isAppropriateContent(sanitized) && sanitized.length <= 150) {
      safe.motivationalMessage = sanitized;
    }
  }
  
  if (response.spotifyQuery && typeof response.spotifyQuery === 'string') {
    const sanitized = sanitizeContent(response.spotifyQuery);
    if (isAppropriateContent(sanitized) && sanitized.length <= 100) {
      safe.spotifyQuery = sanitized;
    }
  }
  
  return safe;
}

// Enhanced mood interpretation with psychological nuance
function createPsychologicallyAwareQuery(moodText: string): string {
  const lower = moodText.toLowerCase().trim();
  
  // Handle edge cases and malicious input
  if (!lower || lower.length > 500) {
    return 'peaceful ambient instrumental';
  }
  
  // Psychological mood mapping with emotional complexity
  const psychologicalMoodMap = {
    // Anxiety and stress patterns
    'anxious|nervous|worried|stress|overwhelmed|panic|tension': 'calming meditation ambient peaceful instrumental',
    
    // Depression and sadness with empathy
    'sad|depressed|down|heartbreak|lonely|empty|lost|grief': 'healing indie acoustic melancholy gentle comfort',
    
    // Hope and resilience
    'hopeful|hope|optimistic|positive|resilient|strong|determined': 'uplifting hopeful indie folk inspiring acoustic',
    
    // Joy and happiness
    'happy|joyful|excited|elated|cheerful|bright|wonderful|amazing': 'upbeat feel good indie pop joyful celebration',
    
    // Fatigue and exhaustion
    'tired|exhausted|drained|weary|sleepy|burnout|overwhelmed': 'gentle ambient lofi peaceful restorative instrumental',
    
    // Anger and frustration with healthy outlets
    'angry|mad|frustrated|rage|furious|annoyed|irritated': 'alternative rock indie emotional release cathartic',
    
    // Nostalgia and reflection
    'nostalgic|memories|past|reminiscing|bittersweet|wistful': 'nostalgic indie alternative folk introspective thoughtful',
    
    // Love and romance
    'love|romantic|crush|affection|tender|warm|caring': 'romantic indie folk acoustic love songs gentle',
    
    // Focus and productivity
    'focus|study|work|productive|concentration|motivated': 'focus instrumental ambient productivity study lofi',
    
    // Social and celebratory
    'party|celebration|social|friends|dancing|energetic': 'upbeat indie dance celebration social good vibes',
    
    // Introspection and solitude
    'alone|solitude|quiet|peaceful|contemplative|reflective': 'introspective indie acoustic peaceful contemplative',
    
    // Creative and artistic
    'creative|inspired|artistic|imaginative|expressive': 'creative indie alternative ambient artistic instrumental'
  };
  
  // Find matching psychological pattern
  for (const [pattern, query] of Object.entries(psychologicalMoodMap)) {
    const regex = new RegExp(pattern, 'i');
    if (regex.test(lower)) {
      return query;
    }
  }
  
  // Fallback based on general sentiment
  if (lower.includes('good') || lower.includes('great') || lower.includes('fine')) {
    return 'feel good indie alternative upbeat';
  }
  
  if (lower.includes('bad') || lower.includes('rough') || lower.includes('difficult')) {
    return 'healing indie acoustic gentle comfort';
  }
  
  // Safe default for any unrecognized input
  return 'indie alternative chill peaceful';
}

// Enhanced motivational message generator with psychological awareness
function createEmpathicMessage(moodText: string): string {
  const lower = moodText.toLowerCase();
  
  // Empathic responses based on emotional state
  if (lower.includes('anxious') || lower.includes('worried') || lower.includes('stress')) {
    return 'Take a deep breath. You\'re stronger than you know 🌟';
  }
  
  if (lower.includes('sad') || lower.includes('down') || lower.includes('heartbreak')) {
    return 'It\'s okay to feel this way. Healing takes time 💙';
  }
  
  if (lower.includes('hopeful') || lower.includes('positive') || lower.includes('optimistic')) {
    return 'Your hope is beautiful. Keep that light shining ✨';
  }
  
  if (lower.includes('tired') || lower.includes('exhausted') || lower.includes('drained')) {
    return 'Rest is not giving up. You deserve gentle moments 🌙';
  }
  
  if (lower.includes('angry') || lower.includes('frustrated') || lower.includes('mad')) {
    return 'Your feelings are valid. Let music help you process 🎵';
  }
  
  if (lower.includes('lonely') || lower.includes('alone') || lower.includes('isolated')) {
    return 'You\'re not alone. Music connects us all 💜';
  }
  
  if (lower.includes('happy') || lower.includes('good') || lower.includes('great')) {
    return 'Your joy is contagious. Keep spreading those good vibes! 🌟';
  }
  
  if (lower.includes('love') || lower.includes('romantic') || lower.includes('crush')) {
    return 'Love in all its forms deserves a soundtrack 💕';
  }
  
  // Default empathic message
  return 'Every feeling matters. Music understands your heart 🎵';
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { moodText, requestMore = false }: RequestBody = await req.json();

    // Input validation and sanitization
    if (!moodText || typeof moodText !== 'string') {
      return new Response(
        JSON.stringify({ 
          error: "Valid mood text is required",
          vibeTitle: "Express Yourself",
          motivationalMessage: "Tell us how you're feeling today 🎵",
          playlists: getFallbackPlaylists()
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Sanitize input
    const sanitizedMood = sanitizeContent(moodText.trim());
    
    if (!isAppropriateContent(sanitizedMood)) {
      return createSafeResponse("Let's Keep It Positive", "Music brings out the best in us 🎵", 'uplifting positive indie');
    }

    // Step 1: Interpret mood with enhanced AI
    const geminiResponse = await interpretMoodWithGemini(sanitizedMood);
    
    // Step 2: Search for appropriate playlists (more if requested)
    const playlistCount = requestMore ? 6 : 3;
    const playlists = await searchSpotifyPlaylists(geminiResponse.spotifyQuery, playlistCount);

    // Step 3: Final safety check and response assembly
    const safeResponse = createFinalSafeResponse({
      vibeTitle: geminiResponse.vibeTitle,
      motivationalMessage: geminiResponse.motivationalMessage,
      playlists: playlists,
      canRequestMore: !requestMore && playlists.length >= 3
    });

    return new Response(
      JSON.stringify(safeResponse),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
    
  } catch (error) {
    // Never expose internal errors to users
    console.error("Internal error:", error);
    
    const safeErrorResponse = createSafeResponse(
      "Something Went Wrong", 
      "Don't worry, we've got backup vibes for you 🎵",
      'indie alternative chill'
    );

    return new Response(
      JSON.stringify(safeErrorResponse),
      {
        status: 200, // Return 200 to avoid exposing error details
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

async function interpretMoodWithGemini(moodText: string): Promise<GeminiResponse> {
  const geminiApiKey = Deno.env.get("GEMINI_API_KEY");
  
  if (!geminiApiKey) {
    return createFallbackGeminiResponse(moodText);
  }

  // Enhanced prompt with psychological guidance
  const prompt = `You are an empathetic music therapist analyzing someone's emotional state. 

Mood: "${moodText}"

Guidelines:
- Empathize deeply with their emotional complexity
- Consider tone, intent, and underlying feelings
- Suggest music that validates their experience
- Be gentle and encouraging
- Avoid generic terms like "mood" or "playlist" in searches
- Focus on specific genres and emotional qualities
- Keep responses clean and family-friendly

Respond with ONLY this JSON structure:
{
  "spotifyQuery": "specific genre and emotion terms (no 'mood' or 'playlist')",
  "vibeTitle": "2-4 words capturing their emotional state",
  "motivationalMessage": "empathetic, encouraging message under 25 words"
}

Examples:
- "staying hopeful" → {"spotifyQuery": "hopeful uplifting indie folk acoustic", "vibeTitle": "Hopeful Heart", "motivationalMessage": "Your hope is a gift to the world. Keep shining ✨"}
- "anxious about work" → {"spotifyQuery": "calming focus ambient instrumental", "vibeTitle": "Calm Focus", "motivationalMessage": "Breathe deeply. You've got this, one step at a time 🌟"}`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.3, // Lower temperature for more consistent, safe responses
            maxOutputTokens: 150,
            topP: 0.8,
            topK: 40
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH", 
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        }),
      }
    );

    if (!response.ok) {
      return createFallbackGeminiResponse(moodText);
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!generatedText) {
      return createFallbackGeminiResponse(moodText);
    }

    // Extract and validate JSON
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        return validateGeminiResponse(parsed);
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
      }
    }

    // Fallback parsing
    return extractSafeDataFromText(generatedText, moodText);
    
  } catch (error) {
    console.error("Gemini API error:", error);
    return createFallbackGeminiResponse(moodText);
  }
}

function extractSafeDataFromText(text: string, originalMood: string): GeminiResponse {
  const lines = text.split('\n').map(line => line.trim());
  
  let spotifyQuery = createPsychologicallyAwareQuery(originalMood);
  let vibeTitle = "Your Current Vibe";
  let motivationalMessage = createEmpathicMessage(originalMood);

  // Safe extraction with validation
  for (const line of lines) {
    const lower = line.toLowerCase();
    
    if (lower.includes('search') || lower.includes('query')) {
      const match = line.match(/["']([^"']+)["']/);
      if (match && isAppropriateContent(match[1])) {
        spotifyQuery = sanitizeContent(match[1]);
      }
    }
    
    if (lower.includes('title') || lower.includes('vibe')) {
      const match = line.match(/["']([^"']+)["']/);
      if (match && isAppropriateContent(match[1]) && match[1].length <= 30) {
        vibeTitle = sanitizeContent(match[1]);
      }
    }
    
    if (lower.includes('message') || lower.includes('encouraging')) {
      const match = line.match(/["']([^"']+)["']/);
      if (match && isAppropriateContent(match[1]) && match[1].length <= 150) {
        motivationalMessage = sanitizeContent(match[1]);
      }
    }
  }

  return { vibeTitle, motivationalMessage, spotifyQuery };
}

function createFallbackGeminiResponse(moodText: string): GeminiResponse {
  const query = createPsychologicallyAwareQuery(moodText);
  const lower = moodText.toLowerCase();
  
  let vibeTitle = "Your Current Vibe";
  let motivationalMessage = createEmpathicMessage(moodText);
  
  // Enhanced fallback responses based on psychological patterns
  if (lower.includes('hopeful') || lower.includes('hope') || lower.includes('positive')) {
    vibeTitle = "Hopeful Heart";
    motivationalMessage = "Your hope lights up the world. Keep believing ✨";
  } else if (lower.includes('sad') || lower.includes('down') || lower.includes('heartbreak')) {
    vibeTitle = "Healing Journey";
    motivationalMessage = "It's okay to feel deeply. Healing takes courage 💙";
  } else if (lower.includes('anxious') || lower.includes('stress') || lower.includes('worried')) {
    vibeTitle = "Finding Peace";
    motivationalMessage = "Breathe deeply. You're stronger than your worries 🌟";
  } else if (lower.includes('happy') || lower.includes('good') || lower.includes('great')) {
    vibeTitle = "Pure Joy";
    motivationalMessage = "Your happiness is contagious. Keep shining! 🌟";
  } else if (lower.includes('tired') || lower.includes('exhausted')) {
    vibeTitle = "Gentle Rest";
    motivationalMessage = "Rest is self-care. You deserve peaceful moments 🌙";
  }
  
  return { vibeTitle, motivationalMessage, spotifyQuery: query };
}

// Enhanced playlist appropriateness checker
function isAppropriatePlaylist(playlist: any): boolean {
  if (!playlist || !playlist.name) return false;
  
  const name = playlist.name.toLowerCase();
  const description = (playlist.description || '').toLowerCase();
  
  // Comprehensive inappropriate content filter
  const inappropriateTerms = [
    // Explicit sexual content
    'sex', 'sexy', 'freaky', 'freak', 'nsfw', 'explicit', 'dirty', 'xxx',
    'adult', 'erotic', 'sensual', 'seduction', 'bedroom', 'strip', 'pole',
    'twerk', 'ratchet', 'hoe', 'bitch energy', 'bad bitch', 'hot girl',
    'daddy', 'kinky', 'naughty', 'horny', 'wet', 'hard', 'cum', 'orgasm',
    
    // Violence and harmful content
    'kill', 'murder', 'death', 'suicide', 'violence', 'blood', 'gore',
    'torture', 'pain', 'weapon', 'gun', 'knife', 'bomb', 'war', 'fight',
    
    // Drug-related content
    'cocaine', 'heroin', 'meth', 'crack', 'weed', 'marijuana', 'drug',
    'high', 'stoned', 'blazed', 'trip', 'acid', 'molly', 'ecstasy',
    
    // Profanity and offensive language
    'fuck', 'shit', 'damn', 'ass', 'hell', 'bastard', 'slut', 'whore'
  ];
  
  // Check for inappropriate terms
  for (const term of inappropriateTerms) {
    if (name.includes(term) || description.includes(term)) {
      return false;
    }
  }
  
  // Filter inappropriate emojis
  const inappropriateEmojis = ['🍑', '🍆', '💦', '👅', '🔥💋', '😏', '🥵', '🍌', '🌶️'];
  for (const emoji of inappropriateEmojis) {
    if (name.includes(emoji) || description.includes(emoji)) {
      return false;
    }
  }
  
  // Additional safety checks
  if (name.length > 200 || description.length > 500) {
    return false; // Suspiciously long titles/descriptions
  }
  
  return true;
}

async function searchSpotifyPlaylists(query: string, limit: number = 3): Promise<SpotifyPlaylist[]> {
  const clientId = Deno.env.get("SPOTIFY_CLIENT_ID");
  const clientSecret = Deno.env.get("SPOTIFY_CLIENT_SECRET");

  if (!clientId || !clientSecret) {
    return getFallbackPlaylists(limit);
  }

  try {
    // Get access token
    const credentials = btoa(`${clientId}:${clientSecret}`);
    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${credentials}`,
      },
      body: "grant_type=client_credentials",
    });

    if (!tokenResponse.ok) {
      return getFallbackPlaylists(limit);
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;
    
    if (!accessToken) {
      return getFallbackPlaylists(limit);
    }

    // Enhanced search strategies
    const searchQueries = [
      query,
      `${query} indie`,
      `${query} acoustic`,
      `${query} chill`,
      query.split(' ').slice(0, 2).join(' ') // First 2 words
    ];

    for (const searchQuery of searchQueries) {
      try {
        const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=playlist&limit=50&market=US`;
        
        const searchResponse = await fetch(searchUrl, {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!searchResponse.ok) continue;

        const searchData = await searchResponse.json();
        const playlists = searchData.playlists?.items || [];
        
        if (playlists.length > 0) {
          const validPlaylists = playlists
            .filter((playlist: any) => {
              // Basic validation
              if (!playlist?.name || !playlist?.external_urls?.spotify) return false;
              if (!playlist.tracks || playlist.tracks.total === 0) return false;
              
              // Content safety check
              return isAppropriatePlaylist(playlist);
            })
            .slice(0, limit)
            .map((playlist: any) => {
              // Safe image extraction
              let imageUrl = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop";
              
              if (playlist.images?.length > 0 && playlist.images[0]?.url) {
                imageUrl = playlist.images[0].url;
              }
              
              return {
                name: sanitizeContent(playlist.name),
                url: playlist.external_urls.spotify,
                imageUrl: imageUrl,
                description: sanitizeContent(playlist.description || `${playlist.tracks.total} songs • Perfect for your mood`),
              };
            });

          if (validPlaylists.length >= Math.min(limit, 3)) {
            return validPlaylists;
          }
        }
      } catch (searchError) {
        continue; // Try next query
      }
    }

    return getFallbackPlaylists(limit);
    
  } catch (error) {
    return getFallbackPlaylists(limit);
  }
}

function getFallbackPlaylists(limit: number = 3): SpotifyPlaylist[] {
  const allFallbacks = [
    {
      name: "Peaceful Piano",
      url: "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO",
      imageUrl: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300&h=300&fit=crop",
      description: "Beautiful piano music for reflection and calm",
    },
    {
      name: "Indie Folk & Chill",
      url: "https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn",
      imageUrl: "https://images.unsplash.com/photo-1445985543470-41fba5c3144a?w=300&h=300&fit=crop",
      description: "Gentle indie and folk for thoughtful moments",
    },
    {
      name: "Acoustic Comfort",
      url: "https://open.spotify.com/playlist/37i9dQZF1DX1s9knjP51Oa",
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
      description: "Soothing acoustic songs for every feeling",
    },
    {
      name: "Ambient Focus",
      url: "https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ",
      imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop",
      description: "Instrumental ambient music for concentration",
    },
    {
      name: "Feel Good Indie",
      url: "https://open.spotify.com/playlist/37i9dQZF1DX2sUQwD7tbmL",
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      description: "Uplifting indie tracks to brighten your day",
    },
    {
      name: "Gentle Morning",
      url: "https://open.spotify.com/playlist/37i9dQZF1DX0h0QnLkMBl4",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
      description: "Soft melodies to start your day peacefully",
    }
  ];
  
  return allFallbacks.slice(0, limit);
}

// Helper functions for safe response creation
function createSafeResponse(vibeTitle: string, motivationalMessage: string, spotifyQuery: string): SafeResponse {
  return {
    vibeTitle: sanitizeContent(vibeTitle),
    motivationalMessage: sanitizeContent(motivationalMessage),
    playlists: getFallbackPlaylists(3)
  };
}

function createFinalSafeResponse(response: any): SafeResponse {
  // Final safety net - sanitize everything before sending
  const safeResponse: SafeResponse = {
    vibeTitle: sanitizeContent(response.vibeTitle || "Your Current Vibe"),
    motivationalMessage: sanitizeContent(response.motivationalMessage || "Music understands your heart 🎵"),
    playlists: [],
    canRequestMore: response.canRequestMore || false
  };
  
  // Validate playlists
  if (Array.isArray(response.playlists)) {
    safeResponse.playlists = response.playlists
      .filter((playlist: any) => playlist && isAppropriatePlaylist(playlist))
      .slice(0, 10) // Max 10 playlists
      .map((playlist: any) => ({
        name: sanitizeContent(playlist.name || "Great Playlist"),
        url: playlist.url || "https://open.spotify.com/",
        imageUrl: playlist.imageUrl || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
        description: sanitizeContent(playlist.description || "Perfect for your mood")
      }));
  }
  
  // Ensure we always have playlists
  if (safeResponse.playlists.length === 0) {
    safeResponse.playlists = getFallbackPlaylists(3);
  }
  
  return safeResponse;
}