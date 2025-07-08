"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { useState } from "react"

interface FilterState {
  categories: string[]
  vendors: string[]
  priceRange: [number, number]
  rating: number
  inStock: boolean
}

export function ProductFilters() {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    vendors: [],
    priceRange: [0, 1000],
    rating: 0,
    inStock: false,
  })

  const categories = ["Electronics", "Clothing", "Home & Garden", "Sports", "Books", "Beauty"]

  const vendors = ["TechStore", "FashionHub", "HomeDecor", "SportsPro", "BookWorld"]

  const handleCategoryChange = (category: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      categories: checked ? [...prev.categories, category] : prev.categories.filter((c) => c !== category),
    }))
  }

  const handleVendorChange = (vendor: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      vendors: checked ? [...prev.vendors, vendor] : prev.vendors.filter((v) => v !== vendor),
    }))
  }

  const clearFilters = () => {
    setFilters({
      categories: [],
      vendors: [],
      priceRange: [0, 1000],
      rating: 0,
      inStock: false,
    })
  }

  const activeFiltersCount =
    filters.categories.length + filters.vendors.length + (filters.rating > 0 ? 1 : 0) + (filters.inStock ? 1 : 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear All ({activeFiltersCount})
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.categories.map((category) => (
            <Badge key={category} variant="secondary" className="gap-1">
              {category}
              <X className="h-3 w-3 cursor-pointer" onClick={() => handleCategoryChange(category, false)} />
            </Badge>
          ))}
          {filters.vendors.map((vendor) => (
            <Badge key={vendor} variant="secondary" className="gap-1">
              {vendor}
              <X className="h-3 w-3 cursor-pointer" onClick={() => handleVendorChange(vendor, false)} />
            </Badge>
          ))}
        </div>
      )}

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={filters.categories.includes(category)}
                onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
              />
              <label htmlFor={category} className="text-sm cursor-pointer">
                {category}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => setFilters((prev) => ({ ...prev, priceRange: value as [number, number] }))}
            max={1000}
            step={10}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </CardContent>
      </Card>

      {/* Vendors */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Vendors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {vendors.map((vendor) => (
            <div key={vendor} className="flex items-center space-x-2">
              <Checkbox
                id={vendor}
                checked={filters.vendors.includes(vendor)}
                onCheckedChange={(checked) => handleVendorChange(vendor, checked as boolean)}
              />
              <label htmlFor={vendor} className="text-sm cursor-pointer">
                {vendor}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Rating */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Minimum Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <Slider
            value={[filters.rating]}
            onValueChange={(value) => setFilters((prev) => ({ ...prev, rating: value[0] }))}
            max={5}
            step={0.5}
            className="w-full"
          />
          <div className="text-sm text-gray-600 mt-2">{filters.rating} stars and above</div>
        </CardContent>
      </Card>

      {/* Availability */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="inStock"
              checked={filters.inStock}
              onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, inStock: checked as boolean }))}
            />
            <label htmlFor="inStock" className="text-sm cursor-pointer">
              In Stock Only
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
