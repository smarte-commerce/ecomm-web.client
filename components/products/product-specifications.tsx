"use client"

import { useProduct } from "@/hooks/use-products"

interface ProductSpecificationsProps {
  productId: string
}

// Mock specifications for development
const mockSpecifications = {
  "Driver Size": "40mm",
  "Frequency Response": "20Hz - 20kHz",
  Impedance: "32 Ohm",
  "Battery Life": "Up to 40 hours",
  "Charging Time": "2 hours",
  "Bluetooth Version": "5.2",
  Weight: "250g",
  Warranty: "2 years",
  Connectivity: "Bluetooth, 3.5mm audio jack",
  Microphone: "Built-in with noise reduction",
  Controls: "Touch controls on ear cup",
  "Water Resistance": "IPX4 (splash resistant)",
  Compatibility: "iOS, Android, Windows, macOS",
}

export function ProductSpecifications({ productId }: ProductSpecificationsProps) {
  const { data: product } = useProduct(productId)

  // Use mock data if API call fails or for development
  const specifications = product?.specifications || mockSpecifications

  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full">
        <tbody className="divide-y">
          {Object.entries(specifications).map(([key, value], index) => (
            <tr key={key} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 w-1/3">{key}</th>
              <td className="px-4 py-3 text-sm text-gray-700">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
