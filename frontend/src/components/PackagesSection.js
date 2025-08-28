export default function PackagesSection() {
  const packages = [
    {
      icon: '🌱',
      title: 'Starter',
      price: '₹10,000 – ₹50,000',
      description: 'Perfect for new brands to build initial awareness and engagement with nano-influencers.',
      features: [
        '2-5 collaborations',
        'Emerging & Growth Voices',
        'Instagram Stories & Posts',
        'Basic Performance Tracking'
      ],
      featured: false
    },
    {
      icon: '🚀',
      title: 'Growth',
      price: '₹50,000 – ₹2,00,000',
      description: 'Scale your reach and drive targeted traffic with a mix of micro and mid-tier influencers.',
      features: [
        '5-10 collaborations',
        'Growth & Rising Icons',
        'Instagram Reels & YouTube Shorts',
        'Dedicated Campaign Manager'
      ],
      featured: true
    },
        {
      icon: '⭐',
      title: 'Premium',
      price: '₹2,00,000 – ₹5,00,000',
      description: 'For established brands aiming for high-impact campaigns and market penetration.',
      features: [
        '3-5 high-impact collaborations',
        'Rising Icons & Premium Stars',
        'YouTube Integrations',
        'Creative Strategy & ROI Analysis'
      ],
      featured: false
    },
    {
      icon: '👑',
      title: 'Elite',
      price: '₹5,00,000 – ₹15,00,000',
      description: 'High-impact campaigns with elite creators for brands seeking premium market presence.',
      features: [
        '2-4 elite collaborations',
        'Elite & Premium Stars',
        'Cross-platform Campaigns',
        'Custom Campaign Strategy',
        'Performance Analytics Suite'
      ],
      featured: false
    },
    {
      icon: '⭐',
      title: 'Premium',
      price: '₹2,00,000 – ₹5,00,000',
      description: 'For established brands aiming for high-impact campaigns and market penetration.',
      features: [
        '3-5 high-impact collaborations',
        'Rising Icons & Premium Stars',
        'YouTube Integrations',
        'Creative Strategy & ROI Analysis'
      ],
      featured: false
    },
    
    {
      icon: '💎',
      title: 'Super Elite',
      price: '₹15,00,000 – ₹25,00,000',
      description: 'Premium campaigns with super elite creators for maximum brand visibility and impact.',
      features: [
        '2-3 super elite collaborations',
        'Super Elite & Elite Stars',
        'Premium Multi-platform Strategy',
        'Dedicated Executive Manager',
        'Custom Creative Development'
      ],
      featured: false
    },
    {
      icon: '🏆',
      title: 'Legendary',
      price: '₹25,00,000+',
      description: 'Ultra-exclusive campaigns with legendary influencers and global mega celebrities.',
      features: [
        '1-2 legendary collaborations',
        'Legendary & Super Elite Stars',
        'Global Multi-platform Campaigns',
        'Executive Campaign Strategy',
        'Brand Ambassador Programs'
      ],
      featured: false
    },
  ];

  return (
    <section id="packages" className="py-20">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-5xl font-bold text-center mb-5 text-gray-800">Our Packages</h2>
        <div className="w-20 h-1 bg-amber-600 mx-auto mb-12"></div>
        <p className="text-lg text-center max-w-3xl mx-auto mb-12 text-gray-600">
          Find the perfect package to match your campaign goals and budget.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow border-t-4 ${
                pkg.featured 
                  ? 'border-amber-600 transform scale-105 shadow-lg' 
                  : 'border-gray-200'
              }`}
            >
              <div className="text-center">
                <div className="text-4xl mb-4">{pkg.icon}</div>
                <h3 className="text-2xl font-semibold mb-2 text-gray-800">{pkg.title}</h3>
                <p className="text-lg font-medium text-blue-600 mb-5">{pkg.price}</p>
                <p className="text-gray-600 mb-6">{pkg.description}</p>
                
                <ul className="text-left space-y-3 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <span className="text-green-500 mr-3 mt-0.5">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <a
                  href="#contact"
                  className="w-full bg-gray-800 text-white py-3 px-6 rounded hover:bg-blue-600 transition-colors font-medium inline-block text-center"
                >
                  {pkg.title === 'Growth' ? 'Choose Growth' : 
                   pkg.title === 'Premium' ? 'Go Premium' : 
                   pkg.title === 'Elite' ? 'Go Elite' :
                   pkg.title === 'Super Elite' ? 'Go Super Elite' :
                   pkg.title === 'Legendary' ? 'Go Legendary' :}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
