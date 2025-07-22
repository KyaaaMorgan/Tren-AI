import { Trend, GeneratedContent, UserAnalysis, User } from './store';

export const dummyUsers: User[] = [
  {
    id: '1',
    email: 'sarah@example.com',
    name: 'Sarah Johnson',
    plan: 'pro',
    niche: 'Health & Fitness',
    platforms: ['Instagram', 'TikTok', 'YouTube'],
    onboardingComplete: true,
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    email: 'alex@example.com',
    name: 'Alex Chen',
    plan: 'starter',
    niche: 'Technology & AI',
    platforms: ['Blog', 'LinkedIn', 'X'],
    onboardingComplete: true,
    createdAt: new Date('2024-01-14')
  }
];

export const dummyTrends: Trend[] = [
  {
    id: '1',
    title: 'AI Video Generation Tools Breakthrough',
    description: 'Revolutionary AI tools creating Hollywood-quality videos from text prompts',
    category: 'Technology & AI',
    viralScore: 94,
    momentum: 'Rising',
    timeAgo: '2 hours ago',
    keywords: ['AI video', 'text to video', 'content creation', 'automation'],
    whyTrending: 'Major tech companies just released competing video AI tools, causing massive buzz in creator communities.',
    relatedTrends: ['AI Content Creation', 'Video Marketing Revolution'],
    region: 'Global'
  },
  {
    id: '2',
    title: '10-Minute Morning Workout Trend',
    description: 'Quick morning routines gaining massive popularity for busy professionals',
    category: 'Health & Fitness',
    viralScore: 87,
    momentum: 'Peak',
    timeAgo: '1 hour ago',
    keywords: ['morning workout', 'quick fitness', 'busy lifestyle', 'productivity'],
    whyTrending: 'Influencers sharing time-efficient workouts as people return to busy work schedules.',
    relatedTrends: ['Productivity Hacks', 'Wellness Trends'],
    region: 'Global'
  },
  {
    id: '3',
    title: 'One-Pot Meal Recipes Viral',
    description: 'Simple, minimal cleanup cooking videos exploding across platforms',
    category: 'Food & Culinary',
    viralScore: 91,
    momentum: 'Rising',
    timeAgo: '4 hours ago',
    keywords: ['one pot meals', 'easy cooking', 'minimal cleanup', 'quick recipes'],
    whyTrending: 'Busy families seeking simple cooking solutions driving engagement.',
    relatedTrends: ['Meal Prep Trends', 'Budget Cooking'],
    region: 'Global'
  },
  {
    id: '4',
    title: 'Sustainable Fashion Revolution',
    description: 'Eco-friendly fashion brands and sustainable styling tips trending',
    category: 'Fashion & Beauty',
    viralScore: 82,
    momentum: 'Rising',
    timeAgo: '6 hours ago',
    keywords: ['sustainable fashion', 'eco-friendly', 'ethical brands', 'secondhand'],
    whyTrending: 'Climate consciousness driving fashion choices among Gen Z and millennials.',
    relatedTrends: ['Zero Waste Living', 'Thrift Flips'],
    region: 'Global'
  },
  {
    id: '5',
    title: 'Remote Work Productivity Hacks',
    description: 'Digital nomads sharing workspace setups and productivity systems',
    category: 'Business & Career',
    viralScore: 78,
    momentum: 'Peak',
    timeAgo: '8 hours ago',
    keywords: ['remote work', 'productivity', 'digital nomad', 'workspace'],
    whyTrending: 'Return to hybrid work models sparking productivity optimization content.',
    relatedTrends: ['Work From Home', 'Freelancer Tips'],
    region: 'Global'
  },
  {
    id: '6',
    title: 'Mindfulness for Entrepreneurs',
    description: 'Business leaders sharing meditation and stress management techniques',
    category: 'Mental Health & Wellness',
    viralScore: 85,
    momentum: 'Rising',
    timeAgo: '3 hours ago',
    keywords: ['mindfulness', 'entrepreneur wellness', 'stress management', 'meditation'],
    whyTrending: 'High-profile entrepreneurs openly discussing mental health driving conversation.',
    relatedTrends: ['CEO Wellness', 'Business Burnout'],
    region: 'Global'
  }
];

