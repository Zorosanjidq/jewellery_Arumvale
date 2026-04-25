import { useCompare } from "@/context/CompareContext";
import { useAuth } from "@/context/AuthContext";
import { Star, Trophy, Award, TrendingUp, X } from "lucide-react";
import { Link } from "react-router-dom";
import LoginPrompt from "@/components/LoginPrompt";
import { GitCompareArrows } from "lucide-react";
import styles from "./ComparePage.module.css";
export default function ComparePage() {
  const {
    compareItems,
    removeFromCompare,
    clearCompare
  } = useCompare();
  const {
    isLoggedIn
  } = useAuth();
  if (!isLoggedIn) {
    return <LoginPrompt title="Sign In to Compare" description="Log in to use our Smart Jewellery Comparison Engine — compare price, purity, weight & AI value scores side by side." icon={<GitCompareArrows className="h-10 w-10 text-primary" />} />;
  }
  if (compareItems.length < 2) {
    return <div className={styles.emptyState}>
        <h1 className={styles.emptyStateTitle}>Smart Jewellery Comparison Engine</h1>
        <p className={styles.emptyStateDescription}>Select at least 2 products from the <Link to="/products" className={styles.emptyStateLink}>products page</Link> to compare.</p>
      </div>;
  }
  const bestValue = [...compareItems].sort((a, b) => b.valueScore - a.valueScore)[0];
  const bestRating = [...compareItems].sort((a, b) => b.rating - a.rating)[0];
  const bestOverall = bestValue;
  const rows = [{
    label: "Price",
    key: "price",
    format: v => `₹${v.toLocaleString()}`,
    highlight: "min"
  }, {
    label: "Weight",
    key: "weight",
    format: v => `${v}g`
  }, {
    label: "Gold Purity",
    key: "purity"
  }, {
    label: "Rating",
    key: "rating",
    format: v => `${v}/5`,
    highlight: "max"
  }, {
    label: "Value Score",
    key: "valueScore",
    format: v => `${v}/100`,
    highlight: "max"
  }, {
    label: "Vendor",
    key: "vendor"
  }];
  const getBest = (key, type) => {
    const vals = compareItems.map(p => p[key]);
    return type === "max" ? Math.max(...vals) : Math.min(...vals);
  };
  return <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.headerTitle}>Smart Jewellery Comparison Engine</h1>
          <p className={styles.headerSubtitle}>Comparing {compareItems.length} products</p>
        </div>
        <button onClick={clearCompare} className={styles.clearButton}>Clear All</button>
      </div>

      <div className={styles.recommendationsGrid}>
        {[{
        label: "Best Value",
        icon: TrendingUp,
        product: bestValue,
        color: "text-primary"
      }, {
        label: "Best Rating",
        icon: Star,
        product: bestRating,
        color: "text-primary"
      }, {
        label: "Best Overall",
        icon: Trophy,
        product: bestOverall,
        color: "text-primary"
      }].map(rec => <div key={rec.label} className={styles.recommendationCard}>
            <div className={styles.recommendationIcon}>
              <rec.icon className={rec.color} />
            </div>
            <div className={styles.recommendationContent}>
              <p className={styles.recommendationLabel}>{rec.label}</p>
              <p className={styles.recommendationName}>{rec.product.name}</p>
              <p className={styles.recommendationScore}>{rec.product.valueScore}/100 Score</p>
            </div>
          </div>)}
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.comparisonTable}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>Feature</th>
              {compareItems.map(product => <th key={product.id} className={`${styles.productHeader} ${product.id === bestOverall.id ? styles.bestPick : ''}`}>
                  <div className={styles.productHeaderContent}>
                    <button onClick={() => removeFromCompare(product.id)} className={styles.removeButton}>
                      <X className="h-3 w-3" />
                    </button>
                    <img src={product.image} alt={product.name} className={styles.productImage} />
                    <p className={styles.productName}>{product.name}</p>
                    {product.id === bestOverall.id && <span className={styles.bestPickBadge}>
                        <Award className="h-3 w-3" /> Best Pick
                      </span>}
                  </div>
                </th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => <tr key={row.label}>
                <td className={styles.featureCell}>{row.label}</td>
                {compareItems.map(product => {
              const val = product[row.key];
              const formatted = row.format ? row.format(val) : val;
              const isBest = row.highlight && val === getBest(row.key, row.highlight);
              return <td key={product.id} className={`${styles.valueCell} ${isBest ? styles.bestValue : ''} ${product.id === bestOverall.id ? styles.bestPick : ''}`}>
                      {formatted}
                      {isBest && <span className={styles.valueStar}>¡</span>}
                    </td>;
            })}
              </tr>)}
          </tbody>
        </table>
      </div>
    </div>;
}
