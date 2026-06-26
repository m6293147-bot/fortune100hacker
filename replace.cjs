const fs = require('fs');
const path = './src/App.tsx';
let content = fs.readFileSync(path, 'utf8');

const replacements = {
  '#00ff66': '#34b4ff',
  '#004d26': '#152a47',
  '#0d2b1e': '#0b1a2a',
  '#1a3d2f': '#1e3b5c',
  '#e8f5ee': '#e6f4ff',
  '#c8e6d6': '#b3dfff',
  '#00cc55': '#1a9ce8',
  '#006633': '#0d1b2e',
  '#f0f9f4': '#f0f8ff',
  'التفاحة - العنكبوت': '1xbet - العنكبوت',
  'سكربت التفاحة': 'سكربت 1xbet',
  'هكر التفاحة': 'هكر 1xbet',
  'SpinBetter': '1xbet',
  'spinbetter3g.com': '1xbet.com'
};

for (const [key, value] of Object.entries(replacements)) {
  content = content.split(key).join(value);
}

fs.writeFileSync(path, content, 'utf8');
console.log('Replacements done.');
