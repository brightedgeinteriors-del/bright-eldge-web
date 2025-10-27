"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  project?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Prashanth.G",
    role: "Homeowner",
    content: "Working with BrightEdge Interiors transformed our house into a dream home. Their attention to detail and understanding of our style was remarkable. The team delivered beyond our expectations.",
    rating: 5,
    project: "Modern Villa Renovation"
  },
  {
    id: 2,
    name: "Rahulgupta",
    role: "Property Developer",
    content: "The team's professionalism and creativity exceeded our expectations. They delivered a stunning design that perfectly balanced luxury and functionality across multiple properties.",
    rating: 5,
    project: "Luxury Apartments"
  },
  {
    id: 3,
    name: "Satish Kumar",
    role: "Apartment Owner",
    content: "They managed to maximize our small space while maintaining elegance and comfort. The transformation was incredible and the process was seamless from start to finish.",
    rating: 5,
    project: "Studio Apartment"
  },
  {
    id: 4,
    name: "Prajwal",
    role: "Restaurant Owner",
    content: "Our restaurant's ambiance has been completely transformed. The design not only looks stunning but has improved customer flow and experience significantly.",
    rating: 5,
    project: "Fine Dining Restaurant"
  },
  {
    id: 5,
    name: "Priya Patel",
    role: "Office Manager",
    content: "The office redesign has boosted employee morale and productivity. The team understood our brand identity and created a space that truly represents our company values.",
    rating: 5,
    project: "Corporate Office"
  },
  {
    id: 6,
    name: "Prasad M",
    role: "Hotel Owner",
    content: "From concept to completion, the professionalism and creativity were outstanding. Our guests consistently compliment the sophisticated yet comfortable atmosphere.",
    rating: 5,
    project: "Boutique Hotel"
  }
];

export default function Testimonials() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
    const cardRef = useRef(null);
    const cardInView = useInView(cardRef, { once: true, margin: "-50px" });

    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={cardInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="group relative bg-white p-8 rounded-2xl border border-gray-100 hover:border-orange-200 transition-all duration-500 hover:shadow-2xl"
        whileHover={{ 
          y: -8,
          transition: { duration: 0.3 }
        }}
      >
        {/* Background Pattern */}
        <div className="absolute top-4 right-4 opacity-5 text-6xl">❝</div>
        
        {/* Rating Stars */}
        <div className="flex mb-6">
          {[...Array(testimonial.rating)].map((_, i) => (
            <motion.svg
              key={i}
              initial={{ scale: 0, rotate: -180 }}
              animate={cardInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
              transition={{ delay: i * 0.1, duration: 0.5, type: "spring", stiffness: 100 }}
              className="w-5 h-5 text-amber-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </motion.svg>
          ))}
        </div>

        {/* Content */}
        <motion.p 
          className="text-gray-600 mb-6 leading-relaxed text-lg font-light"
          initial={{ opacity: 0 }}
          animate={cardInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          "          &quot;{testimonial.content}&quot;"
        </motion.p>

        {/* Client Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={cardInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center text-white font-semibold">
              {testimonial.name.charAt(0)}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
              <p className="text-gray-500 text-sm">{testimonial.role}</p>
              {testimonial.project && (
                <p className="text-orange-600 text-xs font-medium mt-1">{testimonial.project}</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Hover Border Effect */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-orange-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
          <div className="absolute inset-[2px] rounded-2xl bg-white"></div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="bg-white min-h-screen" ref={containerRef}>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute top-10 left-10 w-72 h-72 bg-orange-400 rounded-full blur-3xl"
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-72 h-72 bg-amber-400 rounded-full blur-3xl"
            animate={{
              y: [0, 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <motion.span 
                className="text-orange-600 text-sm font-medium uppercase tracking-widest inline-block mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.2 }}
              >
                Client Stories
              </motion.span>
              
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.4 }}
              >
                Trusted by
                <span className="block bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mt-2">
                  Amazing Clients
                </span>
              </motion.h1>
              
              <motion.div 
                className="w-16 h-1 bg-gradient-to-r from-orange-400 to-amber-400 mx-auto mb-8 rounded-full"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              />
              
              <motion.p 
                className="text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.8 }}
              >
                Discover why clients love working with us to create spaces that inspire and transform lives
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "100%", label: "Client Satisfaction" },
              { number: "160+", label: "Projects Completed" },
              { number: "8+", label: "Years Experience" },
              { number: "10+", label: "Expertise" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group"
              >
                <motion.div 
                  className="text-3xl md:text-4xl font-light text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm text-gray-600 uppercase tracking-wide font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-light text-gray-900 mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.2 }}
            >
              Voices of Satisfaction
            </motion.h2>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4 }}
            >
              Hear what our clients have to say about their experience working with our team
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map(testimonial => (
              <TestimonialCard 
                key={testimonial.id} 
                testimonial={testimonial}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-light mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
          >
            Ready to Create Your Success Story?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-10 font-light max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4 }}
          >
            Join our growing family of satisfied clients and let us transform your space into something extraordinary
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                background: "linear-gradient(45deg, #ea580c, #d97706)"
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Your Project
            </motion.button>
            <motion.button
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "white",
                color: "#111827"
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-medium hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              View Portfolio
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}