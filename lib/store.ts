'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  plan: 'free' | 'starter' | 'pro';
  niche?: string;
  platforms?: string[];
  onboardingComplete: boolean;
  createdAt: Date;
}

export interface Trend {
  id: string;
  title: string;
  description: string;
  category: string;
  viralScore: number;
  momentum: 'Rising' | 'Peak' | 'Declining';
  timeAgo: string;
  keywords: string[];
  whyTrending: string;
  relatedTrends: string[];
  region: string;
  isBookmarked?: boolean;
}

export interface GeneratedContent {
  id: string;
  trendId: string;
  platform: string;
  contentType: string;
  content: {
    hook?: string;
    title?: string;
    caption?: string;
    hashtags?: string;
    cta?: string;
    content?: string;
    outline?: string;
  };
  estimatedReach?: string;
  engagementPrediction?: string;
  viralScore?: number;
  createdAt: Date;
}

export interface UserAnalysis {
  id: string;
  platform: string;
  url: string;
  niche: string;
  confidence: number;
  brandVoice: string[];
  audienceInsights: {
    demographics: string;
    interests: string[];
  };
  contentThemes: string[];
  createdAt: Date;
}

interface AppState {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  userAnalyses: UserAnalysis[];
  
  // Trends state
  trends: Trend[];
  filteredTrends: Trend[];
  trendFilters: {
    category: string;
    momentum: string;
    search: string;
  };
  bookmarkedTrends: string[];
  
  // Content state
  generatedContent: GeneratedContent[];
  currentGeneration: GeneratedContent | null;
  
  // UI state
  isLoading: boolean;
  activeModal: string | null;
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'info';
    message: string;
  }>;
  
  // Actions
  setUser: (user: User | null) => void;
  setAuthenticated: (status: boolean) => void;
  addAnalysis: (analysis: UserAnalysis) => void;
  setTrends: (trends: Trend[]) => void;
  filterTrends: (filters: any) => void;
  bookmarkTrend: (trendId: string) => void;
  addGeneratedContent: (content: GeneratedContent) => void;
  setCurrentGeneration: (content: GeneratedContent | null) => void;
  setLoading: (loading: boolean) => void;
  setActiveModal: (modal: string | null) => void;
  addNotification: (notification: any) => void;
  removeNotification: (id: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      userAnalyses: [],
      trends: [],
      filteredTrends: [],
      trendFilters: {
        category: 'All',
        momentum: 'All',
        search: ''
      },
      bookmarkedTrends: [],
      generatedContent: [],
      currentGeneration: null,
      isLoading: false,
      activeModal: null,
      notifications: [],

      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setAuthenticated: (status) => set({ isAuthenticated: status }),
      addAnalysis: (analysis) => set((state) => ({
        userAnalyses: [...state.userAnalyses, analysis]
      })),
      setTrends: (trends) => set({ trends, filteredTrends: trends }),
      filterTrends: (filters) => {
        const { trends } = get();
        let filtered = trends;

        if (filters.category && filters.category !== 'All') {
          filtered = filtered.filter(t => t.category === filters.category);
        }
        if (filters.momentum && filters.momentum !== 'All') {
          filtered = filtered.filter(t => t.momentum === filters.momentum);
        }
        if (filters.search) {
          filtered = filtered.filter(t => 
            t.title.toLowerCase().includes(filters.search.toLowerCase()) ||
            t.description.toLowerCase().includes(filters.search.toLowerCase())
          );
        }

        set({ filteredTrends: filtered, trendFilters: filters });
      },
      bookmarkTrend: (trendId) => set((state) => ({
        bookmarkedTrends: state.bookmarkedTrends.includes(trendId)
          ? state.bookmarkedTrends.filter(id => id !== trendId)
          : [...state.bookmarkedTrends, trendId]
      })),
      addGeneratedContent: (content) => set((state) => ({
        generatedContent: [content, ...state.generatedContent]
      })),
      setCurrentGeneration: (content) => set({ currentGeneration: content }),
      setLoading: (loading) => set({ isLoading: loading }),
      setActiveModal: (modal) => set({ activeModal: modal }),
      addNotification: (notification) => set((state) => ({
        notifications: [...state.notifications, { ...notification, id: Date.now().toString() }]
      })),
      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
      }))
    }),
    {
      name: 'trenai-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        userAnalyses: state.userAnalyses,
        bookmarkedTrends: state.bookmarkedTrends,
        generatedContent: state.generatedContent
      })
    }
  )
);