'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useStore } from '@/lib/store';
import { dummyUserAnalyses, platformOptions, nicheCategories } from '@/lib/dummy-data';
import { TrendingUp, ArrowRight, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';

const steps = [
  { id: 1, title: 'Account Analysis', description: 'Let us analyze your content' },
  { id: 2, title: 'Niche Confirmation', description: 'Confirm your detected niche' },
  { id: 3, title: 'Platform Preferences', description: 'Choose your platforms' },
  { id: 4, title: 'Setup Complete', description: 'Ready to create content' }
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisUrl, setAnalysisUrl] = useState('');
  const [detectedNiche, setDetectedNiche] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const { user, setUser, addAnalysis, addNotification } = useStore();
  const router = useRouter();

  const handleUrlAnalysis = async () => {
    if (!analysisUrl) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      const analysis = dummyUserAnalyses[0]; // Use first dummy analysis
      setDetectedNiche(analysis.niche);
      addAnalysis(analysis);
      setIsAnalyzing(false);
      setCurrentStep(2);
      addNotification({
        type: 'success',
        message: 'Account analyzed successfully!'
      });
    }, 3000);
  };

  const handleNicheConfirmation = () => {
    if (user) {
      setUser({ ...user, niche: detectedNiche });
    }
    setCurrentStep(3);
  };

  const handlePlatformSelection = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId)
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    );
  };

  const completeOnboarding = () => {
    if (user) {
      setUser({ 
        ...user, 
        platforms: selectedPlatforms,
        onboardingComplete: true 
      });
    }
    addNotification({
      type: 'success',
      message: 'Welcome to TrenAI! Your account is now set up.'
    });
    router.push('/dashboard');
  };

  const progressPercentage = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">TrenAI</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Let's get you set up</h1>
            <p className="text-gray-600">We'll analyze your content and personalize TrenAI for you</p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Step {currentStep} of {steps.length}</span>
              <span>{Math.round(progressPercentage)}% complete</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            
            <div className="flex justify-between mt-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center text-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep > step.id 
                      ? 'bg-green-500 text-white' 
                      : currentStep === step.id 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-600'
                  }`}>
                    {currentStep > step.id ? <CheckCircle className="h-4 w-4" /> : step.id}
                  </div>
                  <div className="mt-2 hidden sm:block">
                    <p className="text-xs font-medium text-gray-900">{step.title}</p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <Card>
            <CardHeader>
              <CardTitle>{steps[currentStep - 1].title}</CardTitle>
              <CardDescription>{steps[currentStep - 1].description}</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Step 1: URL Analysis */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="url">Your Social Media or Website URL</Label>
                    <Input
                      id="url"
                      value={analysisUrl}
                      onChange={(e) => setAnalysisUrl(e.target.value)}
                      placeholder="e.g., instagram.com/yourhandle or yourblog.com"
                      disabled={isAnalyzing}
                    />
                    <p className="text-sm text-gray-500">
                      We'll analyze your content to understand your niche and audience
                    </p>
                  </div>

                  {isAnalyzing && (
                    <div className="text-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Analyzing your content...</h3>
                      <p className="text-gray-600">This may take a few moments</p>
                      <div className="mt-4 space-y-2 text-sm text-gray-500">
                        <p>✓ Fetching your content</p>
                        <p>✓ Analyzing themes and topics</p>
                        <p>→ Detecting your niche...</p>
                      </div>
                    </div>
                  )}

                  <Button 
                    onClick={handleUrlAnalysis} 
                    className="w-full" 
                    disabled={!analysisUrl || isAnalyzing}
                  >
                    {isAnalyzing ? 'Analyzing...' : 'Analyze My Account'}
                    {!isAnalyzing && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              )}

              {/* Step 2: Niche Confirmation */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Analysis Complete!</h3>
                    <p className="text-gray-600">We've detected your primary niche</p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900">Detected Niche</h4>
                      <Badge className="bg-green-100 text-green-800">92% Confidence</Badge>
                    </div>
                    <p className="text-2xl font-bold text-blue-900 mb-2">{detectedNiche}</p>
                    <p className="text-sm text-blue-700">
                      Based on your content themes: morning routines, quick workouts, healthy recipes, motivation
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Secondary Topics</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Productivity', 'Wellness', 'Lifestyle', 'Nutrition'].map(topic => (
                        <Badge key={topic} variant="outline">{topic}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Re-analyze
                    </Button>
                    <Button onClick={handleNicheConfirmation} className="flex-1">
                      Confirm Niche
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Platform Selection */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Which platforms do you create content for?
                    </h3>
                    <p className="text-gray-600">
                      Select all platforms where you want to generate content
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {platformOptions.map(platform => (
                      <div
                        key={platform.id}
                        className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedPlatforms.includes(platform.id)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handlePlatformSelection(platform.id)}
                      >
                        <Checkbox
                          checked={selectedPlatforms.includes(platform.id)}
                          onChange={() => {}}
                        />
                        <span className="text-xl">{platform.icon}</span>
                        <span className="font-medium text-gray-900">{platform.name}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button 
                      onClick={() => setCurrentStep(4)} 
                      className="flex-1"
                      disabled={selectedPlatforms.length === 0}
                    >
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: Complete */}
              {currentStep === 4 && (
                <div className="space-y-6 text-center">
                  <div className="py-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">You're all set!</h3>
                    <p className="text-gray-600">Your TrenAI account is configured and ready to use</p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-6 border">
                    <h4 className="font-medium text-gray-900 mb-4">Your Setup Summary</h4>
                    <div className="space-y-3 text-left">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Niche:</span>
                        <span className="font-medium text-gray-900">{detectedNiche}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Platforms:</span>
                        <span className="font-medium text-gray-900">{selectedPlatforms.length} selected</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Plan:</span>
                        <Badge>{user?.plan?.toUpperCase()}</Badge>
                      </div>
                    </div>
                  </div>

                  <Button onClick={completeOnboarding} className="w-full" size="lg">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}