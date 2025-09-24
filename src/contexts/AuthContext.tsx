import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  username: string
  email: string
  roles: string[]
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  token: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // For demo purposes, automatically authenticate
    const demoUser = {
      username: 'admin',
      email: 'admin@cybrty.com', 
      roles: ['admin']
    }
    
    setToken('demo-token-12345')
    setUser(demoUser)
    localStorage.setItem('cybrty_token', 'demo-token-12345')
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // Simple demo authentication - check for admin/admin
      if (username === 'admin' && password === 'admin') {
        const demoToken = 'demo-token-12345'
        const userData = {
          username: 'admin',
          email: 'admin@cybrty.com',
          roles: ['admin']
        }
        
        setToken(demoToken)
        setUser(userData)
        localStorage.setItem('cybrty_token', demoToken)
        return true
      }
      
      // In a real app, this would make an API call
      // const response = await fetch('/api/v1/auth/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ username, password }),
      // })

      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('cybrty_token')
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      token
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
