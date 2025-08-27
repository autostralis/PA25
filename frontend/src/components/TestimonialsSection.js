export default function TestimonialsSection() {
  const testimonials = [
    {
      text: "Spanzor helped us find the perfect tech influencers for our app launch. We achieved 300% ROI in just 2 months!",
      author: {
        name: "Rajesh Kumar",
        role: "Marketing Director, TechFlow Startup",
        initials: "RK"
      }
    },
    {
      text: "The quality of influencers and the seamless booking process made our fashion campaign a huge success.",
      author: {
        name: "Priya Sharma",
        role: "Brand Manager, Fashion Forward",
        initials: "PS"
      }
    },
    {
      text: "From micro to macro influencers, Spanzor has the perfect creator for every budget and campaign goal.",
      author: {
        name: "Arjun Patel",
        role: "CEO, FitLife Pro",
        initials: "AP"
      }
    }
  ];

  return (
    <section id="testimonials" className="py-20">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-5xl font-bold text-center mb-5 text-gray-800">Trusted by Leading Brands</h2>
        <div className="w-20 h-1 bg-amber-600 mx-auto mb-12"></div>
        <p className="text-lg text-center max-w-3xl mx-auto mb-12 text-gray-600">
          See what our clients say about their Spanzor experience
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow relative"
            >
              <div className="absolute top-4 left-6 text-6xl text-amber-600 opacity-20 font-serif">
                "
              </div>
              
              <p className="text-gray-600 mb-6 italic leading-relaxed pl-4">
                {testimonial.text}
              </p>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-gray-600 font-semibold">
                    {testimonial.author.initials}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    {testimonial.author.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {testimonial.author.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}