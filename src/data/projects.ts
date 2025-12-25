import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    title: "Luxury Hotel Tanıtım Filmi",
    description:
      "5 yıldızlı otel için hazırlanan sinematik tanıtım filmi. Drone çekimleri ve profesyonel kurgu ile markanın lüks imajı ön plana çıkarıldı.",
    category: "Tanıtım Filmi",
    thumbnailUrl: "/images/projects/hotel.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    client: "Grand Palace Hotel",
    date: "2024",
  },
  {
    id: "2",
    title: "Tech Startup Sosyal Medya Kampanyası",
    description:
      "Yenilikçi teknoloji şirketi için hazırlanan sosyal medya video serisi. Reels ve TikTok formatında viral içerikler üretildi.",
    category: "Sosyal Medya",
    thumbnailUrl: "/images/projects/tech.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    client: "TechVision",
    date: "2024",
  },
  {
    id: "3",
    title: "Restoran Zinciri Reklam Filmi",
    description:
      "Ulusal restoran zinciri için hazırlanan iştah açıcı reklam filmi. Yemek çekimleri ve marka mesajı profesyonelce bir araya getirildi.",
    category: "Reklam",
    thumbnailUrl: "/images/projects/restaurant.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    client: "Lezzet Durağı",
    date: "2024",
  },
  {
    id: "4",
    title: "E-ticaret Marka Videosu",
    description:
      "Online moda markası için hazırlanan ürün tanıtım videoları. Minimalist ve modern estetikle marka kimliği yansıtıldı.",
    category: "Tanıtım Filmi",
    thumbnailUrl: "/images/projects/ecommerce.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    client: "ModaStore",
    date: "2023",
  },
  {
    id: "5",
    title: "Spor Etkinliği Belgeseli",
    description:
      "Ulusal spor etkinliği için hazırlanan belgesel çalışması. Drone çekimleri ve röportajlarla etkinliğin enerjisi aktarıldı.",
    category: "Belgesel",
    thumbnailUrl: "/images/projects/sports.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    client: "Spor Federasyonu",
    date: "2023",
  },
  {
    id: "6",
    title: "Kurumsal Tanıtım Filmi",
    description:
      "Finans sektöründe faaliyet gösteren şirket için hazırlanan kurumsal tanıtım filmi. Profesyonel ve güven veren bir dil kullanıldı.",
    category: "Kurumsal",
    thumbnailUrl: "/images/projects/corporate.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    client: "FinansBank",
    date: "2023",
  },
];

export const categories = [
  "Tümü",
  "Tanıtım Filmi",
  "Sosyal Medya",
  "Reklam",
  "Belgesel",
  "Kurumsal",
];
