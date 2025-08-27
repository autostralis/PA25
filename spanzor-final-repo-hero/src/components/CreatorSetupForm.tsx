import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function CreatorSetupForm(){
  const [instagramHandle, setInstagramHandle] = useState('')
  const [youtubeHandle, setYoutubeHandle] = useState('')
  const [igFollowers, setIgFollowers] = useState<number>(0)
  const [ytFollowers, setYtFollowers] = useState<number>(0)
  const [tier, setTier] = useState<string>('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data: stats } = await supabase.from('creator_stats').select('*').eq('profile_id', user.id).maybeSingle()
      if (stats){
        setInstagramHandle(stats.instagram_handle || '')
        setYoutubeHandle(stats.youtube_handle || '')
        setIgFollowers(stats.instagram_followers || 0)
        setYtFollowers(stats.youtube_followers || 0)
      }
      const { data: dir } = await supabase.from('creator_directory').select('tier').eq('profile_id', user.id).maybeSingle()
      if (dir?.tier) setTier(dir.tier)
    })()
  }, [])

  const save = async () => {
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { location.href = '/' ; return }
    const { error } = await supabase.from('creator_stats').upsert({
      profile_id: user.id,
      instagram_handle: instagramHandle,
      youtube_handle: youtubeHandle,
      instagram_followers: igFollowers,
      youtube_followers: ytFollowers
    })
    setSaving(false)
    if (!error) alert('Profile saved!')
  }

  const combined = (igFollowers || 0) + (ytFollowers || 0)

  return (
    <div className="card">
      <h3>Creator Setup</h3>
      <div className="flex" style={{justifyContent:'flex-start'}}>
        <input placeholder="Instagram Handle" value={instagramHandle} onChange={e=>setInstagramHandle(e.target.value)} />
        <input placeholder="YouTube Handle" value={youtubeHandle} onChange={e=>setYoutubeHandle(e.target.value)} />
      </div>
      <div className="flex" style={{justifyContent:'flex-start'}}>
        <input type="number" placeholder="Instagram Followers" value={igFollowers} onChange={e=>setIgFollowers(parseInt(e.target.value||'0'))} />
        <input type="number" placeholder="YouTube Followers" value={ytFollowers} onChange={e=>setYtFollowers(parseInt(e.target.value||'0'))} />
      </div>
      <p>Combined: {combined.toLocaleString()} {tier && `(Tier: ${tier})`}</p>
      <button className="primary" onClick={save} disabled={saving}>{saving ? 'Saving…':'Save'}</button>
    </div>
  )
}
