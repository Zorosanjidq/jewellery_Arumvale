import { useState } from "react";
import { products } from "@/data/mockData";
import { Search, Filter, Eye, Ban, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import styles from "./AdminProductsPage.module.css";
export default function AdminProductsPage() {
  const [search, setSearch] = useState("");
  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  return <div className={styles.container}>
      <div className={styles.summaryGrid}>
        {[{
        label: "Total Products",
        value: "890"
      }, {
        label: "Active Listings",
        value: "842"
      }, {
        label: "Flagged",
        value: "12"
      }, {
        label: "Avg. Rating",
        value: "4.6 "
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
            <CardTitle className={styles.tableTitle}>All Products</CardTitle>
            <div className={styles.tableActions}>
              <div className={styles.searchContainer}>
                <Search className={styles.searchIcon} />
                <Input placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} className={styles.searchInput} />
              </div>
              <Button variant="outline" size="sm" className={styles.filterButton}><Filter className="h-3.5 w-3.5" /> Filter</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className={styles.tableContent}>
          <div className={styles.tableContainer}>
            <table className={styles.productsTable}>
              <thead>
                <tr className={styles.tableHead}>
                  <th className={styles.tableCell}>Product</th>
                  <th className={`${styles.tableCell} ${styles.hiddenMd}`}>Vendor</th>
                  <th className={styles.tableCell}>Price</th>
                  <th className={`${styles.tableCell} ${styles.hiddenSm}`}>Category</th>
                  <th className={`${styles.tableCell} ${styles.hiddenLg}`}>Rating</th>
                  <th className={`${styles.tableCell} ${styles.hiddenLg}`}>Stock</th>
                  <th className={styles.tableCell}></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => <tr key={p.id} className="tableBody tr">
                    <td className={styles.tableCell}>
                      <div className={styles.productCell}>
                        <img src={p.image} alt={p.name} className={styles.productImage} />
                        <div className={styles.productInfo}>
                          <p className={styles.productName}>{p.name}</p>
                          <p className={styles.productPurity}>{p.purity}</p>
                        </div>
                      </div>
                    </td>
                    <td className={`${styles.tableCell} text-muted-foreground ${styles.hiddenMd}`}>{p.vendor}</td>
                    <td className={`${styles.tableCell} text-foreground font-medium`}>Rs{p.price.toLocaleString()}</td>
                    <td className={`${styles.tableCell} ${styles.hiddenSm}`}>
                      <Badge variant="secondary" className={styles.categoryBadge}>{p.category}</Badge>
                    </td>
                    <td className={`${styles.tableCell} ${styles.hiddenLg}`}>
                      <span className={styles.ratingDisplay}><Star className={styles.ratingStar} />{p.rating}</span>
                    </td>
                    <td className={`${styles.tableCell} ${styles.hiddenLg}`}>
                      <span className={`${styles.stockDisplay} ${p.stock <= 5 ? styles.stockLow : ''}`}>
                        {p.stock} {p.stock <= 5 && <span className={styles.stockLowBadge}>Low</span>}
                      </span>
                    </td>
                    <td className={styles.tableCell}>
                      <div className={styles.actionCell}>
                        <button className={styles.actionButton}><Eye className="h-4 w-4" /></button>
                        <button className={`${styles.actionButton} ${styles.danger}`}><Ban className="h-4 w-4" /></button>
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
