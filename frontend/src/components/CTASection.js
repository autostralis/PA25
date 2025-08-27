import { useState } from 'react';
import AuthModal from './AuthModal';
import { useAuth } from '../contexts/AuthContext';

export default function CTASection() {
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <>
      <section className="py-24 bg-gradient-to-r from-gray-800 to-blue-600 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full transform translate-x-48 -translate-y-48"></div>
        <div className="max-w-4xl mx-auto px-5 relative z-10">
          <h2 className="text-5xl font-bold mb-5 text-white">
            Ready to Scale Your Brand with Influence?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-10 text-white opacity-90 leading-relaxed">
            Join thousands of brands and creators who trust Spanzor for their influencer marketing success. Start your first campaign today.
          </p>
          
          {user ? (
            <a
              href="#contact"
              className="bg-white text-gray-800 px-10 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg inline-block"
            >
              Get Started Now
            </a>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-white text-gray-800 px-10 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              Get Started Now
            </button>
          )}
        </div>
      </section>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        initialTab="signup"
      />
    </>
  );
}