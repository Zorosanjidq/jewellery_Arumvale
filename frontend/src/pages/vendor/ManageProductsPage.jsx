import { products } from "@/data/mockData";
import { Edit, Trash2, Search, Plus, Eye } from "lucide-react";
import { Link } from "react-router-dom";
const statusMap = {
  active: {
    label: "Active",
    class: "bg-green-100 text-green-700"
  },
  draft: {
    label: "Draft",
    class: "bg-muted text-muted-foreground"
  }
};
export default function ManageProductsPage() {
  return <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Products</h1>
          <p className="text-sm text-muted-foreground mt-1">{products.length} products in your catalog</p>
        </div>
        <Link to="/vendor/add-product" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" /> Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type="text" placeholder="Search products..." className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <select className="px-3 py-2.5 rounded-lg border border-input bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
          <option>All Categories</option>
          <option>Gold</option>
          <option>Silver</option>
          <option>Diamond</option>
        </select>
        <select className="px-3 py-2.5 rounded-lg border border-input bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
          <option>All Status</option>
          <option>Active</option>
          <option>Draft</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Product</th>
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Price</th>
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Purity</th>
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Stock</th>
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Status</th>
                <th className="text-right p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => <tr key={p.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="h-11 w-11 rounded-lg object-cover" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.category} · {p.weight}g</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm font-semibold text-foreground">₹{p.price.toLocaleString()}</td>
                  <td className="p-4 text-sm text-muted-foreground hidden md:table-cell">{p.purity}</td>
                  <td className="p-4 hidden md:table-cell">
                    <span className={`text-sm font-semibold ${p.stock < 5 ? "text-destructive" : "text-foreground"}`}>
                      {p.stock}
                      {p.stock < 5 && <span className="text-xs font-normal text-destructive ml-1">Low</span>}
                    </span>
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${i % 3 === 2 ? statusMap.draft.class : statusMap.active.class}`}>
                      {i % 3 === 2 ? "Draft" : "Active"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" title="View">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" title="Edit">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors" title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <p className="text-xs text-muted-foreground">Showing 1-{products.length} of {products.length} products</p>
          <div className="flex gap-1">
            <button className="h-8 px-3 rounded-md border border-input text-xs text-muted-foreground hover:bg-muted transition-colors">Previous</button>
            <button className="h-8 px-3 rounded-md bg-primary text-primary-foreground text-xs font-medium">1</button>
            <button className="h-8 px-3 rounded-md border border-input text-xs text-muted-foreground hover:bg-muted transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>;
}
