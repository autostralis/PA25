export default function WhyChooseSection() {
  const features = [
    {
      icon: '✅',
      title: 'Verified Influencers',
      description: 'Access to 10,000+ verified influencers across all major niches with transparent engagement data'
    },
    {
      icon: '🧠',
      title: 'Smart Matchmaking',
      description: 'AI-powered recommendations ensuring perfect brand-influencer alignment for maximum impact'
    },
    {
      icon: '🛡️',
      title: 'Secure Collaborations',
      description: 'Protected payments, automated contracts, and dedicated support for seamless partnerships'
    },
    {
      icon: '📊',
      title: 'Real-time Analytics',
      description: 'Track campaign performance, engagement rates, and ROI with comprehensive analytics dashboard'
    },
    {
      icon: '📅',
      title: 'Instant Booking',
      description: 'Book influencers instantly with our availability calendar and automated scheduling system'
    },
    {
      icon: '🏆',
      title: 'Quality Assurance',
      description: 'PostGuard™ technology ensures content delivery and maintains campaign quality standards'
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-5xl font-bold text-center mb-5 text-gray-800">Why Choose Spanzor?</h2>
        <div className="w-20 h-1 bg-amber-600 mx-auto mb-12"></div>
        <p className="text-lg text-center max-w-3xl mx-auto mb-12 text-gray-600">
          Everything you need to run successful influencer marketing campaigns at scale
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow flex items-start space-x-6"
            >
              <div className="text-3xl flex-shrink-0 mt-1">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}