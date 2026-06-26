const fs = require('fs');
const path = './src/App.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Replace URLs
content = content.split('https://redirspinner.com/2LXJ?p=%2Fregistration%2F').join('https://refpa14435.com/L?tag=d_2500605m_1573c_&site=2500605&ad=1573');

// 2. Replace Texts
content = content.split('أدخل معرف الحساب (ID)').join('أدخل رقم حسابك (ID) لتفعيل التوقع');
content = content.split('بدء التحليل الخوارزمي 🧠').join('بدء في التوقع 🎯');

// 3. Replace Title
content = content.replace(
  /سكربت <span className=\{`\$\{isDarkMode \? 'text-\[#34b4ff\] drop-shadow-\[0_0_8px_#34b4ff\]' : 'text-\[#152a47\]'\}`\}>1xbet - العنكبوت<\/span>/g,
  'سكربت التفاحة <span className={`\${isDarkMode ? \\\'text-[#ffc600] drop-shadow-[0_0_8px_#ffc600]\\\' : \\\'text-[#123262]\\\'}`}>1xbet العنكبوت 🕷️</span>'
);

// 4. Replace Button Colors
content = content.replace(
  /className=\{`w-full p-4 rounded-full font-bold text-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 shadow-lg \$\{isDarkMode \? 'bg-gradient-to-r from-\[#fcc02e\] to-\[#ffde59\]' : 'bg-gradient-to-r from-\[#152a47\] to-\[#0d1b2e\] text-white'\} text-black hover:brightness-110`\}/g,
  'className={`w-full p-4 rounded-full font-bold text-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 shadow-lg bg-[#29a643] text-white hover:brightness-110`}'
);

// 5. Replace Background Colors to Royal Blue (#123262)
content = content.replace(/bg-black/g, 'bg-[#123262]');
content = content.replace(/bg-\[#020a06\]/g, 'bg-[#0a1c3a]'); // Phone frame bg
content = content.replace(/bg-\[#0b1a2a\]/g, 'bg-[#123262]'); // Input bg
content = content.replace(/border-\[#1e3b5c\]/g, 'border-[#ffc600]'); // Input border

// 6. Move Contest Section
const contestRegex = /\{\/\* Contest Section moved here \*\/\}\s*<div className="mb-6">\s*<motion\.div[\s\S]*?<\/motion\.div>\s*<\/div>/;
const match = content.match(contestRegex);

if (match) {
  const contestSection = match[0];
  content = content.replace(contestRegex, ''); // Remove from original location

  const conditionsRegex = /(<div className="mt-8 space-y-4">[\s\S]*?<\/div>\s*<\/div>)/;
  content = content.replace(conditionsRegex, `$1\n\n            ${contestSection.replace('mb-6', 'mt-8 mb-6')}`);
}

fs.writeFileSync(path, content, 'utf8');
console.log('Replacements done.');
