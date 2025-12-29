"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Share2, Video, Megaphone, PenTool, ArrowRight, Target, FileText } from "lucide-react";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { api, Service } from "@/lib/api";

const iconMap: { [key: string]: any } = {
  Share2: Share2,
  Video: Video,
  Target: Target,
  FileText: FileText,
  share2: Share2,
  video: Video,
  megaphone: Megaphone,
  penTool: PenTool,
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await api.getServices(true); // Only active services
        setServices(data.slice(0, 4)); // Show only first 4
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (isLoading) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-16">
            <div className="w-12 h-12 border-4 border-[#800020] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <SectionTitle
          title="Hizmetlerimiz"
          subtitle="Markanızın dijital dünyada başarılı olması için ihtiyaç duyduğu tüm hizmetleri sunuyoruz."
          highlightWords={["Hizmetlerimiz"]}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Share2;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{ perspective: 1000 }}
              >
                <Card3D className="p-6 h-full group" intensity={12}>
                  <div className="w-14 h-14 bg-[#800020]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#800020] transition-colors duration-300">
                    <Icon className="w-7 h-7 text-[#800020] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Link
                    href="/hizmetler"
                    className="inline-flex items-center text-[#800020] font-medium hover:gap-2 transition-all duration-300"
                  >
                    Detaylar
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </Card3D>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/hizmetler">
            <Button variant="primary">
              Tüm Hizmetleri Gör
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
