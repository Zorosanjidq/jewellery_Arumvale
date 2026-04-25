import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCompare } from "@/context/CompareContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Star, ShoppingCart, GitCompareArrows, ArrowLeft, Loader2 } from "lucide-react";
import axios from "axios";
import styles from "./ProductDetailPage.module.css";
export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {
    addToCompare,
    removeFromCompare,
    isInCompare
  } = useCompare();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/products/${id}`, {
          withCredentials: true
        });
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Product not found.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <Loader2 className="animate-spin" />
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return <div className={styles.notFound}>{error || "Product not found."}</div>;
  }
  const inCompare = isInCompare(product._id);
  const imageUrl = product.images?.[0] ? `${import.meta.env.VITE_API_URL}${product.images[0]}` : '/placeholder.svg';

  const handleAddToCart = () => {
    try {
      addToCart(product, quantity);
      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };
  return <div className={styles.container}>
      <Link to="/products" className={styles.backLink}>
        <ArrowLeft className="h-4 w-4" /> Back to Products
      </Link>

      <div className={styles.productGrid}>
        <div className={styles.productImageContainer}>
          <img src={imageUrl} alt={product.name} className={styles.productImage} />
        </div>
        <div className={styles.productDetails}>
          <p className={styles.productMeta}>{product.vendor?.username || 'Unknown Vendor'} · {product.category}</p>
          <h1 className={styles.productTitle}>{product.name}</h1>
          <div className={styles.ratingSection}>
            <Star className={styles.ratingStar} />
            <span className={styles.ratingValue}>{product.averageRating || 0}/5</span>
            <span className={styles.valueScore}>· {product.reviewCount || 0} reviews</span>
          </div>
          <p className={styles.price}>Rs{product.price.toLocaleString()}</p>
          <div className={styles.productSpecs}>
            <span className={styles.specItem}>Weight: {product.weight}g</span>
            <span className={styles.specItem}>Purity: {product.purity}</span>
            <span className={styles.specItem}>Stock: {product.stock} left</span>
          </div>
          <p className={styles.description}>{product.description}</p>
          
          {/* Quantity Selector */}
          <div className={styles.quantitySection}>
            <label className={styles.quantityLabel}>Quantity:</label>
            <div className={styles.quantityControls}>
              <button 
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className={styles.quantityButton}
              >
                -
              </button>
              <input 
                type="number" 
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                min="1"
                max={product.stock}
                className={styles.quantityInput}
              />
              <button 
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= product.stock}
                className={styles.quantityButton}
              >
                +
              </button>
            </div>
            <span className={styles.stockInfo}>
              {product.stock} available
            </span>
          </div>
          
          <div className={styles.actionButtons}>
            <button 
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={styles.addToCartButton}
            >
              <ShoppingCart className="h-4 w-4" /> 
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
            <button onClick={() => inCompare ? removeFromCompare(product._id) : addToCompare(product)} className={`${styles.compareButton} ${inCompare ? styles.active : ''}`}>
              <GitCompareArrows className="h-4 w-4" />
              {inCompare ? "In Compare" : "Compare"}
            </button>
          </div>
        </div>
      </div>
    </div>;
}
