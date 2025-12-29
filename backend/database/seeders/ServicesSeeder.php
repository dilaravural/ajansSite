<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServicesSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'title' => 'Sosyal Medya Yönetimi',
                'description' => 'Markanızın sosyal medya hesaplarını profesyonelce yönetiyor, içerik stratejisi oluşturuyor ve topluluk etkileşimini artırıyoruz.',
                'icon' => 'Share2',
                'features' => [
                    'İçerik planlama ve oluşturma',
                    'Topluluk yönetimi',
                    'Sosyal medya stratejisi',
                    'Performans analizi ve raporlama'
                ],
                'order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Video Prodüksiyon',
                'description' => 'Tanıtım filmlerinden sosyal medya içeriklerine kadar her türlü video prodüksiyonu hizmeti sunuyoruz.',
                'icon' => 'Video',
                'features' => [
                    'Konsept geliştirme',
                    'Profesyonel çekim',
                    'Kurgu ve post-prodüksiyon',
                    'Motion graphics ve animasyon'
                ],
                'order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Reklam Yönetimi',
                'description' => 'Google Ads, Meta Ads ve diğer platformlarda etkili reklam kampanyaları yönetimi ile hedef kitlenize ulaşın.',
                'icon' => 'Target',
                'features' => [
                    'Kampanya stratejisi',
                    'Hedef kitle analizi',
                    'A/B testleri',
                    'ROI optimizasyonu'
                ],
                'order' => 3,
                'is_active' => true,
            ],
            [
                'title' => 'İçerik Üretimi',
                'description' => 'Markanız için özgün, etkileyici ve SEO uyumlu içerikler üretiyoruz.',
                'icon' => 'FileText',
                'features' => [
                    'Blog yazıları',
                    'Sosyal medya içerikleri',
                    'E-posta pazarlama',
                    'SEO optimizasyonu'
                ],
                'order' => 4,
                'is_active' => true,
            ],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}
