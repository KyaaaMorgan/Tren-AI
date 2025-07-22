'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import { 
  TrendingUp, 
  Sparkles, 
  Target, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Play,
  Users,
  Globe,
  BarChart3,
  Lightbulb,
  Loader2
} from 'lucide-react';

// Mock data generation functions
const generateMockAnalysis = (url: string) => {
  const platform = detectPlatformFromURL(url);
  
  const niches = [
    { 
      name: "Health & Fitness", 
      themes: ["workout routines", "nutrition tips", "wellness", "mental health", "fitness gear", "healthy recipes", "exercise motivation", "yoga practices"], 
      confidence: 89 
    },
    { 
      name: "Technology & AI", 
      themes: ["artificial intelligence", "software development", "tech reviews", "programming", "innovation", "startups", "digital tools", "coding tutorials"], 
      confidence: 92 
    },
    { 
      name: "Food & Culinary", 
      themes: ["recipe sharing", "cooking tips", "restaurant reviews", "food photography", "baking", "meal prep", "cuisine exploration", "kitchen hacks"], 
      confidence: 87 
    },
    { 
      name: "Business & Entrepreneurship", 
      themes: ["startup advice", "marketing strategies", "productivity", "leadership", "finance tips", "business growth", "networking", "sales techniques"], 
      confidence: 91 
    },
    { 
      name: "Lifestyle & Travel", 
      themes: ["travel destinations", "lifestyle tips", "photography", "experiences", "culture", "adventure", "minimalism", "self-care"], 
      confidence: 85 
    }
  ];
  
  const selectedNiche = niches[Math.floor(Math.random() * niches.length)];
  const trendingTopics = generateTrendingTopics(selectedNiche.name);
  
  return {
    platform,
    niche: selectedNiche.name,
    confidence: selectedNiche.confidence,
    themes: selectedNiche.themes,
    trends: trendingTopics,
    audienceSize: `${Math.floor(Math.random() * 100 + 50)}K followers`,
    engagementRate: `${(Math.random() * 5 + 2).toFixed(1)}%`,
    isPreview: true
  };
};

const generateTrendingTopics = (niche: string) => {
  const topicTemplates: Record<string, Array<{title: string, description: string, viralScore: number}>> = {
    "Health & Fitness": [
      { title: "10-Minute Morning Yoga Routine", description: "Quick wellness practices gaining massive traction among busy professionals", viralScore: 87 },
      { title: "Plant-Based Protein Revolution", description: "Alternative protein sources trending as health consciousness rises", viralScore: 91 },
      { title: "Mindful Fitness Movement", description: "Mental health integration in workout routines becoming mainstream", viralScore: 84 },
      { title: "Home Gym Setup Trends", description: "Compact fitness solutions for small spaces going viral", viralScore: 89 },
      { title: "Recovery & Sleep Optimization", description: "Sleep tracking and recovery methods trending among athletes", viralScore: 86 }
    ],
    "Technology & AI": [
      { title: "AI Video Generation Tools", description: "Revolutionary text-to-video AI platforms disrupting content creation", viralScore: 94 },
      { title: "No-Code App Development", description: "Building applications without programming skills trending heavily", viralScore: 88 },
      { title: "Quantum Computing Breakthrough", description: "Recent advances in quantum technology capturing global attention", viralScore: 92 },
      { title: "AI Ethics Discussions", description: "Responsible AI usage becoming critical conversation topic", viralScore: 86 },
      { title: "Voice AI Assistants", description: "Advanced conversational AI changing how we interact with technology", viralScore: 90 }
    ],
    "Food & Culinary": [
      { title: "One-Pot Meal Revolution", description: "Simple, minimal cleanup cooking videos exploding across platforms", viralScore: 91 },
      { title: "Fermented Foods Trend", description: "Gut health focus driving fermentation content popularity", viralScore: 85 },
      { title: "Air Fryer Innovations", description: "Creative air fryer recipes dominating food content", viralScore: 88 },
      { title: "Sustainable Cooking", description: "Zero-waste cooking methods gaining environmental awareness", viralScore: 83 },
      { title: "Global Fusion Cuisine", description: "Cross-cultural recipe combinations trending worldwide", viralScore: 87 }
    ],
    "Business & Entrepreneurship": [
      { title: "Remote Work Productivity", description: "Digital nomad lifestyle and remote work optimization trending", viralScore: 89 },
      { title: "AI Business Automation", description: "Small businesses adopting AI tools for efficiency gains", viralScore: 92 },
      { title: "Creator Economy Growth", description: "Monetization strategies for content creators exploding", viralScore: 90 },
      { title: "Sustainable Business Models", description: "ESG and sustainable practices becoming business priorities", viralScore: 86 },
      { title: "Personal Branding 2024", description: "Authentic personal branding strategies gaining traction", viralScore: 88 }
    ],
    "Lifestyle & Travel": [
      { title: "Slow Travel Movement", description: "Extended stays and mindful travel experiences trending", viralScore: 84 },
      { title: "Digital Detox Retreats", description: "Technology breaks and mindfulness travel gaining popularity", viralScore: 87 },
      { title: "Solo Travel Safety", description: "Independent travel tips and safety guides trending", viralScore: 89 },
      { title: "Sustainable Tourism", description: "Eco-friendly travel options becoming mainstream choice", viralScore: 85 },
      { title: "Workation Destinations", description: "Remote work-friendly travel locations exploding in popularity", viralScore: 91 }
    ]
  };
  
  const topics = topicTemplates[niche] || topicTemplates["Technology & AI"];
  return topics.sort(() => 0.5 - Math.random()).slice(0, 5);
};

