import { useState } from "react";
import { Search, Filter, MoreHorizontal, CheckCircle, Clock, XCircle, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
const vendors = [{
  id: 1,
  name: "Tanishq",
  owner: "Titan Company",
  products: 120,
  revenue: "₹18.5L",
  orders: 156,
  status: "Verified",
  rating: 4.8,
  fulfillment: 96
}, {
  id: 2,
  name: "Kalyan Jewellers",
  owner: "T.S. Kalyanaraman",
  products: 85,
  revenue: "₹14.2L",
  orders: 128,
  status: "Verified",
  rating: 4.6,
  fulfillment: 92
}, {
  id: 3,
  name: "Malabar Gold",
  owner: "M.P. Ahammed",
  products: 200,
  revenue: "₹12.8L",
  orders: 112,
  status: "Pending",
  rating: 4.7,
  fulfillment: 88
}, {
  id: 4,
  name: "Joyalukkas",
  owner: "Joy Alukkas",
  products: 95,
  revenue: "₹10.4L",
  orders: 94,
  status: "Verified",
  rating: 4.5,
  fulfillment: 94
}, {
  id: 5,
  name: "PC Jeweller",
  owner: "Balram Garg",
  products: 60,
  revenue: "₹5.2L",
  orders: 48,
  status: "Suspended",
  rating: 3.8,
  fulfillment: 72
}];
const statusConfig = {
  Verified: {
    style: "bg-emerald-500/10 text-emerald-600",
    icon: CheckCircle
  },
  Pending: {
    style: "bg-amber-500/10 text-amber-600",
    icon: Clock
  },
  Suspended: {
    style: "bg-destructive/10 text-destructive",
    icon: XCircle
  }
};
export default function ManageVendorsPage() {
  const [search, setSearch] = useState("");
  const filtered = vendors.filter(v => v.name.toLowerCase().includes(search.toLowerCase()));
  return <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[{
        label: "Total Vendors",
        value: "45"
      }, {
        label: "Verified",
        value: "38"
      }, {
        label: "Pending Review",
        value: "5"
      }, {
        label: "Suspended",
        value: "2"
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
            <CardTitle className="text-base font-semibold text-foreground">All Vendors</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search vendors..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-9 w-56 text-sm" />
              </div>
              <Button variant="outline" size="sm" className="h-9 gap-1.5"><Filter className="h-3.5 w-3.5" /> Filter</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-y border-border bg-muted/30">
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Vendor</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Products</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Revenue</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Fulfillment</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(v => {
                const sc = statusConfig[v.status];
                const StatusIcon = sc.icon;
                return <tr key={v.id} className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-foreground">{v.name}</p>
                          <p className="text-xs text-muted-foreground">{v.owner}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground font-medium hidden md:table-cell">{v.products}</td>
                      <td className="px-6 py-4 text-sm font-medium text-foreground hidden sm:table-cell">{v.revenue}</td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                          <Progress value={v.fulfillment} className="h-1.5 w-20" />
                          <span className="text-xs text-muted-foreground">{v.fulfillment}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${sc.style}`}>
                          <StatusIcon className="h-3 w-3" /> {v.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"><ExternalLink className="h-4 w-4" /></button>
                          <button className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"><MoreHorizontal className="h-4 w-4" /></button>
                        </div>
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
