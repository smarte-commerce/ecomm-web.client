"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Gift, Bell, Zap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Successfully subscribed!",
        description: "Welcome to our newsletter. Check your email for a confirmation.",
      })

      setEmail("")
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const benefits = [
    {
      icon: Gift,
      title: "Exclusive Deals",
      description: "Get access to special discounts and early bird offers",
    },
    {
      icon: Bell,
      title: "New Arrivals",
      description: "Be the first to know about new products and collections",
    },
    {
      icon: Zap,
      title: "Flash Sales",
      description: "Never miss limited-time offers and flash sales",
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Mail className="h-16 w-16 mx-auto mb-4 opacity-90" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay in the Loop</h2>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Subscribe to our newsletter and never miss out on amazing deals, new arrivals, and exclusive offers
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <Icon className="h-8 w-8 mx-auto mb-3 text-yellow-300" />
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-purple-100">{benefit.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Signup Form */}
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/10 border-white/30 text-white placeholder-purple-200"
                required
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8"
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
            <p className="text-sm text-purple-200 mt-3">No spam, unsubscribe at any time. We respect your privacy.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
