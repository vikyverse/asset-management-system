import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  description?: string;
  className?: string;
}

export function KPICard({ title, value, icon: Icon, trend, description, className }: KPICardProps) {
  return (
    <Card className={cn("overflow-hidden border-none shadow-sm shadow-indigo-100/30 bg-white", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
        <CardTitle className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-400">
          {title}
        </CardTitle>
        <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
          <Icon size={16} />
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-0">
        <div className="text-4xl font-black tracking-[-0.05em] text-indigo-950 leading-none">
          {value}
        </div>
        {trend && (
          <div className="flex items-center gap-1 mt-3">
            <span className={cn(
              "text-[10px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider",
              trend.isPositive ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
            )}>
              {trend.isPositive ? '↑' : '↓'} {trend.value}
            </span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider ml-1">VS TARGET</span>
          </div>
        )}
        {description && <p className="text-[11px] text-slate-500 mt-3 font-semibold">{description}</p>}
      </CardContent>
    </Card>
  );
}
