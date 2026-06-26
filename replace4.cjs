const fs = require('fs');
const path = './src/App.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Replace USER_COMMENTS
const newComments = `const USER_COMMENTS = [
    { name: "محمود العزازي", text: "يا جماعة أنا جربت السكربت وكنت شاكك في الأول 🤔، بس لما سجلت بـ spiderbet وبعت الـ ID، زر التوقع فتح وبصراحة صدمتني الدقة! 🎯🔥", time: "الآن" },
    { name: "سالم الهاجري", text: "يا هندسة أنا بعت رقم حسابي ع الخاص 📩، ياريت تفعل لي السكربت بسرعة لأن الحساب مسجل بالكود بتاعك 🕸️.", time: "منذ دقيقة" },
    { name: "ياسين بناني", text: "أنا مكنتش فاهم ليه لازم كود spiderbet 🧐، بس لما جربت في لعبة التفاحة فهمت إن الربط مع الخوارزمية هو اللي بيجيب المكسب 🍎💰.", time: "منذ دقيقتين" },
    { name: "علاء المصري", text: "شباب حد جرب السكربت على لعبة العنكبوت؟ 🕷️ أنا جربته في التفاحة وشغال نار، بس عايز أتأكد من التانية ⚡.", time: "منذ 3 دقائق" },
    { name: "فهد الدوسري", text: "السكربت اشتغل معي، بس نصيحة للكل: لا تطمع، العب جولتين واخرج عشان الحساب ما ينكشف 🛑⚠️.", time: "منذ 5 دقائق" },
    { name: "حمزة شريف", text: "بكل أمانة، البروموكود عطاني بونص أول مرة أشوفه 🎁، والسكربت فعلاً بيقرأ أماكن التفاحة صح ✅.", time: "منذ 7 دقائق" },
    { name: "كريم عادل", text: "لو زر بدء التوقع مش شغال عندك، اتأكد إنك سجلت حساب جديد بكود spiderbet 🎫، ده اللي حصل معايا وظبط 🛠️.", time: "منذ 10 دقائق" },
    { name: "عبد الله العتيبي", text: "أنا لسه مفعل السكربت الحين، أول جولة في التفاحة (صح) ✅، الله يستر من الجايات 🤲💸.", time: "منذ 12 دقيقة" },
    { name: "أمين رامي", text: "مجهود جبار يا هندسة 👏، بس ياريت تنزل لنا شرح أكتر لربط الـ ID عشان الكل يستفيد 📚.", time: "منذ 15 دقيقة" },
    { name: "أحمد تايجر", text: "السكربت ده هو اللي كان ناقصنا 🤩، البروموكود spiderbet فتح لي ميزات مكنتش موجودة في الحساب القديم 💎.", time: "منذ 20 دقيقة" },
    { name: "سلطان الرويلي", text: "يا شباب اللي يبي يربح يتبع الخطوات بالظبط 👣، السكربت حقيقي 100% بس التزم بالكود 🕷️✅.", time: "الآن" },
    { name: "إبراهيم الجزار", text: "والله العظيم كنت هخسر كل فلوسي 😱، السكربت ده أنقذني في آخر لحظة، شكراً للعنكبوت 🕷️🙌.", time: "منذ دقيقة" },
    { name: "مهدي حسن", text: "الواجهة خرافية 😍، والألوان ماشية مع الموقع، تحس إنك شغال على أداة رسمية 💻✨.", time: "منذ 4 دقائق" },
    { name: "يوسف القحطاني", text: "أرسلت الـ ID على التليجرام، السكربت اتفعل في أقل من 5 دقائق، سرعة رهيبة ⚡🚀.", time: "منذ 6 دقائق" },
    { name: "مصطفى كمال", text: "أول مرة أشوف سكربت بيتوقع التفاحة الفاسدة قبل ما تظهر 🍏❌، كود spiderbet عمل فرق كبير.", time: "منذ 8 دقائق" },
    { name: "بدر منصور", text: "يا هندسة هل السكربت له تحديث قريب؟ 🤔 شغال معايا حلاوة بس عايز أعرف الجديد 🆙.", time: "منذ 11 دقيقة" },
    { name: "عمر الفاروق", text: "الناس اللي بتقول ممتاز، فعلاً معاكم حق، السكربت ده (هكر) قانوني! 🕵️‍♂️ مشروع ناجح يا هندسة.", time: "منذ 14 دقيقة" },
    { name: "خالد العنزي", text: "تم الإيداع وتفعيل الكود، البونص نزل دبل 💰💰، الحين نبدأ شغل على السكربت 🚀.", time: "منذ 17 دقيقة" },
    { name: "صلاح الدين", text: "السكربت دقيق جداً لدرجة تخوف 😰، لازم تلعب بحذر يا شباب ⚠️.", time: "منذ 22 دقيقة" },
    { name: "رُشيد عثمان", text: "أحسن حاجة إن السكربت بيطلب رقم الحساب، ده معناه إن الشغل تقني ومش عشوائي ⚙️🧠.", time: "منذ 25 دقيقة" },
    { name: "سلمان المطيري", text: "أنا جربت زر بدء التوقع على الموبايل، سريع جداً وما فيه لاج 📱⚡.", time: "منذ 30 دقيقة" },
    { name: "هيثم وجدي", text: "العنكبوت دائماً بيجيب من الآخر 🕷️، كود spiderbet والسكربت ولا غلطة 👌🔥.", time: "منذ ساعة" }
];`;
content = content.replace(/const USER_COMMENTS = \[[\s\S]*?\];/m, newComments);

// 2. Replace onlineUsers logic
content = content.replace(/useState<number>\(1402\)/, 'useState<number>(18402)');
content = content.replace(/Math\.max\(1300, prev \+ change\)/, 'Math.max(18000, prev + change)');

// 3. Replace liveBets logic (9 digit IDs)
content = content.replace(/const idPrefix = Math\.floor\(Math\.random\(\) \* 900\) \+ 100;/, 'const idPrefix = Math.floor(Math.random() * 900000) + 158000;');

// 4. Move Contest Section
const contestRegex = /\{\/\* Contest Section moved here \*\/\}\s*<div className="mt-8 mb-6">\s*<motion\.div[\s\S]*?<\/motion\.div>\s*<\/div>/;
const match = content.match(contestRegex);
if (match) {
  const contestSection = match[0];
  content = content.replace(contestRegex, ''); // Remove from current location
  
  // Insert right before User Comments Section
  const commentsRegex = /\{\/\* User Comments Section \*\/\}/;
  content = content.replace(commentsRegex, contestSection + '\n\n          {/* User Comments Section */}');
}

fs.writeFileSync(path, content, 'utf8');
console.log('Replacements done.');
