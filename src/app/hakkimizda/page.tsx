"use client";

import { motion } from "framer-motion";
import { Target, Eye, Heart, Users, Award, Zap, Rocket, Smile, Clock, UserCheck } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import CTA from "@/components/sections/CTA";
import { useBackgrounds } from "@/context/BackgroundContext";
import { useTimeline } from "@/context/TimelineContext";
import CountUp from "@/components/ui/CountUp";

const values = [
  {
    icon: Target,
    title: "Stratejik Yaklaşım",
    description:
      "Her projeye stratejik bir bakış açısıyla yaklaşıyor, markanızın hedeflerine uygun çözümler üretiyoruz.",
  },
  {
    icon: Heart,
    title: "Tutkulu Ekip",
    description:
      "İşimize tutkuyla bağlı, yaratıcı ve deneyimli bir ekiple çalışıyoruz.",
  },
  {
    icon: Zap,
    title: "Yenilikçi Çözümler",
    description:
      "Sektördeki son trendleri takip ediyor, yenilikçi ve modern çözümler sunuyoruz.",
  },
  {
    icon: Users,
    title: "Müşteri Odaklı",
    description:
      "Müşterilerimizin ihtiyaçlarını anlıyor, onlara özel çözümler geliştiriyoruz.",
  },
];

const stats = [
  { value: 150, suffix: "+", label: "Tamamlanan Proje", icon: Rocket },
  { value: 50, suffix: "+", label: "Mutlu Müşteri", icon: Smile },
  { value: 5, suffix: "+", label: "Yıl Deneyim", icon: Clock },
  { value: 10, suffix: "+", label: "Uzman Ekip", icon: UserCheck },
];

export default function HakkimizdaPage() {
  const { getBackground } = useBackgrounds();
  const backgroundImage = getBackground("hakkimizda");
  const { timeline } = useTimeline();

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
              Hakkımızda
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
              Dijital Dünyada{" "}
              <span className="text-[#800020]">Güçlü Markalar</span>{" "}
              Yaratıyoruz
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Enki Media olarak, markaların dijital dünyada etkileyici bir şekilde
              var olmasını sağlıyoruz. Yaratıcı çözümlerimiz ve profesyonel
              yaklaşımımızla fark yaratıyoruz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-[#800020]">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
                </div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                Hikayemiz
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Enki Media, 2019 yılında dijital medya alanında kaliteli ve
                  yaratıcı hizmetler sunmak amacıyla kuruldu. Küçük bir ekiple
                  başladığımız bu yolculukta, bugün onlarca başarılı projeye imza
                  attık.
                </p>
                <p>
                  Video prodüksiyon alanındaki uzmanlığımız, sosyal medya yönetimi
                  ve dijital pazarlama hizmetlerimizle birleşerek markalara
                  bütüncül çözümler sunmamızı sağlıyor.
                </p>
                <p>
                  Müşterilerimizin vizyonunu anlayarak, onların hikayelerini en
                  etkili şekilde aktarmayı hedefliyoruz. Her projede kalite,
                  tutarlılık ve yenilikçilik ilkelerini ön planda tutuyoruz.
                </p>
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
                  <Award className="w-16 h-16 mx-auto mb-4" />
                  <div className="text-2xl font-bold mb-2">Kalite ve Güven</div>
                  <p className="text-white/80">
                    Müşteri memnuniyeti bizim için her şeyden önce gelir.
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 border-4 border-[#800020]/20 rounded-xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <div className="w-14 h-14 bg-[#800020]/10 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-[#800020]" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Vizyonumuz</h3>
              <p className="text-gray-600">
                Dijital medya sektöründe öncü ve yenilikçi bir ajans olarak,
                markaların dijital dönüşümüne liderlik etmek ve global ölçekte
                tanınan bir marka olmak.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <div className="w-14 h-14 bg-[#800020]/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-[#800020]" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Misyonumuz</h3>
              <p className="text-gray-600">
                Müşterilerimize yaratıcı, etkili ve sonuç odaklı dijital çözümler
                sunarak, onların dijital dünyada başarılı olmalarına katkıda
                bulunmak.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <SectionTitle
            title="Değerlerimiz"
            subtitle="İşimizi yaparken bizi yönlendiren temel değerler."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#800020]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-[#800020]" />
                </div>
                <h3 className="text-xl font-bold text-black mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <SectionTitle
            title="Yolculuğumuz"
            subtitle="Kuruluşumuzdan bugüne önemli kilometre taşları."
          />

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#800020]/20 hidden md:block" />

              {timeline.map((item, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative mb-8"
                  >
                    {/* Desktop view */}
                    <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] items-center gap-4">
                      {/* Left side */}
                      <div className={`${isLeft ? "text-right pr-8" : ""}`}>
                        {isLeft && (
                          <div className="bg-white p-6 rounded-xl shadow-lg inline-block text-left">
                            <div className="text-[#800020] font-bold text-lg mb-1">
                              {item.year}
                            </div>
                            <div className="text-xl font-bold text-black mb-2">
                              {item.title}
                            </div>
                            <p className="text-gray-600">{item.description}</p>
                          </div>
                        )}
                      </div>

                      {/* Center dot */}
                      <div className="w-4 h-4 bg-[#800020] rounded-full z-10 shrink-0" />

                      {/* Right side */}
                      <div className={`${!isLeft ? "text-left pl-8" : ""}`}>
                        {!isLeft && (
                          <div className="bg-white p-6 rounded-xl shadow-lg inline-block text-left">
                            <div className="text-[#800020] font-bold text-lg mb-1">
                              {item.year}
                            </div>
                            <div className="text-xl font-bold text-black mb-2">
                              {item.title}
                            </div>
                            <p className="text-gray-600">{item.description}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Mobile view */}
                    <div className="md:hidden bg-white p-6 rounded-xl shadow-lg">
                      <div className="text-[#800020] font-bold text-lg mb-1">
                        {item.year}
                      </div>
                      <div className="text-xl font-bold text-black mb-2">
                        {item.title}
                      </div>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
}