export const dummyGeneratedContent: GeneratedContent[] = [
  {
    id: '1',
    trendId: '2',
    platform: 'Instagram',
    contentType: 'Carousel Post',
    content: {
      hook: '🔥 This 10-minute morning routine will change your entire day!',
      caption: `I've been testing morning routines for 6 months, and THIS is the game-changer...

Slide 1: 2-minute stretching sequence
Slide 2: 5-minute strength circuit  
Slide 3: 3-minute mindfulness

The best part? You don't need ANY equipment! ✨

Who's trying this tomorrow morning? Drop a 💪 if you're in!`,
      hashtags: '#MorningWorkout #FitnessMotivation #HealthyHabits #WorkoutAtHome #FitnessJourney #MorningRoutine #QuickWorkout #FitnessTips #WellnessWednesday #HealthyLifestyle',
      cta: 'Save this post for tomorrow morning and tag a friend who needs to see this!'
    },
    estimatedReach: '15K-25K impressions',
    engagementPrediction: 'High',
    viralScore: 87,
    createdAt: new Date('2024-01-16T10:30:00')
  },
  {
    id: '2',
    trendId: '1',
    platform: 'Blog',
    contentType: 'Long-form Article',
    content: {
      title: 'AI Video Generation: The Complete Guide for Content Creators in 2024',
      content: `The landscape of content creation is experiencing a seismic shift. AI video generation tools have evolved from experimental curiosities to production-ready solutions that are democratizing video creation...`,
      outline: `H1: AI Video Generation: The Complete Guide
H2: What is AI Video Generation?
H2: Top 5 AI Video Tools in 2024
H3: Tool 1: RunwayML
H3: Tool 2: Pika Labs
H2: How to Create Your First AI Video
H2: Best Practices and Tips
H2: Future of AI in Video Creation`
    },
    estimatedReach: '2,500-3,000 words',
    engagementPrediction: 'High',
    viralScore: 94,
    createdAt: new Date('2024-01-16T09:15:00')
  }
];

export const dummyUserAnalyses: UserAnalysis[] = [
  {
    id: '1',
    platform: 'Instagram',
    url: 'instagram.com/sarahfitlife',
    niche: 'Health & Fitness',
    confidence: 0.92,
    brandVoice: ['Motivational', 'Educational', 'Energetic', 'Supportive'],
    audienceInsights: {
      demographics: 'Women 25-35, Urban professionals',
      interests: ['Fitness', 'Nutrition', 'Wellness', 'Work-life balance']
    },
    contentThemes: ['Morning routines', 'Quick workouts', 'Healthy recipes', 'Motivation'],
    createdAt: new Date('2024-01-15T14:22:00')
  },
  {
    id: '2',
    platform: 'Blog',
    url: 'techinsights.blog',
    niche: 'Technology & AI',
    confidence: 0.89,
    brandVoice: ['Professional', 'Data-driven', 'Analytical', 'Forward-thinking'],
    audienceInsights: {
      demographics: 'Tech professionals, Entrepreneurs 28-45',
      interests: ['AI/ML', 'Software development', 'Tech trends', 'Innovation']
    },
    contentThemes: ['AI developments', 'Tech reviews', 'Industry analysis', 'Future predictions'],
    createdAt: new Date('2024-01-14T16:45:00')
  }
];

export const platformTemplates = {
  Instagram: {
    post: 'hook + caption + hashtags + cta',
    story: 'hook + short text + poll/question',
    reel: 'hook + script + hashtags + trending audio'
  },
  TikTok: {
    video: 'hook + script + hashtags + trending sounds',
    trending: 'hook + trend participation + hashtags'
  },
  YouTube: {
    short: 'hook + script + title + description',
    video: 'title + description + script outline + tags'
  },
  LinkedIn: {
    post: 'professional hook + insights + discussion starter',
    article: 'title + professional outline + key points'
  },
  X: {
    thread: 'hook thread + key points + engagement',
    post: 'concise hook + value + hashtags'
  },
  Blog: {
    article: 'title + outline + meta description + keywords',
    newsletter: 'subject + outline + key sections'
  }
};

export const nicheCategories = [
  'Technology & AI',
  'Health & Fitness', 
  'Food & Culinary',
  'Fashion & Beauty',
  'Business & Career',
  'Mental Health & Wellness',
  'Travel & Lifestyle',
  'Personal Finance',
  'Education & Learning',
  'Entertainment & Gaming',
  'Parenting & Family',
  'Home & Garden',
  'Sports & Recreation',
  'Art & Creativity',
  'Music & Audio'
];

export const platformOptions = [
  { id: 'instagram', name: 'Instagram', icon: '📷' },
  { id: 'tiktok', name: 'TikTok', icon: '🎵' },
  { id: 'youtube', name: 'YouTube', icon: '📺' },
  { id: 'linkedin', name: 'LinkedIn', icon: '💼' },
  { id: 'x', name: 'X (Twitter)', icon: '🐦' },
  { id: 'threads', name: 'Threads', icon: '🧵' },
  { id: 'facebook', name: 'Facebook', icon: '👥' },
  { id: 'blog', name: 'Blog', icon: '📝' },
  { id: 'newsletter', name: 'Newsletter', icon: '📧' }
];