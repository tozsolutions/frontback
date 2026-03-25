#!/bin/bash

# TozyAPI Next.js Optimizasyon Kurulum Script'i

echo "🚀 TozyAPI Optimizasyon Kurulumu Başlatılıyor..."

# 1. Gerekli paketleri yükle
echo "📦 Gerekli paketler yükleniyor..."
npm install sharp next-sitemap @next/bundle-analyzer webpack-bundle-analyzer --save-dev

# 2. Optimizasyon script'ini oluştur
echo "⚙️  Optimizasyon script'i oluşturuluyor..."
cat > optimize-images.js << 'EOF'
// optimize-images.js içeriği buraya (yukarıdaki script)
EOF

# 3. Next.js konfigürasyonunu güncelle
echo "🔧 Next.js konfigürasyonu güncelleniyor..."
cat > next.config.js << 'EOF'
// next.config.js içeriği buraya (yukarıdaki config)
EOF

# 4. Tailwind konfigürasyonunu güncelle (eğer varsa)
if [ -f "tailwind.config.js" ]; then
    echo "🎨 Tailwind konfigürasyonu güncelleniyor..."
    cat > tailwind.config.js << 'EOF'
// tailwind.config.js içeriği buraya (yukarıdaki config)
EOF
fi

# 5. Global CSS'yi güncelle
echo "🎨 Global CSS güncelleniyor..."
mkdir -p styles
cat > styles/globals.css << 'EOF'
/* styles/globals.css içeriği buraya (yukarıdaki CSS) */
EOF

# 6. Middleware oluştur
echo "🛡️  Middleware oluşturuluyor..."
cat > middleware.js << 'EOF'
// middleware.js içeriği buraya (yukarıdaki middleware)
EOF

# 7. Sitemap konfigürasyonu
echo "🗺️  Sitemap konfigürasyonu oluşturuluyor..."
cat > next-sitemap.config.js << 'EOF'
// next-sitemap.config.js içeriği buraya (yukarıdaki config)
EOF

# 8. Package.json script'lerini güncelle
echo "📝 Package.json güncelleniyor..."
node -e "
const fs = require('fs');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

packageJson.scripts = {
    ...packageJson.scripts,
    'dev': 'next dev',
    'build': 'next build',
    'start': 'next start',
    'lint': 'next lint',
    'optimize-images': 'node optimize-images.js',
    'analyze': 'ANALYZE=true next build',
    'security-check': 'npm audit && npx snyk test',
    'performance-test': 'lighthouse http://localhost:3000 --view --output=html --output-path=./lighthouse-report.html'
};

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
"

# 9. Görselleri optimize et
echo "🖼️  Görseller optimize ediliyor..."
node optimize-images.js

# 10. Build ve test
echo "🔨 Proje build ediliyor..."
npm run build

echo "✅ Optimizasyon kurulumu tamamlandı!"
echo "📊 Performans testi için: npm run performance-test"
echo "🔒 Güvenlik kontrolü için: npm run security-check"
echo "📈 Analiz için: npm run analyze"
