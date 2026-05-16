import React from 'react';
import { useAuthStore } from '@/store/authStore';
import { UserRole } from '@/types/auth';
import { lazy, Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const RepDashboard = lazy(() => import('../components/RepDashboard'));
const PurchaseDashboard = lazy(() => import('../components/PurchaseDashboard'));
const ManagerDashboard = lazy(() => import('../components/ManagerDashboard'));
const AdminDashboard = lazy(() => import('../components/AdminDashboard'));

export default function DashboardPage() {
  const { user } = useAuthStore();

  if (!user) return null;

  const renderDashboard = () => {
    switch (user.role) {
      case UserRole.REP:
        return <RepDashboard />;
      case UserRole.PURCHASE:
        return <PurchaseDashboard />;
      case UserRole.MANAGER:
        return <ManagerDashboard />;
      case UserRole.ADMIN:
        return <AdminDashboard />;
      default:
        return <div>Access Denied</div>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-1 border-l-4 border-indigo-600 pl-6 py-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded leading-none shrink-0">
            {user.role} PERSONA
          </span>
          <span className="h-[1px] w-8 bg-indigo-100 flex-1" />
        </div>
        <h1 className="text-4xl font-black tracking-[-0.03em] text-slate-900 uppercase">
          {user.role} <span className="text-indigo-600 font-black">ACTIVE</span> WORKSPACE
        </h1>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
          PLATFORM / DASHBOARD / {user.role}_MODULES
        </p>
      </div>

      <Suspense fallback={<DashboardSkeleton />}>
        {renderDashboard()}
      </Suspense>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-32 rounded-xl" />
      ))}
      <Skeleton className="h-[400px] md:col-span-2 lg:col-span-3 rounded-xl" />
      <Skeleton className="h-[400px] rounded-xl" />
    </div>
  );
}