const detectPlatformFromURL = (url: string) => {
  if (url.includes('instagram.com')) return 'Instagram';
  if (url.includes('tiktok.com')) return 'TikTok';
  if (url.includes('youtube.com')) return 'YouTube';
  if (url.includes('twitter.com') || url.includes('x.com')) return 'X (Twitter)';
  if (url.includes('linkedin.com')) return 'LinkedIn';
  if (url.includes('threads.net')) return 'Threads';
  if (url.includes('facebook.com')) return 'Facebook';
  return 'Website/Blog';
};

// Rate limiting hook
const useAnalysisLimit = () => {
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [resetTime, setResetTime] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('trenai_analysis_attempts');
    const resetStored = localStorage.getItem('trenai_reset_time');
    
    if (stored && resetStored) {
      const now = new Date().getTime();
      const reset = parseInt(resetStored);
      
      if (now > reset) {
        localStorage.setItem('trenai_analysis_attempts', '3');
        localStorage.setItem('trenai_reset_time', (now + 3600000).toString());
        setAttemptsLeft(3);
        setResetTime(now + 3600000);
      } else {
        setAttemptsLeft(parseInt(stored));
        setResetTime(reset);
      }
    } else {
      const resetTime = new Date().getTime() + 3600000;
      localStorage.setItem('trenai_analysis_attempts', '3');
      localStorage.setItem('trenai_reset_time', resetTime.toString());
      setAttemptsLeft(3);
      setResetTime(resetTime);
    }
  }, []);

  const useAttempt = () => {
    const newAttempts = Math.max(0, attemptsLeft - 1);
    setAttemptsLeft(newAttempts);
    localStorage.setItem('trenai_analysis_attempts', newAttempts.toString());
  };

  return { attemptsLeft, resetTime, useAttempt };
};

