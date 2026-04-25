import { AlertTriangle, Package, Search, ArrowUpDown, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import styles from "./InventoryPage.module.css";

export default function InventoryPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/products/my", {
          withCredentials: true
        });
        setProducts(response.data.products || []);
      } catch (error) {
        console.error("Error fetching vendor products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const lowStock = products.filter(p => p.stock < 5).length;
  const totalUnits = products.reduce((sum, p) => sum + p.stock, 0);

  if (loading) {
    return <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.pageTitle}>Inventory</h1>
          <p className={styles.pageSubtitle}>Monitor stock levels and manage inventory across your catalog.</p>
        </div>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin h-8 w-8 text-primary" />
        </div>
      </div>;
  }
  return <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Inventory</h1>
        <p className={styles.pageSubtitle}>Monitor stock levels and manage inventory across your catalog.</p>
      </div>

      {/* Summary */}
      <div className={styles.summaryGrid}>
        <div className={styles.summaryCard}>
          <div className={styles.summaryContent}>
            <div className={`${styles.summaryIcon} ${styles.summaryIconPrimary}`}>
              <Package />
            </div>
            <div className={styles.summaryInfo}>
              <p className={styles.summaryValue}>{products.length}</p>
              <p className={styles.summaryLabel}>Total Products</p>
            </div>
          </div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryContent}>
            <div className={`${styles.summaryIcon} ${styles.summaryIconBlue}`}>
              <ArrowUpDown />
            </div>
            <div className={styles.summaryInfo}>
              <p className={styles.summaryValue}>{totalUnits}</p>
              <p className={styles.summaryLabel}>Total Units</p>
            </div>
          </div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryContent}>
            <div className={`${styles.summaryIcon} ${styles.summaryIconRed}`}>
              <AlertTriangle />
            </div>
            <div className={styles.summaryInfo}>
              <p className={`${styles.summaryValue} ${styles.summaryValueDanger}`}>{lowStock}</p>
              <p className={styles.summaryLabel}>Low Stock Items</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className={styles.searchContainer}>
        <Search className={styles.searchIcon} />
        <input type="text" placeholder="Search inventory..." className={styles.searchInput} />
      </div>

      {/* Inventory Grid */}
      <div className={styles.inventoryGrid}>
        {products.map(p => {
        const isLow = p.stock < 5;
        return <div key={p.id} className={`${styles.inventoryCard} ${isLow ? styles.inventoryCardLowStock : ""}`}>
              <div className={styles.inventoryHeader}>
                <img src={p.image} alt={p.name} className={styles.productImage} />
                <div className={styles.productInfo}>
                  <p className={styles.productName}>{p.name}</p>
                  <p className={styles.productMeta}>{p.purity} · {p.weight}g</p>
                </div>
              </div>
              <div className={styles.stockSection}>
                <span className={styles.stockLabel}>Available Stock</span>
                <div className={styles.stockValue}>
                  {isLow && <AlertTriangle className={styles.stockWarning} />}
                  <span className={`${styles.stockAmount} ${isLow ? styles.stockAmountLow : ""}`}>{p.stock} units</span>
                </div>
              </div>
              <div className={styles.progressContainer}>
                <div className={styles.progressBar}>
                  <div className={`${styles.progressFill} ${isLow ? styles.progressFillLow : ""}`} style={{
                width: `${Math.min(p.stock * 5, 100)}%`
              }} />
                </div>
              </div>
              <button className={styles.updateButton}>
                Update Stock
              </button>
            </div>;
      })}
      </div>
    </div>;
}
