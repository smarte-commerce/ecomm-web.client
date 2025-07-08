import { VendorProfile } from "@/components/vendor/vendor-profile"
import { VendorProducts } from "@/components/vendor/vendor-products"
import { VendorReviews } from "@/components/vendor/vendor-reviews"

interface VendorPageProps {
  params: Promise<{ vendorId: string }>
}

export default async function VendorPage({ params }: VendorPageProps) {
  const { vendorId } = await params

  return (
    <div className="container mx-auto px-4 py-8">
      <VendorProfile vendorId={vendorId} />
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <VendorProducts vendorId={vendorId} />
        </div>
        <div className="lg:col-span-1">
          <VendorReviews vendorId={vendorId} />
        </div>
      </div>
    </div>
  )
}
