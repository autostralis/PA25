import { supabase } from '../lib/supabaseClient'

export default function ChooseRole({ onDone }:{ onDone:(role:'brand'|'creator')=>void }){
  const choose = async (role:'brand'|'creator') => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { location.href='/' ; return }
    const { error } = await supabase.from('profiles').update({ user_type: role }).eq('id', user.id)
    if (!error) onDone(role)
  }
  return (
    <div className="card">
      <h3>Select your account type</h3>
      <div className="flex">
        <button className="primary" onClick={()=>choose('brand')}>I am a Brand</button>
        <button onClick={()=>choose('creator')}>I am a Creator</button>
      </div>
    </div>
  )
}
