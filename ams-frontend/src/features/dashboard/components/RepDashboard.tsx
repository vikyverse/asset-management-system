import React from 'react';
import { cn } from '@/lib/utils';
import { KPICard } from '../widgets/KPICard';
import { 
  Scan, 
  DollarSign, 
  Package, 
  Truck, 
  Search,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function RepDashboard() {
  return (
    <div className="grid gap-6">
      {/* KPI Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard 
          title="Monthly Sales" 
          value="$24,500" 
          icon={DollarSign} 
          trend={{ value: "+12.5%", isPositive: true }}
        />
        <KPICard 
          title="Products Scanned" 
          value="182" 
          icon={Scan} 
          trend={{ value: "+5.2%", isPositive: true }}
        />
        <KPICard 
          title="Sample Requests" 
          value="45" 
          icon={Package} 
          trend={{ value: "-2.4%", isPositive: false }}
        />
        <KPICard 
          title="Ongoing Deliveries" 
          value="12" 
          icon={Truck} 
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Product Search & Interaction */}
        <Card className="border-none shadow-sm shadow-slate-200/50">
          <CardHeader>
            <CardTitle>Product Information Tool</CardTitle>
            <CardDescription>Scan or search for instant specifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input className="pl-10" placeholder="Enter SKU or Product Name..." />
              </div>
              <Button className="bg-indigo-600">
                <Scan className="mr-2" size={18} />
                Scan Product
              </Button>
            </div>
            
            <div className="p-4 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-center py-12">
               <Package className="mx-auto text-slate-300 mb-2" size={32} />
               <p className="text-sm font-medium text-slate-500">No product selected</p>
               <p className="text-xs text-slate-400 mt-1">Scan a barcode to view detailed technical specs</p>
            </div>
          </CardContent>
        </Card>

        {/* Pending Payments Tracker */}
        <Card className="border-none shadow-sm shadow-slate-200/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Payment Tracking</CardTitle>
              <CardDescription>Overdue and upcoming customer payments</CardDescription>
            </div>
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { client: 'Acme Corp', amount: '$4,200', date: 'Overdue by 3 days', status: 'overdue' },
                { client: 'Global Tech', amount: '$1,850', date: 'Expires in 5 days', status: 'pending' },
                { client: 'Summit Ltd', amount: '$900', date: 'Sent 2 hours ago', status: 'sent' },
              ].map((payment, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex gap-3 items-center">
                    <div className={cn(
                      "p-2 rounded-full",
                      payment.status === 'overdue' ? "bg-rose-50 text-rose-600" : 
                      payment.status === 'pending' ? "bg-amber-50 text-amber-600" : "bg-indigo-50 text-indigo-600"
                    )}>
                      {payment.status === 'overdue' ? <Clock size={16} /> : <CheckCircle2 size={16} />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{payment.client}</p>
                      <p className="text-xs text-slate-500">{payment.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900">{payment.amount}</p>
                    <ArrowRight size={14} className="text-slate-300 ml-auto" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sample Tracking Table */}
      <Card className="border-none shadow-sm shadow-slate-200/50">
        <CardHeader>
          <CardTitle>Sample Shipment Status</CardTitle>
          <CardDescription>Track lifecycle of active product samples</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-100 hover:bg-transparent">
                <TableHead className="font-semibold text-slate-700">Sample ID</TableHead>
                <TableHead className="font-semibold text-slate-700">Customer</TableHead>
                <TableHead className="font-semibold text-slate-700">Product</TableHead>
                <TableHead className="font-semibold text-slate-700">Status</TableHead>
                <TableHead className="font-semibold text-slate-700">ETA</TableHead>
                <TableHead className="text-right font-semibold text-slate-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { id: 'SAM-001', cust: 'Nexus Solutions', product: 'Premium Valve V2', status: 'Shipped', eta: 'Tomorrow' },
                { id: 'SAM-005', cust: 'Iron Works', product: 'Steel Connector 10mm', status: 'Delivered', eta: 'Completed' },
                { id: 'SAM-012', cust: 'Eco Build', product: 'Insulation Panel A', status: 'In Prep', eta: 'May 18' },
              ].map((row) => (
                <TableRow key={row.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <TableCell className="font-medium text-indigo-600">{row.id}</TableCell>
                  <TableCell className="text-slate-600">{row.cust}</TableCell>
                  <TableCell className="text-slate-600">{row.product}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={cn(
                      "font-medium",
                      row.status === 'Delivered' ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                      row.status === 'Shipped' ? "bg-blue-50 text-blue-700 border-blue-100" :
                      "bg-slate-100 text-slate-600 border-slate-200"
                    )}>
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-500 text-xs font-medium">{row.eta}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="text-indigo-600">Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
