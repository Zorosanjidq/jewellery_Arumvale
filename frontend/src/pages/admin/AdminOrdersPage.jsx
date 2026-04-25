import { useState } from "react";
import { Search, Filter, Eye, Download, Package, Truck, CheckCircle, Clock, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import styles from "./AdminOrdersPage.module.css";
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
const getStatusConfig = (status) => {
  switch(status) {
    case "Completed":
      return {
        style: styles.statusCompleted,
        icon: CheckCircle
      };
    case "Processing":
      return {
        style: styles.statusProcessing,
        icon: Package
      };
    case "Shipped":
      return {
        style: styles.statusShipped,
        icon: Truck
      };
    case "Pending":
      return {
        style: styles.statusPending,
        icon: Clock
      };
    case "Cancelled":
      return {
        style: styles.statusCancelled,
        icon: XCircle
      };
    default:
      return {
        style: styles.statusPending,
        icon: Clock
      };
  }
};

export default function AdminOrdersPage() {
  const [search, setSearch] = useState("");
  const filtered = orders.filter(o => o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase()));
  return <div className={styles.container}>
      <div className={styles.summaryGrid}>
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
      }].map(s => <Card key={s.label} className={styles.summaryCard}>
            <CardContent className={styles.summaryCardContent}>
              <p className={styles.summaryLabel}>{s.label}</p>
              <p className={styles.summaryValue}>{s.value}</p>
            </CardContent>
          </Card>)}
      </div>

      <Card className={styles.tableCard}>
        <CardHeader className={styles.tableHeader}>
          <div className={styles.tableHeaderContentRow}>
            <CardTitle className={styles.tableTitle}>All Orders</CardTitle>
            <div className={styles.tableActions}>
              <div className={styles.searchContainer}>
                <Search className={styles.searchIcon} />
                <Input placeholder="Search orders..." value={search} onChange={e => setSearch(e.target.value)} className={styles.searchInput} />
              </div>
              <Button variant="outline" size="sm" className={styles.filterButton}><Filter className="h-3.5 w-3.5" /> Filter</Button>
              <Button variant="outline" size="sm" className={styles.exportButton}><Download className="h-3.5 w-3.5" /> Export</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className={styles.tableContent}>
          <div className={styles.tableContainer}>
            <table className={styles.ordersTable}>
              <thead>
                <tr className={styles.tableHead}>
                  <th className={styles.tableCell}>Order ID</th>
                  <th className={styles.tableCell}>Customer</th>
                  <th className={`${styles.tableCell} ${styles.hiddenMd}`}>Vendor</th>
                  <th className={`${styles.tableCell} ${styles.hiddenSm}`}>Amount</th>
                  <th className={styles.tableCell}>Status</th>
                  <th className={`${styles.tableCell} ${styles.hiddenLg}`}>Date</th>
                  <th className={styles.tableCell}></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(o => {
                const sc = getStatusConfig(o.status);
                const StatusIcon = sc.icon;
                return <tr key={o.id} className="tableBody tr">
                      <td className={`${styles.tableCell} ${styles.orderId}`}>{o.id}</td>
                      <td className={`${styles.tableCell} text-foreground`}>{o.customer}</td>
                      <td className={`${styles.tableCell} text-muted-foreground ${styles.hiddenMd}`}>{o.vendor}</td>
                      <td className={`${styles.tableCell} text-foreground font-medium ${styles.hiddenSm}`}>{o.amount}</td>
                      <td className={styles.tableCell}>
                        <span className={`${styles.statusBadge} ${sc.style}`}>
                          <StatusIcon className={styles.statusIcon} /> {o.status}
                        </span>
                      </td>
                      <td className={`${styles.tableCell} text-muted-foreground ${styles.hiddenLg}`}>{o.date}</td>
                      <td className={styles.tableCell}>
                        <button className={styles.actionButton}><Eye className="h-4 w-4" /></button>
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
