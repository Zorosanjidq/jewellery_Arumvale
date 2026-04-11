import { IndianRupee, ShoppingBag, Package, TrendingUp, ArrowUpRight, ArrowDownRight, Eye, Clock, Warehouse } from "lucide-react";
import { vendorStats, products } from "@/data/mockData";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { useAuth } from "@/context/AuthContext";
const recentOrders = [{
  id: "ORD-2847",
  customer: "Priya Sharma",
  product: "Royal Diamond Necklace",
  amount: 245000,
  status: "Delivered",
  date: "Mar 14"
}, {
  id: "ORD-2846",
  customer: "Rahul Mehta",
  product: "Solitaire Gold Ring",
  amount: 85000,
  status: "Shipped",
  date: "Mar 13"
}, {
  id: "ORD-2845",
  customer: "Anita Desai",
  product: "Classic Gold Bangle",
  amount: 120000,
  status: "Processing",
  date: "Mar 12"
}, {
  id: "ORD-2844",
  customer: "Vikram Singh",
  product: "Diamond Stud Earrings",
  amount: 175000,
  status: "Pending",
  date: "Mar 11"
}, {
  id: "ORD-2843",
  customer: "Meera Patel",
  product: "Gold Pendant Chain",
  amount: 65000,
  status: "Delivered",
  date: "Mar 10"
}];
const statusColors = {
  Delivered: "bg-green-100 text-green-700",
  Shipped: "bg-blue-100 text-blue-700",
  Processing: "bg-amber-100 text-amber-700",
  Pending: "bg-muted text-muted-foreground"
};
const topProducts = products.slice(0, 4);
export default function VendorDashboard() {
  const {
    user
  } = useAuth();
  const stats = [{
    title: "Total Revenue",
    value: `₹${(vendorStats.totalSales / 100000).toFixed(1)}L`,
    icon: IndianRupee,
    trend: "+12.5%",
    up: true,
    sub: "vs last month"
  }, {
    title: "Total Orders",
    value: String(vendorStats.totalOrders),
    icon: ShoppingBag,
    trend: "+8.2%",
    up: true,
    sub: "vs last month"
  }, {
    title: "Active Products",
    value: String(vendorStats.totalProducts),
    icon: Package,
    trend: "+3",
    up: true,
    sub: "new this week"
  }, {
    title: "Conversion Rate",
    value: "3.2%",
    icon: TrendingUp,
    trend: "-0.4%",
    up: false,
    sub: "vs last month"
  }];
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Welcome back, {user?.name || "Vendor"} 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Here's what's happening with your store today.</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="text-sm border border-input rounded-lg px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => <div key={s.title} className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <span className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${s.up ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {s.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {s.trend}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.title} · <span className="text-muted-foreground/70">{s.sub}</span></p>
          </div>)}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display text-base font-semibold text-foreground">Revenue Overview</h2>
              <p className="text-xs text-muted-foreground">Monthly sales performance</p>
            </div>
            <div className="flex gap-1">
              {["Bar", "Area"].map(t => <button key={t} className="text-xs px-3 py-1 rounded-md border border-input hover:bg-muted transition-colors text-muted-foreground">{t}</button>)}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={vendorStats.monthlySales}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={v => `₹${v / 1000}K`} />
              <Tooltip contentStyle={{
              borderRadius: "0.75rem",
              border: "1px solid hsl(var(--border))",
              background: "hsl(var(--card))"
            }} formatter={v => [`₹${v.toLocaleString()}`, "Revenue"]} />
              <Area type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#salesGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-base font-semibold text-foreground">Top Products</h2>
            <button className="text-xs text-primary hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {topProducts.map((p, i) => <div key={p.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <span className="text-xs font-bold text-muted-foreground w-5">#{i + 1}</span>
                <img src={p.image} alt={p.name} className="h-10 w-10 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.stock} in stock</p>
                </div>
                <p className="text-sm font-semibold text-foreground">₹{(p.price / 1000).toFixed(0)}K</p>
              </div>)}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-card rounded-xl border border-border">
        <div className="flex items-center justify-between p-6 pb-0">
          <div>
            <h2 className="font-display text-base font-semibold text-foreground">Recent Orders</h2>
            <p className="text-xs text-muted-foreground">Latest customer orders for your store</p>
          </div>
          <button className="text-xs text-primary hover:underline flex items-center gap-1">
            View All Orders <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Order ID</th>
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Customer</th>
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Product</th>
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Amount</th>
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Date</th>
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => <tr key={order.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="p-4 text-sm font-mono font-medium text-primary">{order.id}</td>
                  <td className="p-4 text-sm text-foreground">{order.customer}</td>
                  <td className="p-4 text-sm text-muted-foreground hidden md:table-cell">{order.product}</td>
                  <td className="p-4 text-sm font-semibold text-foreground">₹{order.amount.toLocaleString()}</td>
                  <td className="p-4 text-sm text-muted-foreground hidden sm:table-cell">{order.date}</td>
                  <td className="p-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[order.status]}`}>{order.status}</span>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions + Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-display text-base font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[{
            label: "Add Product",
            icon: Package,
            path: "/vendor/add-product",
            color: "bg-primary/10 text-primary"
          }, {
            label: "View Orders",
            icon: ShoppingBag,
            path: "/vendor/orders",
            color: "bg-blue-100 text-blue-700"
          }, {
            label: "Check Stock",
            icon: Warehouse,
            path: "/vendor/inventory",
            color: "bg-amber-100 text-amber-700"
          }, {
            label: "Analytics",
            icon: TrendingUp,
            path: "/vendor/analytics",
            color: "bg-green-100 text-green-700"
          }].map(action => <a key={action.label} href={action.path} className="flex items-center gap-3 p-3 rounded-xl border border-border hover:shadow-sm hover:border-primary/30 transition-all">
                <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${action.color}`}>
                  <action.icon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-foreground">{action.label}</span>
              </a>)}
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-display text-base font-semibold text-foreground mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[{
            text: "New order #ORD-2847 received",
            time: "2 hours ago",
            icon: ShoppingBag
          }, {
            text: "Product 'Gold Pendant Chain' stock low",
            time: "5 hours ago",
            icon: Package
          }, {
            text: "Payment of ₹85,000 settled",
            time: "1 day ago",
            icon: IndianRupee
          }, {
            text: "Customer reviewed 'Diamond Studs' ★★★★★",
            time: "2 days ago",
            icon: Eye
          }].map((activity, i) => <div key={i} className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                  <activity.icon className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-foreground">{activity.text}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <Clock className="h-3 w-3" /> {activity.time}
                  </p>
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
}
