import { ShoppingCart } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import LoginPrompt from "@/components/LoginPrompt";
export default function CartPage() {
  const {
    isLoggedIn
  } = useAuth();
  if (!isLoggedIn) {
    return <LoginPrompt title="Sign In to View Cart" description="Log in to add items to your cart and start shopping from India's finest jewellers." icon={<ShoppingCart className="h-10 w-10 text-primary" />} />;
  }
  return <div className="container py-20 text-center">
      <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
      <h1 className="font-display text-3xl font-bold text-foreground mb-2">Your Cart</h1>
      <p className="text-muted-foreground">Your cart is empty. Start browsing our collection!</p>
    </div>;
}
