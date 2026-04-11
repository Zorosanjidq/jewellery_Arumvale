import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Home, Search, BarChart3, ShoppingCart, Package, User, Menu, X, LogIn, UserPlus, LogOut, Settings } from "lucide-react";
import { useCompare } from "@/context/CompareContext";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
const navItems = [{
  label: "Home",
  path: "/",
  icon: Home
}, {
  label: "Products",
  path: "/products",
  icon: Search
}, {
  label: "Compare",
  path: "/compare",
  icon: BarChart3
}, {
  label: "Cart",
  path: "/cart",
  icon: ShoppingCart
}, {
  label: "Orders",
  path: "/orders",
  icon: Package
}];
export default function CustomerLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    compareItems
  } = useCompare();
  const {
    user,
    isLoggedIn,
    logout
  } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  return <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-xl font-bold gold-text">Badri</span>
            <span className="font-display text-xl font-semibold text-foreground">Jewellery</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => {
            const active = location.pathname === item.path;
            return <Link key={item.path} to={item.path} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
                  <item.icon className="h-4 w-4" />
                  {item.label}
                  {item.label === "Compare" && compareItems.length > 0 && <span className="ml-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                      {compareItems.length}
                    </span>}
                </Link>;
          })}

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === "/profile" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
                  <User className="h-4 w-4" />
                  Account
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {isLoggedIn ? <>
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                        <User className="h-4 w-4" /> My Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/orders" className="flex items-center gap-2 cursor-pointer">
                        <Package className="h-4 w-4" /> My Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                        <Settings className="h-4 w-4" /> Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive">
                      <LogOut className="h-4 w-4" /> Sign Out
                    </DropdownMenuItem>
                  </> : <>
                    <DropdownMenuItem asChild>
                      <Link to="/login" className="flex items-center gap-2 cursor-pointer">
                        <LogIn className="h-4 w-4" /> Login
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/register" className="flex items-center gap-2 cursor-pointer">
                        <UserPlus className="h-4 w-4" /> Register as Customer
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/register/vendor" className="flex items-center gap-2 cursor-pointer">
                        <UserPlus className="h-4 w-4" /> Register as Shop Owner
                      </Link>
                    </DropdownMenuItem>
                  </>}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Mobile menu button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-foreground">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && <nav className="md:hidden border-t border-border bg-background p-4 space-y-1">
            {navItems.map(item => {
          const active = location.pathname === item.path;
          return <Link key={item.path} to={item.path} onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>;
        })}
            <div className="border-t border-border my-2 pt-2">
              {isLoggedIn ? <>
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted">
                    <User className="h-4 w-4" /> My Profile
                  </Link>
                  <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-muted w-full text-left">
                    <LogOut className="h-4 w-4" /> Sign Out
                  </button>
                </> : <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted">
                    <LogIn className="h-4 w-4" /> Login
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted">
                    <UserPlus className="h-4 w-4" /> Register as Customer
                  </Link>
                  <Link to="/register/vendor" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted">
                    <UserPlus className="h-4 w-4" /> Register as Shop Owner
                  </Link>
                </>}
            </div>
          </nav>}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border bg-luxury-black py-8">
        <div className="container text-center">
          <p className="font-display text-lg gold-text mb-2">Badri Jewellery</p>
          <p className="text-sm text-muted-foreground">Smart Jewellery Comparison Platform © 2026</p>
        </div>
      </footer>
    </div>;
}
