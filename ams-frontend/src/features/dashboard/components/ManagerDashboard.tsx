import React from 'react';
import { KPICard } from '../widgets/KPICard';
import { 
  CheckCircle, 
  TrendingUp, 
  Users, 
  Zap,
  ArrowRight,
  MoreHorizontal
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';

const data = [
  { name: 'North', value: 850 },
  { name: 'South', value: 720 },
  { name: 'East', value: 940 },
  { name: 'West', value: 610 },
  { name: 'Central', value: 880 },
];

const COLORS = ['#4f46e5', '#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe'];

export default function ManagerDashboard() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard title="Pending Approvals" value="14" icon={CheckCircle} trend={{ value: "-4 from yest", isPositive: true }} />
        <KPICard title="Total Revenue" value="$4.8M" icon={TrendingUp} trend={{ value: "+22%", isPositive: true }} />
        <KPICard title="Active Reps" value="52" icon={Users} />
        <KPICard title="Net Margin" value="18.4%" icon={Zap} trend={{ value: "+1.2%", isPositive: true }} />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Revenue Analytics */}
        <Card className="lg:col-span-3 border-none shadow-sm shadow-slate-200/50">
          <CardHeader>
            <CardTitle>Regional Performance</CardTitle>
            <CardDescription>Revenue distribution across active territories</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <YAxis hide />
                  <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Approval Center */}
        <Card className="lg:col-span-2 border-none shadow-xl shadow-indigo-100/20 overflow-hidden bg-white">
          <CardHeader className="bg-[#1E1B4B] text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white text-lg font-black tracking-tight uppercase">Approval Center</CardTitle>
                <CardDescription className="text-indigo-300 text-[10px] font-bold uppercase tracking-wider mt-1">Pending Management Actions</CardDescription>
              </div>
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-[10px] font-black h-8 px-3 uppercase tracking-wider">Review All</Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-50">
              {[
                { type: 'Quotation', ref: '#QT-9921', rep: 'Alice Chen', value: '$12,400', date: 'Urgent', urgency: 'high' },
                { type: 'Discount', ref: '#DS-221', rep: 'Marc Owen', value: '15%', date: 'Pending', urgency: 'med' },
                { type: 'Sample', ref: '#SM-88', rep: 'Sarah Lee', value: '3 items', date: 'Pending', urgency: 'med' },
                { type: 'Quotation', ref: '#QT-9918', rep: 'Tom Harris', value: '$8,200', date: 'In Queue', urgency: 'low' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-5 hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="flex gap-4 items-center">
                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                      {item.rep[0]}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{item.type} {item.ref}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{item.rep} • {item.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-indigo-600">{item.value}</p>
                    <div className="flex gap-1 mt-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                       <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full hover:bg-emerald-50 hover:text-emerald-600 transition-colors"><CheckCircle size={14}/></Button>
                       <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full hover:bg-indigo-50 hover:text-indigo-600 transition-colors"><ArrowRight size={14}/></Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
