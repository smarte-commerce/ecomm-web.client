"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductCard } from "@/components/products/product-card"

// Mock data - replace with actual API call
const recommendedProducts = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 99.99,
    originalPrice: 129.99,
    images: ["/placeholder.svg?height=200&width=200"],
    vendorId: "vendor1",
    vendorName: "TechStore",
    rating: 4.5,
    reviews: 128,
    inventory: 15,
    discount: 23,
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 199.99,
    images: ["/placeholder.svg?height=200&width=200"],
    vendorId: "vendor2",
    vendorName: "GadgetHub",
    rating: 4.7,
    reviews: 89,
    inventory: 8,
  },
]

export function RecommendedProducts() {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>You might also like</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
