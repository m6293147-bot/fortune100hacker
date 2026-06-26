const fs = require('fs');
const path = './src/App.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Update Watermark
const oldWatermark = `<div className="absolute inset-0 flex flex-wrap justify-around items-around rotate-[-25deg] scale-150">
          {Array.from({ length: 100 }).map((_, i) => (
            <span key={i} className={\`text-2xl font-bold whitespace-nowrap p-8 \${isDarkMode ? 'text-white' : 'text-black'}\`}>
              عنكبوت للمعلومات
            </span>
          ))}
        </div>`;

const newWatermark = `<div className="absolute inset-0 flex flex-wrap justify-around items-around rotate-[-25deg] scale-150">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className={\`flex items-center gap-4 p-8 opacity-40 \${isDarkMode ? 'text-white' : 'text-black'}\`}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/1xBet.svg/512px-1xBet.svg.png" alt="1xBet" className="h-6 opacity-50 grayscale" />
              <span className="text-2xl font-bold whitespace-nowrap">
                1xbet العنكبوت
              </span>
            </div>
          ))}
        </div>`;

content = content.replace(oldWatermark, newWatermark);

// 2. Add 1xbet Logo to Header
const oldHeader = `<header className="text-center">
            

            <motion.h1`;

const newHeader = `<header className="text-center relative z-10">
            <div className="flex justify-center mb-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/1xBet.svg/512px-1xBet.svg.png" alt="1xBet Logo" className="h-10 object-contain drop-shadow-lg" />
            </div>

            <motion.h1`;

content = content.replace(oldHeader, newHeader);

// 3. Make sure PWA install button is visible and working
// The button is already there in the bottom nav, but let's make sure it's prominent if installPrompt is available.
// Actually, the user asked to "make it available as PWA". The PWA plugin is already there, and the install button is already there.

fs.writeFileSync(path, content, 'utf8');
console.log('Replacements done.');
