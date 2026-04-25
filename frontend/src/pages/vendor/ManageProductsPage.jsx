import { useState, useEffect } from "react";
import { Edit, Trash2, Search, Plus, Eye, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./ManageProductsPage.module.css";
const getStatusClass = (status) => {
  switch(status) {
    case "Active":
      return styles.statusActive;
    case "Draft":
      return styles.statusDraft;
    default:
      return styles.statusActive;
  }
};

export default function ManageProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (statusFilter !== "All Status") params.append('status', statusFilter.toLowerCase());
      if (categoryFilter !== "All Categories") params.append('category', categoryFilter);

      const response = await axios.get(
        `http://localhost:5000/api/products/my?${params}`,
        { withCredentials: true }
      );
      setProducts(response.data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, statusFilter, categoryFilter]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <Loader2 className="animate-spin" />
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  return <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>Products</h1>
          <p className={styles.pageSubtitle}>{products.length} products in your catalog</p>
        </div>
        <Link to="/vendor/add-product" className={styles.addButton}>
          <Plus className="h-4 w-4" /> Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search products..." 
            className={styles.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select 
          className={styles.filterSelect}
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option>All Categories</option>
          <option>Necklace</option>
          <option>Ring</option>
          <option>Bangle</option>
          <option>Earrings</option>
          <option>Pendant</option>
          <option>Anklet</option>
          <option>Chain</option>
          <option>Bracelet</option>
        </select>
        <select 
          className={styles.filterSelect}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All Status</option>
          <option>Active</option>
          <option>Draft</option>
        </select>
      </div>

      {/* Table */}
      <div className={styles.tableContainer}>
        <div className={styles.tableWrapper}>
          <table className={styles.productsTable}>
            <thead>
              <tr className={styles.tableHead}>
                <th className={styles.tableCell}>Product</th>
                <th className={styles.tableCell}>Price</th>
                <th className={`${styles.tableCell} ${styles.hiddenMd}`}>Purity</th>
                <th className={`${styles.tableCell} ${styles.hiddenMd}`}>Stock</th>
                <th className={`${styles.tableCell} ${styles.hiddenLg}`}>Status</th>
                <th className={styles.tableCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const imageUrl = p.images?.[0] ? `${import.meta.env.VITE_API_URL}${p.images[0]}` : '/placeholder.svg';
                return <tr key={p._id} className="tableBody tr">
                  <td className={styles.tableCell}>
                    <div className={styles.productCell}>
                      <img src={imageUrl} alt={p.name} className={styles.productImage} />
                      <div className={styles.productInfo}>
                        <p className={styles.productName}>{p.name}</p>
                        <p className={styles.productMeta}>{p.category} · {p.weight}g</p>
                      </div>
                    </div>
                  </td>
                  <td className={`${styles.tableCell} ${styles.price}`}>Rs{p.price.toLocaleString()}</td>
                  <td className={`${styles.tableCell} text-muted-foreground ${styles.hiddenMd}`}>{p.purity}</td>
                  <td className={`${styles.tableCell} ${styles.hiddenMd}`}>
                    <span className={p.stock < 5 ? styles.stockLow : styles.stockNormal}>
                      {p.stock}
                      {p.stock < 5 && <span className={styles.stockLowIndicator}>Low</span>}
                    </span>
                  </td>
                  <td className={`${styles.tableCell} ${styles.hiddenLg}`}>
                    <span className={`${styles.statusBadge} ${getStatusClass(p.status)}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className={styles.tableCell}>
                    <div className={styles.actionButtons}>
                      <Link to={`/product/${p._id}`} className={styles.actionButton} title="View">
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link to={`/vendor/edit-product/${p._id}`} className={styles.actionButton} title="Edit">
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button className={`${styles.actionButton} ${styles.actionButtonDelete}`} title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>;
              })}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className={styles.pagination}>
          <p className={styles.paginationInfo}>Showing 1-{products.length} of {products.length} products</p>
          <div className={styles.paginationControls}>
            <button className={styles.paginationButton}>Previous</button>
            <button className={`${styles.paginationButton} ${styles.paginationButtonActive}`}>1</button>
            <button className={styles.paginationButton}>Next</button>
          </div>
        </div>
      </div>
    </div>;
}
