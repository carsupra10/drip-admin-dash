import { LayoutDashboard, Store, Package, ShoppingCart, BarChart3, Star, Gift, Users, Settings, FileText, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { logout } from "@/lib/auth";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Partners", url: "/partners", icon: Store },
  { title: "Products", url: "/products", icon: Package },
  { title: "Orders", url: "/orders", icon: ShoppingCart },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Reviews", url: "/reviews", icon: Star },
  { title: "Offers", url: "/offers", icon: Gift },
  { title: "Users & Roles", url: "/users", icon: Users },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Audit Logs", url: "/audit-logs", icon: FileText },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <h1 className="text-xl font-bold text-sidebar-primary">DripXplore</h1>
        <p className="text-xs text-muted-foreground">Super Admin Panel</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                  >
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
