'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import NotificationToast from '@/components/ui/notification-toast';
import { useStore } from '@/lib/store';
import { dummyTrends, nicheCategories } from '@/lib/dummy-data';
import { Search, Filter, Bookmark, BookmarkCheck, TrendingUp, Siren as Fire, Zap, ArrowDown, RefreshCw, Sparkles, Clock, Users, Globe } from 'lucide-react';

export default function TrendsPage() {
  const {
    user,
    trends,
    filteredTrends,
    trendFilters,
    bookmarkedTrends,
    setTrends,
    filterTrends,
    bookmarkTrend,
    addNotification,
    isAuthenticated
  } = useStore();

  const [selectedTrend, setSelectedTrend] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/auth/login';
      return;
    }

    if (trends.length === 0) {
      setTrends(dummyTrends);
    }
  }, [isAuthenticated, trends.length, setTrends]);

  const handleFilterChange = (field: string, value: string) => {
    const newFilters = { ...trendFilters, [field]: value };
    filterTrends(newFilters);
  };

  const handleBookmark = (trendId: string) => {
    bookmarkTrend(trendId);
    const isBookmarked = bookmarkedTrends.includes(trendId);
    addNotification({
      type: 'success',
      message: isBookmarked ? 'Trend removed from bookmarks' : 'Trend bookmarked successfully'
    });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      addNotification({
        type: 'info',
        message: 'Trends updated with latest data'
      });
    }, 1000);
  };

  const getMomentumIcon = (momentum: string) => {
    switch (momentum) {
      case 'Rising': return <Fire className="h-4 w-4 text-orange-500" />;
      case 'Peak': return <Zap className="h-4 w-4 text-yellow-500" />;
      case 'Declining': return <ArrowDown className="h-4 w-4 text-gray-500" />;
      default: return <TrendingUp className="h-4 w-4 text-blue-500" />;
    }
  };

  const getViralScoreColor = (score: number) => {
    if (score >= 90) return 'bg-red-100 text-red-800 border-red-200';
    if (score >= 80) return 'bg-orange-100 text-orange-800 border-orange-200';
    if (score >= 70) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-green-100 text-green-800 border-green-200';
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
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Trending in {user.niche}
                </h1>
                <p className="text-gray-600 mt-1">
                  Discover the hottest topics in your niche and beyond
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={refreshing}
                >
                  <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                <span className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleTimeString()}
                </span>
              </div>
            </div>

            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search trends..."
                        value={trendFilters.search}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select
                    value={trendFilters.category}
                    onValueChange={(value) => handleFilterChange('category', value)}
                  >
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Categories</SelectItem>
                      {nicheCategories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={trendFilters.momentum}
                    onValueChange={(value) => handleFilterChange('momentum', value)}
                  >
                    <SelectTrigger className="w-full sm:w-32">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Rising">Rising</SelectItem>
                      <SelectItem value="Peak">Peak</SelectItem>
                      <SelectItem value="Declining">Declining</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Trends Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTrends.map((trend) => (
                <Card key={trend.id} className="hover:shadow-md transition-shadow cursor-pointer group">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getMomentumIcon(trend.momentum)}
                          <span className="text-xs font-medium text-gray-600">
                            {trend.momentum}
                          </span>
                          <Badge className={`text-xs font-medium border ${getViralScoreColor(trend.viralScore)}`}>
                            {trend.viralScore}%
                          </Badge>
                        </div>
                        <CardTitle className="text-lg leading-tight group-hover:text-blue-600 transition-colors">
                          {trend.title}
                        </CardTitle>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookmark(trend.id);
                        }}
                        className="ml-2 h-8 w-8 p-0"
                      >
                        {bookmarkedTrends.includes(trend.id) ? (
                          <BookmarkCheck className="h-4 w-4 text-blue-600" />
                        ) : (
                          <Bookmark className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {trend.description}
                    </CardDescription>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {trend.category}
                        </Badge>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {trend.timeAgo}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                {getMomentumIcon(trend.momentum)}
                                {trend.title}
                              </DialogTitle>
                              <DialogDescription className="text-base">
                                {trend.description}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6 mt-6">
                              <div className="flex items-center gap-4">
                                <Badge className={`font-medium border ${getViralScoreColor(trend.viralScore)}`}>
                                  {trend.viralScore}% Viral Score
                                </Badge>
                                <Badge variant="outline">{trend.category}</Badge>
                                <div className="flex items-center text-sm text-gray-500">
                                  <Globe className="h-4 w-4 mr-1" />
                                  {trend.region}
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="font-medium text-gray-900 mb-2">Why it's trending</h4>
                                <p className="text-gray-600">{trend.whyTrending}</p>
                              </div>
                              
                              <div>
                                <h4 className="font-medium text-gray-900 mb-2">Keywords</h4>
                                <div className="flex flex-wrap gap-2">
                                  {trend.keywords.map((keyword) => (
                                    <Badge key={keyword} variant="outline" className="text-xs">
                                      {keyword}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="font-medium text-gray-900 mb-2">Related Trends</h4>
                                <div className="space-y-2">
                                  {trend.relatedTrends.map((related) => (
                                    <div key={related} className="text-sm text-blue-600 hover:underline cursor-pointer">
                                      {related}
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="flex gap-3 pt-4 border-t">
                                <Button className="flex-1" asChild>
                                  <Link href={`/generate?trend=${trend.id}`}>
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    Generate Content
                                  </Link>
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() => handleBookmark(trend.id)}
                                >
                                  {bookmarkedTrends.includes(trend.id) ? (
                                    <BookmarkCheck className="h-4 w-4" />
                                  ) : (
                                    <Bookmark className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        <Button size="sm" asChild>
                          <Link href={`/generate?trend=${trend.id}`}>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Generate
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTrends.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No trends found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your filters or search terms
                  </p>
                  <Button onClick={() => filterTrends({ category: 'All', momentum: 'All', search: '' })}>
                    Clear Filters
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