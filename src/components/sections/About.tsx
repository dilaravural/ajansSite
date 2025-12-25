"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

const features = [
  "Profesyonel ekip ve ekipman",
  "Yaratıcı ve özgün yaklaşım",
  "Zamanında teslimat",
  "7/24 destek",
];

export default function About() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Main image placeholder */}
              <div className="aspect-[4/3] bg-gradient-to-br from-[#800020] to-[#5c0017] rounded-2xl shadow-2xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl font-bold mb-2">5+</div>
                    <div className="text-xl">Yıllık Deneyim</div>
                  </div>
                </div>
              </div>

              {/* Floating card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl"
              >
                <div className="text-4xl font-bold text-[#800020]">150+</div>
                <div className="text-gray-600">Tamamlanan Proje</div>
              </motion.div>

              {/* Decorative element */}
              <div className="absolute -top-4 -left-4 w-20 h-20 border-4 border-[#800020]/20 rounded-2xl" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 bg-[#800020]/10 text-[#800020] rounded-full text-sm font-medium mb-6">
              Biz Kimiz?
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6">
              Hikayenizi{" "}
              <span className="text-[#800020]">Görsellerle</span>{" "}
              Anlatıyoruz
            </h2>

            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Enki Media olarak, markaların dijital dünyada güçlü bir şekilde var
              olmasını sağlıyoruz. Video prodüksiyon, sosyal medya yönetimi ve
              dijital pazarlama alanlarında uzman ekibimizle, her projeye yaratıcı
              ve stratejik bir bakış açısı sunuyoruz.
            </p>

            <p className="text-gray-600 mb-8">
              Müşterilerimizin vizyonunu anlayarak, onların hikayelerini en etkili
              şekilde aktarmayı hedefliyoruz. Her projede kalite, tutarlılık ve
              yenilikçilik ilkelerini ön planda tutuyoruz.
            </p>

            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-[#800020]" />
                  <span className="text-gray-700">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <Link href="/hakkimizda">
              <Button variant="primary">
                Daha Fazla Bilgi
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
