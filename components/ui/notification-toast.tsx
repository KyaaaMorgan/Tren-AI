'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStore } from '@/lib/store';

export default function NotificationToast() {
  const { notifications, removeNotification } = useStore();

  useEffect(() => {
    notifications.forEach((notification) => {
      const timer = setTimeout(() => {
        removeNotification(notification.id);
      }, 5000);

      return () => clearTimeout(timer);
    });
  }, [notifications, removeNotification]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={cn(
            "max-w-sm rounded-lg border p-4 shadow-lg transition-all duration-300 ease-in-out",
            "bg-white border-gray-200",
            notification.type === 'success' && "border-green-200 bg-green-50",
            notification.type === 'error' && "border-red-200 bg-red-50",
            notification.type === 'info' && "border-blue-200 bg-blue-50"
          )}
        >
          <div className="flex items-start justify-between">
            <p className={cn(
              "text-sm font-medium",
              notification.type === 'success' && "text-green-800",
              notification.type === 'error' && "text-red-800",
              notification.type === 'info' && "text-blue-800",
              notification.type === 'success' || notification.type === 'error' || notification.type === 'info' ? "" : "text-gray-900"
            )}>
              {notification.message}
            </p>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}