"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Star } from "lucide-react"

interface ProductFiltersProps {
  categoryId?: string
}

// Mock categories for development
const mockCategories = [
  { id: "electronics", name: "Electronics" },
  { id: "audio", name: "Audio Equipment" },
  { id: "computers", name: "Computers & Accessories" },
  { id: "smartphones", name: "Smartphones & Tablets" },
  { id: "clothing", name: "Clothing" },
  { id: "home", name: "Home & Kitchen" },
]

// Mock vendors for development
const mockVendors = [
  { id: "vendor1", name: "AudioTech Pro" },
  { id: "vendor2", name: "FitTech" },
  { id: "vendor3", name: "EcoFashion" },
  { id: "vendor4", name: "EcoLife" },
  { id: "vendor5", name: "TechStore" },
  { id: "vendor6", name: "HomeEssentials" },
]

export function ProductFilters({ categoryId }: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>(categoryId ? [categoryId] : [])
  const [selectedVendors, setSelectedVendors] = useState<string[]>([])
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])
  const [inStock, setInStock] = useState(false)
  const [onSale, setOnSale] = useState(false)

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setSelectedCategories((prev) => (checked ? [...prev, categoryId] : prev.filter((id) => id !== categoryId)))
  }

  const handleVendorChange = (vendorId: string, checked: boolean) => {
    setSelectedVendors((prev) => (checked ? [...prev, vendorId] : prev.filter((id) => id !== vendorId)))
  }

  const handleRatingChange = (rating: number, checked: boolean) => {
    setSelectedRatings((prev) => (checked ? [...prev, rating] : prev.filter((r) => r !== rating)))
  }

  const handleApplyFilters = () => {
    // In a real app, this would update URL params or trigger a query
    console.log({
      priceRange,
      selectedCategories,
      selectedVendors,
      selectedRatings,
      inStock,
      onSale,
    })
  }

  const handleResetFilters = () => {
    setPriceRange([0, 1000])
    setSelectedCategories(categoryId ? [categoryId] : [])
    setSelectedVendors([])
    setSelectedRatings([])
    setInStock(false)
    setOnSale(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Price Range</h3>
        <Slider
          defaultValue={priceRange}
          min={0}
          max={1000}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-6"
        />
        <div className="flex items-center justify-between">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {!categoryId && (
        <div>
          <h3 className="text-lg font-medium mb-4">Categories</h3>
          <div className="space-y-3">
            {mockCategories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={(checked) => handleCategoryChange(category.id, checked === true)}
                />
                <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-lg font-medium mb-4">Vendors</h3>
        <div className="space-y-3">
          {mockVendors.map((vendor) => (
            <div key={vendor.id} className="flex items-center space-x-2">
              <Checkbox
                id={`vendor-${vendor.id}`}
                checked={selectedVendors.includes(vendor.id)}
                onCheckedChange={(checked) => handleVendorChange(vendor.id, checked === true)}
              />
              <Label htmlFor={`vendor-${vendor.id}`}>{vendor.name}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Rating</h3>
        <div className="space-y-3">
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={selectedRatings.includes(rating)}
                onCheckedChange={(checked) => handleRatingChange(rating, checked === true)}
              />
              <Label htmlFor={`rating-${rating}`} className="flex items-center">
                <span className="flex mr-1">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                </span>
                <span>& Up</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Availability</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="in-stock" checked={inStock} onCheckedChange={(checked) => setInStock(checked === true)} />
            <Label htmlFor="in-stock">In Stock</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="on-sale" checked={onSale} onCheckedChange={(checked) => setOnSale(checked === true)} />
            <Label htmlFor="on-sale">On Sale</Label>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Button onClick={handleApplyFilters}>Apply Filters</Button>
        <Button variant="outline" onClick={handleResetFilters}>
          Reset Filters
        </Button>
      </div>
    </div>
  )
}
