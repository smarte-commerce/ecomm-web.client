"use client"

import { useProducts } from "@/hooks/use-products"
import { ProductCard } from "./product-card"
import { ProductCardSkeleton } from "./product-card-skeleton"

export function ProductGrid() {
  const { data: products, isLoading, error } = useProducts()

  // Mock data for development
  const mockProducts = [
    {
      id: "1",
      name: "Premium Wireless Headphones",
      price: 149.99,
      originalPrice: 199.99,
      images: ["/placeholder.svg?height=250&width=300"],
      vendorId: "vendor1",
      vendorName: "AudioTech",
      categoryId: "electronics",
      inventory: 12,
      rating: 4.8,
      reviews: 234,
      discount: 25,
    },
    {
      id: "2",
      name: "Smart Home Speaker",
      price: 89.99,
      images: ["/placeholder.svg?height=250&width=300"],
      vendorId: "vendor2",
      vendorName: "SmartHome Co",
      categoryId: "electronics",
      inventory: 8,
      rating: 4.6,
      reviews: 156,
    },
    {
      id: "3",
      name: "Ergonomic Office Chair",
      price: 299.99,
      originalPrice: 399.99,
      images: ["/placeholder.svg?height=250&width=300"],
      vendorId: "vendor3",
      vendorName: "OfficeComfort",
      categoryId: "furniture",
      inventory: 5,
      rating: 4.7,
      reviews: 89,
      discount: 25,
    },
    {
      id: "4",
      name: "Organic Skincare Set",
      price: 79.99,
      images: ["/placeholder.svg?height=250&width=300"],
      vendorId: "vendor4",
      vendorName: "NaturalBeauty",
      categoryId: "beauty",
      inventory: 20,
      rating: 4.9,
      reviews: 312,
    },
    {
      id: "5",
      name: "Fitness Resistance Bands",
      price: 24.99,
      originalPrice: 34.99,
      images: ["/placeholder.svg?height=250&width=300"],
      vendorId: "vendor5",
      vendorName: "FitGear",
      categoryId: "sports",
      inventory: 35,
      rating: 4.4,
      reviews: 78,
      discount: 29,
    },
    {
      id: "6",
      name: "Ceramic Coffee Mug Set",
      price: 39.99,
      images: ["/placeholder.svg?height=250&width=300"],
      vendorId: "vendor6",
      vendorName: "KitchenEssentials",
      categoryId: "home",
      inventory: 18,
      rating: 4.5,
      reviews: 124,
    },
  ]

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">Failed to load products. Showing sample products.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    )
  }

  const displayProducts = products && products.length > 0 ? products : mockProducts

  if (!displayProducts?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No products found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
