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
      <header className="glass sticky top-0 z-50 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex justify-between items-center">
            <div className="text-3xl font-bold text-gradient tracking-tight">
              Spanzor
            </div>
            
            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-8">
              <li><a href="#home" className="text-foreground/80 hover:text-primary font-medium transition-all duration-300 hover:scale-105">Home</a></li>
              <li><a href="#influencers" className="text-foreground/80 hover:text-primary font-medium transition-all duration-300 hover:scale-105">Influencers</a></li>
              <li><a href="#how-it-works" className="text-foreground/80 hover:text-primary font-medium transition-all duration-300 hover:scale-105">How It Works</a></li>
              <li><a href="#packages" className="text-foreground/80 hover:text-primary font-medium transition-all duration-300 hover:scale-105">Packages</a></li>
              <li><a href="#testimonials" className="text-foreground/80 hover:text-primary font-medium transition-all duration-300 hover:scale-105">Testimonials</a></li>
              <li><a href="#contact" className="text-foreground/80 hover:text-primary font-medium transition-all duration-300 hover:scale-105">Contact</a></li>
              
              {user ? (
                <li className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">Welcome, {user.email}</span>
                  <button 
                    onClick={handleSignOut}
                    className="bg-destructive/90 text-destructive-foreground px-4 py-2 rounded-lg hover:bg-destructive transition-all duration-300 hover:scale-105 font-medium"
                  >
                    Sign Out
                  </button>
                </li>
              ) : (
                <li className="flex gap-3">
                  <button 
                    onClick={() => {
                      setAuthTab('signin');
                      setIsAuthModalOpen(true);
                    }}
                    className="text-foreground/80 hover:text-primary font-medium transition-all duration-300 px-4 py-2 hover:scale-105"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => {
                      setAuthTab('signup');
                      setIsAuthModalOpen(true);
                    }}
                    className="gradient-primary text-primary-foreground px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105 font-medium"
                  >
                    Get Started
                  </button>
                </li>
              )}
            </ul>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-2xl text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              ☰
            </button>
          </nav>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 py-6 glass rounded-xl animate-fade-in-up">
              <div className="flex flex-col gap-4">
                <a href="#home" className="text-foreground/80 hover:text-primary font-medium transition-colors py-2">Home</a>
                <a href="#influencers" className="text-foreground/80 hover:text-primary font-medium transition-colors py-2">Influencers</a>
                <a href="#how-it-works" className="text-foreground/80 hover:text-primary font-medium transition-colors py-2">How It Works</a>
                <a href="#packages" className="text-foreground/80 hover:text-primary font-medium transition-colors py-2">Packages</a>
                <a href="#contact" className="text-foreground/80 hover:text-primary font-medium transition-colors py-2">Contact</a>
                
                {user ? (
                  <div className="flex flex-col gap-3 pt-4 border-t border-border/50">
                    <span className="text-sm text-muted-foreground">Welcome, {user.email}</span>
                    <button 
                      onClick={handleSignOut}
                      className="bg-destructive/90 text-destructive-foreground px-4 py-2 rounded-lg hover:bg-destructive transition-colors w-fit font-medium"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 pt-4 border-t border-border/50">
                    <button 
                      onClick={() => {
                        setAuthTab('signin');
                        setIsAuthModalOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="text-foreground/80 hover:text-primary font-medium px-4 py-2 border border-border rounded-lg hover:border-primary transition-all"
                    >
                      Sign In
                    </button>
                    <button 
                      onClick={() => {
                        setAuthTab('signup');
                        setIsAuthModalOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="gradient-primary text-primary-foreground px-4 py-2 rounded-lg hover:shadow-lg transition-all font-medium"
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
        className="min-h-screen flex items-center relative overflow-hidden"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)
          `
        }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 gradient-primary rounded-full blur-3xl opacity-20 animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 gradient-secondary rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: '-3s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 gradient-accent rounded-full blur-3xl opacity-10 animate-pulse-slow"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="animate-fade-in-up">
              <h1 className="text-7xl md:text-8xl font-bold mb-6 leading-tight">
                <span className="text-gradient">Connecting Brands</span>
                <br />
                <span className="text-foreground">with Influence</span>
              </h1>
              <p className="text-xl md:text-2xl mb-10 text-muted-foreground leading-relaxed max-w-3xl">
                Spanzor is the next-gen influencer marketing platform that connects brands with top creators across YouTube and Instagram. Find, evaluate, and collaborate with influencers who amplify your story.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                {user ? (
                  <a href="#contact" className="gradient-primary text-primary-foreground px-8 py-4 rounded-xl hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105 font-semibold text-lg text-center">
                    Start Your Campaign
                  </a>
                ) : (
                  <button 
                    onClick={() => setIsAuthModalOpen(true)}
                    className="gradient-primary text-primary-foreground px-8 py-4 rounded-xl hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105 font-semibold text-lg"
                  >
                    Start Your Campaign
                  </button>
                )}
                <a href="#influencers" className="glass border-2 border-primary/20 text-foreground px-8 py-4 rounded-xl hover:border-primary/40 hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold text-lg text-center backdrop-blur-sm">
                  Browse Influencers
                </a>
              </div>
            </div>
          </div>
          
          {/* Modern floating card element */}
          <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 animate-float">
            <div className="glass p-8 rounded-2xl w-80 border border-border/20">
              <h3 className="font-semibold text-lg mb-4 text-foreground">Platform Highlights</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 gradient-primary rounded-full"></div>
                  <span className="text-muted-foreground">10K+ Verified Creators</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 gradient-secondary rounded-full"></div>
                  <span className="text-muted-foreground">5K+ Brand Partners</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 gradient-accent rounded-full"></div>
                  <span className="text-muted-foreground">340% Average ROI</span>
                </div>
              </div>
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
  <section className="py-24 bg-gradient-to-br from-secondary/50 to-muted/30 relative overflow-hidden">
    {/* Background decoration */}
    <div className="absolute inset-0">
      <div className="absolute top-0 left-1/4 w-72 h-72 gradient-primary rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 gradient-secondary rounded-full blur-3xl opacity-10"></div>
    </div>
    
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-gradient">Trusted by Thousands</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Join the growing community of brands and creators achieving remarkable results
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { number: '10K+', label: 'Verified Influencers', desc: 'Curated creators across all niches' },
          { number: '5K+', label: 'Brand Partners', desc: 'From startups to Fortune 500 companies' },
          { number: '340%', label: 'Average ROI', desc: 'Proven returns on marketing investment' }
        ].map((stat, index) => (
          <div key={index} className="text-center group">
            <div className="glass p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-border/20">
              <div className="text-6xl md:text-7xl font-bold text-gradient mb-4 group-hover:animate-pulse">
                {stat.number}
              </div>
              <div className="text-xl font-semibold text-foreground mb-2">{stat.label}</div>
              <div className="text-muted-foreground">{stat.desc}</div>
            </div>
          </div>
        ))}
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
      <section id="influencers" className="py-24 relative overflow-hidden">
        {/* Background patterns */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/30 to-background"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">Influencer Categories</span>
            </h2>
            <div className="w-24 h-1 gradient-primary mx-auto rounded-full mb-8"></div>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              We classify influencers by reach and influence type to help brands find the perfect match for their campaigns
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              { icon: '🌱', name: 'Emerging Voices', followers: '20K – 50K followers', description: 'Nano-influencers with authentic local reach', gradient: 'from-green-400 to-emerald-500' },
              { icon: '💪', name: 'Growth Champions', followers: '50K – 500K followers', description: 'Micro-influencers with strong engagement', gradient: 'from-blue-400 to-blue-600' },
              { icon: '🚀', name: 'Rising Icons', followers: '500K – 2M followers', description: 'Mid-tier stars with loyal, niche-driven audiences', gradient: 'from-purple-400 to-purple-600' },
              { icon: '⭐', name: 'Premium', followers: '2M – 10M followers', description: 'Leading creators with massive impact', gradient: 'from-yellow-400 to-orange-500' },
              { icon: '👑', name: 'Elite', followers: '10M – 25M followers', description: 'Premium creators with worldwide influence', gradient: 'from-pink-400 to-rose-500' },
              { icon: '💎', name: 'Super Elite', followers: '25M – 50M followers', description: 'Top-tier influencers with massive global reach', gradient: 'from-cyan-400 to-blue-500' },
              { icon: '🏆', name: 'Legendary', followers: '50M+ followers', description: 'Ultra-exclusive global icons and mega celebrities', gradient: 'from-amber-400 to-yellow-500' }
            ].map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="glass p-6 rounded-2xl text-center hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-border/20 h-full">
                  <div className="relative mb-6">
                    <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center text-2xl group-hover:animate-pulse shadow-lg`}>
                      {category.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-primary/80 font-semibold mb-3 text-sm">
                    {category.followers}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Creators Section */}
      <section className="py-24 bg-gradient-to-br from-secondary/40 to-muted/30 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 gradient-accent rounded-full blur-3xl opacity-10"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 gradient-secondary rounded-full blur-3xl opacity-10"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">Featured Creators</span>
            </h2>
            <div className="w-24 h-1 gradient-primary mx-auto rounded-full mb-8"></div>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Meet some of our top-performing influencers across different niches
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Priya Sharma', niche: 'Fashion & Lifestyle', followers: '5.2M', engagement: '8.5%', tags: ['Fashion', 'Beauty', 'Lifestyle'], avatar: '👩‍🦱' },
              { name: 'Arjun Kapoor', niche: 'Fitness & Health', followers: '1.8M', engagement: '12.3%', tags: ['Fitness', 'Health', 'Nutrition'], avatar: '🧔‍♂️' },
              { name: 'Sneha Reddy', niche: 'Food & Travel', followers: '450K', engagement: '15.2%', tags: ['Food', 'Travel', 'Photography'], avatar: '👩‍🍳' },
              { name: 'Rohan Joshi', niche: 'Tech & Gadgets', followers: '2.5M', engagement: '10.1%', tags: ['Tech', 'Gadgets', 'Reviews'], avatar: '👨‍💻' },
              { name: 'Ananya Rao', niche: 'Travel & Adventure', followers: '980K', engagement: '14.8%', tags: ['Travel', 'Adventure', 'Vlogging'], avatar: '👩‍✈️' },
              { name: 'Vikram Singh', niche: 'Gaming & Esports', followers: '3.1M', engagement: '9.2%', tags: ['Gaming', 'Esports', 'Streaming'], avatar: '🎮' }
            ].map((creator, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="glass rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-border/20">
                  <div className="h-48 gradient-secondary flex items-center justify-center text-8xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10"></div>
                    <span className="relative z-10 group-hover:animate-bounce">{creator.avatar}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {creator.name}
                    </h3>
                    <p className="text-muted-foreground mb-6 font-medium">{creator.niche}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-3 glass rounded-xl">
                        <div className="text-2xl font-bold text-primary mb-1">{creator.followers}</div>
                        <div className="text-sm text-muted-foreground">Followers</div>
                      </div>
                      <div className="text-center p-3 glass rounded-xl">
                        <div className="text-2xl font-bold text-accent mb-1">{creator.engagement}</div>
                        <div className="text-sm text-muted-foreground">Engagement</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {creator.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="glass px-3 py-1 rounded-full text-sm text-muted-foreground border border-border/30 hover:border-primary/30 transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/20 to-background"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">How Spanzor Works</span>
            </h2>
            <div className="w-24 h-1 gradient-primary mx-auto rounded-full mb-8"></div>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Simple, transparent, and effective influencer marketing in 4 easy steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                step: '01', 
                title: 'Choose Deliverable', 
                description: 'Select from Instagram Reels, Stories, Posts, YouTube Shorts, or Integrations',
                icon: '🎯',
                color: 'from-purple-500 to-purple-600'
              },
              { 
                step: '02', 
                title: 'Pick Creators', 
                description: 'Filter by tier, niche, language, location, and budget to find the perfect match',
                icon: '👥',
                color: 'from-blue-500 to-blue-600'
              },
              { 
                step: '03', 
                title: 'Schedule & Brief', 
                description: 'Book available slots, provide campaign briefs, and add any special requirements',
                icon: '📅',
                color: 'from-pink-500 to-pink-600'
              },
              { 
                step: '04', 
                title: 'Launch & Track', 
                description: 'Monitor campaign performance with real-time analytics and guaranteed delivery',
                icon: '🚀',
                color: 'from-green-500 to-green-600'
              }
            ].map((item, index) => (
              <div key={index} className="text-center group relative">
                {/* Connection line */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-16 left-full w-8 h-px bg-gradient-to-r from-primary/50 to-transparent z-0"></div>
                )}
                
                <div className="relative z-10">
                  <div className="relative mb-8">
                    <div className={`w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-3xl shadow-2xl group-hover:animate-bounce transition-all duration-300`}>
                      <span className="absolute text-white font-bold text-lg top-2 right-2 opacity-70">
                        {item.step}
                      </span>
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                  </div>
                  
                  <div className="glass p-6 rounded-2xl border border-border/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Call to action */}
          <div className="text-center mt-16">
            <div className="glass p-8 rounded-2xl max-w-2xl mx-auto border border-border/20">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Ready to get started?</h3>
              <p className="text-muted-foreground mb-6">Join thousands of brands already seeing amazing results</p>
              <button className="gradient-primary text-primary-foreground px-8 py-3 rounded-xl hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105 font-semibold">
                Start Your First Campaign
              </button>
            </div>
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
      <footer className="relative overflow-hidden bg-gradient-to-br from-secondary/20 to-muted/40 border-t border-border/40">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute -bottom-40 -left-40 w-80 h-80 gradient-primary rounded-full blur-3xl opacity-10"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 gradient-secondary rounded-full blur-3xl opacity-10"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-2">
              <div className="text-3xl font-bold text-gradient mb-6">Spanzor</div>
              <p className="text-muted-foreground mb-6 text-lg leading-relaxed max-w-md">
                The next-gen influencer marketing platform that connects brands with top creators across YouTube and Instagram.
              </p>
              <div className="flex items-center gap-3 text-muted-foreground">
                <span>Email us at:</span>
                <a href="mailto:hello@spanzor.com" className="text-primary hover:text-accent transition-colors font-semibold">
                  hello@spanzor.com
                </a>
              </div>
              
              {/* Social Links */}
              <div className="flex gap-4 mt-8">
                {['📘', '📷', '🐦', '💼'].map((icon, index) => (
                  <button key={index} className="w-12 h-12 glass rounded-xl flex items-center justify-center text-xl hover:scale-110 transition-all duration-300 border border-border/20 hover:border-primary/30">
                    {icon}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6 text-foreground">Company</h4>
              <ul className="space-y-3">
                {['About Us', 'Careers', 'Press', 'Blog', 'Contact'].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6 text-foreground">Legal</h4>
              <ul className="space-y-3">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR', 'Security'].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="text-center pt-8 border-t border-border/30">
            <p className="text-muted-foreground">
              © 2025 <span className="text-primary font-semibold">Spanzor</span>. All rights reserved.
            </p>
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