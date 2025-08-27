import { useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function AuthCallback(){
  useEffect(() => {
    const hash = location.hash
    if (hash && hash.includes('access_token')) {
      location.replace('/dashboard')
    } else {
      supabase.auth.getSession().then(() => location.replace('/dashboard'))
    }
  }, [])
  return <p style={{padding:'2rem'}}>Completing sign-in…</p>
}
