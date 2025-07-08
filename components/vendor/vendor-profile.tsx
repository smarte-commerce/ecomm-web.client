"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Calendar, Users, Package, Globe } from "lucide-react"
import Image from "next/image"

interface VendorProfileProps {
  vendorId: string
}

// Mock data - replace with actual API call
const vendorData = {
  id: "1",
  name: "TechHub Electronics",
  description:
    "Premium electronics and gadgets from trusted brands. We specialize in cutting-edge technology and provide excellent customer service.",
  logo: "/placeholder.svg?height=100&width=100",
  banner: "/placeholder.svg?height=300&width=800",
  rating: 4.8,
  reviews: 2450,
  products: 156,
  followers: 4200,
  location: "San Francisco, CA",
  joinedDate: "2020-03-15",
  verified: true,
  website: "https://techhub.example.com",
}

export function VendorProfile({ vendorId }: VendorProfileProps) {
  return (
    <Card>
      <CardContent className="p-0">
        {/* Banner */}
        <div className="relative h-48 md:h-64 overflow-hidden rounded-t-lg">
          <Image
            src={vendorData.banner || "/placeholder.svg"}
            alt={`${vendorData.name} banner`}
            fill
            className="object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Logo and Basic Info */}
            <div className="flex items-start gap-4">
              <div className="relative">
                <Image
                  src={vendorData.logo || "/placeholder.svg"}
                  alt={`${vendorData.name} logo`}
                  width={80}
                  height={80}
                  className="rounded-lg border-4 border-white shadow-lg -mt-12"
                />
                {vendorData.verified && (
                  <Badge className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full p-0 bg-green-500">✓</Badge>
                )}
              </div>

              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2">{vendorData.name}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{vendorData.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {new Date(vendorData.joinedDate).getFullYear()}</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{vendorData.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({vendorData.reviews.toLocaleString()} reviews)</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button>Follow</Button>
              <Button variant="outline">Contact</Button>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground mb-6">{vendorData.description}</p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold">{vendorData.products}</span>
              </div>
              <p className="text-sm text-muted-foreground">Products</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold">{vendorData.followers.toLocaleString()}</span>
              </div>
              <p className="text-sm text-muted-foreground">Followers</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold">{vendorData.rating}</span>
              </div>
              <p className="text-sm text-muted-foreground">Rating</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold">Visit</span>
              </div>
              <p className="text-sm text-muted-foreground">Website</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
