'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
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
import { platformOptions, nicheCategories } from '@/lib/dummy-data';
import { 
  User, 
  Bell, 
  Link as LinkIcon, 
  CreditCard,
  Settings as SettingsIcon,
  Save,
  Trash2,
  Plus
} from 'lucide-react';

export default function SettingsPage() {
  const { user, setUser, addNotification, isAuthenticated } = useStore();
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    niche: user?.niche || '',
    bio: '',
    website: ''
  });

  const [notifications, setNotifications] = useState({
    trendAlerts: true,
    contentReminders: false,
    weeklyDigest: true,
    marketing: false
  });

  const [connectedAccounts, setConnectedAccounts] = useState([
    { platform: 'Instagram', username: '@sarahfitlife', connected: true },
    { platform: 'TikTok', username: '@sarah_fitness', connected: false }
  ]);

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/auth/login';
      return;
    }
  }, [isAuthenticated]);

  const handleProfileUpdate = () => {
    if (user) {
      setUser({ ...user, name: profileData.name, niche: profileData.niche });
    }
    addNotification({
      type: 'success',
      message: 'Profile updated successfully!'
    });
  };

  const handleNotificationUpdate = () => {
    addNotification({
      type: 'success',
      message: 'Notification preferences updated!'
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
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600 mt-1">
                Manage your account preferences and integrations
              </p>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
              </TabsList>

              {/* Profile Settings */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Profile Information
                    </CardTitle>
                    <CardDescription>
                      Update your personal information and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="niche">Primary Niche</Label>
                      <Select value={profileData.niche} onValueChange={(value) => setProfileData(prev => ({ ...prev, niche: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your niche" />
                        </SelectTrigger>
                        <SelectContent>
                          {nicheCategories.map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                        placeholder="Tell us about yourself and your content..."
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={profileData.website}
                        onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                        placeholder="https://yourwebsite.com"
                      />
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Current Plan</p>
                        <Badge className="mt-1 bg-blue-100 text-blue-800">
                          {user.plan?.toUpperCase()} Plan
                        </Badge>
                      </div>
                      <Button onClick={handleProfileUpdate}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notification Settings */}
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notification Preferences
                    </CardTitle>
                    <CardDescription>
                      Choose when and how you want to be notified
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium">Trend Alerts</p>
                          <p className="text-xs text-gray-500">
                            Get notified when new trends appear in your niche
                          </p>
                        </div>
                        <Switch
                          checked={notifications.trendAlerts}
                          onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, trendAlerts: checked }))}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium">Content Generation Reminders</p>
                          <p className="text-xs text-gray-500">
                            Remind you to create content based on trending topics
                          </p>
                        </div>
                        <Switch
                          checked={notifications.contentReminders}
                          onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, contentReminders: checked }))}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium">Weekly Digest</p>
                          <p className="text-xs text-gray-500">
                            Weekly summary of your performance and insights
                          </p>
                        </div>
                        <Switch
                          checked={notifications.weeklyDigest}
                          onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, weeklyDigest: checked }))}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium">Marketing Communications</p>
                          <p className="text-xs text-gray-500">
                            Product updates, tips, and promotional emails
                          </p>
                        </div>
                        <Switch
                          checked={notifications.marketing}
                          onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, marketing: checked }))}
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <Button onClick={handleNotificationUpdate}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Preferences
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Integration Settings */}
              <TabsContent value="integrations">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <LinkIcon className="h-5 w-5" />
                        Connected Accounts
                      </CardTitle>
                      <CardDescription>
                        Manage your social media connections for better analysis
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {connectedAccounts.map((account, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                {account.platform === 'Instagram' && '📷'}
                                {account.platform === 'TikTok' && '🎵'}
                                {account.platform === 'YouTube' && '📺'}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{account.platform}</p>
                                <p className="text-sm text-gray-500">{account.username}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {account.connected ? (
                                <Badge className="bg-green-100 text-green-800">Connected</Badge>
                              ) : (
                                <Badge variant="outline">Not Connected</Badge>
                              )}
                              <Button
                                variant={account.connected ? "destructive" : "default"}
                                size="sm"
                              >
                                {account.connected ? 'Disconnect' : 'Connect'}
                              </Button>
                            </div>
                          </div>
                        ))}
                        
                        <Button variant="outline" className="w-full">
                          <Plus className="mr-2 h-4 w-4" />
                          Add New Account
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>API Access</CardTitle>
                      <CardDescription>
                        Manage your API keys and webhooks (Pro plan feature)
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {user.plan === 'pro' ? (
                        <div className="space-y-4">
                          <div className="p-4 bg-gray-50 rounded-lg border">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-gray-900">API Key</p>
                                <p className="text-sm text-gray-500 font-mono">tk_•••••••••••••••••••••••••••••••••••5f2a</p>
                              </div>
                              <Button variant="outline" size="sm">
                                Copy Key
                              </Button>
                            </div>
                          </div>
                          <Button variant="outline">
                            Generate New Key
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-600 mb-4">
                            API access is available with Pro plan
                          </p>
                          <Button>Upgrade to Pro</Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Billing Settings */}
              <TabsContent value="billing">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Subscription Details
                      </CardTitle>
                      <CardDescription>
                        Manage your subscription and billing information
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div>
                            <h3 className="font-medium text-blue-900">{user.plan?.toUpperCase()} Plan</h3>
                            <p className="text-sm text-blue-700">
                              {user.plan === 'free' ? 'Free forever' : 
                               user.plan === 'starter' ? '$9.99/month' : '$19.99/month'}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-blue-700">Next billing date</p>
                            <p className="font-medium text-blue-900">
                              {user.plan === 'free' ? 'N/A' : 'Feb 15, 2024'}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                            <span className="font-medium">Upgrade Plan</span>
                            <span className="text-xs text-gray-500">Get more features and limits</span>
                          </Button>
                          <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                            <span className="font-medium">View Billing History</span>
                            <span className="text-xs text-gray-500">Download invoices and receipts</span>
                          </Button>
                        </div>

                        {user.plan !== 'free' && (
                          <div className="pt-4 border-t">
                            <Button variant="destructive" size="sm">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Cancel Subscription
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Usage Statistics</CardTitle>
                      <CardDescription>
                        Your current usage and limits for this billing period
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Content Generations</span>
                          <span className="font-medium">
                            {user.plan === 'free' ? '7/10' : 
                             user.plan === 'starter' ? '23/100' : 'Unlimited'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Account Analyses</span>
                          <span className="font-medium">
                            {user.plan === 'free' ? '1/1' : 
                             user.plan === 'starter' ? '3/5' : 'Unlimited'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">API Calls</span>
                          <span className="font-medium">
                            {user.plan === 'pro' ? '1,234/10,000' : 'Not available'}
                          </span>
                        </div>
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