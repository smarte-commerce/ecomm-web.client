"use client"

import { useState } from "react"
import Image from "next/image"
import { useProduct } from "@/hooks/use-products"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface ProductImageGalleryProps {
  productId: string
}

// Mock product images for development
const mockImages = [
  "/placeholder.svg?height=600&width=600",
  "/placeholder.svg?height=600&width=600&text=Side+View",
  "/placeholder.svg?height=600&width=600&text=Back+View",
  "/placeholder.svg?height=600&width=600&text=Detail+View",
]

export function ProductImageGallery({ productId }: ProductImageGalleryProps) {
  const { data: product } = useProduct(productId)
  const [activeIndex, setActiveIndex] = useState(0)

  // Use mock images if API call fails or for development
  const images = product?.images?.length ? product.images : mockImages

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white">
              <ZoomIn className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <div className="relative aspect-square">
              <Image
                src={images[activeIndex] || "/placeholder.svg"}
                alt={`Product image ${activeIndex + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={activeIndex === 0}
              />
            </div>
          </DialogContent>
        </Dialog>

        <Image
          src={images[activeIndex] || "/placeholder.svg"}
          alt={`Product image ${activeIndex + 1}`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={activeIndex === 0}
        />

        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous image</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
              onClick={handleNext}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next image</span>
            </Button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={cn(
                "relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border",
                activeIndex === index ? "border-primary" : "border-gray-200",
              )}
              onClick={() => setActiveIndex(index)}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Product thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
