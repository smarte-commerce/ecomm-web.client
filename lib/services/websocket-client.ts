import { io, type Socket } from "socket.io-client"

class WebSocketClient {
  private socket: Socket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5

  connect(userId?: string) {
    if (this.socket?.connected) return

    this.socket = io(process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080", {
      auth: {
        token: localStorage.getItem("token"),
        userId,
      },
      transports: ["websocket"],
    })

    this.setupEventHandlers()
  }

  private setupEventHandlers() {
    if (!this.socket) return

    this.socket.on("connect", () => {
      console.log("WebSocket connected")
      this.reconnectAttempts = 0
    })

    this.socket.on("disconnect", () => {
      console.log("WebSocket disconnected")
      this.handleReconnect()
    })

    this.socket.on("error", (error) => {
      console.error("WebSocket error:", error)
    })

    // Real-time notifications
    this.socket.on("notification", (data) => {
      this.handleNotification(data)
    })

    // Order status updates
    this.socket.on("order_status_update", (data) => {
      this.handleOrderStatusUpdate(data)
    })

    // Inventory updates
    this.socket.on("inventory_update", (data) => {
      this.handleInventoryUpdate(data)
    })

    // Price changes
    this.socket.on("price_update", (data) => {
      this.handlePriceUpdate(data)
    })
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      setTimeout(() => {
        this.connect()
      }, 1000 * this.reconnectAttempts)
    }
  }

  private handleNotification(data: any) {
    // Dispatch custom event for notification handling
    window.dispatchEvent(new CustomEvent("ws-notification", { detail: data }))
  }

  private handleOrderStatusUpdate(data: any) {
    window.dispatchEvent(new CustomEvent("ws-order-update", { detail: data }))
  }

  private handleInventoryUpdate(data: any) {
    window.dispatchEvent(new CustomEvent("ws-inventory-update", { detail: data }))
  }

  private handlePriceUpdate(data: any) {
    window.dispatchEvent(new CustomEvent("ws-price-update", { detail: data }))
  }

  emit(event: string, data: any) {
    this.socket?.emit(event, data)
  }

  disconnect() {
    this.socket?.disconnect()
    this.socket = null
  }
}

export const wsClient = new WebSocketClient()
