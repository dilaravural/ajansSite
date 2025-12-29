"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { api, Project } from "@/lib/api";

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>(["Tümü"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const data = await api.getProjects();
      setProjects(data);

      // Extract unique categories
      const uniqueCategories = Array.from(new Set(data.map(p => p.category)));
      setCategories(["Tümü", ...uniqueCategories]);
    } catch (err: any) {
      setError(err.message || "Projeler yüklenirken bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`"${title}" projesini silmek istediğinizden emin misiniz?`)) {
      return;
    }

    try {
      await api.deleteProject(id);
      setProjects(projects.filter(p => p.id !== id));
    } catch (err: any) {
      alert(err.message || "Proje silinirken bir hata oluştu");
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Tümü" || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-black">Projeler</h1>
          <p className="text-gray-600 mt-1">
            Portföyünüzdeki projeleri yönetin.
          </p>
        </div>
        <Link href="/admin/projeler/yeni">
          <Button variant="primary">
            <Plus className="w-5 h-5 mr-2" />
            Yeni Proje
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Proje ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/20 outline-none"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? "bg-[#800020] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#800020] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Projeler yükleniyor...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-lg">
          {error}
        </div>
      )}

      {/* Projects Table */}
      {!isLoading && !error && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Proje
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Kategori
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Müşteri
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Tarih
                </th>
                <th className="text-right py-4 px-6 font-semibold text-gray-700">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project, index) => (
                <motion.tr
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#800020] to-[#5c0017] rounded-lg flex-shrink-0" />
                      <div>
                        <div className="font-medium text-black">
                          {project.title}
                        </div>
                        <div className="text-sm text-gray-500 line-clamp-1">
                          {project.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 bg-[#800020]/10 text-[#800020] rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{project.client}</td>
                  <td className="py-4 px-6 text-gray-700">{project.date}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/projeler/${project.id}`}>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Edit className="w-5 h-5 text-gray-600" />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(project.id, project.title)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">Proje bulunamadı.</p>
          </div>
        )}
        </div>
      )}
    </div>
  );
}
