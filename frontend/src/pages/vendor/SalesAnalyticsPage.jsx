import { vendorStats } from "@/data/mockData";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from "recharts";
import { ArrowUpRight, IndianRupee, Eye, ShoppingBag, Users } from "lucide-react";
const categoryData = [{
  name: "Gold",
  value: 55
}, {
  name: "Diamond",
  value: 25
}, {
  name: "Silver",
  value: 15
}, {
  name: "Platinum",
  value: 5
}];
const COLORS = ["hsl(43, 74%, 49%)", "hsl(200, 70%, 55%)", "hsl(0, 0%, 65%)", "hsl(270, 50%, 60%)"];
const kpis = [{
  label: "Avg. Order Value",
  value: "₹26,042",
  icon: IndianRupee,
  change: "+5.2%"
}, {
  label: "Page Views",
  value: "3,842",
  icon: Eye,
  change: "+18.4%"
}, {
  label: "Orders",
  value: "48",
  icon: ShoppingBag,
  change: "+8.2%"
}, {
  label: "Unique Visitors",
  value: "1,290",
  icon: Users,
  change: "+12.1%"
}];
export default function SalesAnalyticsPage() {
  return <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">Track your store's performance and growth.</p>
        </div>
        <select className="text-sm border border-input rounded-lg px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
          <option>Last 30 days</option>
          <option>Last 7 days</option>
          <option>Last 90 days</option>
        </select>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(k => <div key={k.label} className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <k.icon className="h-4 w-4 text-primary" />
              </div>
              <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <ArrowUpRight className="h-3 w-3" /> {k.change}
              </span>
            </div>
            <p className="text-xl font-bold text-foreground">{k.value}</p>
            <p className="text-xs text-muted-foreground">{k.label}</p>
          </div>)}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Trend */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
          <h2 className="font-display text-base font-semibold text-foreground mb-1">Revenue Trend</h2>
          <p className="text-xs text-muted-foreground mb-4">Monthly sales over time</p>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={vendorStats.monthlySales}>
              <defs>
                <linearGradient id="analyticsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.15} />
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
              <Area type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#analyticsGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-display text-base font-semibold text-foreground mb-1">Sales by Category</h2>
          <p className="text-xs text-muted-foreground mb-4">Revenue distribution</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {categoryData.map((c, i) => <div key={c.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{
                background: COLORS[i]
              }} />
                  <span className="text-foreground">{c.name}</span>
                </div>
                <span className="font-semibold text-foreground">{c.value}%</span>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
}
