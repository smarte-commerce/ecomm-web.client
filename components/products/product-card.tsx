"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useAddToCart } from "@/hooks/use-products"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useAddToCart()
  const { toast } = useToast()

  const handleAddToCart = async () => {
    try {
      await addToCart.mutateAsync({ productId: product.id, quantity: 1 })
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product to cart.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <Link href={`/products/${product.id}`}>
            <Image
              src={product.images[0] || "/placeholder.svg?height=250&width=300"}
              alt={product.name}
              width={300}
              height={250}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
          <Button size="icon" variant="ghost" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
            <Heart className="h-4 w-4" />
          </Button>
          {product.discount && <Badge className="absolute top-2 left-2 bg-red-500">-{product.discount}%</Badge>}
        </div>

        <div className="p-4 space-y-3">
          <div>
            <Link href={`/products/${product.id}`}>
              <h3 className="font-semibold text-lg line-clamp-2 hover:text-primary">{product.name}</h3>
            </Link>
            <Link href={`/vendor/${product.vendorId}`}>
              <p className="text-sm text-gray-600 hover:text-primary">by {product.vendorName}</p>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium ml-1">{product.rating}</span>
            </div>
            <span className="text-sm text-gray-500">({product.reviews})</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
              )}
            </div>
            <Badge variant={product.inventory > 0 ? "default" : "destructive"}>
              {product.inventory > 0 ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>

          <Button
            className="w-full"
            onClick={handleAddToCart}
            disabled={product.inventory === 0 || addToCart.isPending}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {addToCart.isPending ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
