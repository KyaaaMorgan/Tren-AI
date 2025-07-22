'use client';

import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import NotificationToast from '@/components/ui/notification-toast';
import { useStore } from '@/lib/store';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Sparkles,
  Target,
  Calendar,
  Download,
  Share2
} from 'lucide-react';

// Sample analytics data
const contentGenerationData = [
  { month: 'Jan', generations: 15, viral: 8 },
  { month: 'Feb', generations: 23, viral: 12 },
  { month: 'Mar', generations: 35, viral: 19 },
  { month: 'Apr', generations: 28, viral: 15 },
  { month: 'May', generations: 42, viral: 25 },
  { month: 'Jun', generations: 38, viral: 22 },
];

const platformData = [
  { name: 'Instagram', value: 35, color: '#E91E63' },
  { name: 'TikTok', value: 25, color: '#000000' },
  { name: 'YouTube', value: 20, color: '#FF0000' },
  { name: 'LinkedIn', value: 12, color: '#0A66C2' },
  { name: 'Blog', value: 8, color: '#00D084' },
];

const viralScoreData = [
  { range: '90-100%', count: 8 },
  { range: '80-89%', count: 15 },
  { range: '70-79%', count: 22 },
  { range: '60-69%', count: 18 },
  { range: '50-59%', count: 7 },
];

const trendsPerformanceData = [
  { week: 'Week 1', trending: 12, used: 8, viral: 5 },
  { week: 'Week 2', trending: 18, used: 12, viral: 7 },
  { week: 'Week 3', trending: 15, used: 10, viral: 6 },
  { week: 'Week 4', trending: 21, used: 15, viral: 9 },
];

export default function AnalyticsPage() {
  const { user, generatedContent, trends, isAuthenticated } = useStore();

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/auth/login';
      return;
    }
  }, [isAuthenticated]);

  if (!isAuthenticated || !user) {
    return <div>Loading...</div>;
  }

  const totalGenerations = generatedContent.length;
  const thisMonthGenerations = generatedContent.filter(
    content => new Date(content.createdAt).getMonth() === new Date().getMonth()
  ).length;
  const avgViralScore = generatedContent.reduce((acc, content) => acc + (content.viralScore || 0), 0) / generatedContent.length || 0;
  const trendsViewed = trends.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
                <p className="text-gray-600 mt-1">
                  Track your content performance and discover insights
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex space-x-3">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
                <Button variant="outline">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Report
                </Button>
              </div>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Generated</p>
                      <p className="text-2xl font-bold text-gray-900">{totalGenerations}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Sparkles className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Badge className="bg-green-100 text-green-800">
                      +{thisMonthGenerations} this month
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Viral Score</p>
                      <p className="text-2xl font-bold text-gray-900">{Math.round(avgViralScore)}%</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Progress value={avgViralScore} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Trends Explored</p>
                      <p className="text-2xl font-bold text-gray-900">{trendsViewed}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Eye className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Badge className="bg-blue-100 text-blue-800">
                      +5 this week
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Success Rate</p>
                      <p className="text-2xl font-bold text-gray-900">94%</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Target className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Badge className="bg-green-100 text-green-800">
                      +2% from last month
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="content">Content Performance</TabsTrigger>
                <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Content Generation Over Time */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Content Generation Trend</CardTitle>
                      <CardDescription>
                        Monthly content generation and viral success rate
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={contentGenerationData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="generations" 
                            stroke="#3B82F6" 
                            strokeWidth={2}
                            name="Total Generations"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="viral" 
                            stroke="#10B981" 
                            strokeWidth={2}
                            name="Viral Content"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Platform Distribution */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Platform Distribution</CardTitle>
                      <CardDescription>
                        Content generation by platform
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={platformData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}%`}
                          >
                            {platformData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Viral Score Distribution */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Viral Score Distribution</CardTitle>
                      <CardDescription>
                        Distribution of content by viral score ranges
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={viralScoreData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="range" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="count" fill="#3B82F6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Top Performing Content */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Top Performing Content</CardTitle>
                      <CardDescription>
                        Your highest scoring generated content
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {generatedContent.slice(0, 5).map((content, index) => (
                          <div key={content.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900 line-clamp-1">
                                {content.content.title || content.content.hook || 'Generated Content'}
                              </p>
                              <p className="text-xs text-gray-500">
                                {content.platform} • {new Date(content.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge className="bg-green-100 text-green-800">
                              {content.viralScore || 85}%
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="trends" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Trend Performance Analysis</CardTitle>
                    <CardDescription>
                      Weekly trend discovery and utilization metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <AreaChart data={trendsPerformanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="trending" 
                          stackId="1" 
                          stroke="#3B82F6" 
                          fill="#3B82F6" 
                          fillOpacity={0.3}
                          name="Trends Discovered"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="used" 
                          stackId="2" 
                          stroke="#10B981" 
                          fill="#10B981" 
                          fillOpacity={0.3}
                          name="Trends Used"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="viral" 
                          stackId="3" 
                          stroke="#F59E0B" 
                          fill="#F59E0B" 
                          fillOpacity={0.3}
                          name="Viral Success"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="insights" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Insights and Recommendations */}
                  <Card>
                    <CardHeader>
                      <CardTitle>AI Insights</CardTitle>
                      <CardDescription>
                        Personalized recommendations based on your performance
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                              <TrendingUp className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-green-900">Peak Performance Window</h4>
                              <p className="text-sm text-green-700 mt-1">
                                Your content performs best when posted between 2-4 PM on weekdays. 
                                Consider scheduling your content during these hours.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <Target className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-blue-900">Top Performing Content Type</h4>
                              <p className="text-sm text-blue-700 mt-1">
                                Instagram carousels generate 40% higher engagement than single posts. 
                                Consider creating more educational carousel content.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                              <Sparkles className="h-4 w-4 text-orange-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-orange-900">Trending Opportunity</h4>
                              <p className="text-sm text-orange-700 mt-1">
                                3 new trends in your niche are gaining momentum. 
                                Act fast to capitalize on early adoption benefits.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Content Calendar */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Opportunities</CardTitle>
                      <CardDescription>
                        Trending topics and optimal posting times
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Morning Routine Trends</p>
                            <p className="text-xs text-gray-600">Peak time: Tomorrow 2-4 PM</p>
                          </div>
                          <Badge className="bg-red-100 text-red-800">96% viral</Badge>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-gray-900">AI Productivity Tools</p>
                            <p className="text-xs text-gray-600">Peak time: Friday 1-3 PM</p>
                          </div>
                          <Badge className="bg-orange-100 text-orange-800">89% viral</Badge>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Healthy Meal Prep</p>
                            <p className="text-xs text-gray-600">Peak time: Sunday 11 AM-1 PM</p>
                          </div>
                          <Badge className="bg-yellow-100 text-yellow-800">82% viral</Badge>
                        </div>

                        <Button variant="outline" className="w-full" size="sm">
                          <Calendar className="mr-2 h-4 w-4" />
                          View Full Calendar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <NotificationToast />
    </div>
  );
}