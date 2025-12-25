"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Edit, Save, X, TrendingUp, Image, Upload, Trash2, Plus, Clock } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Toast from "@/components/ui/Toast";
import { useBackgrounds } from "@/context/BackgroundContext";
import { useTimeline, TimelineItem } from "@/context/TimelineContext";

const initialStats = [
  { id: "projects", label: "Proje", value: 150, suffix: "+" },
  { id: "clients", label: "Mutlu Müşteri", value: 50, suffix: "+" },
  { id: "experience", label: "Yıl Deneyim", value: 5, suffix: "+" },
];

const contentSections = [
  {
    id: "hero",
    title: "Ana Sayfa - Hero",
    fields: [
      { name: "title", label: "Başlık", type: "text", value: "Markanızı Dijital Dünyada Öne Çıkarıyoruz" },
      { name: "subtitle", label: "Alt Başlık", type: "textarea", value: "Video prodüksiyon, sosyal medya yönetimi ve dijital pazarlama alanlarında profesyonel çözümler sunuyoruz." },
    ],
  },
  {
    id: "about",
    title: "Hakkımızda",
    fields: [
      { name: "title", label: "Başlık", type: "text", value: "Hikayemizi Görsellerle Anlatıyoruz" },
      { name: "description", label: "Açıklama", type: "textarea", value: "Enki Media olarak, markaların dijital dünyada güçlü bir şekilde var olmasını sağlıyoruz." },
    ],
  },
  {
    id: "contact",
    title: "İletişim Bilgileri",
    fields: [
      { name: "phone", label: "Telefon", type: "text", value: "+90 555 123 45 67" },
      { name: "email", label: "E-posta", type: "text", value: "info@enkimedia.com" },
      { name: "address", label: "Adres", type: "text", value: "İstanbul, Türkiye" },
      { name: "whatsapp", label: "WhatsApp", type: "text", value: "+905551234567" },
    ],
  },
  {
    id: "social",
    title: "Sosyal Medya",
    fields: [
      { name: "instagram", label: "Instagram", type: "text", value: "https://instagram.com/enkimedia" },
      { name: "youtube", label: "YouTube", type: "text", value: "https://youtube.com/@enkimedia" },
      { name: "linkedin", label: "LinkedIn", type: "text", value: "https://linkedin.com/company/enkimedia" },
    ],
  },
];

