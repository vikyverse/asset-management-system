import { useAuthStore } from '@/store/authStore';
import { UserRole } from '@/types/auth';
import {
  BarChart3,
  LayoutDashboard,
  ShoppingCart,
  Users,
  Settings,
  Package,
  FileText,
  CreditCard,
  Building2,
  CheckSquare
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const getNavigation = (role: UserRole) => {
  const common = [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  ];

  const roleSpecific: Record<UserRole, any[]> = {
    [UserRole.REP]: [
      { title: 'Products', url: '/products', icon: Package },
      { title: 'Orders', url: '/orders', icon: ShoppingCart },
      { title: 'Samples', url: '/samples', icon: FileText },
      { title: 'Payments', url: '/payments', icon: CreditCard },
    ],
    [UserRole.PURCHASE]: [
      { title: 'Requests', url: '/purchase-requests', icon: ShoppingCart },
      { title: 'Vendors', url: '/vendors', icon: Building2 },
      { title: 'Pricing', url: '/pricing', icon: BarChart3 },
      { title: 'Delivery', url: '/delivery', icon: Package },
    ],
    [UserRole.MANAGER]: [
      { title: 'Approvals', url: '/approvals', icon: CheckSquare },
      { title: 'Teams', url: '/teams', icon: Users },
      { title: 'Revenue', url: '/revenue', icon: BarChart3 },
    ],
    [UserRole.ADMIN]: [
      { title: 'Users', url: '/users', icon: Users },
      { title: 'Masters', url: '/masters', icon: Settings },
      { title: 'Reports', url: '/reports', icon: FileText },
      { title: 'System', url: '/system', icon: Settings },
    ],
  };

  return [...common, ...(roleSpecific[role] || [])];
};

export function AppSidebar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  if (!user) return null;

  const items = getNavigation(user.role);

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="border-r border-indigo-900/50">
      <SidebarHeader className="h-20 flex items-center px-6 border-b border-indigo-900/30">
        <div className="flex items-center gap-2 font-black text-white">
          <div className="p-1.5 bg-indigo-500 text-white rounded">
            <BarChart3 size={22} />
          </div>
          <span className="group-data-[collapsible=icon]:hidden text-xl tracking-tighter uppercase font-black">
            CORE <span className="text-indigo-400">ENTERPRISE</span>
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-[#1E1B4B]">
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-300 opacity-60">
            System Workspace
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    onClick={() => navigate(item.url)}
                    className="px-6 py-6 h-12 text-indigo-100 hover:bg-indigo-800/50 hover:text-white transition-all duration-200 group relative"
                  >
                    <item.icon className="h-5 w-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                    <span className="font-bold tracking-tight text-sm">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6 border-t border-indigo-900/30 bg-[#131139]">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
          <Avatar className="h-10 w-10 border-2 border-indigo-500/30 shadow-lg">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="bg-indigo-600 text-white font-bold">{user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden overflow-hidden">
            <span className="text-sm font-black text-white leading-tight truncate">{user.name}</span>
            <span className="text-[10px] font-black text-indigo-900 bg-indigo-300 px-2 py-0.5 rounded-full w-fit mt-1 tracking-wider uppercase border border-indigo-400/50">
              {user.role}
            </span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full mt-4 justify-start group-data-[collapsible=icon]:hidden text-indigo-300 hover:text-white hover:bg-white/10 font-bold text-xs tracking-wide"
          onClick={logout}
        >
          FORCE LOGOUT
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
