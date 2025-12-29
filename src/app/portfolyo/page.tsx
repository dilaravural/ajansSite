"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ExternalLink } from "lucide-react";
import Card3D from "@/components/ui/Card3D";
import SectionTitle from "@/components/ui/SectionTitle";
import CTA from "@/components/sections/CTA";
import FloatingParticles from "@/components/ui/FloatingParticles";
import { projects, categories } from "@/data/projects";
import { useBackgrounds } from "@/context/BackgroundContext";

export default function PortfolyoPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(
    null
  );
  const { getBackground } = useBackgrounds();
  const backgroundImage = getBackground("portfolyo");

  const filteredProjects =
    selectedCategory === "Tümü"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="page-transition pt-20">
      {/* Hero Section */}
      <section
        className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
        style={backgroundImage ? {
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        } : {}}
      >
        <FloatingParticles count={20} color="#800020" minSize={3} maxSize={8} />
        {backgroundImage && (
          <div className="absolute inset-0 bg-white/80" />
        )}
        <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-2 bg-[#800020]/10 text-[#800020] rounded-full text-sm font-medium mb-6">
              Portföy
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
              <span className="text-[#800020]">Başarılı</span>{" "}
              Projelerimiz
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Müşterilerimiz için gerçekleştirdiğimiz projelerden bazılarına göz atın.
              Her bir çalışma, kalite ve yaratıcılığımızın bir yansımasıdır.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-[#800020] text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  style={{ perspective: 1000 }}
                >
                  <Card3D
                    className="group cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                    intensity={10}
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#800020] to-[#5c0017] opacity-80" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <Play className="w-6 h-6 text-[#800020] ml-1" />
                        </motion.div>
                      </div>
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 text-[#800020] rounded-full text-sm font-medium">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-black mb-2 group-hover:text-[#800020] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {project.client}
                        </span>
                        <span className="text-sm text-[#800020] font-medium">
                          {project.date}
                        </span>
                      </div>
                    </div>
                  </Card3D>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">
                Bu kategoride henüz proje bulunmuyor.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black text-white rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Video */}
              <div className="aspect-video bg-black">
                {selectedProject.videoUrl ? (
                  <iframe
                    src={selectedProject.videoUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <Play className="w-16 h-16" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="inline-block px-3 py-1 bg-[#800020]/10 text-[#800020] rounded-full text-sm font-medium mb-2">
                      {selectedProject.category}
                    </span>
                    <h2 className="text-2xl font-bold text-black">
                      {selectedProject.title}
                    </h2>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Müşteri</div>
                    <div className="font-medium text-black">
                      {selectedProject.client}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">{selectedProject.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CTA />
    </div>
  );
}
