import { useState } from "react";
import { Search, Filter, MoreHorizontal, Mail, UserPlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const users = [{
  id: 1,
  name: "Priya Sharma",
  email: "priya@email.com",
  status: "Active",
  joined: "Jan 15, 2026",
  orders: 12,
  spent: "₹4,85,000",
  avatar: "PS"
}, {
  id: 2,
  name: "Rahul Verma",
  email: "rahul@email.com",
  status: "Active",
  joined: "Feb 03, 2026",
  orders: 8,
  spent: "₹2,10,000",
  avatar: "RV"
}, {
  id: 3,
  name: "Anita Patel",
  email: "anita@email.com",
  status: "Suspended",
  joined: "Mar 12, 2026",
  orders: 3,
  spent: "₹95,000",
  avatar: "AP"
}, {
  id: 4,
  name: "Vikram Singh",
  email: "vikram@email.com",
  status: "Active",
  joined: "Jan 28, 2026",
  orders: 15,
  spent: "₹6,20,000",
  avatar: "VS"
}, {
  id: 5,
  name: "Meera Joshi",
  email: "meera@email.com",
  status: "Active",
  joined: "Feb 18, 2026",
  orders: 6,
  spent: "₹1,75,000",
  avatar: "MJ"
}, {
  id: 6,
  name: "Arjun Nair",
  email: "arjun@email.com",
  status: "Inactive",
  joined: "Dec 05, 2025",
  orders: 1,
  spent: "₹45,000",
  avatar: "AN"
}];
const statusStyle = {
  Active: "bg-emerald-500/10 text-emerald-600",
  Suspended: "bg-destructive/10 text-destructive",
  Inactive: "bg-muted text-muted-foreground"
};
export default function ManageUsersPage() {
  const [search, setSearch] = useState("");
  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));
  return <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[{
        label: "Total Users",
        value: "1,250",
        sub: "+42 this month"
      }, {
        label: "Active",
        value: "1,180",
        sub: "94.4%"
      }, {
        label: "Suspended",
        value: "28",
        sub: "2.2%"
      }, {
        label: "New Today",
        value: "8",
        sub: "+3 vs yesterday"
      }].map(s => <Card key={s.label} className="border-border/50 shadow-sm">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-xl font-bold text-foreground mt-1">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.sub}</p>
            </CardContent>
          </Card>)}
      </div>

      {/* Table */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="text-base font-semibold text-foreground">All Users</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-9 w-56 text-sm" />
              </div>
              <Button variant="outline" size="sm" className="h-9 gap-1.5">
                <Filter className="h-3.5 w-3.5" /> Filter
              </Button>
              <Button size="sm" className="h-9 gap-1.5">
                <UserPlus className="h-3.5 w-3.5" /> Add User
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-y border-border bg-muted/30">
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">User</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Joined</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Orders</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Total Spent</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(u => <tr key={u.id} className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{u.avatar}</div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{u.name}</p>
                          <p className="text-xs text-muted-foreground">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground hidden md:table-cell">{u.joined}</td>
                    <td className="px-6 py-4 text-sm text-foreground font-medium hidden lg:table-cell">{u.orders}</td>
                    <td className="px-6 py-4 text-sm font-medium text-foreground hidden sm:table-cell">{u.spent}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyle[u.status]}`}>{u.status}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"><Mail className="h-4 w-4" /></button>
                        <button className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"><MoreHorizontal className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>;
}
