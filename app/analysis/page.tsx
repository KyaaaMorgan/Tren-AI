'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import NotificationToast from '@/components/ui/notification-toast';
import { useStore } from '@/lib/store';
import { dummyUserAnalyses } from '@/lib/dummy-data';
import { 
  Search, 
  Globe, 
  Instagram, 
  Youtube, 
  Linkedin,
  ExternalLink,
  BarChart3,
  Users,
  MessageCircle,
  Target,
  Loader2,
  CheckCircle,
  Trash2
} from 'lucide-react';

export default function AnalysisPage() {
  const { 
    user, 
    userAnalyses, 
    addAnalysis, 
    addNotification, 
    isAuthenticated 
  } = useStore();
  
  const [newUrl, setNewUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/auth/login';
      return;
    }
  }, [isAuthenticated]);

  const detectPlatform = (url: string) => {
    if (url.includes('instagram.com')) return 'Instagram';
    if (url.includes('youtube.com')) return 'YouTube';
    if (url.includes('linkedin.com')) return 'LinkedIn';
    if (url.includes('tiktok.com')) return 'TikTok';
    if (url.includes('twitter.com') || url.includes('x.com')) return 'X';
    return 'Website';
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return <Instagram className="h-5 w-5 text-pink-600" />;
      case 'youtube': return <Youtube className="h-5 w-5 text-red-600" />;
      case 'linkedin': return <Linkedin className="h-5 w-5 text-blue-600" />;
      default: return <Globe className="h-5 w-5 text-gray-600" />;
    }
  };

  const handleAnalyze = async () => {
    if (!newUrl) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis process
    setTimeout(() => {
      const platform = detectPlatform(newUrl);
      const mockAnalysis = {
        id: Date.now().toString(),
        platform,
        url: newUrl,
        niche: platform === 'Instagram' ? 'Health & Fitness' : 'Technology & AI',
        confidence: 0.88 + Math.random() * 0.1,
        brandVoice: platform === 'Instagram' 
          ? ['Motivational', 'Educational', 'Energetic'] 
          : ['Professional', 'Analytical', 'Forward-thinking'],
        audienceInsights: {
          demographics: platform === 'Instagram' 
            ? 'Women 25-35, Health enthusiasts' 
            : 'Tech professionals 28-45',
          interests: platform === 'Instagram'
            ? ['Fitness', 'Nutrition', 'Wellness']
            : ['AI/ML', 'Technology', 'Innovation']
        },
        contentThemes: platform === 'Instagram'
          ? ['Workout routines', 'Healthy recipes', 'Motivation']
          : ['Tech trends', 'AI developments', 'Industry insights'],
        createdAt: new Date()
      };

      addAnalysis(mockAnalysis);
      setSelectedAnalysis(mockAnalysis);
      setIsAnalyzing(false);
      setNewUrl('');
      
      addNotification({
        type: 'success',
        message: 'Account analysis completed successfully!'
      });
    }, 3000);
  };

  if (!isAuthenticated || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Account Analysis</h1>
                <p className="text-gray-600 mt-1">
                  Analyze social media accounts and websites to understand content strategy
                </p>
              </div>
            </div>

            {/* New Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-blue-600" />
                  Analyze New Account
                </CardTitle>
                <CardDescription>
                  Add a social media profile or website URL for AI-powered analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="url">Social Media or Website URL</Label>
                    <div className="flex gap-3">
                      <Input
                        id="url"
                        value={newUrl}
                        onChange={(e) => setNewUrl(e.target.value)}
                        placeholder="e.g., instagram.com/username or yourblog.com"
                        className="flex-1"
                        disabled={isAnalyzing}
                      />
                      <Button 
                        onClick={handleAnalyze}
                        disabled={!newUrl || isAnalyzing}
                        className="px-6"
                      >
                        {isAnalyzing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Search className="mr-2 h-4 w-4" />
                            Analyze
                          </>
                        )}
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500">
                      We support Instagram, YouTube, LinkedIn, TikTok, X, and any website URL
                    </p>
                  </div>

                  {isAnalyzing && (
                    <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
                        </div>
                        <h3 className="text-lg font-medium text-blue-900 mb-2">
                          Analyzing {detectPlatform(newUrl)} account...
                        </h3>
                        <div className="space-y-2 text-sm text-blue-700">
                          <p>✓ Fetching content and metadata</p>
                          <p>✓ Analyzing content themes and topics</p>
                          <p>→ Detecting niche and audience insights...</p>
                          <p className="text-blue-600">→ Generating brand voice analysis...</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Analysis Results */}
            {selectedAnalysis && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Analysis Results
                  </CardTitle>
                  <CardDescription>
                    Latest analysis for {selectedAnalysis.url}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Main Analysis */}
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-3">
                          {getPlatformIcon(selectedAnalysis.platform)}
                          <div>
                            <h3 className="font-medium text-green-900">
                              {selectedAnalysis.platform} Account
                            </h3>
                            <p className="text-sm text-green-700">{selectedAnalysis.url}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900">Detected Niche</h4>
                          <Badge className="bg-blue-100 text-blue-800">
                            {Math.round(selectedAnalysis.confidence * 100)}% confidence
                          </Badge>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-xl font-bold text-blue-900 mb-2">
                            {selectedAnalysis.niche}
                          </p>
                          <Progress 
                            value={selectedAnalysis.confidence * 100} 
                            className="h-2 mb-2" 
                          />
                          <p className="text-sm text-blue-700">
                            High confidence based on content analysis and audience signals
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Brand Voice Characteristics</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedAnalysis.brandVoice.map((trait) => (
                            <Badge key={trait} variant="outline" className="bg-gray-50">
                              {trait}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Audience Insights */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Audience Insights
                        </h4>
                        <div className="p-4 bg-gray-50 rounded-lg border">
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm font-medium text-gray-700">Demographics</p>
                              <p className="text-sm text-gray-600">{selectedAnalysis.audienceInsights.demographics}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700">Primary Interests</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {selectedAnalysis.audienceInsights.interests.map((interest) => (
                                  <Badge key={interest} variant="outline" className="text-xs">
                                    {interest}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                          <MessageCircle className="h-4 w-4" />
                          Content Themes
                        </h4>
                        <div className="space-y-2">
                          {selectedAnalysis.contentThemes.map((theme, index) => (
                            <div key={theme} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <span className="text-sm text-gray-700">{theme}</span>
                              <Badge variant="outline" className="text-xs">
                                {Math.floor(Math.random() * 30) + 10}% of content
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                          <Target className="h-4 w-4" />
                          Recommendations
                        </h4>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p>• Focus on morning routine content for higher engagement</p>
                          <p>• Increase educational carousel posts by 30%</p>
                          <p>• Consider collaboration with similar accounts</p>
                          <p>• Optimal posting time: 2-4 PM weekdays</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Previous Analyses */}
            {userAnalyses.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Previous Analyses</CardTitle>
                  <CardDescription>
                    Your account analysis history
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userAnalyses.map((analysis) => (
                      <div
                        key={analysis.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          {getPlatformIcon(analysis.platform)}
                          <div>
                            <p className="font-medium text-gray-900">{analysis.url}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">{analysis.niche}</Badge>
                              <span className="text-sm text-gray-500">
                                {Math.round(analysis.confidence * 100)}% confidence
                              </span>
                              <span className="text-sm text-gray-500">
                                {new Date(analysis.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedAnalysis(analysis)}
                          >
                            <BarChart3 className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Empty State */}
            {userAnalyses.length === 0 && !selectedAnalysis && (
              <Card>
                <CardContent className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No analyses yet
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Start by analyzing your first social media account or website
                  </p>
                  <Button>
                    <Search className="mr-2 h-4 w-4" />
                    Analyze Your First Account
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
      <NotificationToast />
    </div>
  );
}