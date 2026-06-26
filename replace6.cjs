const fs = require('fs');
const path = './src/App.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldWatermark = `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/1xBet.svg/512px-1xBet.svg.png" alt="1xBet" className="h-6 opacity-50 grayscale" />`;
const newWatermark = `<img src="/logo.png" alt="1xHacker" className="h-10 opacity-50 grayscale" />`;
content = content.replace(oldWatermark, newWatermark);

const oldHeaderLogo = `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/1xBet.svg/512px-1xBet.svg.png" alt="1xBet Logo" className="h-10 object-contain drop-shadow-lg" />`;
const newHeaderLogo = `<img src="/logo.png" alt="1xHacker Logo" className="h-16 object-contain drop-shadow-lg" />`;
content = content.replace(oldHeaderLogo, newHeaderLogo);

fs.writeFileSync(path, content, 'utf8');
console.log('Replacements done.');
