import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(), 
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
          importScripts: ['/custom-sw.js']
        },
        manifest: {
          name: 'سكربت العنكبوت',
          short_name: 'سكربت العنكبوت',
          description: 'أداة تحليل متطورة بالذكاء الاصطناعي للعبة التفاحة',
          theme_color: '#000000',
          background_color: '#000000',
          display: 'standalone',
          icons: [
            {
              src: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi1VJNEbdMZjhYrQt14NV463BhN-dnWtqJXXJD8AUdx0-MtiDiuFOC_W46SZfEWySzMv4z5M-Df_94YzM_kIEiVAqYMd_mA68BHDcOE2_VoFuIeCtE1rpSyLi2HedCTcTdX4DXi7Ea38972hAxBjFajGSrXM9KQmbIrAZJdGD2_tPED69TvHn-p4ruSmSfd/s1500/%D8%A7%D9%84%D8%B9%D9%86%D9%88%D8%A7%D9%86%20%281%29.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi1VJNEbdMZjhYrQt14NV463BhN-dnWtqJXXJD8AUdx0-MtiDiuFOC_W46SZfEWySzMv4z5M-Df_94YzM_kIEiVAqYMd_mA68BHDcOE2_VoFuIeCtE1rpSyLi2HedCTcTdX4DXi7Ea38972hAxBjFajGSrXM9KQmbIrAZJdGD2_tPED69TvHn-p4ruSmSfd/s1500/%D8%A7%D9%84%D8%B9%D9%86%D9%88%D8%A7%D9%86%20%281%29.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        }
      })
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
