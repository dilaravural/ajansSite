"use client";

import { motion } from "framer-motion";
import { FolderOpen, Eye, MessageSquare, TrendingUp } from "lucide-react";
import Link from "next/link";

const stats = [
  {
    icon: FolderOpen,
    label: "Toplam Proje",
    value: "6",
    change: "+2 bu ay",
    color: "bg-blue-500",
  },
  {
    icon: Eye,
    label: "Sayfa Görüntüleme",
    value: "1,234",
    change: "+15% bu hafta",
    color: "bg-green-500",
  },
  {
    icon: MessageSquare,
    label: "Mesajlar",
    value: "12",
    change: "3 yeni",
    color: "bg-yellow-500",
  },
  {
    icon: TrendingUp,
    label: "Dönüşüm Oranı",
    value: "%4.5",
    change: "+0.5%",
    color: "bg-purple-500",
  },
];

const recentProjects = [
  { title: "Luxury Hotel Tanıtım Filmi", category: "Tanıtım Filmi", date: "2024" },
  { title: "Tech Startup Sosyal Medya Kampanyası", category: "Sosyal Medya", date: "2024" },
  { title: "Restoran Zinciri Reklam Filmi", category: "Reklam", date: "2024" },
];

const quickActions = [
  { label: "Yeni Proje Ekle", href: "/admin/projeler/yeni", color: "bg-[#800020]" },
  { label: "Hizmet Düzenle", href: "/admin/hizmetler", color: "bg-black" },
  { label: "İçerik Güncelle", href: "/admin/icerikler", color: "bg-gray-600" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-black">Dashboard</h1>
        <p className="text-gray-600 mt-1">Hoş geldiniz! Site yönetim paneliniz.</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-green-600 font-medium">{stat.change}</span>
            </div>
            <div className="text-2xl font-bold text-black">{stat.value}</div>
            <div className="text-gray-600 text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-xl shadow-sm"
      >
        <h2 className="text-xl font-bold text-black mb-4">Hızlı İşlemler</h2>
        <div className="flex flex-wrap gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className={`${action.color} text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity`}
            >
              {action.label}
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Recent Projects & Messages */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-black">Son Projeler</h2>
            <Link
              href="/admin/projeler"
              className="text-[#800020] text-sm font-medium hover:underline"
            >
              Tümünü Gör
            </Link>
          </div>
          <div className="space-y-4">
            {recentProjects.map((project, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div>
                  <div className="font-medium text-black">{project.title}</div>
                  <div className="text-sm text-gray-500">{project.category}</div>
                </div>
                <span className="text-sm text-gray-500">{project.date}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-black">Son Mesajlar</h2>
            <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-medium">
              3 Yeni
            </span>
          </div>
          <div className="space-y-4">
            {[
              { name: "Ahmet Yılmaz", message: "Video prodüksiyon hizmeti için teklif almak istiyorum.", time: "2 saat önce" },
              { name: "Mehmet Kaya", message: "Sosyal medya yönetimi hakkında bilgi alabilir miyim?", time: "5 saat önce" },
              { name: "Ayşe Demir", message: "Kurumsal tanıtım filmi için görüşmek istiyorum.", time: "1 gün önce" },
            ].map((msg, index) => (
              <div
                key={index}
                className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0"
              >
                <div className="w-10 h-10 bg-[#800020]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#800020] font-medium">
                    {msg.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-black">{msg.name}</div>
                    <div className="text-xs text-gray-500">{msg.time}</div>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
