import { User, Package, Heart, Settings, MapPin, Bell, ChevronRight, Star, ShoppingBag, GitCompareArrows, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { products } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
const recentOrders = [{
  id: "ORD-2841",
  product: "Royal Diamond Necklace",
  date: "8 Mar 2026",
  status: "Delivered",
  amount: 245000
}, {
  id: "ORD-2839",
  product: "Classic Gold Bangle",
  date: "2 Mar 2026",
  status: "Shipped",
  amount: 120000
}, {
  id: "ORD-2835",
  product: "Solitaire Gold Ring",
  date: "22 Feb 2026",
  status: "Delivered",
  amount: 85000
}];
const quickLinks = [{
  icon: Package,
  label: "My Orders",
  desc: "Track & manage orders",
  path: "/orders"
}, {
  icon: Heart,
  label: "Wishlist",
  desc: "12 saved items",
  path: "/products"
}, {
  icon: GitCompareArrows,
  label: "Comparisons",
  desc: "3 recent comparisons",
  path: "/compare"
}, {
  icon: Settings,
  label: "Account Settings",
  desc: "Manage your profile",
  path: "/profile"
}];
export default function ProfilePage() {
  const { user } = useAuth();
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  
  // Format member since date
  const memberSince = user?.createdAt 
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : 'Unknown';
  
  // Get user location
  const userLocation = user?.address?.city 
    ? `${user.address.city}${user.address.state ? ', ' + user.address.state : ''}${user.address.country ? ', ' + user.address.country : ''}`
    : 'Location not set';

  return <div className="container py-10">
      {/* Welcome Header */}
      <div className="bg-luxury-black rounded-2xl p-8 md:p-10 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center shrink-0">
            <User className="h-9 w-9 text-primary" />
          </div>
          <div className="flex-1">
            <h1 className="font-display text-2xl md:text-3xl font-bold text-cream mb-1">
              Welcome back, {user?.firstName || 'User'}
            </h1>
           
          </div>
          <div className="flex gap-3">
            <button className="p-2.5 rounded-lg bg-cream/5 text-cream/60 hover:bg-cream/10 hover:text-cream transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <button className="p-2.5 rounded-lg bg-cream/5 text-cream/60 hover:bg-cream/10 hover:text-cream transition-colors">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Personal Information Toggle */}
      <div className="mb-8">
        <button
          onClick={() => setShowPersonalInfo(!showPersonalInfo)}
          className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-muted/50 transition-colors"
        >
          {showPersonalInfo ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          <span className="font-medium text-foreground">
            {showPersonalInfo ? 'Hide' : 'View'} Personal Information
          </span>
        </button>
        
        {showPersonalInfo && (
          <div className="mt-4 bg-card border border-border rounded-xl p-6">
            <h2 className="font-display text-lg font-bold text-foreground mb-4">Personal Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Full Name</p>
                <p className="font-medium text-foreground">
                  {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'Not set'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Username</p>
                <p className="font-medium text-foreground">{user?.username || 'Not set'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Email Address</p>
                <p className="font-medium text-foreground">{user?.email || 'Not set'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Phone Number</p>
                <p className="font-medium text-foreground">{user?.phone || 'Not set'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Date of Birth</p>
                <p className="font-medium text-foreground">
                  {user?.dob ? new Date(user.dob).toLocaleDateString() : 'Not set'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Gender</p>
                <p className="font-medium text-foreground capitalize">{user?.gender || 'Not set'}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-muted-foreground mb-1">Address</p>
                <p className="font-medium text-foreground">
                  {user?.address?.fullAddress || 'Not set'}
                  {user?.address?.city && `, ${user.address.city}`}
                  {user?.address?.state && `, ${user.address.state}`}
                  {user?.address?.pincode && ` - ${user.address.pincode}`}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[{
        label: "Total Orders",
        value: "14",
        icon: ShoppingBag
      }, {
        label: "Wishlist Items",
        value: "12",
        icon: Heart
      }, {
        label: "Comparisons",
        value: "8",
        icon: GitCompareArrows
      }, {
        label: "Reward Points",
        value: "2,450",
        icon: Star
      }].map(stat => <div key={stat.label} className="bg-card border border-border rounded-xl p-5 text-center hover:shadow-md transition-shadow">
            <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
            <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-muted-foreground text-xs mt-1">{stat.label}</p>
          </div>)}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-xl font-bold text-foreground">Recent Orders</h2>
            <Link to="/orders" className="text-xs text-primary hover:text-gold-dark transition-colors flex items-center gap-1">
              View All <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {recentOrders.map((order, i) => <div key={order.id} className={`flex items-center justify-between p-5 hover:bg-muted/50 transition-colors ${i < recentOrders.length - 1 ? "border-b border-border" : ""}`}>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm truncate">{order.product}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{order.id} · {order.date}</p>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <p className="font-semibold text-foreground text-sm">₹{order.amount.toLocaleString()}</p>
                  <span className={`text-xs font-medium ${order.status === "Delivered" ? "text-success" : "text-warning"}`}>
                    {order.status}
                  </span>
                </div>
              </div>)}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="font-display text-xl font-bold text-foreground mb-5">Quick Links</h2>
          <div className="space-y-3">
            {quickLinks.map(link => <Link key={link.label} to={link.path} className="flex items-center gap-4 bg-card border border-border rounded-xl p-4 hover:shadow-md hover:border-primary/20 transition-all group">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <link.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm">{link.label}</p>
                  <p className="text-muted-foreground text-xs">{link.desc}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>)}
          </div>
        </div>
      </div>

      {/* Recommended For You */}
      <section className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-bold text-foreground">Recommended For You</h2>
          <Link to="/products" className="text-xs text-primary hover:text-gold-dark transition-colors flex items-center gap-1">
            See More <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 3).map(product => <Link key={product.id} to={`/product/${product.id}`} className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all">
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <p className="text-xs text-muted-foreground">{product.vendor}</p>
                <h3 className="font-display font-semibold text-foreground text-sm mt-1 line-clamp-1">{product.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <p className="font-semibold text-primary">₹{product.price.toLocaleString()}</p>
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    <span className="text-foreground font-medium">{product.rating}</span>
                  </div>
                </div>
              </div>
            </Link>)}
        </div>
      </section>
    </div>;
}
