import { products } from "@/data/mockData";
import { AlertTriangle, Package, Search, ArrowUpDown } from "lucide-react";
export default function InventoryPage() {
  const lowStock = products.filter(p => p.stock < 5).length;
  const totalUnits = products.reduce((sum, p) => sum + p.stock, 0);
  return <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Inventory</h1>
        <p className="text-sm text-muted-foreground mt-1">Monitor stock levels and manage inventory across your catalog.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{products.length}</p>
              <p className="text-xs text-muted-foreground">Total Products</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <ArrowUpDown className="h-5 w-5 text-blue-700" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{totalUnits}</p>
              <p className="text-xs text-muted-foreground">Total Units</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-red-100 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-destructive">{lowStock}</p>
              <p className="text-xs text-muted-foreground">Low Stock Items</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input type="text" placeholder="Search inventory..." className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
      </div>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(p => {
        const isLow = p.stock < 5;
        return <div key={p.id} className={`bg-card rounded-xl border p-4 transition-shadow hover:shadow-md ${isLow ? "border-destructive/30" : "border-border"}`}>
              <div className="flex items-center gap-3 mb-4">
                <img src={p.image} alt={p.name} className="h-14 w-14 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.purity} · {p.weight}g</p>
                </div>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-border">
                <span className="text-xs text-muted-foreground">Available Stock</span>
                <div className="flex items-center gap-2">
                  {isLow && <AlertTriangle className="h-3.5 w-3.5 text-destructive" />}
                  <span className={`text-sm font-bold ${isLow ? "text-destructive" : "text-foreground"}`}>{p.stock} units</span>
                </div>
              </div>
              <div className="mt-2">
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full rounded-full ${isLow ? "bg-destructive" : "bg-primary"}`} style={{
                width: `${Math.min(p.stock * 5, 100)}%`
              }} />
                </div>
              </div>
              <button className="mt-3 w-full py-2 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-muted transition-colors">
                Update Stock
              </button>
            </div>;
      })}
      </div>
    </div>;
}
