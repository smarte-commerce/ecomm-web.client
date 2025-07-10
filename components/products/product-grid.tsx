"use client"

import { useState } from "react"
import { useProducts } from "@/hooks/use-products"
import { ProductCard } from "@/components/products/product-card"
import { ProductCardSkeleton } from "@/components/products/product-card-skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { PAGINATION } from "@/lib/constants"

interface ProductGridProps {
  categoryId?: string
  vendorId?: string
  searchQuery?: string
}

export function ProductGrid({ categoryId, vendorId, searchQuery }: ProductGridProps) {
  const [sortBy, setSortBy] = useState<"newest" | "price" | "rating" | "popularity">("newest")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [page, setPage] = useState(1)
  const pageSize = PAGINATION.PRODUCTS_PER_PAGE

  const { data: products, isLoading } = useProducts({
    category: categoryId,
    vendor: vendorId,
    search: searchQuery,
    sortBy,
    sortOrder,
    page,
    limit: pageSize,
  })

  // Mock data for development when API is not available
  const mockProducts = Array(12)
    .fill(0)
    .map((_, i) => ({
      id: `mock-${i + 1}`,
      name: `Product ${i + 1}`,
      price: 19.99 + i * 10,
      originalPrice: i % 3 === 0 ? 29.99 + i * 10 : undefined,
      images: ["/placeholder.svg?height=250&width=300"],
      vendorId: "vendor1",
      vendorName: "Vendor Name",
      categoryId: categoryId || "category1",
      inventory: 10 + i,
      rating: 3.5 + (i % 2),
      reviews: 10 + i * 5,
      discount: i % 3 === 0 ? 20 : undefined,
    }))

  const displayProducts = products && products.length > 0 ? products : mockProducts
  const totalPages = 5 // Mock total pages

  const handleSortChange = (value: string) => {
    const [newSortBy, newSortOrder] = value.split("-") as ["newest" | "price" | "rating" | "popularity", "asc" | "desc"]
    setSortBy(newSortBy)
    setSortOrder(newSortOrder)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <p className="text-sm text-gray-500">
          Showing <span className="font-medium">{(page - 1) * pageSize + 1}</span> to{" "}
          <span className="font-medium">
            {Math.min(page * pageSize, (products?.length || 0) + (page - 1) * pageSize)}
          </span>{" "}
          of <span className="font-medium">{products?.length || mockProducts.length * totalPages}</span> products
        </p>

        <Select defaultValue="newest-desc" onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest-desc">Newest</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="rating-desc">Highest Rated</SelectItem>
            <SelectItem value="popularity-desc">Most Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (page > 1) handlePageChange(page - 1)
              }}
              className={page <= 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
            // Show first page, current page, last page, and pages around current
            if (pageNum === 1 || pageNum === totalPages || (pageNum >= page - 1 && pageNum <= page + 1)) {
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      handlePageChange(pageNum)
                    }}
                    isActive={pageNum === page}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              )
            }

            // Show ellipsis for gaps
            if (pageNum === 2 && page > 3) {
              return (
                <PaginationItem key="ellipsis-start">
                  <PaginationEllipsis />
                </PaginationItem>
              )
            }

            if (pageNum === totalPages - 1 && page < totalPages - 2) {
              return (
                <PaginationItem key="ellipsis-end">
                  <PaginationEllipsis />
                </PaginationItem>
              )
            }

            return null
          })}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (page < totalPages) handlePageChange(page + 1)
              }}
              className={page >= totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
