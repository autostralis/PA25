import { Routes, Route, Link } from 'react-router-dom'
import SignIn from './pages/SignIn'
import AuthCallback from './pages/AuthCallback'
import Dashboard from './pages/Dashboard'
import Hero from './components/Hero'

function Layout({children}:{children:React.ReactNode}){
  return (
    <div>
      <header className="nav">
        <div className="inner container">
          <Link to="/" style={{display:'flex',gap:10,alignItems:'center'}}>
            <img src="/logo.png" alt="Spanzor" width={28} height={28} />
            <strong>Spanzor</strong>
          </Link>
          <nav className="flex" style={{gap:16}}>
            <a href="#how">How it works</a>
            <a href="#pricing">Pricing</a>
            <Link to="/sign-in"><button className="primary">Sign in</button></Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <div className="container section" style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
          <span>© {new Date().getFullYear()} Spanzor</span>
          <div className="flex">
            <a href="/robots.txt">Robots</a>
            <a href="https://supabase.com" target="_blank" rel="noreferrer">Supabase</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Home() {
  return (
    <Layout>
      <Hero />
      <section id="how" className="section container">
        <h2>How it works</h2>
        <div className="flex" style={{justifyContent:'space-between'}}>
          <div className="card" style={{maxWidth:320}}>
            <h3>Discover</h3>
            <p>Find creators by industry and IG+YouTube tiers.</p>
          </div>
          <div className="card" style={{maxWidth:320}}>
            <h3>Collaborate</h3>
            <p>Share briefs, negotiate offers, and manage approvals.</p>
          </div>
          <div className="card" style={{maxWidth:320}}>
            <h3>Pay</h3>
            <p>Secure, on-time payouts with transparent fees.</p>
          </div>
        </div>
      </section>
      <section id="pricing" className="section container">
        <h2>Pricing</h2>
        <p>Free to start. Platform fee applies on payouts.</p>
        <div className="flex">
          <div className="card"><strong>Starter</strong><p>Free</p></div>
          <div className="card"><strong>Growth</strong><p>2.5% fee</p></div>
          <div className="card"><strong>Pro</strong><p>Custom</p></div>
        </div>
      </section>
    </Layout>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<Layout><SignIn /></Layout>} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
    </Routes>
  )
}
