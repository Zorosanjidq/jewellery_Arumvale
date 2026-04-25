import { useState } from "react";
import { Search, Filter, MoreHorizontal, Mail, UserPlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import styles from "./ManageUsersPage.module.css";
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
const getStatusClass = (status) => {
  switch(status) {
    case "Active":
      return styles.statusActive;
    case "Suspended":
      return styles.statusSuspended;
    case "Inactive":
      return styles.statusInactive;
    default:
      return styles.statusInactive;
  }
};

export default function ManageUsersPage() {
  const [search, setSearch] = useState("");
  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));
  return <div className={styles.container}>
      {/* Summary cards */}
      <div className={styles.summaryGrid}>
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
      }].map(s => <Card key={s.label} className={styles.summaryCard}>
            <CardContent className={styles.summaryCardContent}>
              <p className={styles.summaryLabel}>{s.label}</p>
              <p className={styles.summaryValue}>{s.value}</p>
              <p className={styles.summarySub}>{s.sub}</p>
            </CardContent>
          </Card>)}
      </div>

      {/* Table */}
      <Card className={styles.tableCard}>
        <CardHeader className={styles.tableHeader}>
          <div className={styles.tableHeaderContentRow}>
            <CardTitle className={styles.tableTitle}>All Users</CardTitle>
            <div className={styles.tableActions}>
              <div className={styles.searchContainer}>
                <Search className={styles.searchIcon} />
                <Input placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} className={styles.searchInput} />
              </div>
              <Button variant="outline" size="sm" className={styles.filterButton}>
                <Filter className="h-3.5 w-3.5" /> Filter
              </Button>
              <Button size="sm" className={styles.addButton}>
                <UserPlus className="h-3.5 w-3.5" /> Add User
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className={styles.tableContent}>
          <div className={styles.tableContainer}>
            <table className={styles.usersTable}>
              <thead>
                <tr className={styles.tableHead}>
                  <th className={styles.tableCell}>User</th>
                  <th className={`${styles.tableCell} ${styles.hiddenMd}`}>Joined</th>
                  <th className={`${styles.tableCell} ${styles.hiddenLg}`}>Orders</th>
                  <th className={`${styles.tableCell} ${styles.hiddenSm}`}>Total Spent</th>
                  <th className={styles.tableCell}>Status</th>
                  <th className={styles.tableCell}></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(u => <tr key={u.id} className="tableBody tr">
                    <td className={styles.tableCell}>
                      <div className={styles.userCell}>
                        <div className={styles.userAvatar}>{u.avatar}</div>
                        <div className={styles.userInfo}>
                          <p className={styles.userName}>{u.name}</p>
                          <p className={styles.userEmail}>{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className={`${styles.tableCell} text-muted-foreground ${styles.hiddenMd}`}>{u.joined}</td>
                    <td className={`${styles.tableCell} text-foreground font-medium ${styles.hiddenLg}`}>{u.orders}</td>
                    <td className={`${styles.tableCell} text-foreground font-medium ${styles.hiddenSm}`}>{u.spent}</td>
                    <td className={styles.tableCell}>
                      <span className={`${styles.statusBadge} ${getStatusClass(u.status)}`}>{u.status}</span>
                    </td>
                    <td className={styles.tableCell}>
                      <div className={styles.actionCell}>
                        <button className={styles.actionButton}><Mail className="h-4 w-4" /></button>
                        <button className={styles.actionButton}><MoreHorizontal className="h-4 w-4" /></button>
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
