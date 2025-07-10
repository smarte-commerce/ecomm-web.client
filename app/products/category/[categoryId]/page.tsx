import { Suspense } from "react"
import { ProductGrid } from "@/components/products/product-grid"
import { ProductFilters } from "@/components/products/product-filters"
import { ProductSearch } from "@/components/products/product-search"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Skeleton } from "@/components/ui/skeleton"

interface CategoryPageProps {
  params: {
    categoryId: string
  }
}

// Mock category data for development
const mockCategories = {
  electronics: {
    name: "Electronics",
    description:
      "Discover the latest electronic devices and accessories for your home, office, and on-the-go lifestyle.",
    image: "/placeholder.svg?height=300&width=1200&text=Electronics",
    subcategories: ["audio", "computers", "smartphones", "accessories"],
  },
  audio: {
    name: "Audio Equipment",
    description: "High-quality audio devices for music lovers and professionals.",
    image: "/placeholder.svg?height=300&width=1200&text=Audio+Equipment",
    subcategories: [],
  },
  clothing: {
    name: "Clothing",
    description: "Stylish and comfortable clothing for all seasons.",
    image: "/placeholder.svg?height=300&width=1200&text=Clothing",
    subcategories: ["men", "women", "kids"],
  },
  home: {
    name: "Home & Kitchen",
    description: "Everything you need to make your house a home.",
    image: "/placeholder.svg?height=300&width=1200&text=Home+and+Kitchen",
    subcategories: ["furniture", "appliances", "decor"],
  },
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { categoryId } = params
  const category = mockCategories[categoryId as keyof typeof mockCategories] || {
    name: "Category",
    description: "Browse products in this category",
    image: "/placeholder.svg?height=300&width=1200",
    subcategories: [],
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{category.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="relative h-48 md:h-64 mb-8 rounded-lg overflow-hidden">
        <img src={category.image || "/placeholder.svg"} alt={category.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-6 md:px-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{category.name}</h1>
          <p className="text-white/90 max-w-2xl">{category.description}</p>
        </div>
      </div>

      {category.subcategories.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4">Browse Subcategories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {category.subcategories.map((subcat) => (
              <a
                key={subcat}
                href={`/products/category/${subcat}`}
                className="bg-gray-100 hover:bg-gray-200 rounded-lg p-4 text-center transition-colors"
              >
                {subcat.charAt(0).toUpperCase() + subcat.slice(1)}
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="mb-8">
        <ProductSearch />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <ProductFilters categoryId={categoryId} />
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
            <ProductGrid categoryId={categoryId} />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
