"use client"

import { ProductGrid } from "@/components/products/product-grid"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface VendorProductsProps {
  vendorId: string
}

export function VendorProducts({ vendorId }: VendorProductsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Products</CardTitle>
      </CardHeader>
      <CardContent>
        <ProductGrid />
      </CardContent>
    </Card>
  )
}
