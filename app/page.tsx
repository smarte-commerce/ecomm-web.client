import { HeroSection } from "@/components/home/hero-section"
import { FeaturedProducts } from "@/components/home/featured-products"
import { CategoryGrid } from "@/components/home/category-grid"
import { VendorSpotlight } from "@/components/home/vendor-spotlight"
import { NewsletterSignup } from "@/components/home/newsletter-signup"

export default function HomePage() {
  return (
    <div className="space-y-12">
      <HeroSection />
      <FeaturedProducts />
      <CategoryGrid />
      <VendorSpotlight />
      <NewsletterSignup />
    </div>
  )
}
