'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import NotificationToast from '@/components/ui/notification-toast';
import { useStore } from '@/lib/store';
import { dummyTrends, platformOptions } from '@/lib/dummy-data';
import { 
  Sparkles, 
  Copy, 
  Download, 
  RefreshCw, 
  Save,
  Wand2,
  Clock,
  BarChart3,
  Eye,
  CheckCircle
} from 'lucide-react';

const contentTypes = {
  instagram: ['Post', 'Story', 'Reel', 'Carousel'],
  tiktok: ['Video', 'Trending'],
  youtube: ['Short', 'Video'],
  linkedin: ['Post', 'Article'],
  x: ['Thread', 'Post'],
  blog: ['Article', 'Newsletter'],
  newsletter: ['Issue', 'Campaign'],
} as const;
type Platform = keyof typeof contentTypes;

type SamplesType = {
  instagram?: Record<string, any>;
  tiktok?: Record<string, any>;
  blog?: Record<string, any>;
};



export default function GeneratePage() {
  const searchParams = useSearchParams();
  const trendId = searchParams.get('trend');
  
  const {
    user,
    trends,
    currentGeneration,
    setCurrentGeneration,
    addGeneratedContent,
    addNotification,
    isAuthenticated,
    setTrends
  } = useStore();

  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('instagram');
const [selectedContentType, setSelectedContentType] = useState<string>('Post');
  const [customTopic, setCustomTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedField, setCopiedField] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/auth/login';
      return;
    }

    if (trends.length === 0) {
      setTrends(dummyTrends);
    }
  }, [isAuthenticated, trends.length, setTrends]);

  const selectedTrend = trendId ? trends.find(t => t.id === trendId) : null;

  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const generatedContent = {
        id: Date.now().toString(),
        trendId: selectedTrend?.id || 'custom',
        platform: selectedPlatform,
        contentType: selectedContentType,
        content: generateSampleContent(selectedPlatform, selectedContentType, selectedTrend?.title || customTopic),
        estimatedReach: '15K-25K impressions',
        engagementPrediction: 'High',
        viralScore: Math.floor(Math.random() * 20) + 80,
        createdAt: new Date()
      };

      setCurrentGeneration(generatedContent);
      addGeneratedContent(generatedContent);
      setIsGenerating(false);
      
      addNotification({
        type: 'success',
        message: 'Content generated successfully!'
      });
    }, 2000);
  };

  const generateSampleContent = (platform: Platform, contentType: string, topic: string) => {
    const samples: Partial<Record<Platform, Record<string, any>>> = {
      instagram: { },
      tiktok: { },
      blog: { }
    };
  
    return samples[platform]?.[contentType] || {
      content: `AI-generated content about ${topic} for ${platform} ${contentType}`
    };
  };
  
  

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(''), 2000);
    addNotification({
      type: 'success',
      message: 'Copied to clipboard!'
    });
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
                <h1 className="text-2xl font-bold text-gray-900">
                  Generate Content
                </h1>
                <p className="text-gray-600 mt-1">
                  Transform trending topics into viral content with AI
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wand2 className="h-5 w-5 text-blue-600" />
                    Content Settings
                  </CardTitle>
                  <CardDescription>
                    Configure your content generation parameters
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Selected Trend or Custom Topic */}
                  {selectedTrend ? (
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-blue-100 text-blue-800">
                          {selectedTrend.viralScore}% viral
                        </Badge>
                        <span className="text-sm text-blue-700">{selectedTrend.momentum}</span>
                      </div>
                      <h3 className="font-medium text-blue-900 mb-1">{selectedTrend.title}</h3>
                      <p className="text-sm text-blue-700">{selectedTrend.description}</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="topic">Custom Topic</Label>
                      <Textarea
                        id="topic"
                        value={customTopic}
                        onChange={(e) => setCustomTopic(e.target.value)}
                        placeholder="Enter your topic or trend idea..."
                        rows={3}
                      />
                    </div>
                  )}

                  {/* Platform Selection */}
                  <div className="space-y-2">
                    <Label>Platform</Label>
                    <Tabs value={selectedPlatform} onValueChange={(value) => setSelectedPlatform(value as Platform)}>
                      <TabsList className="grid grid-cols-3 lg:grid-cols-4 gap-1">
                        {platformOptions.slice(0, 8).map(platform => (
                          <TabsTrigger key={platform.id} value={platform.id} className="text-xs">
                            <span className="mr-1">{platform.icon}</span>
                            <span className="hidden sm:inline">{platform.name}</span>
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </Tabs>
                  </div>

                  {/* Content Type */}
                  <div className="space-y-2">
                    <Label>Content Type</Label>
                    <Select value={selectedContentType} onValueChange={setSelectedContentType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(contentTypes[selectedPlatform] || ['Post']).map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Generate Button */}
                  <Button 
                    onClick={handleGenerate}
                    className="w-full"
                    disabled={isGenerating || (!selectedTrend && !customTopic)}
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Content
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Output Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-green-600" />
                    Generated Content
                  </CardTitle>
                  <CardDescription>
                    AI-powered content ready for your platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isGenerating ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="h-8 w-8 text-blue-600 animate-pulse" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Creating your content...
                      </h3>
                      <p className="text-gray-600">
                        Our AI is crafting the perfect content for your audience
                      </p>
                    </div>
                  ) : currentGeneration ? (
                    <div className="space-y-6">
                      {/* Content Preview */}
                      <div className="space-y-4">
                        {currentGeneration.content.hook && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label className="text-sm font-medium">Hook</Label>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(currentGeneration.content.hook!, 'hook')}
                              >
                                {copiedField === 'hook' ? (
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg border">
                              <p className="text-sm">{currentGeneration.content.hook}</p>
                            </div>
                          </div>
                        )}

                        {currentGeneration.content.caption && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label className="text-sm font-medium">Caption</Label>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(currentGeneration.content.caption!, 'caption')}
                              >
                                {copiedField === 'caption' ? (
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg border">
                              <pre className="text-sm whitespace-pre-wrap font-sans">
                                {currentGeneration.content.caption}
                              </pre>
                            </div>
                          </div>
                        )}

                        {currentGeneration.content.hashtags && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label className="text-sm font-medium">Hashtags</Label>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(currentGeneration.content.hashtags!, 'hashtags')}
                              >
                                {copiedField === 'hashtags' ? (
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg border">
                              <p className="text-sm text-blue-600">{currentGeneration.content.hashtags}</p>
                            </div>
                          </div>
                        )}

                        {currentGeneration.content.title && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label className="text-sm font-medium">Title</Label>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(currentGeneration.content.title!, 'title')}
                              >
                                {copiedField === 'title' ? (
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg border">
                              <p className="text-sm font-medium">{currentGeneration.content.title}</p>
                            </div>
                          </div>
                        )}

                        {currentGeneration.content.outline && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label className="text-sm font-medium">Outline</Label>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(currentGeneration.content.outline!, 'outline')}
                              >
                                {copiedField === 'outline' ? (
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg border">
                              <pre className="text-sm whitespace-pre-wrap font-sans">
                                {currentGeneration.content.outline}
                              </pre>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Performance Prediction */}
                      <div className="border-t pt-4">
                        <h4 className="font-medium text-gray-900 mb-3">Performance Prediction</h4>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                            <BarChart3 className="h-6 w-6 text-green-600 mx-auto mb-1" />
                            <p className="text-sm font-medium text-green-900">
                              {currentGeneration.viralScore}%
                            </p>
                            <p className="text-xs text-green-700">Viral Score</p>
                          </div>
                          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <Eye className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                            <p className="text-sm font-medium text-blue-900">
                              {currentGeneration.estimatedReach}
                            </p>
                            <p className="text-xs text-blue-700">Est. Reach</p>
                          </div>
                          <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                            <Sparkles className="h-6 w-6 text-orange-600 mx-auto mb-1" />
                            <p className="text-sm font-medium text-orange-900">
                              {currentGeneration.engagementPrediction}
                            </p>
                            <p className="text-xs text-orange-700">Engagement</p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <Button variant="outline" className="flex-1">
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Regenerate
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Save className="mr-2 h-4 w-4" />
                          Save to Library
                        </Button>
                        <Button className="flex-1">
                          <Download className="mr-2 h-4 w-4" />
                          Export All
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Wand2 className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Ready to generate content
                      </h3>
                      <p className="text-gray-600">
                        Select your settings and click generate to create AI-powered content
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
      <NotificationToast />
    </div>
  );
}