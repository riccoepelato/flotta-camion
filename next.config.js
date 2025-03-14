// Configurazione per il deployment su Vercel
module.exports = {
  // Configurazione di base
  reactStrictMode: true,
  swcMinify: true,
  
  // Configurazione PWA
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
  },
  
  // Configurazione immagini
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  
  // Configurazione ambiente
  env: {
    APP_URL: process.env.APP_URL || 'https://gestione-trasporti-antonio-scandale.vercel.app',
  },
  
  // Configurazione build
  output: 'standalone',
  
  // Configurazione headers per PWA
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
        ],
      },
    ];
  },
};
