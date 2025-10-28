"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    projectType: "residential",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Client-side validation
    if (!formData.name || !formData.email || !formData.message) {
      setIsSubmitting(false);
      setSubmitSuccess(false);
      setSubmitError('Name, email and message are required');
      return;
    }

    if (!(formData.email.toLowerCase().endsWith('@gmail.com') || formData.email.toLowerCase().endsWith('@yahoo.com'))) {
      setIsSubmitting(false);
      setSubmitError('Email must end with @gmail.com or @yahoo.com');
      return;
    }

    if (formData.phone) {
      const digits = formData.phone.replace(/\D/g, '');
      if (!/^\d{10}$/.test(digits)) {
        setIsSubmitting(false);
        setSubmitError('Phone number must be 10 digits');
        return;
      }
    }

    setSubmitError('');

    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data?.error || 'Failed to submit form');
        setIsSubmitting(false);
        return;
      }

      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '', projectType: 'residential' });
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err) {
      setSubmitError('Network error - failed to submit');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const contactInfo = [
    { 
      icon: "📞", 
      title: "Phone", 
      content: "+91 8431866567/8317307240",
    },
    { 
      icon: "✉️", 
      title: "Email", 
      content: "brightedgeinteriors@gmail.com",
      link: "brightedgeinteriors@gmail.com"
    },
    { 
      icon: "📍", 
      title: "Location", 
      content: "Bangalore, Karnataka, India",
      link: "https://www.google.com/maps/search/?api=1&query=Bangalore+Karnataka+India"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-orange-50 to-amber-50 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="h-[1px] w-12 bg-orange-400"></div>
                <span className="text-orange-600 text-sm font-light uppercase tracking-[0.2em]">
                  Get in Touch
                </span>
                <div className="h-[1px] w-12 bg-orange-400"></div>
              </div>
              <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-6">
                Let&apos;s Create Something Beautiful Together
              </h1>
              <p className="text-xl text-gray-700 font-light max-w-2xl mx-auto">
                Transform your space with our expert interior design services. We&apos;re here to bring your vision to life.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-light text-gray-900 mb-2">Send Us a Message</h2>
                <p className="text-gray-600">Fill out the form below and we&apos;ll get back to you as soon as possible.</p>
              </div>
              
              {submitSuccess && (
                <motion.div 
                  className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Thank you for your message! We&apos;ll get back to you soon.
                </motion.div>
              )}
              {submitError && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                  {submitError}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
                      Project Type
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    >
                      <option value="residential">Residential</option>
                      <option value="apartment">Apartment</option>
                      <option value="villa">Villa</option>
                      <option value="commercial">Commercial</option>
                      <option value="office">Office</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    required
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-600 text-white py-4 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-12"
            >
              <div>
                <h3 className="text-3xl font-light text-gray-900 mb-6">Contact Information</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Ready to start your project? Reach out to us today for a consultation. Our team is excited to hear about your vision and help bring it to life.
                </p>
              </div>

              <div className="space-y-8">
                {contactInfo.map((item, index) => (
                  <motion.a 
                    key={index}
                    href={item.link}
                    className="flex items-start space-x-5 group"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <motion.div 
                      className="text-3xl bg-orange-100 p-4 rounded-full"
                      whileHover={{ 
                        scale: 1.1,
                        backgroundColor: "#fed7aa"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-lg mb-1">{item.title}</h4>
                      <p className="text-gray-600 group-hover:text-orange-600 transition-colors">{item.content}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-2xl">
                <h3 className="text-2xl font-light text-gray-900 mb-6">Business Hours</h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex justify-between border-b border-orange-100 pb-3">
                    <span>Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between border-b border-orange-100 pb-3">
                    <span>Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 text-white p-8 rounded-2xl">
                <h3 className="text-2xl font-light mb-4">Need Immediate Assistance?</h3>
                <p className="mb-6 text-gray-300">Call us directly for urgent inquiries or project consultations.</p>
                <motion.a
                  href="tel:+918431866567"
                  aria-label="Call +91 8431866567"
                  className="inline-flex items-center bg-orange-600 text-white px-6 py-3 rounded-lg font-medium"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "#ea580c"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Call Now
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-gray-900 mb-4">Visit Our Studio</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We&apos;d love to welcome you to our design studio. Schedule a visit to see our work and discuss your project in person.</p>
          </div>
          
          <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl overflow-hidden shadow-xl relative">
            {/* Embedded Google Map for Bangalore, Karnataka */}
            <iframe
              title="Bright Edge Interiors - Bangalore"
              src="https://www.google.com/maps?q=Bangalore+Karnataka+India&output=embed"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
            />

            {/* Map controls (kept as overlay) */}
            <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-2 flex flex-col space-y-2">
              <button className="p-2 hover:bg-gray-100 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <motion.a
              href="https://www.google.com/maps/search/?api=1&query=Bangalore+Karnataka+India"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-orange-600 font-medium"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Get Directions
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </motion.a>
          </div>
        </div>
      </section>


      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}