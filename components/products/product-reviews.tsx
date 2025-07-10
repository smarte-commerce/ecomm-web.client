"use client"

import { useState } from "react"
import { useProduct } from "@/hooks/use-products"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, ThumbsUp, Flag, ChevronDown, ChevronUp } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"

interface ProductReviewsProps {
  productId: string
}

// Mock reviews for development
const mockReviews = [
  {
    id: "1",
    userId: "user1",
    userName: "Sarah Johnson",
    userAvatar: "/placeholder-user.jpg",
    rating: 5,
    title: "Exceptional sound quality and comfort",
    comment:
      "I've tried many headphones over the years, and these are by far the best. The noise cancellation is incredible - I can barely hear anything from the outside world when I have them on. The sound quality is crisp and clear, with deep bass that doesn't overpower the mids and highs. Battery life is impressive too - I've been using them for a week of commuting (about 2 hours a day) and haven't had to charge them yet.",
    date: "2023-11-15T14:23:00Z",
    helpful: 24,
    verified: true,
    images: ["/placeholder.svg?height=100&width=100&text=Review+Image"],
  },
  {
    id: "2",
    userId: "user2",
    userName: "Michael Chen",
    userAvatar: "",
    rating: 4,
    title: "Great headphones with minor connectivity issues",
    comment:
      "The sound quality and noise cancellation are excellent. Very comfortable to wear for extended periods. My only complaint is occasional Bluetooth connectivity issues with my laptop, though they work flawlessly with my phone.",
    date: "2023-10-28T09:45:00Z",
    helpful: 12,
    verified: true,
    images: [],
  },
  {
    id: "3",
    userId: "user3",
    userName: "Emily Rodriguez",
    userAvatar: "/placeholder-user.jpg",
    rating: 5,
    title: "Worth every penny!",
    comment:
      "These headphones have transformed my work-from-home experience. The noise cancellation blocks out all distractions, and the sound quality is phenomenal for both music and calls. The battery life exceeds expectations - I only need to charge them once a week with daily use.",
    date: "2023-10-12T16:30:00Z",
    helpful: 18,
    verified: true,
    images: [],
  },
  {
    id: "4",
    userId: "user4",
    userName: "David Wilson",
    userAvatar: "",
    rating: 3,
    title: "Good sound but uncomfortable for glasses wearers",
    comment:
      "The sound quality and noise cancellation are impressive, but I find them uncomfortable to wear with glasses for more than an hour. The ear cups press my glasses into the side of my head. If you don't wear glasses, these would probably be perfect.",
    date: "2023-09-30T11:15:00Z",
    helpful: 8,
    verified: true,
    images: [],
  },
]

// Mock review summary for development
const mockReviewSummary = {
  average: 4.5,
  total: 256,
  distribution: {
    5: 180,
    4: 50,
    3: 15,
    2: 7,
    1: 4,
  },
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const { data: product } = useProduct(productId)
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [reviewsToShow, setReviewsToShow] = useState(3)
  const { isAuthenticated } = useAuth()

  // Use mock data if API call fails or for development
  const reviews = mockReviews
  const reviewSummary = mockReviewSummary

  const handleShowMore = () => {
    if (showAllReviews) {
      setReviewsToShow(3)
      setShowAllReviews(false)
    } else {
      setReviewsToShow(reviews.length)
      setShowAllReviews(true)
    }
  }

  const displayedReviews = reviews.slice(0, reviewsToShow)

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="flex flex-col items-center p-6 border rounded-lg">
            <h3 className="text-2xl font-bold">{reviewSummary.average.toFixed(1)}</h3>
            <div className="flex my-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(reviewSummary.average) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-500">{reviewSummary.total} reviews</p>

            <div className="w-full space-y-2 mt-4">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-sm w-2">{rating}</span>
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Progress value={(reviewSummary.distribution[rating] / reviewSummary.total) * 100} className="h-2" />
                  <span className="text-xs text-gray-500 w-8">{reviewSummary.distribution[rating]}</span>
                </div>
              ))}
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-6 w-full">Write a Review</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Write a Review</DialogTitle>
                  <DialogDescription>
                    Share your experience with this product.
                    {!isAuthenticated && " You need to be logged in to submit a review."}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div className="flex justify-center mb-4">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button key={rating} className="p-1">
                        <Star className="h-8 w-8 text-gray-300 hover:fill-yellow-400 hover:text-yellow-400" />
                      </button>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="review-title">Title</Label>
                    <input
                      id="review-title"
                      className="w-full p-2 border rounded-md"
                      placeholder="Summarize your experience"
                      disabled={!isAuthenticated}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="review-comment">Review</Label>
                    <Textarea
                      id="review-comment"
                      placeholder="What did you like or dislike about this product?"
                      className="min-h-[100px]"
                      disabled={!isAuthenticated}
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button type="submit" disabled={!isAuthenticated}>
                    Submit Review
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          {displayedReviews.map((review) => (
            <div key={review.id} className="border-b pb-6 last:border-0">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={review.userAvatar || "/placeholder.svg"} alt={review.userName} />
                    <AvatarFallback>{review.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{review.userName}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      {review.verified && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</div>
              </div>

              <h4 className="font-medium mt-3">{review.title}</h4>
              <p className="text-gray-700 mt-2">{review.comment}</p>

              {review.images && review.images.length > 0 && (
                <div className="flex gap-2 mt-3">
                  {review.images.map((image, index) => (
                    <div key={index} className="relative h-16 w-16 overflow-hidden rounded-md border">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Review image ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-6 mt-4">
                <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900">
                  <ThumbsUp className="h-4 w-4" />
                  <span>Helpful ({review.helpful})</span>
                </button>
                <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900">
                  <Flag className="h-4 w-4" />
                  <span>Report</span>
                </button>
              </div>
            </div>
          ))}

          {reviews.length > 3 && (
            <Button variant="outline" onClick={handleShowMore} className="w-full bg-transparent">
              {showAllReviews ? (
                <>
                  <ChevronUp className="mr-2 h-4 w-4" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="mr-2 h-4 w-4" />
                  Show All Reviews ({reviews.length})
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
