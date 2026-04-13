import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, PlusCircle, Package, ShoppingBag, Warehouse, TrendingUp, ChevronLeft, Store, Bell, Search, Settings, HelpCircle, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
const navItems = [{
  label: "Dashboard",
  path: "/vendor",
  icon: LayoutDashboard
}, {
  label: "Add Product",
  path: "/vendor/add-product",
  icon: PlusCircle
}, {
  label: "Products",
  path: "/vendor/products",
  icon: Package
}, {
  label: "Orders",
  path: "/vendor/orders",
  icon: ShoppingBag
}, {
  label: "Inventory",
  path: "/vendor/inventory",
  icon: Warehouse
}, {
  label: "Analytics",
  path: "/vendor/analytics",
  icon: TrendingUp
}];
const bottomNav = [{
  label: "Settings",
  path: "/vendor/settings",
  icon: Settings
}, {
  label: "Help Center",
  path: "/vendor/help",
  icon: HelpCircle
}];
export default function VendorLayout() {
  const location = useLocation();
  const {
    user,
    logout
  } = useAuth();
  return <div className="min-h-screen flex bg-muted/30">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-[260px] flex-col bg-luxury-black text-cream border-r border-sidebar-border fixed h-screen z-40">
        {/* Brand */}
        <div className="p-5 border-b border-sidebar-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Store className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-primary">GoldVault</h2>
              <p className="text-[11px] text-sidebar-foreground/50">Seller Dashboard</p>
            </div>
          </div>
        </div>

        {/* Vendor Profile Card */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
              {user?.username?.[0]?.toUpperCase() || "V"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.username || "Vendor"}</p>
              <p className="text-[11px] text-sidebar-foreground/50 truncate">{user?.email || "vendor@goldvault.in"}</p>
            </div>
            <div className="h-2 w-2 rounded-full bg-green-500 ring-2 ring-green-500/20" />
          </div>
        </div>

        {/* Main Nav */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          <p className="text-[10px] uppercase tracking-widest text-sidebar-foreground/30 font-semibold px-3 pt-2 pb-1.5">Main Menu</p>
          {navItems.map(item => {
          const active = location.pathname === item.path;
          return <Link key={item.path} to={item.path} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200 ${active ? "bg-primary/15 text-primary shadow-sm" : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"}`}>
                <item.icon className={`h-4 w-4 ${active ? "text-primary" : ""}`} />
                {item.label}
                {item.label === "Orders" && <span className="ml-auto text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full font-semibold">3</span>}
              </Link>;
        })}

          <div className="my-3 border-t border-sidebar-border" />
          <p className="text-[10px] uppercase tracking-widest text-sidebar-foreground/30 font-semibold px-3 pt-1 pb-1.5">Support</p>
          {bottomNav.map(item => <Link key={item.path} to={item.path} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors">
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>)}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-sidebar-border space-y-1">
          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors">
            <ChevronLeft className="h-4 w-4" /> Back to Store
          </Link>
          <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] text-destructive/80 hover:text-destructive hover:bg-destructive/10 transition-colors">
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-[260px]">
        {/* Top bar */}
        <header className="sticky top-0 z-30 border-b border-border bg-card/80 backdrop-blur-xl">
          <div className="flex items-center justify-between px-4 md:px-8 h-16">
            {/* Mobile brand */}
            <div className="lg:hidden flex items-center gap-2">
              <Store className="h-5 w-5 text-primary" />
              <span className="font-display text-lg font-semibold text-primary">GoldVault</span>
            </div>

            {/* Search */}
            <div className="hidden md:flex items-center flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input type="text" placeholder="Search products, orders..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <button className="relative h-9 w-9 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-[10px] text-destructive-foreground flex items-center justify-center font-bold">2</span>
              </button>
              <div className="hidden md:flex items-center gap-2 ml-2 pl-3 border-l border-border">
                <div className="h-8 w-8 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary">
                  {user?.username?.[0]?.toUpperCase() || "V"}
                </div>
                <span className="text-sm font-medium text-foreground">{user?.username || "Vendor"}</span>
              </div>
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
