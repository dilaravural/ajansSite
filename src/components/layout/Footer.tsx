"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Instagram,
  Youtube,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const footerLinks = {
  company: [
    { label: "Hakkımızda", href: "/hakkimizda" },
    { label: "Hizmetler", href: "/hizmetler" },
    { label: "Portföy", href: "/portfolyo" },
    { label: "İletişim", href: "/iletisim" },
  ],
  services: [
    { label: "Sosyal Medya Yönetimi", href: "/hizmetler#sosyal-medya" },
    { label: "Video Prodüksiyon", href: "/hizmetler#video" },
    { label: "Reklam Yönetimi", href: "/hizmetler#reklam" },
    { label: "İçerik Üretimi", href: "/hizmetler#icerik" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com/enkimedia", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com/@enkimedia", label: "YouTube" },
  { icon: Linkedin, href: "https://linkedin.com/company/enkimedia", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#800020] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="text-2xl font-bold">
                Enki <span className="text-[#800020]">Media</span>
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Markanızı dijital dünyada öne çıkaran yaratıcı çözümler sunuyoruz.
              Video prodüksiyondan sosyal medya yönetimine kadar tüm ihtiyaçlarınız için yanınızdayız.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#800020] transition-colors duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-6">Hızlı Linkler</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#800020] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-6">Hizmetlerimiz</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#800020] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-6">İletişim</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#800020] mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  İstanbul, Türkiye
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#800020] flex-shrink-0" />
                <a
                  href="tel:+905551234567"
                  className="text-gray-400 hover:text-[#800020] transition-colors"
                >
                  +90 555 123 45 67
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#800020] flex-shrink-0" />
                <a
                  href="mailto:info@enkimedia.com"
                  className="text-gray-400 hover:text-[#800020] transition-colors"
                >
                  info@enkimedia.com
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Enki Media. Tüm hakları saklıdır.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="/gizlilik" className="hover:text-[#800020] transition-colors">
              Gizlilik Politikası
            </Link>
            <Link href="/kullanim-sartlari" className="hover:text-[#800020] transition-colors">
              Kullanım Şartları
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
