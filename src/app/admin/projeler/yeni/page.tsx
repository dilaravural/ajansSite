"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, Save } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Toast from "@/components/ui/Toast";
import { categories } from "@/data/projects";

export default function NewProject() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    client: "",
    date: "",
    videoUrl: "",
  });
  const [toast, setToast] = useState({ isVisible: false, message: "", type: "success" as const });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setToast({ isVisible: true, message: "Proje başarıyla eklendi!", type: "success" });
    // Reset form
    setFormData({
      title: "",
      description: "",
      category: "",
      client: "",
      date: "",
      videoUrl: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/projeler"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-black">Yeni Proje Ekle</h1>
          <p className="text-gray-600 mt-1">
            Portföyünüze yeni bir proje ekleyin.
          </p>
        </div>
      </div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-sm space-y-6"
      >
        <Input
          label="Proje Başlığı *"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Proje başlığını girin"
          required
        />

        <Textarea
          label="Açıklama *"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Proje hakkında detaylı açıklama..."
          rows={4}
          required
        />

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kategori *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/20 outline-none"
            >
              <option value="">Kategori seçin</option>
              {categories.filter((c) => c !== "Tümü").map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Müşteri"
            name="client"
            value={formData.client}
            onChange={handleChange}
            placeholder="Müşteri adı"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label="Tarih *"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="2024"
            required
          />

          <Input
            label="Video URL"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleChange}
            placeholder="https://youtube.com/embed/..."
          />
        </div>

        {/* Thumbnail Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kapak Görseli
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#800020] transition-colors cursor-pointer">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">
              Görsel yüklemek için tıklayın veya sürükleyin
            </p>
            <p className="text-sm text-gray-400">PNG, JPG (max. 5MB)</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-4 border-t">
          <Link href="/admin/projeler">
            <Button variant="outline" type="button">
              İptal
            </Button>
          </Link>
          <Button type="submit" variant="primary">
            <Save className="w-5 h-5 mr-2" />
            Kaydet
          </Button>
        </div>
      </motion.form>
    </div>
  );
}
