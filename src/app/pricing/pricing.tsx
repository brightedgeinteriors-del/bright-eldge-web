"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const PricingPage = () => {
  const [activeStage, setActiveStage] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const paymentStages = [
    {
      id: 1,
      title: "Design Initiation",
      percentage: 10,
      description: "Initial concept development, space planning, and design proposal",
      details: "This phase covers the creation of initial design concepts, mood boards, space planning, and the preliminary design proposal. We establish the foundation for your project with detailed discussions about your vision and requirements.",
      icon: "✏️"
    },
    {
      id: 2,
      title: "Material Procurement & Site Setup",
      percentage: 50,
      description: "Sourcing materials, ordering furniture, and preparing the site",
      details: "The largest portion covers sourcing and ordering all materials, furniture, and fixtures. We prepare the site for construction, handle all logistics, and ensure everything is ready for the execution phase.",
      icon: "📦"
    },
    {
      id: 3,
      title: "Execution & Installation",
      percentage: 35,
      description: "Construction, installation, and implementation of the design",
      details: "During this phase, we bring your design to life through construction, installation of fixtures, furniture placement, and implementation of all design elements. Our team oversees every detail to ensure quality and precision.",
      icon: "🔨"
    },
    {
      id: 4,
      title: "Final Delivery",
      percentage: 5,
      description: "Final touches, styling, and project handover",
      details: "The final payment is due after completion of all work, final styling, and your full satisfaction. We conduct a thorough walkthrough, address any final adjustments, and formally hand over your transformed space.",
      icon: "🎁"
    }
  ];

  const benefits = [
    {
      title: "Transparency",
      description: "Clear payment structure with no hidden costs",
      icon: "🔍"
    },
    {
      title: "Trust",
      description: "Build confidence through milestone-based payments",
      icon: "🤝"
    },
    {
      title: "Flexibility",
      description: "Adaptable to projects of all sizes and complexities",
      icon: "🔄"
    },
    {
      title: "Accountability",
      description: "Payment tied to tangible progress and deliverables",
      icon: "✅"
    }
  ];

  const ScrollReveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), delay);
          }
        },
        { 
          threshold: 0.1,
          rootMargin: '50px'
        }
      );

      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, [delay]);

    return (
      <div
        ref={ref}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: `all 0.6s ease ${delay}ms`
        }}
      >
        {children}
      </div>
    );
  };

  const ProgressBar = ({ percentage }: { percentage: number }) => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
      const timer = setTimeout(() => {
        setWidth(percentage);
      }, 300);
      return () => clearTimeout(timer);
    }, [percentage]);

    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-gradient-to-r from-orange-500 to-amber-500 h-2.5 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        ></div>
      </div>
    );
  };

  const Counter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
    const [count, setCount] = useState(0);
    const duration = 1500;
    const steps = 60;
    const step = value / (duration / (1000 / steps));

    useEffect(() => {
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 1000 / steps);

      return () => clearInterval(timer);
    }, [value, step]);

    return <span>{count}{suffix}</span>;
  };

  return (
    <div className="bg-white text-gray-900 font-sans" ref={containerRef}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-6xl mx-auto px-8 py-20 text-center">
          <ScrollReveal delay={200}>
            <div className="inline-block mb-6 bg-white/80 backdrop-blur-sm rounded-full px-6 py-2">
              <span className="text-orange-600 text-xs font-medium uppercase tracking-widest">
                Payment Structure
              </span>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={400}>
            <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-6 leading-tight">
              Transparent
              <span className="block mt-2 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Pricing Approach
              </span>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={600}>
            <div className="w-16 h-px bg-orange-400 mx-auto mb-8"></div>
          </ScrollReveal>
          
          <ScrollReveal delay={800}>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-light leading-relaxed mb-12">
              Our milestone-based payment structure ensures transparency, builds trust, and aligns with project progress. Pay as we transform your space.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={1000}>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto border border-orange-100 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm text-gray-600 font-medium">Project Progress</span>
                <span className="text-sm text-orange-600 font-medium">100%</span>
              </div>
              <ProgressBar percentage={100} />
              <div className="flex justify-between mt-2">
                <span className="text-xs text-gray-500">Start</span>
                <span className="text-xs text-gray-500">Completion</span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Scroll Indicator */}
        <ScrollReveal delay={1200}>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="w-6 h-10 border-2 border-orange-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-orange-400 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Payment Stages Section */}
      <section className="py-32 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20">
              <span className="text-orange-600 text-xs font-medium uppercase tracking-widest">Payment Milestones</span>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mt-4 mb-6">
                Structured for Success
              </h2>
              <div className="w-16 h-px bg-orange-400 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our payment structure is designed to provide clarity and build confidence throughout your project journey
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-8">
            {paymentStages.map((stage, index) => (
              <ScrollReveal key={stage.id} delay={index * 150}>
                <div 
                  className={`bg-gradient-to-r rounded-2xl border overflow-hidden transition-all duration-500 cursor-pointer ${
                    activeStage === stage.id 
                      ? 'from-orange-50 to-amber-50 border-orange-200 shadow-lg' 
                      : 'from-white to-gray-50 border-gray-100 hover:shadow-md'
                  }`}
                  onClick={() => setActiveStage(activeStage === stage.id ? null : stage.id)}
                >
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-2xl">
                          {stage.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <h3 className="text-2xl font-light text-gray-900">{stage.title}</h3>
                            <p className="text-gray-600 mt-1">{stage.description}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <div className="text-3xl font-light text-orange-600">
                                <Counter value={stage.percentage} suffix="%" />
                              </div>
                              <div className="text-xs text-gray-500 uppercase tracking-wide">of total</div>
                            </div>
                            <div className="text-orange-500">
                              <svg 
                                className={`w-6 h-6 transform transition-transform duration-300 ${activeStage === stage.id ? 'rotate-180' : ''}`}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24" 
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div 
                      className={`overflow-hidden transition-all duration-500 ${
                        activeStage === stage.id ? 'max-h-96 mt-6' : 'max-h-0'
                      }`}
                    >
                      <div className="pt-6 border-t border-orange-100">
                        <p className="text-gray-700 leading-relaxed">{stage.details}</p>
                        <div className="mt-4">
                          <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>Payment Stage Progress</span>
                            <span>{stage.percentage}%</span>
                          </div>
                          <ProgressBar percentage={stage.percentage} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20">
              <span className="text-orange-600 text-xs font-medium uppercase tracking-widest">Why This Approach</span>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mt-4 mb-6">
                Benefits of Our Payment Structure
              </h2>
              <div className="w-16 h-px bg-orange-400 mx-auto"></div>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 h-full">
                  <div className="text-4xl mb-6">{benefit.icon}</div>
                  <h3 className="text-xl font-light text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              Ready to Begin Your Design Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-10 font-light">
              Let's discuss your project and how our transparent pricing approach can bring your vision to life
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow duration-300">
                Schedule a Consultation
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-gray-900 transition-colors duration-300">
                Download Pricing Guide
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;