'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) throw error
        
        if (session) {
          const response = await fetch('http://localhost:5000/api/auth/oauth/callback', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              access_token: session.access_token
            })
          })
          
          const data = await response.json()
          
          if (response.ok) {
            localStorage.setItem('access_token', data.access_token)
            localStorage.setItem('refresh_token', data.refresh_token)
            localStorage.setItem('session_token', data.session_token)
            localStorage.setItem('user', JSON.stringify(data.user))
            
            router.push('/dashboard')
          } else {
            throw new Error(data.error || 'Authentication failed')
          }
        } else {
          router.push('/signin')
        }
      } catch (error) {
        console.error('OAuth callback error:', error)
        router.push('/signin?error=oauth_failed')
      }
    }

    handleCallback()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing sign in...</p>
      </div>
    </div>
  )
}
