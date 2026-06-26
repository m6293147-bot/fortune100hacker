const fs = require('fs');
const path = './src/App.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/#34b4ff/g, '#ffc600');
content = content.replace(/#152a47/g, '#123262');

fs.writeFileSync(path, content, 'utf8');
console.log('Replacements done.');
