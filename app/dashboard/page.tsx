'use client';

import { useEffect } from 'react';
import { useSession } from "next-auth/react";
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import NotificationToast from '@/components/ui/notification-toast';
import { useStore } from '@/lib/store';
import { dummyTrends, dummyGeneratedContent } from '@/lib/dummy-data';
import { TrendingUp, Sparkles, BarChart3, Clock, ArrowRight, Siren as Fire, Zap, ArrowUpRight } from 'lucide-react';

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;
  if (!session) {
    if (typeof window !== 'undefined') window.location.href = '/auth/login';
    return null;
  }

  const user = session.user;

  // Filter trends for user's niche
  const nicheTrends = dummyTrends.filter(trend => 
    trend.category === user.niche || 
    trend.keywords.some(keyword => 
      user.niche?.toLowerCase().includes(keyword.toLowerCase())
    )
  ).slice(0, 4);

  const recentGenerations = dummyGeneratedContent.slice(0, 3);

  const getMomentumIcon = (momentum: string) => {
    switch (momentum) {
      case 'Rising': return <Fire className="h-4 w-4 text-orange-500" />;
      case 'Peak': return <Zap className="h-4 w-4 text-yellow-500" />;
      default: return <TrendingUp className="h-4 w-4 text-blue-500" />;
    }
  };

  const getViralScoreColor = (score: number) => {
    if (score >= 90) return 'bg-red-100 text-red-800';
    if (score >= 80) return 'bg-orange-100 text-orange-800';
    if (score >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Welcome Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {user.name}! 👋
                </h1>
                <p className="text-gray-600 mt-1">
                  Ready to create viral content in{' '}
                  <Badge className="bg-blue-100 text-blue-800 font-medium">
                    {user.niche}
                  </Badge>
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex space-x-3">
                <Button variant="outline" asChild>
                  <Link href="/analysis">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Analyze URL
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/generate">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Content
                  </Link>
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Trends Today</p>
                      <p className="text-2xl font-bold text-gray-900">12</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">+3 from yesterday</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Content Generated</p>
                      <p className="text-2xl font-bold text-gray-900">{dummyGeneratedContent.length}</p>
                    </div>
                    <Sparkles className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">This week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Viral Score</p>
                      <p className="text-2xl font-bold text-gray-900">87</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-orange-600" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">+5 from last week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Plan Usage</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {user.plan === 'free' ? '7/10' : user.plan === 'starter' ? '23/100' : '∞'}
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-purple-600" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Generations this month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Trending Now Section */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Fire className="h-5 w-5 text-orange-500" />
                          Trending Now in {user.niche}
                        </CardTitle>
                        <CardDescription>
                          Hot topics perfect for your niche and audience
                        </CardDescription>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/trends">
                          View All
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {nicheTrends.map((trend) => (
                      <div
                        key={trend.id}
                        className="flex items-start justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium text-gray-900">{trend.title}</h3>
                            {getMomentumIcon(trend.momentum)}
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{trend.description}</p>
                          <div className="flex items-center gap-2">
                            <Badge className={getViralScoreColor(trend.viralScore)}>
                              {trend.viralScore}% viral
                            </Badge>
                            <span className="text-xs text-gray-500">{trend.timeAgo}</span>
                          </div>
                        </div>
                        <Button size="sm" asChild>
                          <Link href={`/generate?trend=${trend.id}`}>
                            Generate
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Recent Generations */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-green-500" />
                      Recent Generations
                    </CardTitle>
                    <CardDescription>
                      Your latest AI-generated content
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentGenerations.map((content) => (
                      <div
                        key={content.id}
                        className="p-4 rounded-lg border hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline">{content.platform}</Badge>
                          <span className="text-xs text-gray-500">
                            {new Date(content.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          {content.content.title || content.content.hook}
                        </p>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {content.content.caption || content.content.content}
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs text-green-600 font-medium">
                            {content.engagementPrediction} engagement
                          </span>
                          <ArrowUpRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    ))}
                    
                    <Button variant="outline" className="w-full" size="sm" asChild>
                      <Link href="/generate">
                        View All Generations
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Get started with these common tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-auto p-6 flex flex-col items-center space-y-2" asChild>
                    <Link href="/trends">
                      <TrendingUp className="h-8 w-8 text-blue-600" />
                      <span className="font-medium">Discover Trends</span>
                      <span className="text-xs text-gray-500">Find what's trending in your niche</span>
                    </Link>
                  </Button>
                  
                  <Button variant="outline" className="h-auto p-6 flex flex-col items-center space-y-2" asChild>
                    <Link href="/generate">
                      <Sparkles className="h-8 w-8 text-green-600" />
                      <span className="font-medium">Generate Content</span>
                      <span className="text-xs text-gray-500">Create AI-powered posts instantly</span>
                    </Link>
                  </Button>
                  
                  <Button variant="outline" className="h-auto p-6 flex flex-col items-center space-y-2" asChild>
                    <Link href="/analysis">
                      <BarChart3 className="h-8 w-8 text-orange-600" />
                      <span className="font-medium">Analyze Account</span>
                      <span className="text-xs text-gray-500">Add more social accounts</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <NotificationToast />
    </div>
  );
}