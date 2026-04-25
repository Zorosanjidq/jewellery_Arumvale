import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Store, Package, ShoppingBag, FileText, ChevronLeft, Bell, Search, Settings, LogOut, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import styles from "./AdminLayout.module.css";
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
  const { logout } = useAuth();
  const currentPage = navItems.find(i => i.path === location.pathname)?.label || "Dashboard";
  
  const handleLogout = async () => {
    await logout();
  };
  return <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        {/* Brand */}
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarBrand}>
            <div className={styles.sidebarLogoIcon}>
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h2 className={styles.sidebarLogoText}>GoldVault</h2>
              <p className={styles.sidebarSubtitle}>Admin Console</p>
            </div>
          </div>
          <Link to="/" className={styles.backLink}>
            <ChevronLeft className="h-3.5 w-3.5" /> Back to Storefront
          </Link>
        </div>

        {/* Navigation */}
        <nav className={styles.sidebarNav}>
          <p className={styles.navSectionTitle}>Navigation</p>
          {navItems.map(item => {
          const active = location.pathname === item.path;
          return <Link key={item.path} to={item.path} className={`${styles.navItem} ${active ? styles.active : ''}`}>
                <item.icon className={styles.navIcon} />
                {item.label}
                {item.label === "Orders" && <span className={styles.navBadge}>
                    12
                  </span>}
              </Link>;
        })}
        </nav>

        {/* Admin profile */}
        <div className={styles.sidebarFooter}>
          <div className={styles.userProfile}>
            <div className={styles.userAvatar}>
              <span className={styles.userAvatarText}>SA</span>
            </div>
            <div className={styles.userInfo}>
              <p className={styles.userName}>Super Admin</p>
              <p className={styles.userEmail}>admin@goldvault.in</p>
            </div>
            <button className={styles.userMenuButton} onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className={styles.main}>
        {/* Top bar */}
        <header className={styles.header}>
          <div className={styles.headerContainer}>
            <div className={styles.headerLeft}>
              {/* Mobile brand */}
              <div className={styles.mobileBrand}>
                <div className={styles.mobileLogo}>
                  <Shield className="h-4 w-4" />
                </div>
                <span className={styles.mobileBrandText}>Admin</span>
              </div>
              <div className={styles.pageTitle}>
                <h1 className={styles.headerTitle}>{currentPage}</h1>
                <p className={styles.headerSubtitle}>Manage your platform operations</p>
              </div>
            </div>

            <div className={styles.headerActions}>
              <div className={styles.searchContainer}>
                <Search className={styles.searchIcon} />
                <Input placeholder="Search anything..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className={styles.searchInput} />
              </div>
              <button className={styles.notificationButton}>
                <Bell className="h-5 w-5" />
                <span className={styles.notificationBadge} />
              </button>
              <button className={styles.settingsButton}>
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Mobile nav */}
          <nav className={styles.mobileNav}>
            {navItems.map(item => {
            const active = location.pathname === item.path;
            return <Link key={item.path} to={item.path} className={`${styles.mobileNavItem} ${active ? styles.mobileNavItemActive : ''}`}>
                  <item.icon className="h-3 w-3" />
                  {item.label}
                </Link>;
          })}
          </nav>
        </header>

        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>;
}
