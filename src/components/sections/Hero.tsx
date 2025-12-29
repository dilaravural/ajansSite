"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import CountUp from "@/components/ui/CountUp";
import TextReveal from "@/components/ui/TextReveal";
import FloatingParticles from "@/components/ui/FloatingParticles";
import { Play, ArrowRight } from "lucide-react";
import { api } from "@/lib/api";

export default function Hero() {
  const [stats, setStats] = useState([
    { value: 0, suffix: "+", label: "Proje" },
    { value: 0, suffix: "+", label: "Mutlu Müşteri" },
    { value: 0, suffix: "+", label: "Yıl Deneyim" },
  ]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settings = await api.getSettings();

        // Settings is grouped by category, access stats group
        const statsGroup = settings.stats || {};

        setStats([
          {
            value: statsGroup.site_stats_projects ? parseInt(statsGroup.site_stats_projects.value) : 150,
            suffix: "+",
            label: "Proje"
          },
          {
            value: statsGroup.site_stats_clients ? parseInt(statsGroup.site_stats_clients.value) : 50,
            suffix: "+",
            label: "Mutlu Müşteri"
          },
          {
            value: statsGroup.site_stats_years ? parseInt(statsGroup.site_stats_years.value) : 5,
            suffix: "+",
            label: "Yıl Deneyim"
          },
        ]);
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };
    fetchSettings();
  }, []);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Floating Particles */}
      <FloatingParticles count={25} color="#800020" minSize={3} maxSize={10} />


      <div className="container mx-auto px-6 md:px-8 lg:px-12 pt-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 bg-[#800020]/10 text-[#800020] rounded-full text-sm font-medium">
                Dijital Medya Ajansı
              </span>
            </motion.div>

            <div className="mb-6">
              <TextReveal
                tag="h1"
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight"
                delay={0.3}
                type="words"
                staggerChildren={0.08}
                highlightWords={["Dijital", "Dünyada"]}
              >
                Markanızı Dijital Dünyada Öne Çıkarıyoruz
              </TextReveal>
            </div>

            <div className="mb-8 max-w-xl mx-auto lg:mx-0">
              <TextReveal
                tag="p"
                className="text-lg text-gray-600"
                delay={0.6}
                type="words"
                staggerChildren={0.03}
              >
                Video prodüksiyon, sosyal medya yönetimi ve dijital pazarlama alanlarında profesyonel çözümler sunuyoruz. Yaratıcı hikayelerinizi güçlü görsellerle hayata geçiriyoruz.
              </TextReveal>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/iletisim">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Teklif Al
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/portfolyo">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Play className="mr-2 w-5 h-5" />
                  Çalışmalarımız
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-gray-200"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-3xl md:text-4xl font-bold text-[#800020]">
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      suffix={stat.suffix}
                    />
                  </div>
                  <div className="text-gray-600 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main Visual Container */}
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Decorative circles */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-dashed border-[#800020]/20 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-8 border-2 border-dashed border-[#800020]/30 rounded-full"
                />

                {/* Center content */}
                <div className="absolute inset-16 bg-gradient-to-br from-[#800020] to-[#5c0017] rounded-3xl shadow-2xl flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-20 h-20 bg-white rounded-full flex items-center justify-center cursor-pointer shadow-lg"
                  >
                    <Play className="w-8 h-8 text-[#800020] ml-1" />
                  </motion.div>
                </div>

                {/* Floating cards */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-lg"
                >
                  <div className="text-[#800020] font-bold text-lg">4K Video</div>
                  <div className="text-gray-500 text-sm">Prodüksiyon</div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg"
                >
                  <div className="text-[#800020] font-bold text-lg">Sosyal Medya</div>
                  <div className="text-gray-500 text-sm">Yönetimi</div>
                </motion.div>

                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-1/2 -right-8 bg-black text-white p-4 rounded-xl shadow-lg"
                >
                  <div className="font-bold text-lg">Drone</div>
                  <div className="text-gray-400 text-sm">Çekimleri</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
