"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Edit, Save, X, Share2, Video, Megaphone, PenTool } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Toast from "@/components/ui/Toast";
import { services } from "@/data/services";

const iconMap: { [key: string]: any } = {
  share2: Share2,
  video: Video,
  megaphone: Megaphone,
  penTool: PenTool,
};

export default function AdminServices() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    features: [] as string[],
  });
  const [toast, setToast] = useState({ isVisible: false, message: "", type: "success" as const });

  const handleEdit = (service: (typeof services)[0]) => {
    setEditingId(service.id);
    setEditForm({
      title: service.title,
      description: service.description,
      features: service.features,
    });
  };

  const handleSave = () => {
    console.log("Saving:", editingId, editForm);
    setEditingId(null);
    setToast({ isVisible: true, message: "Hizmet başarıyla güncellendi!", type: "success" });
  };

  const handleCancel = () => {
    setEditingId(null);
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
        <h1 className="text-3xl font-bold text-black">Hizmetler</h1>
        <p className="text-gray-600 mt-1">
          Hizmet açıklamalarını ve içeriklerini düzenleyin.
        </p>
      </div>

      {/* Services List */}
      <div className="space-y-6">
        {services.map((service, index) => {
          const Icon = iconMap[service.icon];
          const isEditing = editingId === service.id;

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              {isEditing ? (
                <div className="space-y-4">
                  <Input
                    label="Başlık"
                    value={editForm.title}
                    onChange={(e) =>
                      setEditForm({ ...editForm, title: e.target.value })
                    }
                  />
                  <Textarea
                    label="Açıklama"
                    value={editForm.description}
                    onChange={(e) =>
                      setEditForm({ ...editForm, description: e.target.value })
                    }
                    rows={3}
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Özellikler (her satıra bir özellik)
                    </label>
                    <textarea
                      value={editForm.features.join("\n")}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          features: e.target.value.split("\n"),
                        })
                      }
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/20 outline-none resize-none"
                    />
                  </div>
                  <div className="flex justify-end gap-3">
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
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#800020]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-7 h-7 text-[#800020]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-black">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 mt-1">
                          {service.description}
                        </p>
                      </div>
                      <button
                        onClick={() => handleEdit(service)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Edit className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {service.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
