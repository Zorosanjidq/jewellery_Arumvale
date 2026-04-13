import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Store, Package, ShoppingBag, FileText, ChevronLeft, Bell, Search, Settings, LogOut, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
const navItems = [{
  label: "Dashboard",
  path: "/admin",
  icon: LayoutDashboard
}, {
  label: "Users",
  path: "/admin/users",
  icon: Users
}, {
  label: "Vendors",
  path: "/admin/vendors",
  icon: Store
}, {
  label: "Products",
  path: "/admin/products",
  icon: Package
}, {
  label: "Orders",
  path: "/admin/orders",
  icon: ShoppingBag
}, {
  label: "Reports",
  path: "/admin/reports",
  icon: FileText
}];
export default function AdminLayout() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const currentPage = navItems.find(i => i.path === location.pathname)?.label || "Dashboard";
  return <div className="min-h-screen flex bg-muted/30">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col bg-slate-900 text-slate-100 border-r border-slate-700 fixed inset-y-0 left-0 z-40 shadow-2xl">
        {/* Brand */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-primary">GoldVault</h2>
              <p className="text-xs text-slate-400">Admin Console</p>
            </div>
          </div>
          <Link to="/" className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-yellow-500 transition-colors">
            <ChevronLeft className="h-3.5 w-3.5" /> Back to Storefront
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold px-3 mb-2">Navigation</p>
          {navItems.map(item => {
          const active = location.pathname === item.path;
          return <Link key={item.path} to={item.path} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${active ? "bg-yellow-500/20 text-yellow-400 shadow-sm border border-yellow-500/30" : "text-slate-300 hover:text-slate-100 hover:bg-slate-800"}`}>
                <item.icon className={`h-4 w-4 ${active ? "text-primary" : ""}`} />
                {item.label}
                {item.label === "Orders" && <Badge variant="secondary" className="ml-auto text-[10px] bg-primary/20 text-primary border-0 px-1.5">
                    12
                  </Badge>}
              </Link>;
        })}
        </nav>

        {/* Admin profile */}
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="h-9 w-9 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <span className="text-sm font-bold text-yellow-400">SA</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-100 truncate">Super Admin</p>
              <p className="text-xs text-slate-400 truncate">admin@goldvault.in</p>
            </div>
            <button className="p-1.5 text-slate-400 hover:text-slate-100 transition-colors">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-72">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-xl border-b border-border">
          <div className="flex items-center justify-between px-4 md:px-8 h-16">
            <div className="flex items-center gap-4">
              {/* Mobile brand */}
              <div className="lg:hidden flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <Shield className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-display text-sm font-bold text-primary">Admin</span>
              </div>
              <div className="hidden md:block">
                <h1 className="text-lg font-semibold text-foreground">{currentPage}</h1>
                <p className="text-xs text-muted-foreground">Manage your platform operations</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search anything..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-9 w-64 h-9 bg-muted/50 border-border/50 text-sm" />
              </div>
              <button className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full" />
              </button>
              <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Mobile nav */}
          <nav className="lg:hidden flex gap-1 px-4 pb-3 overflow-x-auto">
            {navItems.map(item => {
            const active = location.pathname === item.path;
            return <Link key={item.path} to={item.path} className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${active ? "bg-primary text-primary-foreground" : "text-muted-foreground bg-muted hover:text-foreground"}`}>
                  <item.icon className="h-3 w-3" />
                  {item.label}
                </Link>;
          })}
          </nav>
        </header>

        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>;
}
