"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

type ServiceType = {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  gradient: string;
};

const Services = () => {
  const containerRef = useRef(null);
  const [activeService, setActiveService] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const heroY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const services: ServiceType[] = [
    {
      id: 1,
      title: "Residential Design",
      description: "Transform your living spaces into personalized sanctuaries that reflect your lifestyle and aesthetic preferences.",
      icon: "🏠",
      features: ["Space Planning", "Furniture Selection", "Lighting Design", "Color Consultation"],
      gradient: "from-blue-400 to-purple-500"
    },
    {
      id: 2,
      title: "Commercial Interiors",
      description: "Create functional and inspiring work environments that enhance productivity and brand identity.",
      icon: "🏢",
      features: ["Office Design", "Retail Spaces", "Hospitality Interiors"],
      gradient: "from-green-400 to-cyan-500"
    },
    {
      id: 3,
      title: "Renovation & Remodeling",
      description: "Breathe new life into existing spaces with our comprehensive renovation and remodeling services.",
      icon: "🔨",
      features: ["Kitchen Remodels", "Bathroom Upgrades", "Whole Home Renovations", "Space Reconfiguration"],
      gradient: "from-orange-400 to-red-500"
    },
    {
      id: 4,
      title: "Sustainable Design",
      description: "Eco-conscious design solutions that minimize environmental impact without compromising on style.",
      icon: "🌿",
      features: ["Eco-Friendly Materials", "Energy Efficiency", "Waste Reduction", "Biophilic Design"],
      gradient: "from-emerald-400 to-teal-500"
    },
    {
      id: 5,
      title: "Custom Furniture",
      description: "Bespoke furniture pieces crafted to perfectly complement your interior design and spatial requirements.",
      icon: "🪑",
      features: ["Custom Cabinetry", "Upholstered Pieces", "Built-ins", "Unique Furnishings"],
      gradient: "from-amber-400 to-yellow-500"
    },
    {
      id: 6,
      title: "Project Management",
      description: "End-to-end project coordination ensuring your design vision is executed flawlessly from concept to completion.",
      icon: "📋",
      features: ["Budget Management", "Timeline Coordination", "Contractor Oversight", "Quality Control"],
      gradient: "from-indigo-400 to-purple-500"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Initial Consultation",
      description: "We begin with a comprehensive discussion to understand your vision, requirements, and budget.",
      icon: "💬"
    },
    {
      step: "02",
      title: "Concept Development",
      description: "Our designers create mood boards and initial concepts based on your preferences and needs.",
      icon: "🎨"
    },
    {
      step: "03",
      title: "Design Presentation",
      description: "We present detailed designs including 3D renderings, material samples, and furniture selections.",
      icon: "📊"
    },
    {
      step: "04",
      title: "Implementation",
      description: "Our team manages the entire process from procurement to installation with meticulous attention to detail.",
      icon: "⚡"
    },
    {
      step: "05",
      title: "Final Reveal",
      description: "We unveil your transformed space and ensure every element meets our high standards of excellence.",
      icon: "✨"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 30, 
      opacity: 0,
      transition: { duration: 0.6 }
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const floatingAnimation = {
    y: 0,
    transition: {
      duration: 3,
      repeat: Infinity
    }
  };

  const AnimatedSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { 
      once: true, 
      margin: isMobile ? "-50px 0px -50px 0px" : "-100px 0px -100px 0px" 
    });

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              delay: delay,
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          }
        }}
      >
        {children}
      </motion.div>
    );
  };

  const MobileServiceCard = ({ service, index }: { service: ServiceType; index: number }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <motion.div
        className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px 0px -50px 0px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ y: -5 }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <motion.div 
              className={`text-3xl p-3 rounded-2xl bg-gradient-to-r ${service.gradient} text-white`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              {service.icon}
            </motion.div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <span className="text-gray-600">↓</span>
            </motion.div>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-4 border-t border-gray-100"
              >
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <motion.div 
                      key={idx}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                    >
                      <div className="w-2 h-2 rounded-full bg-orange-400 mr-3"></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button 
                  className="w-full mt-4 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-medium"
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="bg-white text-gray-900 font-sans overflow-hidden" ref={containerRef}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50"
          style={{ 
            y: heroY, 
            opacity: heroOpacity,
            scale: heroScale
          }}
        />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-400 rounded-full blur-3xl"
            animate={floatingAnimation}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-amber-400 rounded-full blur-3xl"
            animate={{
              ...floatingAnimation,
              transition: { ...floatingAnimation.transition, delay: 1 }
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-48 h-48 bg-yellow-300 rounded-full blur-3xl"
            animate={{
              ...floatingAnimation,
              transition: { ...floatingAnimation.transition, delay: 2 }
            }}
          />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="text-orange-600 text-sm font-medium uppercase tracking-widest bg-white/80 backdrop-blur-sm rounded-full px-4 py-2">
              Our Expertise
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mt-6 mb-8 leading-tight px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Design Services
            <motion.span 
              className="block bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mt-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Tailored to You
            </motion.span>
          </motion.h1>
          
          <motion.div 
            className="w-16 h-1 bg-gradient-to-r from-orange-400 to-amber-400 mx-auto mb-10 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
          
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-light leading-relaxed px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Comprehensive interior design solutions that transform spaces into inspiring environments
          </motion.p>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="text-sm text-gray-600">Scroll to explore</span>
              <motion.div
                className="w-6 h-10 border-2 border-orange-400 rounded-full flex justify-center"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div className="w-1 h-3 bg-orange-400 rounded-full mt-2" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection delay={0.1}>
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <motion.span 
                className="text-orange-600 text-sm font-medium uppercase tracking-widest inline-block mb-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                What We Offer
              </motion.span>
              <motion.h2 
                className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-4 sm:mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Our Design Services
              </motion.h2>
              <motion.div 
                className="w-16 h-1 bg-gradient-to-r from-orange-400 to-amber-400 mx-auto rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
            </div>
          </AnimatedSection>

          {/* Mobile View */}
          {isMobile ? (
            <div className="space-y-4 sm:space-y-6">
              {services.map((service, index) => (
                <MobileServiceCard key={service.id} service={service} index={index} />
              ))}
            </div>
          ) : (
            /* Desktop View */
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px 0px -100px 0px" }}
            >
              {services.map((service) => (
                <motion.div 
                  key={service.id}
                  className="group relative bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500"
                  variants={itemVariants}
                  whileHover={{ 
                    y: -12,
                    transition: { duration: 0.4, ease: "easeOut" }
                  }}
                  onHoverStart={() => setActiveService(service.id)}
                  onHoverEnd={() => setActiveService(null)}
                >
                  <div className="relative p-8 z-10">
                    <motion.div 
                      className={`text-4xl mb-6 p-4 rounded-2xl bg-gradient-to-r ${service.gradient} text-white w-16 h-16 flex items-center justify-center`}
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 5,
                        transition: { duration: 0.3 }
                      }}
                    >
                      {service.icon}
                    </motion.div>
                    
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-amber-600 transition-all duration-500">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {service.description}
                    </p>
                    
                    <div className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <motion.div 
                          key={idx}
                          className="flex items-center"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: idx * 0.1 }}
                        >
                          <motion.div 
                            className="w-2 h-2 rounded-full bg-orange-400 mr-3"
                            whileHover={{ scale: 1.5 }}
                          />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Hover Gradient Background */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    initial={false}
                  />
                  
                  {/* Animated Border */}
                  <motion.div 
                    className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'subtract',
                      WebkitMaskComposite: 'xor',
                      padding: '2px'
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection delay={0.1}>
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <span className="text-orange-600 text-sm font-medium uppercase tracking-widest">Our Approach</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mt-4 mb-4 sm:mb-6">
                How We Work
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-amber-400 mx-auto mb-6 rounded-full"></div>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                A streamlined process designed to deliver exceptional results with clear communication at every stage
              </p>
            </div>
          </AnimatedSection>

          <div className="relative">
            {/* Timeline line - Hidden on mobile */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-200 to-amber-200 transform sm:-translate-x-1/2 hidden sm:block"></div>
            
            <div className="space-y-8 sm:space-y-16">
              {processSteps.map((step, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <motion.div 
                    className={`flex flex-col sm:flex-row items-start sm:items-center ${index % 2 === 0 ? 'sm:flex-row-reverse' : ''}`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {/* Content Card */}
                    <div className={`sm:w-1/2 flex ${index % 2 === 0 ? 'sm:justify-end sm:pr-8 lg:pr-12' : 'sm:justify-start sm:pl-8 lg:pl-12'} mb-6 sm:mb-0 order-2 sm:order-1`}>
                      <motion.div 
                        className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 max-w-md w-full group"
                        whileHover={{ y: -5, scale: 1.02 }}
                      >
                        <div className="flex items-center mb-4">
                          <div className="text-2xl mr-3">{step.icon}</div>
                          <div className="text-orange-600 text-lg font-light">{step.step}</div>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">{step.title}</h3>
                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{step.description}</p>
                      </motion.div>
                    </div>
                    
                    {/* Timeline Dot */}
                    <div className={`sm:w-1/2 flex ${index % 2 === 0 ? 'sm:justify-start sm:pl-8 lg:pl-12' : 'sm:justify-end sm:pr-8 lg:pr-12'} mb-4 sm:mb-0 order-1 sm:order-2`}>
                      <motion.div 
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-orange-400 to-amber-400 flex items-center justify-center border-4 border-white shadow-xl relative z-10"
                        whileHover={{ 
                          scale: 1.1,
                          transition: { duration: 0.3 }
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-white font-semibold text-sm sm:text-base">{step.step}</span>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute top-10 left-10 w-32 h-32 bg-orange-400 rounded-full blur-3xl"
            animate={floatingAnimation}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-32 h-32 bg-amber-400 rounded-full blur-3xl"
            animate={{
              ...floatingAnimation,
              transition: { ...floatingAnimation.transition, delay: 1.5 }
            }}
          />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimatedSection delay={0.1}>
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl font-light mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Ready to Transform Your Space?
            </motion.h2>
            <motion.p 
              className="text-lg sm:text-xl text-gray-300 mb-8 sm:mb-10 font-light max-w-2xl mx-auto px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Let&apos;s discuss your project and create a design that exceeds your expectations
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button 
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                whileHover={{ 
                  scale: 1.05,
                  background: "linear-gradient(45deg, #ea580c, #d97706)",
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                Get a Free Consultation
              </motion.button>
              <motion.button 
                className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white rounded-xl font-medium hover:bg-white hover:text-gray-900 transition-all duration-300 w-full sm:w-auto"
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                View Our Portfolio
              </motion.button>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
};

export default Services;