export default function AdminContent() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [toast, setToast] = useState({ isVisible: false, message: "", type: "success" as const });
  const [stats, setStats] = useState(initialStats);
  const [editingStats, setEditingStats] = useState(false);
  const [statsForm, setStatsForm] = useState(initialStats);
  const { backgrounds: pageBackgrounds, setBackgrounds: setPageBackgrounds } = useBackgrounds();
  const { timeline, addTimelineItem, updateTimelineItem, deleteTimelineItem } = useTimeline();
  const [editingTimelineId, setEditingTimelineId] = useState<string | null>(null);
  const [timelineForm, setTimelineForm] = useState({ year: "", title: "", description: "" });
  const [isAddingTimeline, setIsAddingTimeline] = useState(false);

  const handleEdit = (section: (typeof contentSections)[0]) => {
    setEditingId(section.id);
    const data: { [key: string]: string } = {};
    section.fields.forEach((field) => {
      data[field.name] = field.value;
    });
    setFormData(data);
  };

  const handleSave = () => {
    console.log("Saving:", editingId, formData);
    setEditingId(null);
    setToast({ isVisible: true, message: "İçerik başarıyla güncellendi!", type: "success" });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({});
  };

  const handleEditStats = () => {
    setEditingStats(true);
    setStatsForm([...stats]);
  };

  const handleSaveStats = () => {
    setStats([...statsForm]);
    setEditingStats(false);
    setToast({ isVisible: true, message: "İstatistikler başarıyla güncellendi!", type: "success" });
    console.log("Stats saved:", statsForm);
  };

  const handleCancelStats = () => {
    setEditingStats(false);
    setStatsForm([...stats]);
  };

  const updateStatValue = (id: string, value: number) => {
    setStatsForm(statsForm.map(stat =>
      stat.id === id ? { ...stat, value } : stat
    ));
  };

  const updateStatSuffix = (id: string, suffix: string) => {
    setStatsForm(statsForm.map(stat =>
      stat.id === id ? { ...stat, suffix } : stat
    ));
  };

  const handleImageUpload = (pageId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPageBackgrounds(pageBackgrounds.map((page: { id: string; title: string; image: string }) =>
          page.id === pageId ? { ...page, image: reader.result as string } : page
        ));
        setToast({ isVisible: true, message: "Görsel başarıyla yüklendi!", type: "success" });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (pageId: string) => {
    setPageBackgrounds(pageBackgrounds.map((page: { id: string; title: string; image: string }) =>
      page.id === pageId ? { ...page, image: "" } : page
    ));
    setToast({ isVisible: true, message: "Görsel kaldırıldı.", type: "success" });
  };

  const handleEditTimeline = (item: TimelineItem) => {
    setEditingTimelineId(item.id);
    setTimelineForm({ year: item.year, title: item.title, description: item.description });
    setIsAddingTimeline(false);
  };

  const handleSaveTimeline = () => {
    if (editingTimelineId) {
      updateTimelineItem(editingTimelineId, timelineForm);
      setToast({ isVisible: true, message: "Yolculuk öğesi güncellendi!", type: "success" });
    }
    setEditingTimelineId(null);
    setTimelineForm({ year: "", title: "", description: "" });
  };

  const handleAddTimeline = () => {
    setIsAddingTimeline(true);
    setEditingTimelineId(null);
    setTimelineForm({ year: "", title: "", description: "" });
  };

  const handleSaveNewTimeline = () => {
    if (timelineForm.year && timelineForm.title) {
      addTimelineItem(timelineForm);
      setToast({ isVisible: true, message: "Yeni yolculuk öğesi eklendi!", type: "success" });
      setIsAddingTimeline(false);
      setTimelineForm({ year: "", title: "", description: "" });
    }
  };

  const handleDeleteTimeline = (id: string) => {
    deleteTimelineItem(id);
    setToast({ isVisible: true, message: "Yolculuk öğesi silindi.", type: "success" });
  };

  const handleCancelTimeline = () => {
    setEditingTimelineId(null);
    setIsAddingTimeline(false);
    setTimelineForm({ year: "", title: "", description: "" });
  };

  return (
    <div className="space-y-8">
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-black">İçerik Yönetimi</h1>
        <p className="text-gray-600 mt-1">
          Site içeriklerini ve iletişim bilgilerini güncelleyin.
        </p>
      </div>

      {/* Statistics Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#800020]/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#800020]" />
            </div>
            <h2 className="text-xl font-bold text-black">Site İstatistikleri</h2>
          </div>
          {!editingStats && (
            <button
              onClick={handleEditStats}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Edit className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>

        {editingStats ? (
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              {statsForm.map((stat) => (
                <div key={stat.id} className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {stat.label}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={stat.value}
                      onChange={(e) => updateStatValue(stat.id, parseInt(e.target.value) || 0)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/20 outline-none"
                    />
                    <input
                      type="text"
                      value={stat.suffix}
                      onChange={(e) => updateStatSuffix(stat.id, e.target.value)}
                      placeholder="+"
                      className="w-16 px-3 py-2 border border-gray-300 rounded-lg focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/20 outline-none text-center"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={handleCancelStats}>
                <X className="w-4 h-4 mr-2" />
                İptal
              </Button>
              <Button variant="primary" onClick={handleSaveStats}>
                <Save className="w-4 h-4 mr-2" />
                Kaydet
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div key={stat.id} className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-[#800020]">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Page Backgrounds Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-6 rounded-xl shadow-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#800020]/10 rounded-lg flex items-center justify-center">
            <Image className="w-5 h-5 text-[#800020]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-black">Sayfa Arka Plan Görselleri</h2>
            <p className="text-sm text-gray-500">Her sayfa için arka plan görseli ekleyin</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {pageBackgrounds.map((page: { id: string; title: string; image: string }) => (
            <div key={page.id} className="border border-gray-200 rounded-xl p-4">
              <h3 className="font-semibold text-black mb-3">{page.title} Sayfası</h3>

              {page.image ? (
                <div className="relative">
                  <div
                    className="aspect-video bg-cover bg-center rounded-lg mb-3"
                    style={{ backgroundImage: `url(${page.image})` }}
                  />
                  <button
                    onClick={() => handleRemoveImage(page.id)}
                    className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="aspect-video bg-gray-100 rounded-lg mb-3 flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center text-gray-400">
                    <Image className="w-10 h-10 mx-auto mb-2" />
                    <p className="text-sm">Görsel yüklenmedi</p>
                  </div>
                </div>
              )}

              <label className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#800020] hover:bg-[#600018] text-white rounded-lg cursor-pointer transition-colors">
                <Upload className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {page.image ? "Görseli Değiştir" : "Görsel Yükle"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(page.id, e)}
                  className="hidden"
                />
              </label>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Timeline Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-xl shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#800020]/10 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#800020]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-black">Yolculuğumuz</h2>
              <p className="text-sm text-gray-500">Şirket tarihçesi ve kilometre taşları</p>
            </div>
          </div>
          <button
            onClick={handleAddTimeline}
            className="flex items-center gap-2 px-4 py-2 bg-[#800020] hover:bg-[#600018] text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Yeni Ekle</span>
          </button>
        </div>

        {/* Add New Timeline Item */}
        {isAddingTimeline && (
          <div className="mb-6 p-4 border-2 border-[#800020] rounded-xl bg-[#800020]/5">
            <h3 className="font-semibold text-black mb-4">Yeni Yolculuk Öğesi</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <Input
                label="Yıl"
                value={timelineForm.year}
                onChange={(e) => setTimelineForm({ ...timelineForm, year: e.target.value })}
                placeholder="2024"
              />
              <Input
                label="Başlık"
                value={timelineForm.title}
                onChange={(e) => setTimelineForm({ ...timelineForm, title: e.target.value })}
                placeholder="Önemli gelişme"
              />
            </div>
            <Textarea
              label="Açıklama"
              value={timelineForm.description}
              onChange={(e) => setTimelineForm({ ...timelineForm, description: e.target.value })}
              placeholder="Bu dönemde neler oldu..."
              rows={2}
            />
            <div className="flex justify-end gap-3 mt-4">
              <Button variant="outline" onClick={handleCancelTimeline}>
                <X className="w-4 h-4 mr-2" />
                İptal
              </Button>
              <Button variant="primary" onClick={handleSaveNewTimeline}>
                <Save className="w-4 h-4 mr-2" />
                Ekle
              </Button>
            </div>
          </div>
        )}

        {/* Timeline Items */}
        <div className="space-y-4">
          {timeline.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-xl p-4">
              {editingTimelineId === item.id ? (
                <div>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <Input
                      label="Yıl"
                      value={timelineForm.year}
                      onChange={(e) => setTimelineForm({ ...timelineForm, year: e.target.value })}
                    />
                    <Input
                      label="Başlık"
                      value={timelineForm.title}
                      onChange={(e) => setTimelineForm({ ...timelineForm, title: e.target.value })}
                    />
                  </div>
                  <Textarea
                    label="Açıklama"
                    value={timelineForm.description}
                    onChange={(e) => setTimelineForm({ ...timelineForm, description: e.target.value })}
                    rows={2}
                  />
                  <div className="flex justify-end gap-3 mt-4">
                    <Button variant="outline" onClick={handleCancelTimeline}>
                      <X className="w-4 h-4 mr-2" />
                      İptal
                    </Button>
                    <Button variant="primary" onClick={handleSaveTimeline}>
                      <Save className="w-4 h-4 mr-2" />
                      Kaydet
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-[#800020]/10 text-[#800020] rounded-full text-sm font-bold">
                        {item.year}
                      </span>
                      <h3 className="font-semibold text-black">{item.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditTimeline(item)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteTimeline(item.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Content Sections */}
      <div className="space-y-6">
        {contentSections.map((section, index) => {
          const isEditing = editingId === section.id;

          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-black">{section.title}</h2>
                {!isEditing && (
                  <button
                    onClick={() => handleEdit(section)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Edit className="w-5 h-5 text-gray-600" />
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  {section.fields.map((field) => (
                    <div key={field.name}>
                      {field.type === "textarea" ? (
                        <Textarea
                          label={field.label}
                          value={formData[field.name] || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [field.name]: e.target.value,
                            })
                          }
                          rows={3}
                        />
                      ) : (
                        <Input
                          label={field.label}
                          value={formData[field.name] || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [field.name]: e.target.value,
                            })
                          }
                        />
                      )}
                    </div>
                  ))}
                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline" onClick={handleCancel}>
                      <X className="w-4 h-4 mr-2" />
                      İptal
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                      <Save className="w-4 h-4 mr-2" />
                      Kaydet
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {section.fields.map((field) => (
                    <div key={field.name} className="flex flex-col">
                      <span className="text-sm text-gray-500">{field.label}</span>
                      <span className="text-gray-700">{field.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
