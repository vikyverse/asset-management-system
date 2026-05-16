import React from 'react';
import { KPICard } from '../widgets/KPICard';
import { 
  ClipboardList, 
  Building2, 
  BadgeDollarSign, 
  Truck,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
  { name: 'Mon', price: 400 },
  { name: 'Tue', price: 420 },
  { name: 'Wed', price: 380 },
  { name: 'Thu', price: 510 },
  { name: 'Fri', price: 490 },
  { name: 'Sat', price: 600 },
  { name: 'Sun', price: 580 },
];

export default function PurchaseDashboard() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard title="Open Requests" value="28" icon={ClipboardList} trend={{ value: "+8%", isPositive: true }} />
        <KPICard title="Active Vendors" value="142" icon={Building2} />
        <KPICard title="Total PO Sent" value="$1.2M" icon={BadgeDollarSign} trend={{ value: "+15%", isPositive: true }} />
        <KPICard title="Lead Time Avg" value="4.2 Days" icon={Truck} trend={{ value: "-0.5d", isPositive: true }} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Vendor Pricing Trends */}
        <Card className="lg:col-span-2 border-none shadow-sm shadow-slate-200/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Commodity Pricing Trends</CardTitle>
              <CardDescription>Track market variations for Raw Materials</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm"><Filter size={14} className="mr-2" /> Filter</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="price" stroke="#4f46e5" fillOpacity={1} fill="url(#colorPrice)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Urgent Requests */}
        <Card className="border-none shadow-sm shadow-slate-200/50">
          <CardHeader>
            <CardTitle>Priority Procurement</CardTitle>
            <CardDescription>Requires immediate quotation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { item: 'Steel Plate 20x20', qty: '500 Units', deadline: 'Today', urgency: 'high' },
              { item: 'Hydraulic Seal 4"', qty: '1200 Units', deadline: 'Tomorrow', urgency: 'high' },
              { item: 'Aluminum Beam X', qty: '50 Units', deadline: 'In 2 days', urgency: 'med' },
            ].map((req, i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-100 bg-white hover:border-indigo-100 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-slate-900">{req.item}</h4>
                  <Badge variant={req.urgency === 'high' ? 'destructive' : 'secondary'} className="text-[10px] uppercase font-bold">
                    {req.urgency}
                  </Badge>
                </div>
                <div className="flex justify-between items-end">
                  <div className="text-xs text-slate-500">
                    <p>Qty: {req.qty}</p>
                    <p>Due: {req.deadline}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 text-indigo-600 p-0 text-xs font-bold">
                    GET QUOTES <ArrowUpRight size={12} className="ml-1" />
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full border-slate-200 text-slate-600">View Queue</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
