"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Package, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const featuredVendors = [
  {
    id: "1",
    name: "TechHub Electronics",
    slug: "techhub-electronics",
    logo: "/placeholder.svg?height=80&width=80",
    banner: "/placeholder.svg?height=200&width=400",
    description: "Premium electronics and gadgets from trusted brands",
    rating: 4.8,
    reviews: 2450,
    products: 156,
    location: "San Francisco, CA",
    verified: true,
    specialties: ["Electronics", "Gadgets", "Smart Home"],
  },
  {
    id: "2",
    name: "Fashion Forward",
    slug: "fashion-forward",
    logo: "/placeholder.svg?height=80&width=80",
    banner: "/placeholder.svg?height=200&width=400",
    description: "Trendy fashion and accessories for modern lifestyle",
    rating: 4.9,
    reviews: 1890,
    products: 324,
    location: "New York, NY",
    verified: true,
    specialties: ["Fashion", "Accessories", "Jewelry"],
  },
  {
    id: "3",
    name: "Home Essentials Co.",
    slug: "home-essentials",
    logo: "/placeholder.svg?height=80&width=80",
    banner: "/placeholder.svg?height=200&width=400",
    description: "Quality home goods and decor for every space",
    rating: 4.7,
    reviews: 1250,
    products: 89,
    location: "Austin, TX",
    verified: true,
    specialties: ["Home Decor", "Furniture", "Kitchen"],
  },
]

export function VendorSpotlight() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Vendors</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover amazing products from our top-rated, verified vendors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredVendors.map((vendor) => (
            <Card key={vendor.id} className="group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                {/* Banner */}
                <div className="relative h-32 overflow-hidden rounded-t-lg">
                  <Image
                    src={vendor.banner || "/placeholder.svg"}
                    alt={`${vendor.name} banner`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Vendor Info */}
                <div className="p-6">
                  {/* Logo and Basic Info */}
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="relative">
                      <Image
                        src={vendor.logo || "/placeholder.svg"}
                        alt={`${vendor.name} logo`}
                        width={60}
                        height={60}
                        className="rounded-lg border-2 border-white shadow-md -mt-8"
                      />
                      {vendor.verified && (
                        <Badge className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full p-0 bg-green-500">✓</Badge>
                      )}
                    </div>
                    <div className="flex-1">
                      <Link href={`/vendor/${vendor.slug}`}>
                        <h3 className="text-lg font-semibold group-hover:text-primary">{vendor.name}</h3>
                      </Link>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <MapPin className="h-3 w-3" />
                        <span>{vendor.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4">{vendor.description}</p>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {vendor.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                    <div>
                      <div className="flex items-center justify-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{vendor.rating}</span>
                      </div>
                      <p className="text-xs text-gray-500">{vendor.reviews} reviews</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center space-x-1">
                        <Package className="h-4 w-4 text-gray-400" />
                        <span className="font-semibold">{vendor.products}</span>
                      </div>
                      <p className="text-xs text-gray-500">Products</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center space-x-1">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="font-semibold">4.2K</span>
                      </div>
                      <p className="text-xs text-gray-500">Followers</p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link href={`/vendor/${vendor.slug}`}>
                    <Button className="w-full">Visit Store</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/vendors">
            <Button size="lg" variant="outline">
              Explore All Vendors
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
