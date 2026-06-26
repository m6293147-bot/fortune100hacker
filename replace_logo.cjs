const fs = require('fs');

const newLogo = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi1VJNEbdMZjhYrQt14NV463BhN-dnWtqJXXJD8AUdx0-MtiDiuFOC_W46SZfEWySzMv4z5M-Df_94YzM_kIEiVAqYMd_mA68BHDcOE2_VoFuIeCtE1rpSyLi2HedCTcTdX4DXi7Ea38972hAxBjFajGSrXM9KQmbIrAZJdGD2_tPED69TvHn-p4ruSmSfd/s1500/%D8%A7%D9%84%D8%B9%D9%86%D9%88%D8%A7%D9%86%20%281%29.png";

// index.html
let indexHtml = fs.readFileSync('./index.html', 'utf8');
indexHtml = indexHtml.replace(/\/https:\/\/drive\.google\.com\/file\/d\/18OkpnZ8lVzsPwnNMtszJc-xA6LW3mQDD\/view\?usp=sharing/g, newLogo);
fs.writeFileSync('./index.html', indexHtml);

// vite.config.ts
let viteConfig = fs.readFileSync('./vite.config.ts', 'utf8');
viteConfig = viteConfig.replace(/\/logo\.png/g, newLogo);
fs.writeFileSync('./vite.config.ts', viteConfig);

// src/App.tsx
let appTsx = fs.readFileSync('./src/App.tsx', 'utf8');
appTsx = appTsx.replace(/\/logo\.png/g, newLogo);
fs.writeFileSync('./src/App.tsx', appTsx);

console.log('Logo updated successfully.');
