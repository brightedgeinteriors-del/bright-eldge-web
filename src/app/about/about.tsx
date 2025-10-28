"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AboutUs = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(null);

  const stats = [
    { value: "8+", label: "Years Experience" },
    { value: "160+", label: "Projects Completed" },
    { value: "100%", label: "Client Satisfaction" },
    { value: "10+", label: "Expertise" }
  ];

  const values = [
    {
      title: "Innovation",
      description: "We embrace cutting-edge design trends while maintaining timeless elegance. Our team constantly explores new materials, technologies, and methodologies to deliver spaces that are both contemporary and enduring.",
      icon: "✦"
    },
    {
      title: "Integrity",
      description: "Transparency and honesty guide every decision we make. From initial consultation to final walkthrough, we maintain open communication and deliver on our promises with unwavering commitment.",
      icon: "◆"
    },
    {
      title: "Excellence",
      description: "We set the highest standards for craftsmanship and attention to detail. Every element is carefully considered, every finish meticulously executed to ensure exceptional quality.",
      icon: "◈"
    },
    {
      title: "Collaboration",
      description: "Your vision is at the heart of our design process. We work closely with clients, architects, and artisans to create spaces that truly reflect your personality and lifestyle needs.",
      icon: "❖"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Discovery & Consultation",
      description: "We begin with an in-depth consultation to understand your vision, lifestyle, and functional requirements. This phase includes site analysis, budget discussion, and initial concept development."
    },
    {
      step: "02",
      title: "Concept Development",
      description: "Our designers create mood boards, 3D visualizations, and material palettes. We present multiple design directions and refine the concept based on your feedback until it perfectly aligns with your vision."
    },
    {
      step: "03",
      title: "Design Documentation",
      description: "Detailed drawings, specifications, and schedules are prepared. We coordinate with contractors, select materials, and finalize every element to ensure seamless execution."
    },
    {
      step: "04",
      title: "Implementation",
      description: "Our project management team oversees every aspect of the build. We maintain quality control, manage timelines, and ensure the design vision is executed to perfection."
    },
    {
      step: "05",
      title: "Final Reveal",
      description: "After meticulous styling and finishing touches, we present your transformed space. Our support continues beyond completion to ensure your complete satisfaction."
    }
  ];

  // Design Philosophy Questions
  const designQuestions = [
    {
      question: "How do you balance functionality with aesthetics in your design approach?",
      answer: "We believe that beautiful spaces must also be highly functional. Our approach integrates practical considerations with aesthetic elements from the outset, ensuring that every design decision enhances both the visual appeal and usability of the space."
    },
    {
      question: "What role does sustainability play in your design process?",
      answer: "Sustainability is fundamental to our practice. We prioritize eco-friendly materials, energy-efficient solutions, and timeless designs that reduce the need for frequent renovations, creating spaces that are both beautiful and environmentally responsible."
    },
    {
      question: "How do you ensure each project reflects the client's unique personality?",
      answer: "Through deep discovery sessions and collaborative workshops, we uncover our clients' values, preferences, and lifestyle needs. This intimate understanding allows us to create bespoke spaces that authentically reflect their individuality."
    },
    {
      question: "What is your approach to integrating technology into interior spaces?",
      answer: "We seamlessly blend technology with design, focusing on solutions that enhance comfort and convenience without compromising aesthetics. From smart home systems to innovative lighting solutions, technology is thoughtfully integrated to elevate the living experience."
    },
    {
      question: "How do you approach working within budget constraints while maintaining design quality?",
      answer: "We view budget parameters as creative challenges rather than limitations. Our expertise in value engineering and strategic resource allocation allows us to deliver exceptional quality while respecting financial boundaries."
    },
    {
      question: "What trends do you see shaping the future of interior design?",
      answer: "We're observing a shift toward biophilic design, multifunctional spaces, and wellness-focused environments. The future of design will increasingly emphasize sustainability, adaptability, and spaces that promote mental and physical wellbeing."
    },
    {
      question: "How do you ensure your designs stand the test of time?",
      answer: "By focusing on timeless principles of proportion, scale, and materiality rather than fleeting trends. We create enduring spaces with quality craftsmanship and thoughtful details that remain relevant and beautiful for years to come."
    }
  ];

  const toggleQuestion = (index: number) => {
    setOpenQuestionIndex(openQuestionIndex === index ? null : index);
  };

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

  const Counter = ({ value, suffix = "" }: { value: string; suffix?: string }) => {
    const [count, setCount] = useState(0);
    const target = parseInt(value);
    const duration = 2000;
    const steps = 60;
    const step = target / (duration / (1000 / steps));

    useEffect(() => {
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 1000 / steps);

      return () => clearInterval(timer);
    }, [target, step]);

    return <span>{count}{suffix}</span>;
  };

  return (
    <div className="bg-white text-gray-900 font-sans" ref={containerRef}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="relative max-w-6xl mx-auto px-8 py-20 text-center">
          <ScrollReveal delay={200}>
            <div className="inline-block mb-6 bg-white/80 backdrop-blur-sm rounded-full px-6 py-2">
              <span className="text-orange-600 text-xs font-medium uppercase tracking-widest">
                Established 2018
              </span>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={400}>
            <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-6 leading-tight">
              Bright Edge
              <span className="block mt-2 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Interiors
              </span>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={600}>
            <div className="w-16 h-px bg-orange-400 mx-auto mb-8"></div>
          </ScrollReveal>
          
          <ScrollReveal delay={800}>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-light leading-relaxed mb-12">
              Designing distinctive, refined spaces that inspire and endure. We create sophisticated spaces that enhance the way you live, work, and inspire.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={1000}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-light text-orange-600 mb-2">
                    {stat.value.includes('+') || stat.value.includes('%') ? (
                      <Counter value={stat.value.replace('+', '').replace('%', '')} suffix={stat.value.includes('%') ? '%' : '+'} />
                    ) : (
                      stat.value
                    )}
                  </div>
                  <div className="text-sm text-gray-600 uppercase tracking-wide font-medium">{stat.label}</div>
                </div>
              ))}
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

      {/* Our Story Section */}
      <section className="py-32 px-8 bg-white relative">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20">
              <span className="text-orange-600 text-xs font-medium uppercase tracking-widest">Our Story</span>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mt-4 mb-6">
                A Legacy of Design Excellence
              </h2>
              <div className="w-16 h-px bg-orange-400 mx-auto"></div>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <ScrollReveal delay={100}>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  Founded in 2018, Bright Edge Interiors emerged from a simple belief: that exceptional design has the power to transform not just spaces, but lives. What began as a boutique studio has evolved into a comprehensive design firm recognized for its meticulous attention to detail and innovative approach.
                </p>
                <p className="text-lg">
                  Over the past Eight years, we&apos;ve had the privilege of working on diverse projects spanning residential, commercial, and hospitality sectors. Each project has deepened our understanding of how thoughtful design can enhance functionality, evoke emotion, and create lasting value.
                </p>
                <p className="text-lg">
                   Our studio integrates the collective expertise of architects, interior designers, and project managers, all united by an unwavering passion for excellence. We champion a collaborative methodology where client vision and design expertise converge harmoniously, transforming aspirations into extraordinary spaces that inspire and endure.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="relative">
                <div className="aspect-[4/5] bg-gradient-to-br from-orange-100 to-amber-50 rounded-2xl flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full p-6 flex items-center justify-center">
                    <Image src="/logo.png" alt="Bright Edge Interiors" width={800} height={1000} className="w-full h-full object-contain" priority />
                  </div>
                </div>
                <div className="absolute top-8 right-8 w-full h-full border-2 border-orange-200 rounded-2xl -z-10"></div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-32 px-8 bg-gradient-to-b from-gray-50 to-white relative">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20">
              <span className="text-orange-600 text-xs font-medium uppercase tracking-widest">Our Values</span>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mt-4 mb-6">
                What Drives Us
              </h2>
              <div className="w-16 h-px bg-orange-400 mx-auto"></div>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="text-3xl text-orange-600 mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-light text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-32 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20">
              <span className="text-orange-600 text-xs font-medium uppercase tracking-widest">Our Process</span>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mt-4 mb-6">
                From Vision to Reality
              </h2>
              <div className="w-16 h-px bg-orange-400 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                A structured approach that ensures clarity, quality, and exceptional results at every stage
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-8">
            {process.map((item, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div className="bg-gradient-to-r from-gray-50 to-white p-8 md:p-10 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center">
                        <span className="text-orange-600 font-light text-2xl">{item.step}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-light text-gray-900 mb-4">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Design Philosophy Questions Section */}
      <section className="py-32 px-8 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20">
              <span className="text-orange-600 text-xs font-medium uppercase tracking-widest">Design Philosophy</span>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mt-4 mb-6">
                Questions That Define Our Approach
              </h2>
              <div className="w-16 h-px bg-orange-400 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our design philosophy is shaped by these fundamental questions that guide every project we undertake
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {designQuestions.map((item, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300">
                  <button
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-orange-50 transition-colors duration-300"
                    onClick={() => toggleQuestion(index)}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-4">
                        <span className="text-orange-600 font-light text-xl">Q</span>
                      </div>
                      <h3 className="text-xl font-light text-gray-900">{item.question}</h3>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <svg
                        className={`w-6 h-6 text-orange-600 transform transition-transform duration-300 ${
                          openQuestionIndex === index ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </button>
                  
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openQuestionIndex === index ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <div className="p-6 pt-0 border-t border-gray-100">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                          <span className="text-gray-600 font-light text-xl">A</span>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-32 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-12 md:p-16 rounded-3xl text-center">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                Our Commitment to Sustainability
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
                We recognize our responsibility to the environment and future generations. Our commitment to sustainable design practices includes sourcing eco-friendly materials, minimizing waste, partnering with ethical suppliers, and creating energy-efficient spaces that stand the test of time.
              </p>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div>
                  <div className="text-3xl text-orange-600 mb-3">🌍</div>
                  <h4 className="font-medium text-gray-900 mb-2">Eco-Friendly Materials</h4>
                  <p className="text-sm text-gray-600">Sustainable and responsibly sourced</p>
                </div>
                <div>
                  <div className="text-3xl text-orange-600 mb-3">♻️</div>
                  <h4 className="font-medium text-gray-900 mb-2">Waste Reduction</h4>
                  <p className="text-sm text-gray-600">Minimizing environmental impact</p>
                </div>
                <div>
                  <div className="text-3xl text-orange-600 mb-3">⚡</div>
                  <h4 className="font-medium text-gray-900 mb-2">Energy Efficiency</h4>
                  <p className="text-sm text-gray-600">Smart and sustainable solutions</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              Let&apos;s Create Something Exceptional
            </h2>
            <p className="text-xl text-gray-300 mb-10 font-light">
              We&apos;d love to hear about your project and explore how we can bring your vision to life
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow duration-300 inline-flex items-center justify-center"
                aria-label="Schedule a Consultation"
              >
                Schedule a Consultation
              </Link>
              <Link
                href="/portfolio"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-gray-900 transition-colors duration-300 inline-flex items-center justify-center"
                aria-label="View Our Portfolio"
              >
                View Our Portfolio
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;