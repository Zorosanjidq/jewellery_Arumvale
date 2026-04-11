import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, GitCompareArrows } from "lucide-react";
import { products, categories } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";
import { useCompare } from "@/context/CompareContext";
export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const {
    compareItems
  } = useCompare();
  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || p.category === activeCategory || p.purity === activeCategory;
    return matchesSearch && matchesCategory;
  });
  return <div className="container py-8">
      <h1 className="font-display text-3xl font-bold text-foreground mb-6">All Jewellery</h1>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search jewellery..." className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map(cat => <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
              {cat}
            </button>)}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map(product => <ProductCard key={product.id} product={product} />)}
      </div>

      {filtered.length === 0 && <p className="text-center text-muted-foreground py-20">No products found.</p>}

      {/* Floating compare button */}
      {compareItems.length >= 2 && <Link to="/compare" className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-xl hover:bg-gold-dark transition-all animate-fade-in">
          <GitCompareArrows className="h-5 w-5" />
          Compare Selected ({compareItems.length})
        </Link>}
    </div>;
}
