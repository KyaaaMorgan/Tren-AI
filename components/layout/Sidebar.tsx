'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard, TrendingUp, Sparkles, BarChart3,
  Search, Settings, CreditCard, HelpCircle, ChevronLeft, ChevronRight
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Trends', href: '/trends', icon: TrendingUp },
  { name: 'Generate', href: '/generate', icon: Sparkles },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Analysis', href: '/analysis', icon: Search },
];

const secondaryNavigation = [
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Billing', href: '/billing', icon: CreditCard },
  { name: 'Help', href: '/help', icon: HelpCircle },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  // Optional: sembunyikan sidebar jika tidak login
  if (!user) return null;

  const planLimits: Record<string, number> = {
    free: 10,
    starter: 100,
    pro: 1000
  };

  // Dummy usage percentage jika kamu masih pakai local state:
  const currentLimit = planLimits[user.plan || 'free'] || 10;
  const monthlyGenerations = 0; // Ganti sesuai data kamu
  const usagePercentage = (monthlyGenerations / currentLimit) * 100;

  return (
    <div className={cn(
      "flex h-screen flex-col border-r bg-gray-50/40 transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            <span className="font-semibold text-gray-900">TrenAI</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 p-0"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <nav className="flex-1 space-y-1 p-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="p-4 space-y-4">
          <div className="rounded-lg bg-white p-4 shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Monthly Usage</span>
              <Badge variant="outline" className="text-xs">
                {user.plan?.toUpperCase() || 'FREE'}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Generations</span>
                <span className="font-medium">{monthlyGenerations}/{currentLimit}</span>
              </div>
              <Progress value={usagePercentage} className="h-2" />
            </div>
            {user.plan === 'free' && usagePercentage > 80 && (
              <Button size="sm" className="w-full mt-3" asChild>
                <Link href="/billing">Upgrade Plan</Link>
              </Button>
            )}
          </div>
        </div>
      )}

      <div className="border-t p-2">
        {secondaryNavigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
