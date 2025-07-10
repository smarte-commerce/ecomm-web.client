"use client"

import type React from "react"

import { useState } from "react"
import { useProduct } from "@/hooks/use-products"
import { useAddToCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Heart, ShoppingCart, Share2, Star, Truck, Shield, RotateCcw, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface ProductDetailsProps {
  productId: string
}

// Mock product data
const mockProductData = {
  id: "1",
  name: "Premium Wireless Noise-Cancelling Headphones",
  description:
    "Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise-cancellation technology, these headphones deliver an immersive listening experience whether you're commuting, working, or relaxing at home. The comfortable over-ear design and long-lasting battery ensure you can enjoy your favorite music all day long.",
  price: 249.99,
  originalPrice: 299.99,
  discount: 17,
  rating: 4.8,
  reviewCount: 256,
  inventory: 45,
  vendorId: "vendor123",
  vendorName: "AudioTech Pro",
  categoryId: "electronics",
  categoryName: "Audio Equipment",
  images: [
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600&text=Side+View",
    "/placeholder.svg?height=600&width=600&text=Back+View",
    "/placeholder.svg?height=600&width=600&text=Detail+View",
  ],
  colors: [
    { name: "Matte Black", value: "#000000" },
    { name: "Silver", value: "#C0C0C0" },
    { name: "Navy Blue", value: "#000080" },
  ],
  features: [
    "Active Noise Cancellation",
    "40-hour battery life",
    "Bluetooth 5.2 connectivity",
    "Built-in microphone for calls",
    "Foldable design for easy storage",
    "Compatible with voice assistants",
  ],
  specifications: {
    "Driver Size": "40mm",
    "Frequency Response": "20Hz - 20kHz",
    Impedance: "32 Ohm",
    "Battery Life": "Up to 40 hours",
    "Charging Time": "2 hours",
    "Bluetooth Version": "5.2",
    Weight: "250g",
    Warranty: "2 years",
  },
  inStock: true,
  freeShipping: true,
  estimatedDelivery: "2-4 business days",
  tags: ["headphones", "wireless", "noise-cancelling", "bluetooth", "audio"],
}

export function ProductDetails({ productId }: ProductDetailsProps) {
  const { data: product, isLoading, error } = useProduct(productId)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState("")
  const addToCart = useAddToCart()
  const { toast } = useToast()

  // Use mock data if API call fails or for development
  const displayProduct = product || mockProductData

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (value > 0 && value <= displayProduct.inventory) {
      setQuantity(value)
    }
  }

  const handleAddToCart = async () => {
    try {
      await addToCart.mutateAsync({
        productId: displayProduct.id,
        quantity,
        variant: selectedColor ? { color: selectedColor } : undefined,
      })
      toast({
        title: "Added to cart",
        description: `${displayProduct.name} has been added to your cart.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product to cart.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return <div>Loading product details...</div>
  }

  if (error) {
    console.error("Error loading product:", error)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{displayProduct.name}</h1>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= Math.round(displayProduct.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm font-medium">{displayProduct.rating}</span>
          </div>
          <span className="text-sm text-gray-500">{displayProduct.reviewCount} reviews</span>
          <Link href={`/vendor/${displayProduct.vendorId}`} className="text-sm text-primary hover:underline">
            by {displayProduct.vendorName}
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold">${displayProduct.price.toFixed(2)}</span>
        {displayProduct.originalPrice && (
          <>
            <span className="text-lg text-gray-500 line-through">${displayProduct.originalPrice.toFixed(2)}</span>
            <Badge className="bg-red-500">{displayProduct.discount}% OFF</Badge>
          </>
        )}
      </div>

      <div className="prose prose-sm max-w-none">
        <p>{displayProduct.description}</p>
      </div>

      {displayProduct.colors && displayProduct.colors.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-3">Color</h3>
          <div className="flex gap-3">
            {displayProduct.colors.map((color) => (
              <button
                key={color.value}
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                  selectedColor === color.value ? "border-primary" : "border-transparent"
                }`}
                style={{ backgroundColor: color.value }}
                onClick={() => setSelectedColor(color.value)}
                title={color.name}
              >
                {selectedColor === color.value && (
                  <Check className={`h-5 w-5 ${color.value === "#000000" ? "text-white" : "text-black"}`} />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="w-32">
            <Input
              type="number"
              min="1"
              max={displayProduct.inventory}
              value={quantity}
              onChange={handleQuantityChange}
              className="h-12"
            />
          </div>
          <span className="text-sm text-gray-500">{displayProduct.inventory} items available</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            size="lg"
            className="flex-1"
            onClick={handleAddToCart}
            disabled={!displayProduct.inStock || addToCart.isPending}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            {addToCart.isPending ? "Adding..." : "Add to Cart"}
          </Button>
          <Button size="lg" variant="outline" className="flex-1 bg-transparent">
            <Heart className="mr-2 h-5 w-5" />
            Add to Wishlist
          </Button>
          <Button size="icon" variant="outline">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="border-t pt-6 space-y-4">
        <div className="flex items-start gap-3">
          <Truck className="h-5 w-5 text-gray-500 mt-0.5" />
          <div>
            <p className="font-medium">{displayProduct.freeShipping ? "Free Shipping" : "Standard Shipping"}</p>
            <p className="text-sm text-gray-500">Estimated delivery: {displayProduct.estimatedDelivery}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-gray-500 mt-0.5" />
          <div>
            <p className="font-medium">Secure Transaction</p>
            <p className="text-sm text-gray-500">Your data is protected with industry-standard encryption</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <RotateCcw className="h-5 w-5 text-gray-500 mt-0.5" />
          <div>
            <p className="font-medium">30-Day Returns</p>
            <p className="text-sm text-gray-500">Not satisfied? Return within 30 days for a full refund</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Add a nested component for the description tab
ProductDetails.Description = function ProductDescription({ productId }: { productId: string }) {
  const { data: product } = useProduct(productId)
  const displayProduct = product || mockProductData

  return (
    <div className="prose prose-sm max-w-none">
      <p className="mb-4">{displayProduct.description}</p>

      <h3>Key Features</h3>
      <ul>
        {displayProduct.features?.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>

      <p className="mt-4">
        The {displayProduct.name} is designed for audiophiles and casual listeners alike. With its premium build quality
        and advanced technology, it delivers exceptional sound clarity and comfort for extended listening sessions.
      </p>

      <p>
        Whether you're traveling, working, or relaxing at home, these headphones provide the perfect audio companion
        with intuitive controls and seamless connectivity to all your devices.
      </p>
    </div>
  )
}

export default ProductDetails
