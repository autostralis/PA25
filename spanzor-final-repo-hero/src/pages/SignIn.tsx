import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function SignIn(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState<string|null>(null)
  const [info, setInfo] = useState<string|null>(null)
  const [loading, setLoading] = useState(false)

  const signInWithPassword = async () => {
    setErr(null); setInfo(null); setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) { setErr(error.message); return }
    location.href = '/dashboard'
  }

  const signUpWithPassword = async () => {
    setErr(null); setInfo(null); setLoading(true)
    const { data, error } = await supabase.auth.signUp({
      email, password,
      options: { emailRedirectTo: `${location.origin}/auth/callback` }
    })
    setLoading(false)
    if (error) { setErr(error.message); return }
    if (data?.user && !data.user.confirmed_at) {
      setInfo('Check your email to confirm your account, then sign in.')
      return
    }
    location.href = '/dashboard'
  }

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${location.origin}/auth/callback` }
    })
  }
  const signInWithFacebook = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: { redirectTo: `${location.origin}/auth/callback` }
    })
  }

  return (
    <div className="container section" style={{maxWidth:560}}>
      <h2>Sign in</h2>
      <div style={{display:'grid', gap:8, marginTop:12}}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <div className="flex">
          <button className="primary" onClick={signInWithPassword} disabled={loading}>Sign in</button>
          <button onClick={signUpWithPassword} disabled={loading}>Create account</button>
        </div>
        <hr/>
        <div className="flex">
          <button onClick={signInWithGoogle}>Google</button>
          <button onClick={signInWithFacebook}>Facebook</button>
        </div>
        {err && <p style={{color:'tomato'}}>{err}</p>}
        {info && <p style={{color:'turquoise'}}>{info}</p>}
      </div>
    </div>
  )
}
