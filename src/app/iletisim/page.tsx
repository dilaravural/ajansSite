"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Clock,
  CheckCircle,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import FloatingParticles from "@/components/ui/FloatingParticles";
import { api } from "@/lib/api";

const contactInfo = [
  {
    icon: Phone,
    title: "Telefon",
    value: "+90 555 123 45 67",
    href: "tel:+905551234567",
  },
  {
    icon: Mail,
    title: "E-posta",
    value: "info@enkimedia.com",
    href: "mailto:info@enkimedia.com",
  },
  {
    icon: MapPin,
    title: "Adres",
    value: "İstanbul, Türkiye",
    href: "#",
  },
  {
    icon: Clock,
    title: "Çalışma Saatleri",
    value: "Pazartesi - Cuma: 09:00 - 18:00",
    href: "#",
  },
];

export default function IletisimPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await api.sendContact(formData);

      setIsSubmitted(true);

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="page-transition pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <FloatingParticles count={20} color="#800020" minSize={3} maxSize={8} />
        <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-2 bg-[#800020]/10 text-[#800020] rounded-full text-sm font-medium mb-6">
              İletişim
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
              Birlikte{" "}
              <span className="text-[#800020]">Harika İşler</span>{" "}
              Yapalım
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Projeniz hakkında konuşmak için bizimle iletişime geçin.
              Size en uygun çözümü birlikte bulalım.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-black mb-6">
                Bize Mesaj Gönderin
              </h2>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-800 mb-2">
                    Mesajınız Gönderildi!
                  </h3>
                  <p className="text-green-600">
                    En kısa sürede sizinle iletişime geçeceğiz.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="Adınız Soyadınız *"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Adınızı girin"
                      required
                    />
                    <Input
                      label="E-posta *"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ornek@email.com"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="Telefon"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+90 5XX XXX XX XX"
                    />
                    <Input
                      label="Şirket"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Şirket adınız"
                    />
                  </div>

                  <Textarea
                    label="Mesajınız *"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Projeniz hakkında bize bilgi verin..."
                    rows={6}
                    required
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Gönderiliyor...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 w-5 h-5" />
                        Mesaj Gönder
                      </>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-black mb-6">
                İletişim Bilgileri
              </h2>

              <div className="space-y-6 mb-10">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-[#800020]/5 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-[#800020]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#800020] transition-colors">
                      <info.icon className="w-6 h-6 text-[#800020] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">
                        {info.title}
                      </div>
                      <div className="font-medium text-black">{info.value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* WhatsApp Button */}
              <motion.a
                href="https://wa.me/905551234567"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-center gap-3 w-full py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors"
              >
                <MessageCircle className="w-6 h-6" />
                WhatsApp ile İletişime Geçin
              </motion.a>

              {/* Map Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-10"
              >
                <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-[#800020] mx-auto mb-2" />
                      <p className="text-gray-600">İstanbul, Türkiye</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-black text-center mb-12">
              Sıkça Sorulan Sorular
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: "Proje süreci nasıl işliyor?",
                  a: "İlk görüşmede ihtiyaçlarınızı analiz ediyor, ardından size özel bir teklif hazırlıyoruz. Onay sonrası projeyi başlatıyor ve tüm süreç boyunca sizi bilgilendiriyoruz.",
                },
                {
                  q: "Fiyatlandırma nasıl yapılıyor?",
                  a: "Her proje kendine özgü olduğu için, ihtiyaçlarınıza göre özel fiyat teklifi sunuyoruz. Ücretsiz danışmanlık için bizimle iletişime geçebilirsiniz.",
                },
                {
                  q: "Hangi sektörlere hizmet veriyorsunuz?",
                  a: "E-ticaret, otelcilik, restoran, teknoloji, sağlık ve daha birçok sektöre hizmet veriyoruz. Her sektöre özel çözümler üretiyoruz.",
                },
                {
                  q: "Projelerin teslimat süresi ne kadar?",
                  a: "Proje kapsamına göre değişmekle birlikte, genellikle 1-4 hafta arasında teslimat yapıyoruz. Acil projeler için özel çözümlerimiz mevcut.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-sm"
                >
                  <h3 className="text-lg font-bold text-black mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
