import { Upload, Info } from "lucide-react";
import { useState } from "react";
const categories = ["Necklace", "Ring", "Bangle", "Earrings", "Pendant", "Anklet", "Chain", "Bracelet"];
const purities = ["24K", "22K", "18K", "14K", "925 Silver", "Platinum"];
export default function AddProductPage() {
  const [images, setImages] = useState([]);
  return <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Add New Product</h1>
        <p className="text-sm text-muted-foreground mt-1">Fill in the details to list a new product on your store.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-sm font-semibold text-foreground mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Product Name <span className="text-destructive">*</span></label>
                <input type="text" placeholder="e.g. Royal Diamond Necklace" className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Description <span className="text-destructive">*</span></label>
                <textarea rows={4} placeholder="Describe your product in detail — materials, craftsmanship, design inspiration..." className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Category <span className="text-destructive">*</span></label>
                  <select className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                    <option value="">Select category</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">SKU</label>
                  <input type="text" placeholder="e.g. GV-NK-001" className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Details */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-sm font-semibold text-foreground mb-4">Pricing & Specifications</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Price (₹) <span className="text-destructive">*</span></label>
                <input type="number" placeholder="0" className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Compare at Price (₹)</label>
                <input type="number" placeholder="0" className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Weight (grams) <span className="text-destructive">*</span></label>
                <input type="number" step="0.1" placeholder="0.0" className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Gold Purity <span className="text-destructive">*</span></label>
                <select className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  <option value="">Select purity</option>
                  {purities.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Stock Quantity <span className="text-destructive">*</span></label>
                <input type="number" placeholder="0" className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Hallmark Number</label>
                <input type="text" placeholder="BIS Hallmark ID" className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Images & Publish */}
        <div className="space-y-6">
          {/* Image Upload */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-sm font-semibold text-foreground mb-4">Product Images</h2>
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer mb-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Upload className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground">Click to upload</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Info className="h-3 w-3" /> First image will be used as the cover
            </div>
          </div>

          {/* Publish */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-sm font-semibold text-foreground mb-4">Publish</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Status</label>
                <select className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  <option>Draft</option>
                  <option>Active</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Tags</label>
                <input type="text" placeholder="gold, necklace, wedding" className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>
            <button className="mt-4 w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
              Publish Product
            </button>
            <button className="mt-2 w-full py-2.5 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-muted transition-colors">
              Save as Draft
            </button>
          </div>
        </div>
      </div>
    </div>;
}
