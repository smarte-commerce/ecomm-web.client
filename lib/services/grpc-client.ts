// Optional gRPC client - only loads if proto files are available
const ProductServiceDefinition: any = null
const OrderServiceDefinition: any = null

// Try to import proto definitions, but don't fail if they don't exist
try {
  if (process.env.NEXT_PUBLIC_ENABLE_GRPC === "true") {
    // These imports will only work if proto files are generated
    // ProductServiceDefinition = require('@/proto/product').ProductServiceDefinition
    // OrderServiceDefinition = require('@/proto/order').OrderServiceDefinition
  }
} catch (error) {
  console.warn("gRPC proto files not found. gRPC functionality will be disabled.")
}

class GrpcClient {
  private productClient: any = null
  private orderClient: any = null
  private isEnabled = false

  constructor() {
    // Only initialize if proto definitions are available and gRPC is enabled
    if (ProductServiceDefinition && OrderServiceDefinition && process.env.NEXT_PUBLIC_ENABLE_GRPC === "true") {
      try {
        const { createChannel, createClient, Metadata } = require("nice-grpc")
        const channel = createChannel(process.env.NEXT_PUBLIC_GRPC_ENDPOINT || "localhost:9090")

        this.productClient = createClient(ProductServiceDefinition, channel)
        this.orderClient = createClient(OrderServiceDefinition, channel)
        this.isEnabled = true
      } catch (error) {
        console.warn("Failed to initialize gRPC client:", error)
      }
    }
  }

  private createMetadata(): any {
    if (!this.isEnabled) return null

    try {
      const { Metadata } = require("nice-grpc")
      const metadata = new Metadata()
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
      if (token) {
        metadata.set("authorization", `Bearer ${token}`)
      }
      return metadata
    } catch {
      return null
    }
  }

  async getProduct(productId: string) {
    if (!this.isEnabled || !this.productClient) {
      throw new Error("gRPC client not available. Please use REST API instead.")
    }

    return await this.productClient.getProduct({ productId }, { metadata: this.createMetadata() })
  }

  async searchProducts(query: string, filters: any) {
    if (!this.isEnabled || !this.productClient) {
      throw new Error("gRPC client not available. Please use REST API instead.")
    }

    return await this.productClient.searchProducts({ query, filters }, { metadata: this.createMetadata() })
  }

  async createOrder(orderData: any) {
    if (!this.isEnabled || !this.orderClient) {
      throw new Error("gRPC client not available. Please use REST API instead.")
    }

    return await this.orderClient.createOrder(orderData, { metadata: this.createMetadata() })
  }

  isAvailable(): boolean {
    return this.isEnabled
  }
}

export const grpcClient = new GrpcClient()
