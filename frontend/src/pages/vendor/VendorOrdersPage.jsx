import { Search, Download } from "lucide-react";
import styles from "./VendorOrdersPage.module.css";
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
const getStatusClass = (status) => {
  switch(status) {
    case "Delivered":
      return styles.statusDelivered;
    case "Shipped":
      return styles.statusShipped;
    case "Processing":
      return styles.statusProcessing;
    case "Pending":
      return styles.statusPending;
    case "Cancelled":
      return styles.statusCancelled;
    default:
      return styles.statusPending;
  }
};

const getPaymentClass = (payment) => {
  switch(payment) {
    case "Paid":
      return styles.paymentPaid;
    case "Pending":
      return styles.paymentPending;
    case "Refunded":
      return styles.paymentRefunded;
    default:
      return styles.paymentPending;
  }
};

const getSummaryBorderClass = (status) => {
  switch(status) {
    case "Pending":
      return styles.summaryPending;
    case "Processing":
      return styles.summaryProcessing;
    case "Shipped":
      return styles.summaryShipped;
    case "Delivered":
      return styles.summaryDelivered;
    default:
      return styles.summaryPending;
  }
};

export default function VendorOrdersPage() {
  return <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>Orders</h1>
          <p className={styles.pageSubtitle}>{orders.length} total orders</p>
        </div>
        <button className={styles.exportButton}>
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} />
          <input type="text" placeholder="Search by order ID, customer..." className={styles.searchInput} />
        </div>
        <select className={styles.statusFilter}>
          <option>All Status</option>
          <option>Pending</option>
          <option>Processing</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>
      </div>

      {/* Summary cards */}
      <div className={styles.summaryGrid}>
        {[{
        label: "Pending",
        count: 1,
        status: "Pending"
      }, {
        label: "Processing",
        count: 1,
        status: "Processing"
      }, {
        label: "Shipped",
        count: 1,
        status: "Shipped"
      }, {
        label: "Delivered",
        count: 2,
        status: "Delivered"
      }].map(s => <div key={s.label} className={`${styles.summaryCard} ${getSummaryBorderClass(s.status)}`}>
            <p className={styles.summaryLabel}>{s.label}</p>
            <p className={styles.summaryCount}>{s.count}</p>
          </div>)}
      </div>

      {/* Table */}
      <div className={styles.tableContainer}>
        <div className={styles.tableWrapper}>
          <table className={styles.ordersTable}>
            <thead>
              <tr className={styles.tableHead}>
                <th className={styles.tableCell}>Order</th>
                <th className={styles.tableCell}>Customer</th>
                <th className={`${styles.tableCell} ${styles.hiddenLg}`}>Product</th>
                <th className={styles.tableCell}>Amount</th>
                <th className={`${styles.tableCell} ${styles.hiddenSm}`}>Payment</th>
                <th className={`${styles.tableCell} ${styles.hiddenMd}`}>Date</th>
                <th className={styles.tableCell}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => <tr key={o.id} className="tableBody tr">
                  <td className={`${styles.tableCell} ${styles.orderId}`}>{o.id}</td>
                  <td className={styles.tableCell}>
                    <p className={styles.customerName}>{o.customer}</p>
                    <p className={styles.customerEmail}>{o.email}</p>
                  </td>
                  <td className={`${styles.tableCell} text-muted-foreground ${styles.hiddenLg}`}>{o.product}</td>
                  <td className={`${styles.tableCell} ${styles.amount}`}>Rs{o.amount.toLocaleString()}</td>
                  <td className={`${styles.tableCell} ${getPaymentClass(o.payment)} ${styles.hiddenSm}`}>{o.payment}</td>
                  <td className={`${styles.tableCell} text-muted-foreground ${styles.hiddenMd}`}>{o.date}</td>
                  <td className={styles.tableCell}>
                    <span className={`${styles.statusBadge} ${getStatusClass(o.status)}`}>{o.status}</span>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
}
