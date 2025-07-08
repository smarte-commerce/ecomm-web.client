"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import { formatRelativeTime } from "@/utils/format"

interface VendorReviewsProps {
  vendorId: string
}

// Mock data - replace with actual API call
const reviews = [
  {
    id: "1",
    userName: "John Doe",
    userAvatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    comment: "Excellent service and fast shipping. The products are exactly as described.",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    userName: "Jane Smith",
    userAvatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    comment: "Good quality products, but shipping took a bit longer than expected.",
    createdAt: "2024-01-10T14:20:00Z",
  },
]

export function VendorReviews({ vendorId }: VendorReviewsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Reviews</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="space-y-3">
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={review.userAvatar || "/placeholder.svg"} alt={review.userName} />
                <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{review.userName}</span>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>

                <span className="text-xs text-muted-foreground">{formatRelativeTime(review.createdAt)}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
