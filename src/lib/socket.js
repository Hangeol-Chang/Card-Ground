/** 서버와의 WebSocket 연결을 관리합니다. */
class SocketClient {
  constructor() {
    /** @type {WebSocket | null} */
    this.ws = null
    /** @type {Function[]} */
    this.handlers = []
  }

  /**
   * @param {string} roomId
   * @param {string} token  - Supabase JWT
   */
  connect(roomId, token) {
    const wsUrl = `${import.meta.env.VITE_WS_URL}/ws/game/${roomId}?token=${encodeURIComponent(token)}`
    this.ws = new WebSocket(wsUrl)

    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data)
      this.handlers.forEach((h) => h(message))
    }

    this.ws.onclose = () => {
      this.ws = null
    }
  }

  /** @param {object} message */
  send(message) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message))
    }
  }

  /** @param {Function} handler */
  addHandler(handler) {
    this.handlers.push(handler)
  }

  /** @param {Function} handler */
  removeHandler(handler) {
    this.handlers = this.handlers.filter((h) => h !== handler)
  }

  disconnect() {
    this.ws?.close()
    this.ws = null
    this.handlers = []
  }
}

export const socketClient = new SocketClient()
