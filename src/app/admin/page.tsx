"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FolderOpen, Eye, MessageSquare, TrendingUp, Loader2 } from "lucide-react";
import Link from "next/link";
import { api, Project, ContactMessage } from "@/lib/api";

interface Stats {
  total_projects: number;
  total_services: number;
  total_messages: number;
  unread_messages: number;
  recent_projects: Project[];
  recent_messages: ContactMessage[];
}

const quickActions = [
  { label: "Yeni Proje Ekle", href: "/admin/projeler/yeni", color: "bg-[#800020]" },
  { label: "Hizmet Düzenle", href: "/admin/hizmetler", color: "bg-black" },
  { label: "İçerik Güncelle", href: "/admin/icerikler", color: "bg-gray-600" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const data = await api.getStats();
        setStats(data);
      } catch (err: any) {
        setError(err.message || "İstatistikler yüklenirken bir hata oluştu");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#800020] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-lg">
        {error}
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const statCards = [
    {
      icon: FolderOpen,
      label: "Toplam Proje",
      value: stats.total_projects.toString(),
      change: `${stats.recent_projects.length} yeni`,
      color: "bg-blue-500",
    },
    {
      icon: TrendingUp,
      label: "Toplam Hizmet",
      value: stats.total_services.toString(),
      change: "Aktif",
      color: "bg-green-500",
    },
    {
      icon: MessageSquare,
      label: "Mesajlar",
      value: stats.total_messages.toString(),
      change: `${stats.unread_messages} yeni`,
      color: "bg-yellow-500",
    },
    {
      icon: Eye,
      label: "Okunmamış",
      value: stats.unread_messages.toString(),
      change: "Mesaj",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-black">Dashboard</h1>
        <p className="text-gray-600 mt-1">Hoş geldiniz! Site yönetim paneliniz.</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
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
            {stats.recent_projects.length > 0 ? (
              stats.recent_projects.slice(0, 5).map((project, index) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                >
                  <div>
                    <div className="font-medium text-black">{project.title}</div>
                    <div className="text-sm text-gray-500">{project.category}</div>
                  </div>
                  <span className="text-sm text-gray-500">{project.date}</span>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">Henüz proje yok</div>
            )}
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
            {stats.unread_messages > 0 && (
              <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-medium">
                {stats.unread_messages} Yeni
              </span>
            )}
          </div>
          <div className="space-y-4">
            {stats.recent_messages.length > 0 ? (
              stats.recent_messages.slice(0, 5).map((msg, index) => (
                <div
                  key={msg.id}
                  className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0"
                >
                  <div className="w-10 h-10 bg-[#800020]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[#800020] font-medium">
                      {msg.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-black">{msg.name}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(msg.created_at).toLocaleDateString('tr-TR')}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{msg.message}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">Henüz mesaj yok</div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
