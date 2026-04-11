import { useParams, Link } from "react-router-dom";
import { products } from "@/data/mockData";
import { useCompare } from "@/context/CompareContext";
import { Star, ShoppingCart, GitCompareArrows, ArrowLeft } from "lucide-react";
export default function ProductDetailPage() {
  const {
    id
  } = useParams();
  const product = products.find(p => p.id === id);
  const {
    addToCompare,
    removeFromCompare,
    isInCompare
  } = useCompare();
  if (!product) return <div className="container py-20 text-center text-muted-foreground">Product not found.</div>;
  const inCompare = isInCompare(product.id);
  return <div className="container py-8">
      <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="rounded-xl overflow-hidden bg-muted">
          <img src={product.image} alt={product.name} className="w-full aspect-square object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-sm text-muted-foreground mb-1">{product.vendor} · {product.category}</p>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="font-medium text-foreground">{product.rating}/5</span>
            <span className="text-muted-foreground text-sm">· Value Score {product.valueScore}/100</span>
          </div>
          <p className="text-3xl font-bold text-primary mb-4">₹{product.price.toLocaleString()}</p>
          <div className="flex gap-4 text-sm text-muted-foreground mb-6">
            <span>Weight: {product.weight}g</span>
            <span>Purity: {product.purity}</span>
            <span>Stock: {product.stock} left</span>
          </div>
          <p className="text-foreground/80 mb-8">{product.description}</p>
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-gold-dark transition-colors">
              <ShoppingCart className="h-4 w-4" /> Add to Cart
            </button>
            <button onClick={() => inCompare ? removeFromCompare(product.id) : addToCompare(product)} className={`flex items-center gap-2 px-6 py-3 rounded-full border font-medium transition-colors ${inCompare ? "border-primary bg-primary/10 text-primary" : "border-border text-foreground hover:border-primary hover:text-primary"}`}>
              <GitCompareArrows className="h-4 w-4" />
              {inCompare ? "In Compare" : "Compare"}
            </button>
          </div>
        </div>
      </div>
    </div>;
}
