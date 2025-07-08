"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const categories = [
  {
    id: "1",
    name: "Electronics",
    slug: "electronics",
    image: "/placeholder.svg?height=200&width=300",
    productCount: 1250,
    description: "Latest gadgets and tech",
  },
  {
    id: "2",
    name: "Fashion",
    slug: "fashion",
    image: "/placeholder.svg?height=200&width=300",
    productCount: 2100,
    description: "Trendy clothing and accessories",
  },
  {
    id: "3",
    name: "Home & Garden",
    slug: "home-garden",
    image: "/placeholder.svg?height=200&width=300",
    productCount: 890,
    description: "Everything for your home",
  },
  {
    id: "4",
    name: "Sports & Fitness",
    slug: "sports-fitness",
    image: "/placeholder.svg?height=200&width=300",
    productCount: 650,
    description: "Gear for active lifestyle",
  },
  {
    id: "5",
    name: "Books & Media",
    slug: "books-media",
    image: "/placeholder.svg?height=200&width=300",
    productCount: 1800,
    description: "Knowledge and entertainment",
  },
  {
    id: "6",
    name: "Beauty & Health",
    slug: "beauty-health",
    image: "/placeholder.svg?height=200&width=300",
    productCount: 750,
    description: "Wellness and self-care",
  },
]

export function CategoryGrid() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our diverse range of categories and find exactly what you're looking for
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {categories.map((category) => (
            <Card key={category.id} className="group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Link href={`/products?category=${category.slug}`}>
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                </div>
                <div className="p-6">
                  <Link href={`/products?category=${category.slug}`}>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">{category.name}</h3>
                  </Link>
                  <p className="text-gray-600 mb-3">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{category.productCount.toLocaleString()} products</span>
                    <Link href={`/products?category=${category.slug}`}>
                      <Button variant="ghost" size="sm" className="group-hover:text-primary">
                        Shop Now
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/categories">
            <Button size="lg" variant="outline">
              View All Categories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
