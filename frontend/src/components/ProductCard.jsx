import { Star, GitCompareArrows } from "lucide-react";
import { useCompare } from "@/context/CompareContext";
import { Link } from "react-router-dom";
export default function ProductCard({
  product
}) {
  const {
    addToCompare,
    removeFromCompare,
    isInCompare
  } = useCompare();
  const inCompare = isInCompare(product._id);
  const toggleCompare = e => {
    e.preventDefault();
    e.stopPropagation();
    inCompare ? removeFromCompare(product._id) : addToCompare(product);
  };
  const imageUrl = product.images?.[0] ? `${import.meta.env.VITE_API_URL}${product.images[0]}` : '/placeholder.svg';
  return <Link to={`/product/${product._id}`} className="group block">
      <div className="bg-card rounded-xl border border-border overflow-hidden card-hover">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img src={imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <button onClick={toggleCompare} className={`absolute top-3 right-3 p-2 rounded-full transition-all ${inCompare ? "bg-primary text-primary-foreground shadow-lg" : "bg-card/80 text-foreground backdrop-blur-sm hover:bg-primary hover:text-primary-foreground"}`}>
            <GitCompareArrows className="h-4 w-4" />
          </button>
          <div className="absolute bottom-3 left-3">
            <span className="px-2 py-1 rounded-full bg-card/90 backdrop-blur-sm text-xs font-medium text-foreground">
              {product.purity}
            </span>
          </div>
        </div>
        <div className="p-4">
          <p className="text-xs text-muted-foreground mb-1">{product.vendor?.username || 'Unknown Vendor'}</p>
          <h3 className="font-display font-semibold text-foreground mb-2 line-clamp-1">{product.name}</h3>
          <div className="flex items-center justify-between">
            <p className="font-semibold text-primary text-lg">₹{product.price.toLocaleString()}</p>
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-3.5 w-3.5 fill-primary text-primary" />
              <span className="font-medium text-foreground">{product.averageRating || 'No rating'}</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{product.weight}g</p>
        </div>
      </div>
    </Link>;
}
