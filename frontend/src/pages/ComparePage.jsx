import { useCompare } from "@/context/CompareContext";
import { useAuth } from "@/context/AuthContext";
import { Star, Trophy, Award, TrendingUp, X } from "lucide-react";
import { Link } from "react-router-dom";
import LoginPrompt from "@/components/LoginPrompt";
import { GitCompareArrows } from "lucide-react";
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
    return <div className="container py-20 text-center">
        <h1 className="font-display text-3xl font-bold text-foreground mb-4">Smart Jewellery Comparison Engine</h1>
        <p className="text-muted-foreground mb-8">Select at least 2 products from the <Link to="/products" className="text-primary hover:underline">products page</Link> to compare.</p>
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
  return <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Smart Jewellery Comparison Engine</h1>
          <p className="text-muted-foreground mt-1">Comparing {compareItems.length} products</p>
        </div>
        <button onClick={clearCompare} className="text-sm text-destructive hover:underline">Clear All</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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
      }].map(rec => <div key={rec.label} className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <rec.icon className={`h-6 w-6 ${rec.color}`} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{rec.label}</p>
              <p className="font-display font-semibold text-foreground">{rec.product.name}</p>
              <p className="text-xs text-primary">{rec.product.valueScore}/100 Score</p>
            </div>
          </div>)}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-4 bg-muted rounded-tl-xl text-sm font-semibold text-foreground w-40">Feature</th>
              {compareItems.map(product => <th key={product.id} className={`p-4 bg-muted text-center last:rounded-tr-xl ${product.id === bestOverall.id ? "ring-2 ring-primary ring-inset" : ""}`}>
                  <div className="relative">
                    <button onClick={() => removeFromCompare(product.id)} className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs">
                      <X className="h-3 w-3" />
                    </button>
                    <img src={product.image} alt={product.name} className="h-16 w-16 rounded-lg object-cover mx-auto mb-2" />
                    <p className="font-display font-semibold text-sm text-foreground">{product.name}</p>
                    {product.id === bestOverall.id && <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs">
                        <Award className="h-3 w-3" /> Best Pick
                      </span>}
                  </div>
                </th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => <tr key={row.label} className={i % 2 === 0 ? "bg-background" : "bg-muted/50"}>
                <td className="p-4 text-sm font-medium text-foreground">{row.label}</td>
                {compareItems.map(product => {
              const val = product[row.key];
              const formatted = row.format ? row.format(val) : val;
              const isBest = row.highlight && val === getBest(row.key, row.highlight);
              return <td key={product.id} className={`p-4 text-center text-sm ${isBest ? "font-bold text-primary" : "text-foreground"} ${product.id === bestOverall.id ? "ring-2 ring-primary ring-inset" : ""}`}>
                      {formatted}
                      {isBest && <span className="ml-1 text-xs">★</span>}
                    </td>;
            })}
              </tr>)}
          </tbody>
        </table>
      </div>
    </div>;
}
