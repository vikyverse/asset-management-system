import { Bell, Search, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Navbar() {
  return (
    <div className="flex-1 flex items-center justify-between">
      <div className="max-w-md w-full relative hidden md:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <Input 
          className="w-full pl-10 bg-slate-50 border-slate-100 focus:bg-white transition-all" 
          placeholder="Quick search across modules..." 
        />
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} className="text-slate-600" />
          <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-red-500 border-2 border-white">
            3
          </Badge>
        </Button>
        <Button variant="ghost" size="icon">
          <Info size={20} className="text-slate-600" />
        </Button>
      </div>
    </div>
  );
}
