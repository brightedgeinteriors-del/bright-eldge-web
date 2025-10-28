"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from 'next/link';

// Define the ProjectType interface
interface ProjectType {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  location: string;
}

const Portfolio = () => {
  const [filter, setFilter] = useState<string>("all");
  const [filteredProjects, setFilteredProjects] = useState<ProjectType[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = useMemo<ProjectType[]>(() => [
    {
      id: 1,
      title: "Elegant Living Room",
      category: "living",
      description: "A sophisticated living space with modern amenities and timeless design elements.",
      image: "/living area 2.jpg",
      tags: ["Modern", "Elegant", "Spacious"],
      location: "Premium Residence"
    },
    {
      id: 2,
      title: "Master Bedroom Suite",
      category: "bedroom",
      description: "Luxurious master bedroom with custom wardrobe and elegant ceiling design.",
      image: "/master bedroom 2.jpeg",
      tags: ["Luxury", "Master Suite", "Custom Design"],
      location: "Private Villa"
    },
    {id: 3,
      title: "Master Bedroom Suite",
      category: "bedroom",
      description: "Luxurious master bedroom with custom wardrobe and elegant ceiling design.",
      image: "/master bedroom 3.jpg",
      tags: ["Luxury", "Master Suite", "Custom Design"],
      location: "Private Villa"
    },
    {id: 4,
      title: "Master Bedroom Suite",
      category: "bedroom",
      description: "Luxurious master bedroom with custom wardrobe and elegant ceiling design.",
      image: "/m bedroom 1.jpg",
      tags: ["Luxury", "Master Suite", "Custom Design"],
      location: "Private Villa"
    },
    {
      id: 5,
      title: "Contemporary Apartment",
      category: "apartment",
      description: "Modern apartment featuring a swimming pool and premium amenities.",
      image: "/appartment 1.jpg",
      tags: ["Contemporary", "Pool View", "Premium"],
      location: "Urban Complex"
    },
    {
      id: 6,
      title: "Designer Bathroom",
      category: "bathroom",
      description: "Luxurious bathroom with premium fixtures and elegant finishes.",
      image: "/bathroom 1.jpg",
      tags: ["Luxury", "Modern", "Premium Fixtures"],
      location: "Luxury Residence",
    },
    {
      id: 7,
      title: "Designer Bathroom",
      category: "bathroom",
      description: "Luxurious bathroom with premium fixtures and elegant finishes.",
      image: "/bathroom 2.jpg",
      tags: ["Luxury", "Modern", "Premium Fixtures"],
      location: "Luxury Residence",
    }, 
    {
      id: 8,
      title: "Designer Bathroom",
      category: "bathroom",
      description: "Luxurious bathroom with premium fixtures and elegant finishes.",
      image: "/bathroom 3.jpg",
      tags: ["Luxury", "Modern", "Premium Fixtures"],
      location: "Luxury Residence",
    },
    {
      id: 9,
      title: "Bedroom Retreat",
      category: "bedroom",
      description: "Serene bedroom design with attention to comfort and style.",
      image: "/bedroom 2.jpg",
      tags: ["Comfortable", "Stylish", "Peaceful"],
      location: "Private Residence",    
    },
    {
      id: 10,
      title: "Bedroom Retreat",
      category: "bedroom",
      description: "Serene bedroom design with attention to comfort and style.",
      image: "/bedroom 1.jpg",
      tags: ["Comfortable", "Stylish", "Peaceful"],
      location: "Private Residence",    
    },
    {
      id: 11,
      title: "Modern Interior",
      category: "living",
      description: "Contemporary interior design showcasing modern aesthetics and functionality.",
      image: "/living area 3.jpg",
      tags: ["Modern", "Contemporary", "Functional"],
      location: "Urban Home",    
    },
    {
      id: 12,
      title: "Apartment Living",
      category: "apartment",
      description: "Stylish apartment interior with premium sitting area and modern amenities.",
      image: "/appartment 3.jpg",
      tags: ["Modern", "Comfortable", "Premium"],
      location: "Luxury Apartment",
    },
    {
      id: 13,
      title: "Entertainment Space",
      category: "living",
      description: "Home theatre and entertainment area with premium acoustics and comfort.",
      image: "/entertanment 1.jpg",
      tags: ["Entertainment", "Theatre", "Luxury"],
      location: "Private Villa",
    },
    {
      id: 14,
      title: "Entertainment Space",
      category: "living",
      description: "Home theatre and entertainment area with premium acoustics and comfort.",
      image: "/entertainment 2.jpg",
      tags: ["Entertainment", "Theatre", "Luxury"],
      location: "Private Villa"
    }
  ], []);

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "bedroom", name: "Bedrooms" },
    { id: "living", name: "Living Areas" },
    { id: "apartment", name: "Apartments" },
    { id: "bathroom", name: "Bathrooms" }
  ];

  useEffect(() => {
    if (filter === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === filter));
    }
  }, [filter, projects]);

  const openProjectModal = (project: ProjectType) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

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
      y: 20, 
      opacity: 0,
      transition: { duration: 0.5 }
    },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="bg-white text-gray-900 font-sans">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-96 h-96 bg-orange-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-8 py-20 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-orange-600 text-sm font-medium uppercase tracking-widest">
              Our Work
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-light text-gray-900 mt-6 mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Portfolio of Excellence
          </motion.h1>
          
          <motion.div 
            className="w-16 h-px bg-orange-400 mx-auto mb-10"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Explore our collection of transformative interior design projects
          </motion.p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 px-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  filter === category.id
                    ? "bg-orange-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setFilter(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No projects found in this category.</p>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  className="group relative overflow-hidden rounded-2xl shadow-md cursor-pointer"
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  onClick={() => openProjectModal(project)}
                >
                  {/* Project Image */}
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  
                  {/* Project Info */}
                  <div className="p-6 bg-white">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-2xl font-light text-gray-900">{project.title}</h3>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{project.location}</span>
                      <motion.div
                        className="text-orange-600 font-medium flex items-center gap-1"
                        whileHover={{ gap: "0.5rem" }}
                      >
                        <span>View Project</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Hover Overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <div className="text-white">
                      <h3 className="text-2xl font-light mb-2">{project.title}</h3>
                      <p className="mb-4 line-clamp-2">{project.description}</p>
                      <button className="text-orange-400 font-medium flex items-center gap-1">
                        <span>Explore Details</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-light mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Inspired by Our Work?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-700 mb-10 font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Let&apos;s collaborate to bring your vision to life
          </motion.p>
          <Link
            href="/contact"
            className="px-8 py-4 bg-orange-600 text-white rounded-lg font-medium inline-flex items-center justify-center hover:shadow-lg transition-shadow duration-300"
            aria-label="Start your project - contact us"
          >
            Start Your Project
          </Link>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProjectModal}
          >
            <motion.div 
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {/* Modal Header */}
                <div className="sticky top-0 bg-white z-10 p-6 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-2xl font-light text-gray-900">{selectedProject.title}</h2>
                  <button 
                    onClick={closeProjectModal}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Close modal"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {/* Modal Content */}
                <div className="p-6">
                  <div className="aspect-video relative rounded-xl mb-6 overflow-hidden">
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1200px) 100vw, 1200px"
                      priority
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Category</h3>
                      <p className="text-lg">{selectedProject.category.charAt(0).toUpperCase() + selectedProject.category.slice(1)}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Location</h3>
                      <p className="text-lg">{selectedProject.location}</p>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Project Description</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedProject.description}</p>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Design Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag, index) => (
                        <span key={index} className="text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <motion.button 
                      className="px-8 py-3 bg-orange-600 text-white rounded-lg font-medium"
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: "#ea580c",
                        transition: { duration: 0.3 }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Request Similar Design
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;