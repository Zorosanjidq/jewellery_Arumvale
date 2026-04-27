import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CompareProvider } from "@/context/CompareContext";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import CustomerLayout from "@/components/CustomerLayout";
import VendorLayout from "@/components/VendorLayout";
import AdminLayout from "@/components/AdminLayout";
import Index from "./pages/Index";
import ProductsPage from "./pages/ProductsPage";
import ComparePage from "./pages/ComparePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VendorRegisterPage from "./pages/VendorRegisterPage";
import VendorDashboard from "./pages/vendor/VendorDashboard";
import AddProductPage from "./pages/vendor/AddProductPage";
import ManageProductsPage from "./pages/vendor/ManageProductsPage";
import VendorOrdersPage from "./pages/vendor/VendorOrdersPage";
import InventoryPage from "./pages/vendor/InventoryPage";
import SalesAnalyticsPage from "./pages/vendor/SalesAnalyticsPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsersPage from "./pages/admin/ManageUsersPage";
import ManageVendorsPage from "./pages/admin/ManageVendorsPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import ReportsPage from "./pages/admin/ReportsPage";
import NotFound from "./pages/NotFound";
const queryClient = new QueryClient();
const App = () => <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <CompareProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
          <Routes>
            {/* Customer */}
            <Route element={<CustomerLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>

            {/* Auth pages (no layout wrapper) */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/register/vendor" element={<VendorRegisterPage />} />

            {/* Vendor */}
            <Route element={<VendorLayout />}>
              <Route path="/vendor" element={<VendorDashboard />} />
              <Route path="/vendor/add-product" element={<AddProductPage />} />
              <Route path="/vendor/products" element={<ManageProductsPage />} />
              <Route path="/vendor/orders" element={<VendorOrdersPage />} />
              <Route path="/vendor/inventory" element={<InventoryPage />} />
              <Route path="/vendor/analytics" element={<SalesAnalyticsPage />} />
            </Route>

            {/* Admin */}
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<ManageUsersPage />} />
              <Route path="/admin/vendors" element={<ManageVendorsPage />} />
              <Route path="/admin/products" element={<AdminProductsPage />} />
              <Route path="/admin/orders" element={<AdminOrdersPage />} />
              <Route path="/admin/reports" element={<ReportsPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CompareProvider>
    </CartProvider>
    </AuthProvider>
  </TooltipProvider>
</QueryClientProvider>;
export default App;