// Analysis Progress Component
const AnalysisProgress = ({ step }: { step: number }) => {
  const steps = [
    { id: 0, title: "Starting Analysis...", icon: "🔍" },
    { id: 1, title: "Detecting Platform", icon: "📱", detail: "Identifying content source and format" },
    { id: 2, title: "Analyzing Content", icon: "📊", detail: "Processing posts, themes, and engagement patterns" },
    { id: 3, title: "Detecting Niche", icon: "🎯", detail: "AI is categorizing your content focus" },
    { id: 4, title: "Generating Insights", icon: "✨", detail: "Preparing personalized recommendations" }
  ];

  return (
    <div className="bg-blue-50 rounded-xl p-6 mb-8">
      <div className="space-y-4">
        {steps.map((stepItem) => (
          <div
            key={stepItem.id}
            className={`flex items-center gap-4 transition-all ${
              step >= stepItem.id ? 'opacity-100' : 'opacity-30'
            }`}
          >
            <div className={`text-2xl ${step === stepItem.id ? 'animate-pulse' : ''}`}>
              {stepItem.icon}
            </div>
            <div className="text-left">
              <p className="font-medium">{stepItem.title}</p>
              {stepItem.detail && (
                <p className="text-sm text-gray-600">{stepItem.detail}</p>
              )}
            </div>
            {step > stepItem.id && (
              <div className="ml-auto text-green-600">✓</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Preview Results Component
const PreviewResults = ({ 
  result, 
  showUpgrade, 
  onSignUp 
}: { 
  result: any; 
  showUpgrade: boolean; 
  onSignUp: () => void; 
}) => {
  return (
    <div className="relative">
      <div className={`bg-white rounded-2xl shadow-lg p-8 transition-all ${showUpgrade ? 'blur-sm' : ''}`}>
        {/* Detected Niche */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">🎯 Your Content Niche</h3>
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xl font-semibold text-blue-800">{result.niche}</h4>
                <p className="text-blue-600">Primary focus detected</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-800">{result.confidence}%</div>
                <p className="text-sm text-blue-600">Confidence</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Themes (Limited) */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">📝 Content Themes</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            {result.themes.slice(0, 4).map((theme: string, index: number) => (
              <div key={index} className="bg-gray-100 rounded-lg p-3 text-center">
                <span className="font-medium">{theme}</span>
              </div>
            ))}
            <div className="bg-gray-200 rounded-lg p-3 text-center border-2 border-dashed border-gray-400">
              <span className="text-gray-500">+{result.themes.length - 4} more</span>
            </div>
          </div>
        </div>

        {/* Trending Topics Preview */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">🔥 Trending in Your Niche</h3>
          <div className="space-y-4">
            {result.trends.slice(0, 2).map((trend: any, index: number) => (
              <div key={index} className="border rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-lg">{trend.title}</h4>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {trend.viralScore}% viral
                  </div>
                </div>
                <p className="text-gray-600">{trend.description}</p>
              </div>
            ))}
            
            {/* Locked Content Teaser */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gray-50">
              <div className="text-4xl mb-2">🔒</div>
              <h4 className="font-semibold text-lg mb-2">15+ More Trending Topics</h4>
              <p className="text-gray-600">Get personalized trends updated hourly + AI content generation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Overlay */}
      {showUpgrade && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold mb-4">Unlock Your Full Potential</h3>
            <div className="space-y-3 mb-6 text-left">
              <div className="flex items-center gap-3">
                <div className="text-green-600">✓</div>
                <span>Complete niche analysis + audience insights</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-green-600">✓</div>
                <span>20+ personalized trending topics daily</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-green-600">✓</div>
                <span>AI content generation for all platforms</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-green-600">✓</div>
                <span>Competitor analysis & content gaps</span>
              </div>
            </div>
            
            <button
              onClick={onSignUp}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all mb-3"
            >
              Start Free Trial - $0
            </button>
            
            <p className="text-sm text-gray-500">
              3 free content generations daily • No credit card required
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// Social Proof Section
const SocialProofSection = () => {
  const testimonials = [
    { name: "Sarah Johnson", handle: "@fitnessguru_sarah", niche: "Fitness", text: "Found 3 viral trends that got me 50K new followers!" },
    { name: "Alex Chen", handle: "@techblogger_alex", niche: "Technology", text: "TrenAI helped me identify AI trends 2 days before they exploded." },
    { name: "Maria Rodriguez", handle: "@foodie_maria", niche: "Food", text: "Generated content that doubled my engagement rate!" }
  ];

  return (
    <div className="bg-gray-50 rounded-2xl p-8 mt-12">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">Join 2,000+ Successful Creators</h3>
        <p className="text-gray-600">See how TrenAI is transforming content creation</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold">
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.handle}</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm mb-2">"{testimonial.text}"</p>
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              {testimonial.niche}
            </span>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <div className="flex justify-center items-center gap-8 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">2,000+</div>
            <div className="text-sm text-gray-600">Active Creators</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">500K+</div>
            <div className="text-sm text-gray-600">Content Generated</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">95%</div>
            <div className="text-sm text-gray-600">Accuracy Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Hero Analysis Section Component
const HeroAnalysisSection = () => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [previewResult, setPreviewResult] = useState<any>(null);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const { attemptsLeft, useAttempt } = useAnalysisLimit();

  const handleAnalyzeURL = async () => {
    if (!url || attemptsLeft <= 0) return;
    
    setIsAnalyzing(true);
    setAnalysisStep(0);
    setPreviewResult(null);
    setShowUpgradePrompt(false);

    // Step 1: Platform Detection (1s)
    setTimeout(() => setAnalysisStep(1), 1000);
    
    // Step 2: Content Analysis (2s)
    setTimeout(() => setAnalysisStep(2), 3000);
    
    // Step 3: Niche Detection (3s)
    setTimeout(() => setAnalysisStep(3), 5000);
    
    // Step 4: Results (4s)
    setTimeout(() => {
      const mockResult = generateMockAnalysis(url);
      setPreviewResult(mockResult);
      setAnalysisStep(4);
      setIsAnalyzing(false);
      useAttempt();
      
      // Show upgrade prompt after 5 seconds
      setTimeout(() => setShowUpgradePrompt(true), 5000);
    }, 7000);
  };

  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
        Turn Trends Into Viral Content with AI
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Discover trending topics for your niche, generate platform-ready content instantly
      </p>
      
      {/* URL Input with Attempts Counter */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <Input
            type="url"
            placeholder="Paste your social media or website URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 px-6 py-4 text-lg h-14"
            disabled={isAnalyzing || attemptsLeft <= 0}
          />
          <Button
            onClick={handleAnalyzeURL}
            disabled={!url || isAnalyzing || attemptsLeft <= 0}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 text-lg font-semibold h-14 min-w-[140px]"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Analyze Free'
            )}
          </Button>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <p className="text-gray-500">
            Try: instagram.com/yourhandle, yourblog.com, or youtube.com/channel
          </p>
          <p className={`font-medium ${attemptsLeft > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {attemptsLeft > 0 ? `${attemptsLeft} free attempts left` : 'Sign up for unlimited analysis'}
          </p>
        </div>
      </div>

      {/* Analysis Progress */}
      {isAnalyzing && <AnalysisProgress step={analysisStep} />}
      
      {/* Preview Results */}
      {previewResult && (
        <PreviewResults 
          result={previewResult} 
          showUpgrade={showUpgradePrompt}
          onSignUp={() => window.location.href = '/auth/register'}
        />
      )}
      
      {/* Social Proof */}
      <SocialProofSection />
    </div>
  );
};

const features = [
  {
    icon: Target,
    title: 'Niche-Specific Trends',
    description: 'Get trending topics tailored to your exact niche and audience, not generic viral content.'
  },
  {
    icon: Sparkles,
    title: 'AI Content Generation',
    description: 'Transform trends into platform-ready content in seconds with our advanced AI engine.'
  },
  {
    icon: Globe,
    title: 'Multi-Platform Support',
    description: 'Create optimized content for Instagram, TikTok, YouTube, LinkedIn, and more.'
  },
  {
    icon: BarChart3,
    title: 'Viral Score Prediction',
    description: 'Know which content has the highest potential to go viral before you post.'
  }
];

const steps = [
  {
    step: '01',
    title: 'Paste Your URL',
    description: 'Add your social media or website URL for analysis'
  },
  {
    step: '02', 
    title: 'AI Analyzes Your Niche',
    description: 'Our AI detects your content style, audience, and niche'
  },
  {
    step: '03',
    title: 'Get Personalized Trends',
    description: 'Receive trending topics + AI-generated content for your platforms'
  }
];

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started',
    features: [
      '10 content generations/month',
      '1 account analysis',
      'Basic trend discovery',
      'Standard support'
    ],
    cta: 'Start Free',
    popular: false
  },
  {
    name: 'Starter',
    price: '$9.99',
    period: 'month',
    description: 'For growing creators',
    features: [
      '100 content generations/month',
      '5 account analyses',
      'Advanced trend filtering',
      'Multiple content variations',
      'Priority support'
    ],
    cta: 'Start 7-Day Trial',
    popular: true
  },
  {
    name: 'Pro',
    price: '$19.99',
    period: 'month',
    description: 'For serious content creators',
    features: [
      'Unlimited content generations',
      'Unlimited account analyses',
      'Premium trend insights',
      'Content scheduling',
      'API access',
      '24/7 support'
    ],
    cta: 'Start 7-Day Trial',
    popular: false
  }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50 py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
              🚀 Join 2,000+ creators already using TrenAI
            </Badge>
          </div>
          <HeroAnalysisSection />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Everything you need to create viral content
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI understands your niche and creates content that resonates with your specific audience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              How TrenAI Works
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              From analysis to viral content in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="h-full border-0 shadow-sm">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mb-4">
                      <span className="text-white text-xl font-bold">{step.step}</span>
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center">{step.description}</p>
                  </CardContent>
                </Card>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-4 h-8 w-8 text-gray-300 transform -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Choose Your Plan
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Start free, upgrade when you're ready to scale
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={cn(
                "relative overflow-hidden",
                plan.popular && "border-2 border-blue-500 shadow-lg scale-105"
              )}>
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-blue-500 text-white text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <CardHeader className={cn("text-center", plan.popular && "pt-8")}>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-600">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link href="/auth/register">{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-green-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
            Ready to create viral content?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are already turning trends into viral content with TrenAI.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg" asChild>
            <Link href="/auth/register">
              Start Creating Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">TrenAI</span>
              </div>
              <p className="text-gray-400">
                Turn trending topics into viral content with AI-powered personalization.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#features" className="hover:text-white">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/api" className="hover:text-white">API</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TrenAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}