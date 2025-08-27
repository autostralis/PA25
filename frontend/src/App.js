import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthModal from './components/AuthModal';
import PackagesSection from './components/PackagesSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import CTASection from './components/CTASection';
import WhyChooseSection from './components/WhyChooseSection';

// CSS Variables and Styles
const styles = {
  ':root': {
    '--primary': '#2c3e50',
    '--secondary': '#ecf0f1',
    '--accent': '#3498db',
    '--text': '#34495e',
    '--light': '#f8f9fa',
    '--wood': '#d4a574',
    '--white': '#ffffff'
  }
};

// Navigation Component
const Navigation = () => {
  const { user, signOut } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState('signin');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      <header className="bg-white shadow-md py-5 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-5">
          <nav className="flex justify-between items-center">
            <div className="text-3xl font-bold text-gray-800 tracking-tight">
              Spanzor
            </div>
            
            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-8">
              <li><a href="#home" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Home</a></li>
              <li><a href="#influencers" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Influencers</a></li>
              <li><a href="#how-it-works" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">How It Works</a></li>
              <li><a href="#packages" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Packages</a></li>
              <li><a href="#testimonials" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Contact</a></li>
              
              {user ? (
                <li className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">Welcome, {user.email}</span>
                  <button 
                    onClick={handleSignOut}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                  >
                    Sign Out
                  </button>
                </li>
              ) : (
                <li className="flex gap-2">
                  <button 
                    onClick={() => {
                      setAuthTab('signin');
                      setIsAuthModalOpen(true);
                    }}
                    className="text-gray-600 hover:text-blue-600 font-medium transition-colors px-4 py-2"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => {
                      setAuthTab('signup');
                      setIsAuthModalOpen(true);
                    }}
                    className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    Get Started
                  </button>
                </li>
              )}
            </ul>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-2xl text-gray-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              ☰
            </button>
          </nav>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-gray-200">
              <div className="flex flex-col gap-4">
                <a href="#home" className="text-gray-600 hover:text-blue-600 font-medium">Home</a>
                <a href="#influencers" className="text-gray-600 hover:text-blue-600 font-medium">Influencers</a>
                <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 font-medium">How It Works</a>
                <a href="#packages" className="text-gray-600 hover:text-blue-600 font-medium">Packages</a>
                <a href="#contact" className="text-gray-600 hover:text-blue-600 font-medium">Contact</a>
                
                {user ? (
                  <div className="flex flex-col gap-2 pt-2 border-t border-gray-200">
                    <span className="text-sm text-gray-600">Welcome, {user.email}</span>
                    <button 
                      onClick={handleSignOut}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors w-fit"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2 pt-2 border-t border-gray-200">
                    <button 
                      onClick={() => {
                        setAuthTab('signin');
                        setIsAuthModalOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="text-gray-600 hover:text-blue-600 font-medium px-4 py-2 border border-gray-300 rounded"
                    >
                      Sign In
                    </button>
                    <button 
                      onClick={() => {
                        setAuthTab('signup');
                        setIsAuthModalOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                      Get Started
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        initialTab={authTab}
      />
    </>
  );
};

// Hero Section
const HeroSection = () => {
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <>
      <section 
        id="home" 
        className="min-h-screen flex items-center relative bg-gradient-to-br from-blue-50 via-white to-amber-50"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85)), url('https://images.unsplash.com/photo-1556740749-887f6717d7e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-6xl mx-auto px-5 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-bold mb-5 text-gray-800 leading-tight">
              Connecting Brands with Influence
            </h1>
            <p className="text-xl mb-8 text-gray-600 leading-relaxed">
              Spanzor is the next-gen influencer marketing platform that connects brands with top creators across YouTube and Instagram. Find, evaluate, and collaborate with influencers who amplify your story.
            </p>
            <div className="flex gap-4">
              {user ? (
                <a href="#contact" className="bg-gray-800 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors font-medium">
                  Start Your Campaign
                </a>
              ) : (
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-gray-800 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors font-medium"
                >
                  Start Your Campaign
                </button>
              )}
              <a href="#influencers" className="border-2 border-gray-800 text-gray-800 px-6 py-3 rounded hover:bg-gray-800 hover:text-white transition-all font-medium">
                Browse Influencers
              </a>
            </div>
          </div>
        </div>
      </section>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        initialTab="signup"
      />
    </>
  );
};

// Stats Section
const StatsSection = () => (
  <section className="py-20 bg-gray-50">
    <div className="max-w-6xl mx-auto px-5">
      <div className="flex flex-wrap justify-center text-center gap-8">
        <div className="flex-1 min-w-[200px] p-5">
          <div className="text-5xl font-bold text-gray-800 mb-2">10K+</div>
          <div className="text-lg text-gray-600">Verified Influencers</div>
        </div>
        <div className="flex-1 min-w-[200px] p-5 border-l border-r border-gray-200 hidden md:block">
          <div className="text-5xl font-bold text-gray-800 mb-2">5K+</div>
          <div className="text-lg text-gray-600">Brand Partners</div>
        </div>
        <div className="flex-1 min-w-[200px] p-5 md:hidden">
          <div className="text-5xl font-bold text-gray-800 mb-2">5K+</div>
          <div className="text-lg text-gray-600">Brand Partners</div>
        </div>
        <div className="flex-1 min-w-[200px] p-5">
          <div className="text-5xl font-bold text-gray-800 mb-2">340%</div>
          <div className="text-lg text-gray-600">Average ROI</div>
        </div>
      </div>
    </div>
  </section>
);

// Main Home Component
const Home = () => {
  return (
    <div>
      <Navigation />
      <HeroSection />
      <StatsSection />
      
      {/* Influencer Categories Section */}
      <section id="influencers" className="py-20">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-5xl font-bold text-center mb-5 text-gray-800">Influencer Categories</h2>
          <div className="w-20 h-1 bg-amber-600 mx-auto mb-12"></div>
          <p className="text-lg text-center max-w-3xl mx-auto mb-12 text-gray-600">
            We classify influencers by reach and influence type to help brands find the perfect match for their campaigns
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '🌱', name: 'Emerging Voices', followers: '20K – 50K followers', description: 'Nano-influencers with authentic local reach' },
              { icon: '💪', name: 'Growth Champions', followers: '50K – 500K followers', description: 'Micro-influencers with strong engagement' },
              { icon: '🚀', name: 'Rising Icons', followers: '500K – 2M followers', description: 'Mid-tier stars with loyal, niche-driven audiences' },
              { icon: '⭐', name: 'Premium', followers: '2M – 10M followers', description: 'Leading creators with massive impact' },
              { icon: '👑', name: 'Elite', followers: '10M – 25M followers', description: 'Premium creators with worldwide influence' },
              { icon: '💎', name: 'Super Elite', followers: '25M – 50M followers', description: 'Top-tier influencers with massive global reach' },
              { icon: '🏆', name: 'Legendary', followers: '50M+ followers', description: 'Ultra-exclusive global icons and mega celebrities' }
            ].map((category, index) => (
              <div key={index} className="bg-white rounded-lg p-8 text-center shadow-md hover:shadow-lg transition-shadow border-t-4 border-amber-600">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{category.name}</h3>
                <p className="text-gray-600 mb-2">{category.followers}</p>
                <p className="text-sm text-gray-500">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Creators Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-5xl font-bold text-center mb-5 text-gray-800">Featured Creators</h2>
          <div className="w-20 h-1 bg-amber-600 mx-auto mb-12"></div>
          <p className="text-lg text-center max-w-3xl mx-auto mb-12 text-gray-600">
            Meet some of our top-performing influencers across different niches
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Priya Sharma', niche: 'Fashion & Lifestyle', followers: '5.2M', engagement: '8.5%', tags: ['Fashion', 'Beauty', 'Lifestyle'] },
              { name: 'Arjun Kapoor', niche: 'Fitness & Health', followers: '1.8M', engagement: '12.3%', tags: ['Fitness', 'Health', 'Nutrition'] },
              { name: 'Sneha Reddy', niche: 'Food & Travel', followers: '450K', engagement: '15.2%', tags: ['Food', 'Travel', 'Photography'] },
              { name: 'Rohan Joshi', niche: 'Tech & Gadgets', followers: '2.5M', engagement: '10.1%', tags: ['Tech', 'Gadgets', 'Reviews'] },
              { name: 'Ananya Rao', niche: 'Travel & Adventure', followers: '980K', engagement: '14.8%', tags: ['Travel', 'Adventure', 'Vlogging'] },
              { name: 'Vikram Singh', niche: 'Gaming & Esports', followers: '3.1M', engagement: '9.2%', tags: ['Gaming', 'Esports', 'Streaming'] }
            ].map((creator, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200 flex items-center justify-center text-6xl text-gray-400">
                  👤
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1 text-gray-800">{creator.name}</h3>
                  <p className="text-gray-600 mb-4">{creator.niche}</p>
                  <div className="flex justify-between mb-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-800">{creator.followers}</div>
                      <div className="text-sm text-gray-500">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-800">{creator.engagement}</div>
                      <div className="text-sm text-gray-500">Engagement</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {creator.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-5xl font-bold text-center mb-5 text-gray-800">How Spanzor Works</h2>
          <div className="w-20 h-1 bg-amber-600 mx-auto mb-12"></div>
          <p className="text-lg text-center max-w-3xl mx-auto mb-12 text-gray-600">
            Simple, transparent, and effective influencer marketing in 4 easy steps
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Choose Deliverable', description: 'Select from Instagram Reels, Stories, Posts, YouTube Shorts, or Integrations' },
              { step: '02', title: 'Pick Creators', description: 'Filter by tier, niche, language, location, and budget to find the perfect match' },
              { step: '03', title: 'Schedule & Brief', description: 'Book available slots, provide campaign briefs, and add any special requirements' },
              { step: '04', title: 'Launch & Track', description: 'Monitor campaign performance with real-time analytics and guaranteed delivery' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gray-800 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-5">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Spanzor */}
      <WhyChooseSection />

      {/* Packages Section */}
      <PackagesSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTASection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-16">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <div className="text-2xl font-bold text-gray-800 mb-4">Spanzor</div>
              <p className="text-gray-600 mb-4">The next-gen influencer marketing platform that connects brands with top creators.</p>
              <p className="text-gray-600">Email us at: <a href="mailto:hello@spanzor.com" className="text-blue-600 hover:underline">hello@spanzor.com</a></p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-800">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Press</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-800">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">GDPR</a></li>
              </ul>
            </div>
          </div>
          
          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-gray-500">© 2025 Spanzor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// App Component with Auth Provider
function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;