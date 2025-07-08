"use client"

import { useProducts } from "@/hooks/use-products"
import { ProductCard } from "@/components/products/product-card"
import { ProductCardSkeleton } from "@/components/products/product-card-skeleton"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function FeaturedProducts() {
  const { data: products, isLoading } = useProducts({ featured: true, limit: 8 })

  // Mock data for development when API is not available
  const mockProducts = [
    {
      id: "1",
      name: "Wireless Bluetooth Headphones",
      price: 79.99,
      originalPrice: 99.99,
      images: ["/placeholder.svg?height=250&width=300"],
      vendorId: "vendor1",
      vendorName: "TechStore",
      categoryId: "electronics",
      inventory: 25,
      rating: 4.5,
      reviews: 128,
      discount: 20,
      featured: true,
    },
    {
      id: "2",
      name: "Smart Fitness Watch",
      price: 199.99,
      images: ["/placeholder.svg?height=250&width=300"],
      vendorId: "vendor2",
      vendorName: "FitTech",
      categoryId: "electronics",
      inventory: 15,
      rating: 4.7,
      reviews: 89,
      featured: true,
    },
    {
      id: "3",
      name: "Organic Cotton T-Shirt",
      price: 29.99,
      originalPrice: 39.99,
      images: ["/placeholder.svg?height=250&width=300"],
      vendorId: "vendor3",
      vendorName: "EcoFashion",
      categoryId: "clothing",
      inventory: 50,
      rating: 4.3,
      reviews: 67,
      discount: 25,
      featured: true,
    },
    {
      id: "4",
      name: "Stainless Steel Water Bottle",
      price: 24.99,
      images: ["/placeholder.svg?height=250&width=300"],
      vendorId: "vendor4",
      vendorName: "EcoLife",
      categoryId: "home",
      inventory: 30,
      rating: 4.6,
      reviews: 145,
      featured: true,
    },
  ]

  const displayProducts = products && products.length > 0 ? products : mockProducts

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of trending products from top-rated vendors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : displayProducts.slice(0, 8).map((product) => <ProductCard key={product.id} product={product} />)}
        </div>

        <div className="text-center">
          <Link href="/products">
            <Button size="lg" variant="outline">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
