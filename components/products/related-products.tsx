"use client"

import { useQuery } from "@tanstack/react-query"
import { ProductCard } from "@/components/products/product-card"
import { ProductCardSkeleton } from "@/components/products/product-card-skeleton"
import { apiClient } from "@/lib/services/api-client"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

interface RelatedProductsProps {
  productId: string
}

// Mock related products for development
const mockRelatedProducts = [
  {
    id: "2",
    name: "Wireless Earbuds with Charging Case",
    price: 89.99,
    images: ["/placeholder.svg?height=250&width=300"],
    vendorId: "vendor123",
    vendorName: "AudioTech Pro",
    categoryId: "electronics",
    inventory: 120,
    rating: 4.6,
    reviews: 89,
  },
  {
    id: "3",
    name: "Portable Bluetooth Speaker",
    price: 59.99,
    originalPrice: 79.99,
    images: ["/placeholder.svg?height=250&width=300"],
    vendorId: "vendor123",
    vendorName: "AudioTech Pro",
    categoryId: "electronics",
    inventory: 75,
    rating: 4.4,
    reviews: 62,
    discount: 25,
  },
  {
    id: "4",
    name: "Premium Audio Cable",
    price: 24.99,
    images: ["/placeholder.svg?height=250&width=300"],
    vendorId: "vendor123",
    vendorName: "AudioTech Pro",
    categoryId: "electronics",
    inventory: 200,
    rating: 4.8,
    reviews: 45,
  },
  {
    id: "5",
    name: "Headphone Stand with USB Hub",
    price: 34.99,
    originalPrice: 44.99,
    images: ["/placeholder.svg?height=250&width=300"],
    vendorId: "vendor456",
    vendorName: "TechAccessories",
    categoryId: "electronics",
    inventory: 60,
    rating: 4.3,
    reviews: 28,
    discount: 22,
  },
  {
    id: "6",
    name: "Wireless Charging Pad",
    price: 29.99,
    images: ["/placeholder.svg?height=250&width=300"],
    vendorId: "vendor456",
    vendorName: "TechAccessories",
    categoryId: "electronics",
    inventory: 85,
    rating: 4.5,
    reviews: 37,
  },
]

export function RelatedProducts({ productId }: RelatedProductsProps) {
  const { data: relatedProducts, isLoading } = useQuery({
    queryKey: ["relatedProducts", productId],
    queryFn: async () => {
      try {
        const response = await apiClient.get(`/api/products/${productId}/recommendations`)
        return response
      } catch (error) {
        console.error("Error fetching related products:", error)
        return mockRelatedProducts
      }
    },
  })

  const displayProducts = relatedProducts || mockRelatedProducts

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
      </div>
    )
  }

  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-4">
        {displayProducts.map((product) => (
          <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/4">
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0" />
      <CarouselNext className="right-0" />
    </Carousel>
  )
}
