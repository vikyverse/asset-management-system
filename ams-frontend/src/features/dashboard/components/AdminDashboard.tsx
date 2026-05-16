import React from 'react';
import { KPICard } from '../widgets/KPICard';
import { 
  Users, 
  ShieldCheck, 
  Activity, 
  Database,
  Lock,
  UserPlus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

export default function AdminDashboard() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard title="Total Users" value="1,280" icon={Users} trend={{ value: "+42 this week", isPositive: true }} />
        <KPICard title="Role Policies" value="24" icon={ShieldCheck} />
        <KPICard title="System Uptime" value="99.98%" icon={Activity} trend={{ value: "-0.01%", isPositive: false }} />
        <KPICard title="DB Size" value="4.2 TB" icon={Database} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* User Management Quick Access */}
        <Card className="lg:col-span-2 border-none shadow-sm shadow-slate-200/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>User Authentication Logs</CardTitle>
              <CardDescription>Monitor terminal and app access attempts</CardDescription>
            </div>
            <Button size="sm" variant="outline" className="text-indigo-600 border-indigo-100 hover:bg-indigo-50">
              <UserPlus size={16} className="mr-2" /> Invite User
            </Button>
          </CardHeader>
          <CardContent>
             <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>User</TableHead>
                  <TableHead>Environment</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { user: 'g.smith@ent.com', env: 'Mobile APP', action: 'Sign In', time: '2m ago', status: 'success' },
                  { user: 'p.doe@ent.com', env: 'Web Console', action: 'Update Role', time: '12m ago', status: 'success' },
                  { user: 'root_sys', env: 'Terminal', action: 'DB Backup', time: '1h ago', status: 'success' },
                  { user: 'unknown_host', env: 'IP: 192.168.1.1', action: 'Access Denied', time: '2h ago', status: 'failed' },
                ].map((log, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium text-slate-900">{log.user}</TableCell>
                    <TableCell className="text-xs text-slate-500">{log.env}</TableCell>
                    <TableCell className="text-xs font-semibold">{log.action}</TableCell>
                    <TableCell className="text-[10px] text-slate-400">{log.time}</TableCell>
                    <TableCell>
                      <Badge variant={log.status === 'success' ? 'secondary' : 'destructive'} className="text-[10px]">
                        {log.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Security Controls */}
        <Card className="border-none shadow-sm shadow-slate-200/50">
          <CardHeader>
            <CardTitle>Security Posture</CardTitle>
            <CardDescription>Global system configuration and hardening</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div className="flex gap-3 items-center">
                <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg"><Lock size={18}/></div>
                <div>
                  <p className="text-xs font-bold text-slate-900">MFA Enforced</p>
                  <p className="text-[10px] text-slate-500">For all admin/manager accounts</p>
                </div>
              </div>
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100">ON</Badge>
            </div>
            
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between opacity-50">
               <div className="flex gap-3 items-center">
                <div className="p-2 bg-slate-200 text-slate-600 rounded-lg"><ShieldCheck size={18}/></div>
                <div>
                  <p className="text-xs font-bold text-slate-900">IP Whitelisting</p>
                  <p className="text-[10px] text-slate-500">Corporate VPN range</p>
                </div>
              </div>
              <Badge variant="outline" className="text-[10px]">OFF</Badge>
            </div>

            <div className="text-xs text-slate-500 p-2 bg-indigo-50 border border-indigo-100 rounded-lg flex gap-2">
               <Activity size={14} className="shrink-0 text-indigo-600 mt-0.5" />
               <p>Automated security audits are running every 6 hours. Next audit scheduled in 2h 14m.</p>
            </div>
            
            <Button className="w-full bg-slate-900 hover:bg-black">System Preferences</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
