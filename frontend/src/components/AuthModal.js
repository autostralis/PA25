import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function AuthCallback(){
  const [msg, setMsg] = useState('Completing sign‑in…')

  useEffect(() => {
    (async () => {
      try {
        // Handles both ?code=... (OAuth) and #access_token=... (hash) flows
        const url = window.location.href
        if (url.includes('code=')) {
          const { data, error } = await supabase.auth.exchangeCodeForSession(url)
          if (error) throw error
          setMsg('Signed in. Redirecting…')
          window.location.replace('/dashboard')
          return
        }

        // Hash-based tokens (e.g., magic-link)
        if (window.location.hash.includes('access_token')) {
          setMsg('Signed in. Redirecting…')
          window.location.replace('/dashboard')
          return
        }

        // Fallback: if a session already exists, go through
        const { data: session } = await supabase.auth.getSession()
        if (session?.session) {
          window.location.replace('/dashboard')
        } else {
          setMsg('No session found. Redirecting to sign‑in…')
          window.location.replace('/sign-in')
        }
      } catch (e:any) {
        console.error('Auth callback error:', e)
        setMsg(e?.message || 'Sign‑in failed. Please try again.')
        setTimeout(() => window.location.replace('/sign-in'), 1600)
      }
    })()
  }, [])

  return <p style={{padding:'2rem'}}>{msg}</p>
}
