import { Package } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import LoginPrompt from "@/components/LoginPrompt";
export default function OrdersPage() {
  const {
    isLoggedIn
  } = useAuth();
  if (!isLoggedIn) {
    return <LoginPrompt title="Sign In to View Orders" description="Log in to track your orders and view your purchase history." icon={<Package className="h-10 w-10 text-primary" />} />;
  }
  return <div className="container py-20 text-center">
      <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
      <h1 className="font-display text-3xl font-bold text-foreground mb-2">My Orders</h1>
      <p className="text-muted-foreground">No orders yet.</p>
    </div>;
}
