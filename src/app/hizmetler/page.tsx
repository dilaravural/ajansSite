"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Share2, Video, Megaphone, PenTool, Check, ArrowRight, Target, FileText } from "lucide-react";
import Link from "next/link";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import CTA from "@/components/sections/CTA";

import { api, Service } from "@/lib/api";

import { services } from "@/data/services";
import { useBackgrounds } from "@/context/BackgroundContext";


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

const process = [
  {
    step: "01",
    title: "Keşif & Analiz",
    description:
      "Markanızı, hedeflerinizi ve hedef kitlenizi derinlemesine analiz ediyoruz.",
  },
  {
    step: "02",
    title: "Strateji Geliştirme",
    description:
      "Analizler doğrultusunda size özel strateji ve içerik planı oluşturuyoruz.",
  },
  {
    step: "03",
    title: "Uygulama",
    description:
      "Onaylanan stratejiyi profesyonel ekibimizle hayata geçiriyoruz.",
  },
  {
    step: "04",
    title: "Ölçümleme & Optimizasyon",
    description:
      "Sonuçları analiz ediyor, sürekli iyileştirmeler yapıyoruz.",
  },
];

export default function HizmetlerPage() {

  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const data = await api.getServices(true); // Only active services
        setServices(data);
      } catch (err: any) {
        setError(err.message || "Hizmetler yüklenirken bir hata oluştu");
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);
      
  const { getBackground } = useBackgrounds();
  const backgroundImage = getBackground("hizmetler");


  return (
    <div className="page-transition pt-20">
      {/* Hero Section */}
      <section
        className="py-24 bg-gradient-to-b from-gray-50 to-white relative"
        style={backgroundImage ? {
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        } : {}}
      >
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
              Hizmetlerimiz
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
              Markanız İçin{" "}
              <span className="text-[#800020]">Profesyonel</span>{" "}
              Çözümler
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Video prodüksiyondan sosyal medya yönetimine, reklam kampanyalarından
              içerik üretimine kadar tüm dijital ihtiyaçlarınızı karşılıyoruz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-24 bg-white">

        <div className="container mx-auto px-4">
          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-[#800020] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Hizmetler yükleniyor...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="text-center py-16">
              <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-lg inline-block">
                {error}
              </div>
            </div>
          )}

          {/* Services Grid */}
          {!isLoading && !error && (
            <div className="space-y-24">
              {services.map((service, index) => {
              const Icon = iconMap[service.icon] || Share2;

        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="space-y-24">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon];
              
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={service.id}
                  id={service.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    !isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={!isEven ? "lg:order-2" : ""}>
                    <div className="w-16 h-16 bg-[#800020]/10 rounded-2xl flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-[#800020]" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                      {service.title}
                    </h2>
                    <p className="text-gray-600 text-lg mb-6">
                      {service.description}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <div className="w-5 h-5 bg-[#800020] rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/iletisim">
                      <Button variant="primary">
                        Teklif Al
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                  </div>

                  <div className={!isEven ? "lg:order-1" : ""}>
                    <div className="aspect-[4/3] bg-gradient-to-br from-[#800020] to-[#5c0017] rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full" />
                        <div className="absolute bottom-10 right-10 w-48 h-48 border-2 border-white rounded-full" />
                      </div>
                      <Icon className="w-24 h-24 text-white/80" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
            </div>
          )}
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <SectionTitle
            title="Çalışma Sürecimiz"
            subtitle="Projelerinizi başarıyla tamamlamak için izlediğimiz adımlar."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white p-8 rounded-2xl shadow-lg h-full">
                  <div className="text-5xl font-bold text-[#800020]/20 mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>

                {/* Connector */}
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-[#800020]/20" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 bg-[#800020]/10 text-[#800020] rounded-full text-sm font-medium mb-6">
                Neden Biz?
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                Dijital Başarınız İçin Doğru Partner
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Deneyimli Ekip",
                    description:
                      "Alanında uzman profesyonellerden oluşan ekibimizle projelerinizi hayata geçiriyoruz.",
                  },
                  {
                    title: "Sonuç Odaklı Yaklaşım",
                    description:
                      "Her projede ölçülebilir sonuçlar elde etmeyi hedefliyoruz.",
                  },
                  {
                    title: "Şeffaf İletişim",
                    description:
                      "Proje sürecinde sizi her adımda bilgilendiriyor, şeffaf bir iletişim sürdürüyoruz.",
                  },
                  {
                    title: "Rekabetçi Fiyatlar",
                    description:
                      "Kaliteli hizmeti uygun fiyatlarla sunuyoruz.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-6 h-6 bg-[#800020] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-black mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-[#800020] to-[#5c0017] rounded-2xl flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="text-6xl font-bold mb-4">%100</div>
                  <div className="text-2xl">Müşteri Memnuniyeti</div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 border-4 border-[#800020]/20 rounded-xl" />
            </motion.div>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
}
