import { Suspense } from "react"
import { ProductGrid } from "@/components/products/product-grid"
import { ProductFilters } from "@/components/products/product-filters"
import { ProductSearch } from "@/components/products/product-search"
import { Skeleton } from "@/components/ui/skeleton"

interface SearchPageProps {
  searchParams: {
    q?: string
  }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const searchQuery = searchParams.q || ""

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Search Results</h1>
        <ProductSearch defaultValue={searchQuery} />
        {searchQuery && (
          <p className="mt-2 text-gray-600">
            Showing results for: <span className="font-medium">{searchQuery}</span>
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <ProductFilters />
        </aside>

        <main className="lg:col-span-3">
          <Suspense
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-80 rounded-lg" />
                  ))}
              </div>
            }
          >
            <ProductGrid searchQuery={searchQuery} />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
