import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useAuth } from './AuthContext'

interface WebSocketContextType {
  alertsSocket: WebSocket | null
  incidentsSocket: WebSocket | null
  isConnected: boolean
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined)

export function WebSocketProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth()
  const [alertsSocket, setAlertsSocket] = useState<WebSocket | null>(null)
  const [incidentsSocket, setIncidentsSocket] = useState<WebSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      // Close connections when not authenticated
      if (alertsSocket) {
        alertsSocket.close()
        setAlertsSocket(null)
      }
      if (incidentsSocket) {
        incidentsSocket.close()
        setIncidentsSocket(null)
      }
      setIsConnected(false)
      return
    }

    const wsUrl = (import.meta as any).env?.VITE_WS_URL || 'ws://localhost:8000'

    // Connect to alerts WebSocket
    const alertsWs = new WebSocket(`${wsUrl}/ws/alerts`)
    alertsWs.onopen = () => {
      console.log('Connected to alerts WebSocket')
      setIsConnected(true)
    }
    alertsWs.onclose = () => {
      console.log('Disconnected from alerts WebSocket')
      setIsConnected(false)
    }
    alertsWs.onerror = (error) => {
      console.error('Alerts WebSocket error:', error)
    }
    setAlertsSocket(alertsWs)

    // Connect to incidents WebSocket
    const incidentsWs = new WebSocket(`${wsUrl}/ws/incidents`)
    incidentsWs.onopen = () => {
      console.log('Connected to incidents WebSocket')
    }
    incidentsWs.onclose = () => {
      console.log('Disconnected from incidents WebSocket')
    }
    incidentsWs.onerror = (error) => {
      console.error('Incidents WebSocket error:', error)
    }
    setIncidentsSocket(incidentsWs)

    return () => {
      alertsWs.close()
      incidentsWs.close()
    }
  }, [isAuthenticated])

  return (
    <WebSocketContext.Provider value={{
      alertsSocket,
      incidentsSocket,
      isConnected
    }}>
      {children}
    </WebSocketContext.Provider>
  )
}

export function useWebSocket() {
  const context = useContext(WebSocketContext)
  if (context === undefined) {
    throw new Error('useWebSocket must be used within a WebSocketProvider')
  }
  return context
}
