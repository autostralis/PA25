import { Link } from 'react-router-dom'

export default function Hero(){
  return (
    <section className="hero">
      <video
        autoPlay
        playsInline
        muted
        loop
        preload="auto"
        poster="/logo.png"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      <div className="overlay">
        <div>
          <span className="badge">Creators × Brands</span>
          <h1>Collaborate. Create. Convert.</h1>
          <p>Spanzor connects brands with the right creators. Transparent tiers, seamless briefs, and on-time payouts.</p>
          <div className="flex">
            <Link to="/sign-in"><button className="primary">Get Started</button></Link>
            <a href="#how"><button>Learn More</button></a>
          </div>
        </div>
      </div>
    </section>
  )
}
