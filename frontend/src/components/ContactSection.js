import { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    state: '',
    vertical: '',
    budget: '',
    deliverable: '',
    platforms: [],
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      platforms: checked
        ? [...prev.platforms, value]
        : prev.platforms.filter(platform => platform !== value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://formspree.io/f/mdkdyvdg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          platforms: formData.platforms.join(', '),
          _subject: 'Spanzor Inquiry from Website',
          source: 'Spanzor Contact Page'
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          city: '',
          state: '',
          vertical: '',
          budget: '',
          deliverable: '',
          platforms: [],
          message: ''
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
    'Delhi (NCT)', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 
    'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 
    'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
  ];

  const verticals = [
    'Automotive', 'Beauty & Personal Care', 'Tech & Apps', 'Finance / Fintech', 
    'Education', 'Travel & Hospitality', 'Food & Beverages', 'Fashion', 
    'Health & Fitness', 'Real Estate', 'Gaming & Esports', 'Home & Living', 
    'Parenting', 'Sports', 'Entertainment', 'E-commerce / Marketplaces', 'Other'
  ];

  const budgets = [
    '₹10,000 – ₹50,000',
    '₹50,000 – ₹2,00,000',
    '₹2,00,000 – ₹5,00,000',
    '₹5,00,000 – ₹10,00,000',
    '₹10,00,000+'
  ];

  const deliverables = [
    'Instagram Reel',
    'Instagram Story',
    'Instagram Post',
    'YouTube Short',
    'YouTube Integration',
    'Other'
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-5">
        <h2 className="text-5xl font-bold text-center mb-5 text-gray-800">Get in Touch</h2>
        <p className="text-lg text-center max-w-3xl mx-auto mb-12 text-gray-600">
          We'd love to hear from you. Send us a message and our team will get back to you shortly.
        </p>

        {submitStatus === 'success' && (
          <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-600 text-center">Thank you! Your message has been sent successfully.</p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-center">Sorry, there was an error sending your message. Please try again.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your Name"
              required
            />
          </div>

          {/* Email and City */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="city">
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your City"
              />
            </div>
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="state">
              Region (State/UT)
            </label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select Your State/UT</option>
              {states.map((state, index) => (
                <option key={index} value={state}>{state}</option>
              ))}
            </select>
          </div>

          {/* Vertical and Budget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="vertical">
                Vertical (Industry)
              </label>
              <select
                id="vertical"
                name="vertical"
                value={formData.vertical}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Vertical</option>
                {verticals.map((vertical, index) => (
                  <option key={index} value={vertical}>{vertical}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="budget">
                Budget (₹)
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Budget Range</option>
                {budgets.map((budget, index) => (
                  <option key={index} value={budget}>{budget}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Deliverable and Platforms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="deliverable">
                Deliverable
              </label>
              <select
                id="deliverable"
                name="deliverable"
                value={formData.deliverable}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Choose Deliverable</option>
                {deliverables.map((deliverable, index) => (
                  <option key={index} value={deliverable}>{deliverable}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Platforms</label>
              <div className="flex items-center space-x-6 mt-3">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value="Instagram"
                    checked={formData.platforms.includes('Instagram')}
                    onChange={handleCheckboxChange}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">Instagram</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value="YouTube"
                    checked={formData.platforms.includes('YouTube')}
                    onChange={handleCheckboxChange}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">YouTube</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value="Both"
                    checked={formData.platforms.includes('Both')}
                    onChange={handleCheckboxChange}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">Both</span>
                </label>
              </div>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tell us briefly about your campaign and timeline"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gray-800 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          <p className="text-sm text-gray-500 text-center">
            By submitting, you agree to our Privacy Policy.
          </p>
        </form>

        <p className="mt-8 text-center text-gray-600">
          📧 Or email us directly at{' '}
          <a href="mailto:hello@spanzor.com" className="text-blue-600 hover:underline">
            hello@spanzor.com
          </a>
        </p>
      </div>
    </section>
  );
}