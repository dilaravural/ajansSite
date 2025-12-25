"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Play, ArrowRight } from "lucide-react";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { projects } from "@/data/projects";

export default function Portfolio() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <SectionTitle
          title="Öne Çıkan Çalışmalar"
          subtitle="Müşterilerimiz için gerçekleştirdiğimiz başarılı projelere göz atın."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <Card className="group overflow-hidden">
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#800020] to-[#5c0017] opacity-80" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 bg-white rounded-full flex items-center justify-center cursor-pointer shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
                    <span className="text-sm text-gray-500">{project.client}</span>
                    <span className="text-sm text-[#800020] font-medium">
                      {project.date}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/portfolyo">
            <Button variant="primary">
              Tüm Projeleri Gör
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
