import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import ChooseRole from '../components/ChooseRole'
import CreatorSetupForm from '../components/CreatorSetupForm'

export default function Dashboard(){
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)
  const [userType, setUserType] = useState<'brand'|'creator'|null>(null)

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { location.href = '/sign-in' ; return }
      setUserId(user.id)

      const { data, error } = await supabase.from('profiles').select('user_type').eq('id', user.id).single()
      if (!error && data) setUserType(data.user_type)
      setLoading(false)
    })()
  }, [])

  if (loading) return <p className="container section">Loading…</p>
  if (!userId) return null

  return (
    <div className="container section">
      {!userType ? (
        <ChooseRole onDone={(role)=> setUserType(role)} />
      ) : userType === 'brand' ? (
        <div className="card">
          <h2>Brand Dashboard</h2>
          <p>Welcome! Create campaigns and discover creators.</p>
        </div>
      ) : (
        <div className="card">
          <h2>Creator Dashboard</h2>
          <CreatorSetupForm />
        </div>
      )}
    </div>
  )
}
