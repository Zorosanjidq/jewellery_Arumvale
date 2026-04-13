import { useState } from "react";
import { Search, Filter, Eye, Download, Package, Truck, CheckCircle, Clock, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const orders = [{
  id: "ORD-3201",
  customer: "Priya Sharma",
  vendor: "Tanishq",
  amount: "₹2,45,000",
  items: 2,
  status: "Completed",
  date: "Mar 19, 2026",
  payment: "Paid"
}, {
  id: "ORD-3200",
  customer: "Rahul Verma",
  vendor: "Kalyan",
  amount: "₹85,000",
  items: 1,
  status: "Processing",
  date: "Mar 19, 2026",
  payment: "Paid"
}, {
  id: "ORD-3199",
  customer: "Anita Patel",
  vendor: "Malabar Gold",
  amount: "₹1,20,000",
  items: 3,
  status: "Shipped",
  date: "Mar 18, 2026",
  payment: "Paid"
}, {
  id: "ORD-3198",
  customer: "Vikram Singh",
  vendor: "Joyalukkas",
  amount: "₹65,000",
  items: 1,
  status: "Completed",
  date: "Mar 18, 2026",
  payment: "Paid"
}, {
  id: "ORD-3197",
  customer: "Meera Joshi",
  vendor: "Tanishq",
  amount: "₹3,10,000",
  items: 2,
  status: "Cancelled",
  date: "Mar 17, 2026",
  payment: "Refunded"
}, {
  id: "ORD-3196",
  customer: "Arjun Nair",
  vendor: "Kalyan",
  amount: "₹45,000",
  items: 1,
  status: "Pending",
  date: "Mar 17, 2026",
  payment: "Pending"
}];
const statusConfig = {
  Completed: {
    style: "bg-emerald-500/10 text-emerald-600",
    icon: CheckCircle
  },
  Processing: {
    style: "bg-primary/10 text-primary",
    icon: Package
  },
  Shipped: {
    style: "bg-blue-500/10 text-blue-600",
    icon: Truck
  },
  Pending: {
    style: "bg-amber-500/10 text-amber-600",
    icon: Clock
  },
  Cancelled: {
    style: "bg-destructive/10 text-destructive",
    icon: XCircle
  }
};
export default function AdminOrdersPage() {
  const [search, setSearch] = useState("");
  const filtered = orders.filter(o => o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase()));
  return <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {[{
        label: "Total Orders",
        value: "3,200"
      }, {
        label: "Completed",
        value: "2,480"
      }, {
        label: "Processing",
        value: "320"
      }, {
        label: "Shipped",
        value: "280"
      }, {
        label: "Cancelled",
        value: "120"
      }].map(s => <Card key={s.label} className="border-border/50 shadow-sm">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-xl font-bold text-foreground mt-1">{s.value}</p>
            </CardContent>
          </Card>)}
      </div>

      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="text-base font-semibold text-foreground">All Orders</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search orders..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-9 w-56 text-sm" />
              </div>
              <Button variant="outline" size="sm" className="h-9 gap-1.5"><Filter className="h-3.5 w-3.5" /> Filter</Button>
              <Button variant="outline" size="sm" className="h-9 gap-1.5"><Download className="h-3.5 w-3.5" /> Export</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-y border-border bg-muted/30">
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Order ID</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Customer</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Vendor</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Amount</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Date</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(o => {
                const sc = statusConfig[o.status];
                const StatusIcon = sc.icon;
                return <tr key={o.id} className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-primary">{o.id}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{o.customer}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground hidden md:table-cell">{o.vendor}</td>
                      <td className="px-6 py-4 text-sm font-medium text-foreground hidden sm:table-cell">{o.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${sc.style}`}>
                          <StatusIcon className="h-3 w-3" /> {o.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground hidden lg:table-cell">{o.date}</td>
                      <td className="px-6 py-4">
                        <button className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"><Eye className="h-4 w-4" /></button>
                      </td>
                    </tr>;
              })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>;
}
