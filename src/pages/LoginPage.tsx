import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login, isAuthenticated } = useAuth()

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const success = await login(username, password)
      if (!success) {
        setError('Invalid credentials. Please try admin/admin')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0B0B0D',
      color: '#FFFFFF',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        padding: '2rem',
        backgroundColor: '#121316',
        borderRadius: '8px',
        border: '1px solid #2D3748'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            marginBottom: '0.5rem',
            color: '#E21A2C'
          }}>
            Cybrty
          </h1>
          <p style={{ color: '#94A3B8' }}>
            AI-Orchestrated Cybersecurity Platform
          </p>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#FEE2E2',
            border: '1px solid #FECACA',
            color: '#DC2626',
            padding: '0.75rem',
            borderRadius: '4px',
            marginBottom: '1rem',
            fontSize: '0.875rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#1A202C',
                border: '1px solid #4A5568',
                borderRadius: '4px',
                color: '#FFFFFF',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#1A202C',
                border: '1px solid #4A5568',
                borderRadius: '4px',
                color: '#FFFFFF',
                outline: 'none'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: loading ? '#666' : '#E21A2C',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '4px',
              fontWeight: '500',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '1rem'
            }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

          <div style={{ textAlign: 'center', fontSize: '0.875rem', color: '#64748B', marginTop: '1rem' }}>
            <p>Demo credentials:</p>
            <p>Username: <span style={{ color: '#FFFFFF' }}>admin</span></p>
            <p>Password: <span style={{ color: '#FFFFFF' }}>admin</span></p>
          </div>
        </form>
      </div>
    </div>
  )
}
