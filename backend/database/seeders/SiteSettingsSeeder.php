<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

class SiteSettingsSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            // Hero Section
            [
                'key' => 'hero_title',
                'value' => 'Markanızı Dijitalde Zirveye Taşıyoruz',
                'type' => 'text',
                'group' => 'hero',
                'label' => 'Hero Başlık',
                'description' => 'Ana sayfa hero bölümü başlığı',
            ],
            [
                'key' => 'hero_subtitle',
                'value' => 'Sosyal medya yönetiminden video prodüksiyona, dijital pazarlamadan reklam kampanyalarına kadar tüm ihtiyaçlarınız için profesyonel çözümler.',
                'type' => 'textarea',
                'group' => 'hero',
                'label' => 'Hero Alt Başlık',
                'description' => 'Ana sayfa hero bölümü alt başlığı',
            ],

            // About Section
            [
                'key' => 'about_title',
                'value' => 'Enki Media Hakkında',
                'type' => 'text',
                'group' => 'about',
                'label' => 'Hakkımızda Başlık',
                'description' => 'Hakkımızda bölümü başlığı',
            ],
            [
                'key' => 'about_description',
                'value' => 'Enki Media olarak, markaların dijital dünyada güçlü bir varlık oluşturmasına yardımcı oluyoruz. Yaratıcı içerik üretimi, stratejik sosyal medya yönetimi ve etkili dijital pazarlama çözümleriyle müşterilerimizin hedeflerine ulaşmasını sağlıyoruz.',
                'type' => 'textarea',
                'group' => 'about',
                'label' => 'Hakkımızda Açıklama',
                'description' => 'Hakkımızda bölümü açıklaması',
            ],

            // Contact Info
            [
                'key' => 'contact_phone',
                'value' => '+90 555 123 4567',
                'type' => 'text',
                'group' => 'contact',
                'label' => 'Telefon',
                'description' => 'İletişim telefon numarası',
            ],
            [
                'key' => 'contact_email',
                'value' => 'info@enkimedia.com',
                'type' => 'text',
                'group' => 'contact',
                'label' => 'E-posta',
                'description' => 'İletişim e-posta adresi',
            ],
            [
                'key' => 'contact_address',
                'value' => 'İstanbul, Türkiye',
                'type' => 'text',
                'group' => 'contact',
                'label' => 'Adres',
                'description' => 'Şirket adresi',
            ],
            [
                'key' => 'whatsapp_number',
                'value' => '+905551234567',
                'type' => 'text',
                'group' => 'contact',
                'label' => 'WhatsApp Numarası',
                'description' => 'WhatsApp iletişim numarası',
            ],

            // Social Media
            [
                'key' => 'social_instagram',
                'value' => 'https://instagram.com/enkimedia',
                'type' => 'text',
                'group' => 'social',
                'label' => 'Instagram',
                'description' => 'Instagram profil linki',
            ],
            [
                'key' => 'social_facebook',
                'value' => 'https://facebook.com/enkimedia',
                'type' => 'text',
                'group' => 'social',
                'label' => 'Facebook',
                'description' => 'Facebook sayfa linki',
            ],
            [
                'key' => 'social_twitter',
                'value' => 'https://twitter.com/enkimedia',
                'type' => 'text',
                'group' => 'social',
                'label' => 'Twitter/X',
                'description' => 'Twitter profil linki',
            ],
            [
                'key' => 'social_linkedin',
                'value' => 'https://linkedin.com/company/enkimedia',
                'type' => 'text',
                'group' => 'social',
                'label' => 'LinkedIn',
                'description' => 'LinkedIn şirket linki',
            ],

            // Stats
            [
                'key' => 'stat_projects',
                'value' => '150',
                'type' => 'number',
                'group' => 'stats',
                'label' => 'Tamamlanan Proje',
                'description' => 'Toplam tamamlanan proje sayısı',
            ],
            [
                'key' => 'stat_clients',
                'value' => '50',
                'type' => 'number',
                'group' => 'stats',
                'label' => 'Mutlu Müşteri',
                'description' => 'Toplam müşteri sayısı',
            ],
            [
                'key' => 'stat_experience',
                'value' => '5',
                'type' => 'number',
                'group' => 'stats',
                'label' => 'Yıllık Deneyim',
                'description' => 'Yıl olarak deneyim süresi',
            ],
        ];

        foreach ($settings as $setting) {
            SiteSetting::create($setting);
        }
    }
}
