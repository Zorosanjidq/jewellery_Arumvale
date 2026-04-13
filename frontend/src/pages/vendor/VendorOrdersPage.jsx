import { Search, Download } from "lucide-react";
const orders = [{
  id: "ORD-2847",
  customer: "Priya Sharma",
  email: "priya@email.com",
  product: "Royal Diamond Necklace",
  amount: 245000,
  status: "Delivered",
  date: "Mar 14, 2026",
  payment: "Paid"
}, {
  id: "ORD-2846",
  customer: "Rahul Mehta",
  email: "rahul@email.com",
  product: "Solitaire Gold Ring",
  amount: 85000,
  status: "Shipped",
  date: "Mar 13, 2026",
  payment: "Paid"
}, {
  id: "ORD-2845",
  customer: "Anita Desai",
  email: "anita@email.com",
  product: "Classic Gold Bangle",
  amount: 120000,
  status: "Processing",
  date: "Mar 12, 2026",
  payment: "Paid"
}, {
  id: "ORD-2844",
  customer: "Vikram Singh",
  email: "vikram@email.com",
  product: "Diamond Stud Earrings",
  amount: 175000,
  status: "Pending",
  date: "Mar 11, 2026",
  payment: "Pending"
}, {
  id: "ORD-2843",
  customer: "Meera Patel",
  email: "meera@email.com",
  product: "Gold Pendant Chain",
  amount: 65000,
  status: "Delivered",
  date: "Mar 10, 2026",
  payment: "Paid"
}, {
  id: "ORD-2842",
  customer: "Arjun Nair",
  email: "arjun@email.com",
  product: "Silver Anklet",
  amount: 12000,
  status: "Cancelled",
  date: "Mar 09, 2026",
  payment: "Refunded"
}];
const statusColors = {
  Delivered: "bg-green-100 text-green-700",
  Shipped: "bg-blue-100 text-blue-700",
  Processing: "bg-amber-100 text-amber-700",
  Pending: "bg-muted text-muted-foreground",
  Cancelled: "bg-red-100 text-red-700"
};
const paymentColors = {
  Paid: "text-green-700",
  Pending: "text-amber-600",
  Refunded: "text-destructive"
};
export default function VendorOrdersPage() {
  return <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Orders</h1>
          <p className="text-sm text-muted-foreground mt-1">{orders.length} total orders</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type="text" placeholder="Search by order ID, customer..." className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <select className="px-3 py-2.5 rounded-lg border border-input bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
          <option>All Status</option>
          <option>Pending</option>
          <option>Processing</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[{
        label: "Pending",
        count: 1,
        color: "border-l-amber-500"
      }, {
        label: "Processing",
        count: 1,
        color: "border-l-blue-500"
      }, {
        label: "Shipped",
        count: 1,
        color: "border-l-primary"
      }, {
        label: "Delivered",
        count: 2,
        color: "border-l-green-500"
      }].map(s => <div key={s.label} className={`bg-card rounded-lg border border-border border-l-4 ${s.color} p-4`}>
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="text-xl font-bold text-foreground mt-1">{s.count}</p>
          </div>)}
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Order</th>
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Customer</th>
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Product</th>
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Amount</th>
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Payment</th>
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Date</th>
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => <tr key={o.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer">
                  <td className="p-4 text-sm font-mono font-medium text-primary">{o.id}</td>
                  <td className="p-4">
                    <p className="text-sm font-medium text-foreground">{o.customer}</p>
                    <p className="text-xs text-muted-foreground">{o.email}</p>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground hidden lg:table-cell">{o.product}</td>
                  <td className="p-4 text-sm font-semibold text-foreground">₹{o.amount.toLocaleString()}</td>
                  <td className={`p-4 text-sm font-medium hidden sm:table-cell ${paymentColors[o.payment]}`}>{o.payment}</td>
                  <td className="p-4 text-sm text-muted-foreground hidden md:table-cell">{o.date}</td>
                  <td className="p-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[o.status]}`}>{o.status}</span>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
}
