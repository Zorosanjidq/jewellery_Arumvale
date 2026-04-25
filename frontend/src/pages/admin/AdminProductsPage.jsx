import { useState, useEffect } from "react";
import { Search, Filter, Eye, Ban, Star, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import styles from "./AdminProductsPage.module.css";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeListings: 0,
    flagged: 0,
    avgRating: 0
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/products", {
          withCredentials: true
        });
        const productList = response.data.products || [];
        setProducts(productList);
        setStats({
          totalProducts: productList.length,
          activeListings: productList.filter(p => p.status === "active").length,
          flagged: 0,
          avgRating: 0
        });
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  if (loading) {
    return <div className={styles.container}>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin h-8 w-8 text-primary" />
        </div>
      </div>;
  }
  return <div className={styles.container}>
      <div className={styles.summaryGrid}>
        {[{
        label: "Total Products",
        value: stats.totalProducts.toString()
      }, {
        label: "Active Listings",
        value: stats.activeListings.toString()
      }, {
        label: "Flagged",
        value: stats.flagged.toString()
      }, {
        label: "Avg. Rating",
        value: stats.avgRating > 0 ? stats.avgRating.toFixed(1) : "N/A"
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
