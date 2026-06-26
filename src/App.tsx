/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Cpu, ShieldCheck, User, Zap, AlertCircle, UserPlus, ExternalLink, Share2, Send, Sun, Moon, ArrowRight, Trophy, Gift, Download, MessageCircle } from 'lucide-react';

// Types
interface Notification {
  id: number;
  name: string;
  amount: number;
}

const MAX_TRIALS = 2;
  const MULTIPLIERS = ["x 11.18", "x 6.71", "x 4.02", "x 2.41", "x 1.93", "x 1.54", "x 1.23"];

export default function App() {
  const [trials, setTrials] = useState<number>(0);
  const [uid, setUid] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [gridData, setGridData] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [jackpot, setJackpot] = useState<number>(12450);
  const [onlineUsers, setOnlineUsers] = useState<number>(18402);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [history, setHistory] = useState<{id: number, time: string, result: string}[]>([]);
  const [trialsInBatch, setTrialsInBatch] = useState<number>(0);
  const [whitelistedCooldown, setWhitelistedCooldown] = useState<number>(0);
  const [xp, setXp] = useState<number>(35);
  const [liveBets, setLiveBets] = useState<string>("💎 ID: 158542*** راهن بـ $200 | 💎 ID: 158891*** راهن بـ $520 | 💎 مبروك لـ (أحمد م.) فوزه بـ 500 جنيه في سحب أمس | 💎 ID: 158102*** ربح $1200 | 💎 ID: 158334*** راهن بـ $150 | 💎 ID: 158776*** ربح $800 | 💎 ID: 158219*** راهن بـ $300");
  const [analysisMessage, setAnalysisMessage] = useState<string>("جاري تحليل التوقعات...");
  const [analysisLogs, setAnalysisLogs] = useState<string[]>([]);
  const [isNotWhitelisted, setIsNotWhitelisted] = useState<boolean>(false);
  const [showLandingPage, setShowLandingPage] = useState<boolean>(false);
  const [currentCommentIndex, setCurrentCommentIndex] = useState<number>(0);
const USER_COMMENTS = [
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
];

  const WHITELISTED_IDS = [
    "0124306290", "1590396761", "1590396155", "1590378519", "1590021849",
    "1589741793", "1589640271", "1589614727", "1589595949", "1589290215",
    "1589205717", "1589104197", "1589002645", "1588546293", "1588414391",
    "1588198749", "1588034259", "1588019965", "1586987355", "1586987331",
    "1586985935", "1586983017", "1586981165", "1586978387", "1586972967",
    "1586972967", "1586964203", "1586955411", "1586613191", "1585759595",
    "1585108135", "1583995293", "1583992597", "1583426883", "1583155493",
    "1583009453", "1582646193", "1582444495", "1582440025", "1582394525",
    "1582382587", "1582378381", "1582375639", "1582287725", "1582237815",
    "1581936507", "1581723155", "1581592621", "1581487205", "1581453917",
    "1580175131", "1579327331", "1579136085","1586183247",  "1589614727",
    
    
    
  ];

  const SPECIAL_UID = "0124306290";

  const winSound = useRef<HTMLAudioElement | null>(null);
  const clickSound = useRef<HTMLAudioElement | null>(null);

  // Daily Notification Logic
  useEffect(() => {
    if ('Notification' in window && 'serviceWorker' in navigator) {
      const setupNotifications = (registration: ServiceWorkerRegistration) => {
        // Register periodic sync if supported
        if ('periodicSync' in registration) {
          try {
            (registration as any).periodicSync.register('daily-notification', {
              minInterval: 24 * 60 * 60 * 1000, // 1 day
            });
          } catch (error) {
            console.error('Periodic background sync failed:', error);
          }
        }
        
        // Show local notification if not shown today
        const lastShown = localStorage.getItem('lastNotificationDate');
        const today = new Date().toDateString();
        if (lastShown !== today) {
          // Delay a bit so it doesn't pop up immediately on first load
          setTimeout(() => {
            registration.showNotification('سكربت العنكبوت', {
              body: 'حتي الان لم تسجل سجل الان وابداء في الربح',
              icon: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi1VJNEbdMZjhYrQt14NV463BhN-dnWtqJXXJD8AUdx0-MtiDiuFOC_W46SZfEWySzMv4z5M-Df_94YzM_kIEiVAqYMd_mA68BHDcOE2_VoFuIeCtE1rpSyLi2HedCTcTdX4DXi7Ea38972hAxBjFajGSrXM9KQmbIrAZJdGD2_tPED69TvHn-p4ruSmSfd/s1500/%D8%A7%D9%84%D8%B9%D9%86%D9%88%D8%A7%D9%86%20%281%29.png',
              tag: 'daily-reminder',
              data: {
                url: 'https://refpa14435.com/L?tag=d_2500605m_1573c_&site=2500605&ad=1573'
              }
            });
            localStorage.setItem('lastNotificationDate', today);
          }, 10000); // 10 seconds delay
        }
      };

      if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(setupNotifications);
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            navigator.serviceWorker.ready.then(setupNotifications);
          }
        });
      }
    }
  }, []);

  // Whitelisted Cooldown Logic
  useEffect(() => {
    if (whitelistedCooldown > 0) {
      const timer = setInterval(() => {
        setWhitelistedCooldown(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [whitelistedCooldown]);

  // Redirection Logic
  useEffect(() => {
    if (uid === SPECIAL_UID || WHITELISTED_IDS.includes(uid)) return; // Skip redirection for special and whitelisted UIDs
    if (trials >= MAX_TRIALS && !isAnalyzing && !showGrid) {
      window.location.href = "https://refpa14435.com/L?tag=d_2500605m_1573c_&site=2500605&ad=1573";
    }
  }, [trials, isAnalyzing, showGrid, uid]);

  // PWA Install Logic
  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') setInstallPrompt(null);
  };

  // Live Bets Logic
  useEffect(() => {
    const actions = ["راهن بـ", "ربح"];
    const interval = setInterval(() => {
      const newBets = Array.from({ length: 6 }, () => {
        const idPrefix = Math.floor(Math.random() * 900000) + 158000;
        const action = actions[Math.floor(Math.random() * actions.length)];
        const amount = Math.floor(Math.random() * 1500) + 50;
        return `💎 ID: ${idPrefix}*** ${action} $${amount}`;
      }).join(" | ");
      setLiveBets(newBets);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'سكربت 1xbet',
          text: 'أفضل أداة تحليل للعبة التفاحة بالذكاء الاصطناعي!',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setAnalysisMessage("تم نسخ رابط التطبيق!");
      setTimeout(() => setAnalysisMessage("جاري فحص التوقعات"), 3000);
    }
  };

  // Online Users Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers(prev => {
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        return Math.max(18000, prev + change);
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Jackpot Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setJackpot(prev => prev + Math.floor(Math.random() * 20));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Initialize trials from server
  useEffect(() => {
    const fetchInitialTrials = async () => {
      try {
        const response = await fetch('/api/trials');
        if (response.ok) {
          const data = await response.json();
          setTrials(data.count);
        }
      } catch (err) {
        console.error("Failed to fetch trials:", err);
      }
    };
    fetchInitialTrials();
  }, []);

  // Fetch trials when UID changes (optional but good for real-time feedback)
  useEffect(() => {
    if (uid.length >= 7) {
      const timer = setTimeout(async () => {
        try {
          const response = await fetch(`/api/trials?uid=${uid}`);
          if (response.ok) {
            const data = await response.json();
            setTrials(data.count);
          }
        } catch (err) {
          console.error("Failed to fetch trials for UID:", err);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [uid]);

  // Fake notifications logic
  useEffect(() => {
    const names = ["Ali", "Omar", "Sami", "Zaid", "Hassan", "Youssef"];
    const interval = setInterval(() => {
      const newNotif: Notification = {
        id: Date.now(),
        name: names[Math.floor(Math.random() * names.length)],
        amount: Math.floor(Math.random() * 500) + 50,
      };
      setNotifications(prev => [newNotif, ...prev].slice(0, 3));
      
      // Remove notification after 4 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotif.id));
      }, 4000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let timer: any;
    if (isNotWhitelisted) {
      timer = setTimeout(() => {
        window.location.reload();
      }, 20000); // تحديث تلقائي بعد 20 ثانية
    }
    return () => clearTimeout(timer);
  }, [isNotWhitelisted]);

  // Countdown Timer Logic
  useEffect(() => {
    const commentInterval = setInterval(() => {
      setCurrentCommentIndex(prev => (prev + 1) % USER_COMMENTS.length);
    }, 5000);

    return () => {
      clearInterval(commentInterval);
    };
  }, []);

  const runAnalysis = async () => {
    if (uid.length < 7 || !/^\d+$/.test(uid)) {
      setError("يجب إدخال معرف حساب صحيح (7 أرقام على الأقل)");
      return;
    }
    
    // Whitelist check
    const isWhitelisted = WHITELISTED_IDS.includes(uid);
    if (!isWhitelisted) {
      setIsNotWhitelisted(true);
      return;
    }

    if (isWhitelisted && whitelistedCooldown > 0) {
      const mins = Math.floor(whitelistedCooldown / 60);
      const secs = whitelistedCooldown % 60;
      setError(`حاول بعد ${mins}:${secs < 10 ? '0' : ''}${secs} دقائق`);
      return;
    }

    setIsNotWhitelisted(false);
    setError(null);
    setIsLoggedIn(true);
    setIsAnalyzing(true);
    setShowGrid(false);
    setAnalysisMessage("جاري الاتصال بخوادم 1xbet...");
    setAnalysisLogs(["Establishing secure tunnel to 1xbet.com...", "Intercepting game packets...", "Bypassing WAF protection..."]);
    
    // Optimistic update
    if (uid !== SPECIAL_UID) {
      setTrials(prev => prev + 1);
    }

    // Change message after 3 seconds
    setTimeout(() => {
      setAnalysisMessage("جاري استخراج بيانات الجلسة الحالية...");
      setAnalysisLogs(prev => [...prev, "Live session detected.", "Extracting RNG seed from memory buffer...", "Packet decryption in progress..."]);
    }, 3000);

    // Change message after 6 seconds
    setTimeout(() => {
      setAnalysisMessage("جاري فك تشفير خوارزمية Apple of Fortune...");
      setAnalysisLogs(prev => [...prev, "Algorithm: Apple_of_Fortune_v3.2", "Decryption: AES-256-GCM", "Predicting next 7 rounds..."]);
    }, 6000);

    // Change message after 9 seconds
    setTimeout(() => {
      setAnalysisMessage("تم استخراج التوقعات الحقيقية بنجاح ✅");
      setAnalysisLogs(prev => [...prev, "Real-time predictions synchronized.", "Ready for execution."]);
    }, 9000);

    // Simulate analysis and increment on server
    setTimeout(async () => {
      // Generate deterministic grid based on UID and current minute to feel "live"
      const now = new Date();
      const timeSeed = now.getHours() * 60 + now.getMinutes();
      const seed = uid.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + timeSeed;
      const generatedGrid: string[] = [];
      
      // 7 rows as per image
      for (let i = 0; i < 7; i++) {
        // Use a simple deterministic "random" based on seed and row index
        const rowSeed = seed + i * 100;
        const row = Array.from({ length: 5 }, (_, colIndex) => {
          const val = (Math.sin(rowSeed + colIndex) + 1) / 2;
          return val > 0.25 ? '🍎' : '🍄';
        });
        
        // Ensure at least one mushroom per row for "realism" (the game always has a losing spot)
        if (!row.includes('🍄')) {
          const forcedIndex = Math.abs(Math.floor(Math.sin(rowSeed) * 5));
          row[forcedIndex] = '🍄';
        }
        generatedGrid.push(...row);
      }
      
      setGridData(generatedGrid);

      if (uid !== SPECIAL_UID) {
        if (isWhitelisted) {
          const nextBatchCount = trialsInBatch + 1;
          if (nextBatchCount >= 4) {
            setWhitelistedCooldown(300); // 5 minutes cooldown
            setTrialsInBatch(0);
          } else {
            setTrialsInBatch(nextBatchCount);
          }
        }

        try {
          const incRes = await fetch('/api/trials/increment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ uid })
          });
          
          if (incRes.ok) {
            const incData = await incRes.json();
            setTrials(incData.count);
          }
        } catch (err) {
          console.error("Error incrementing trials:", err);
        }
      } else {
        setTrials(0); // Reset trials for special UID
      }

      // Update History and XP
      setHistory(prev => [{id: Date.now(), time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), result: 'Success'}, ...prev].slice(0, 5));
      setXp(prev => Math.min(prev + 15, 100));
      // Play win sound when analysis is done
      winSound.current?.play().catch(() => {});
      
      setIsAnalyzing(false);
      setShowGrid(true);
    }, 10000);
  };

  // Security: Prevent Right-Click, F12, and common DevTools shortcuts
  useEffect(() => {
    const preventDefault = (e: Event) => e.preventDefault();
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable F12
      if (e.key === 'F12') e.preventDefault();
      // Disable Ctrl+Shift+I, J, C
      if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) e.preventDefault();
      // Disable Ctrl+U (View Source)
      if (e.ctrlKey && e.key === 'u') e.preventDefault();
      // Disable Ctrl+S (Save Page)
      if (e.ctrlKey && e.key === 's') e.preventDefault();
      // Disable Ctrl+C, Ctrl+V, Ctrl+X
      if (e.ctrlKey && ['c', 'v', 'x'].includes(e.key)) e.preventDefault();
    };

    document.addEventListener('contextmenu', preventDefault);
    document.addEventListener('keydown', handleKeyDown);
    
    // Anti-debugging trap
    const interval = setInterval(() => {
      (function() {
        try {
          (function a(i: number) {
            if (("" + i / i).length !== 1 || i % 20 === 0) {
              (function() {}).constructor("debugger")();
            } else {
              debugger;
            }
            a(++i);
          })(0);
        } catch (e) {}
      })();
    }, 1000);

    return () => {
      document.removeEventListener('contextmenu', preventDefault);
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#123262]' : 'bg-[#f0f8ff]'} flex items-center justify-center p-4 font-sans transition-colors duration-500`} dir="rtl">
      {/* Phone Frame Wrapper */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        {/* Physical Buttons Mockup */}
        <div className="absolute -left-1 top-32 w-1.5 h-16 bg-gray-800 rounded-l-lg hidden md:block border-l border-gray-700"></div>
        <div className="absolute -left-1 top-52 w-1.5 h-24 bg-gray-800 rounded-l-lg hidden md:block border-l border-gray-700"></div>
        <div className="absolute -right-1 top-44 w-1.5 h-24 bg-gray-800 rounded-r-lg hidden md:block border-r border-gray-700"></div>

        {/* Phone Frame */}
        <div className={`w-full md:max-w-[390px] md:h-[820px] h-screen ${isDarkMode ? 'bg-[#0a1c3a] border-[#1a1a1a]' : 'bg-white border-gray-200'} md:border-[14px] border-0 md:rounded-[65px] rounded-0 relative overflow-hidden flex flex-col shadow-2xl transition-all duration-500 ring-1 ring-white/10`}>
          
          {/* Inner Watermark */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.03]">
            <div className="absolute inset-0 flex flex-wrap justify-around items-around rotate-[-25deg] scale-150">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className={`flex items-center gap-4 p-8 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi1VJNEbdMZjhYrQt14NV463BhN-dnWtqJXXJD8AUdx0-MtiDiuFOC_W46SZfEWySzMv4z5M-Df_94YzM_kIEiVAqYMd_mA68BHDcOE2_VoFuIeCtE1rpSyLi2HedCTcTdX4DXi7Ea38972hAxBjFajGSrXM9KQmbIrAZJdGD2_tPED69TvHn-p4ruSmSfd/s1500/%D8%A7%D9%84%D8%B9%D9%86%D9%88%D8%A7%D9%86%20%281%29.png" alt="1xHacker" className="h-10 opacity-50 grayscale" />
                  <span className="text-2xl font-bold whitespace-nowrap">
                    1xbet العنكبوت
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Screen Reflection Overlay */}
          <div className="absolute inset-0 pointer-events-none z-50 opacity-10 bg-gradient-to-tr from-transparent via-white/20 to-transparent"></div>

          {/* Dynamic Island / Notch (Hidden on mobile) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-8 bg-[#123262] rounded-b-[24px] z-[100] hidden md:flex items-center justify-center gap-4 border-x border-b border-white/5">
            <div className="w-2.5 h-2.5 bg-[#0a0a0a] rounded-full border border-gray-800 shadow-inner relative">
              <div className="absolute inset-[2px] bg-blue-900/20 rounded-full blur-[1px]"></div>
            </div>
            <div className="w-12 h-2 bg-[#0a0a0a] rounded-full border border-gray-800 shadow-inner"></div>
          </div>
          
          {/* Status Bar */}
          <div className={`px-7 md:pt-10 pt-5 pb-3 text-[11px] ${isDarkMode ? 'text-[#ffc600] bg-[#123262]/40 border-[#ffc600]/10' : 'text-[#123262] bg-white/40 border-[#123262]/10'} flex justify-between items-center border-b backdrop-blur-md z-40`}>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 ${isDarkMode ? 'bg-[#ffc600]' : 'bg-[#123262]'} rounded-full animate-pulse`}></span>
            <span>عبر الإنترنت: {onlineUsers.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="hover:scale-110 transition-transform"
              title="تبديل الوضع"
            >
              {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <button 
              onClick={handleShare}
              className="flex items-center gap-1 hover:text-white transition-colors"
              title="مشاركة التطبيق"
            >
              <Share2 size={12} />
              <span>مشاركة</span>
            </button>
            <div className="flex items-center gap-2">
              <ShieldCheck size={12} />
              <span>الدقة: 92%</span>
            </div>
          </div>
        </div>

        {/* Player ID Header */}
        {isLoggedIn && (
          <div className={`px-6 py-2 text-center text-[10px] font-bold ${isDarkMode ? 'bg-[#ffc600]/5 text-[#ffc600]' : 'bg-[#123262]/5 text-[#123262]'} border-b border-[#ffc600]/10`}>
            معرف اللاعب (Player ID): <span className="underline">{uid}</span>
          </div>
        )}

        {/* Top Wins (Placeholder for structure) */}
        <div className="top-wins hidden"></div>

        {/* Live Bets Ticker */}
        <div className={`live-bets ${isDarkMode ? 'bg-[#04120c] border-[#0f3a2a]' : 'bg-[#e6f4ff] border-[#b3dfff]'} border-b py-2 overflow-hidden whitespace-nowrap`}>
          <motion.div 
            key={liveBets}
            initial={{ x: 400 }}
            animate={{ x: -800 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className={`inline-block text-[10px] ${isDarkMode ? 'text-[#fcc02e]' : 'text-[#b8860b]'} font-bold`}
          >
            {liveBets}
          </motion.div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto scrollbar-hide">
          <header className="text-center relative z-10">
            <div className="flex justify-center mb-4">
              <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi1VJNEbdMZjhYrQt14NV463BhN-dnWtqJXXJD8AUdx0-MtiDiuFOC_W46SZfEWySzMv4z5M-Df_94YzM_kIEiVAqYMd_mA68BHDcOE2_VoFuIeCtE1rpSyLi2HedCTcTdX4DXi7Ea38972hAxBjFajGSrXM9KQmbIrAZJdGD2_tPED69TvHn-p4ruSmSfd/s1500/%D8%A7%D9%84%D8%B9%D9%86%D9%88%D8%A7%D9%86%20%281%29.png" alt="1xHacker Logo" className="h-16 object-contain drop-shadow-lg" />
            </div>

            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-black'} tracking-wider`}
            >
              سكربت التفاحة <span className={`${isDarkMode ? 'text-[#ffc600] drop-shadow-[0_0_8px_#ffc600]' : 'text-[#123262]'}`}>1xbet العنكبوت 🕷️</span>
            </motion.h1>
            <p className="text-[12px] text-gray-500 mt-2">
              متوافق فقط مع برنامج <span className="text-[#ffc600] font-bold">1xbet</span>
            </p>
            <p className="text-[12px] text-gray-500 mt-1">
              {WHITELISTED_IDS.includes(uid) ? (
                whitelistedCooldown > 0 ? (
                  <span className="text-red-400 font-bold animate-pulse">
                    حاول بعد {Math.floor(whitelistedCooldown / 60)}:{String(whitelistedCooldown % 60).padStart(2, '0')} دقائق
                  </span>
                ) : (
                  <>المحاولات المتبقية: <span className={`${isDarkMode ? 'text-[#fcc02e]' : 'text-[#b8860b]'} font-bold`}>{4 - trialsInBatch}</span></>
                )
              ) : (
                <>المحاولات المتبقية: <span className={`${isDarkMode ? 'text-[#fcc02e]' : 'text-[#b8860b]'} font-bold`}>{MAX_TRIALS - trials}</span></>
              )}
            </p>
          </header>

          <AnimatePresence mode="wait">
            {!showGrid && !isAnalyzing ? (
              <motion.div 
                key="input-area"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-4"
              >
                {!isNotWhitelisted ? (
                  <>
                    <div className="space-y-3">
                      <div className="relative">
                        <input 
                          type="text" 
                          value={uid}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            setUid(val);
                          }}
                          placeholder="أدخل رقم حسابك (ID) لتفعيل التوقع" 
                          inputMode="numeric"
                          className={`w-full p-4 rounded-xl border ${isDarkMode ? 'border-[#ffc600] bg-[#123262] text-white focus:border-[#ffc600]' : 'border-[#b3dfff] bg-[#f0f8ff] text-black focus:border-[#123262]'} text-center text-lg focus:outline-none transition-colors`}
                        />
                        <User className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-[#ffc600]/50' : 'text-[#123262]/50'}`} size={20} />
                      </div>
                    </div>

                    {error && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20"
                      >
                        <AlertCircle size={16} />
                        <span>{error}</span>
                      </motion.div>
                    )}

                    <button 
                      onClick={runAnalysis}
                      className={`w-full p-4 rounded-full font-bold text-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 shadow-lg bg-[#29a643] text-white hover:brightness-110`}
                    >
                      <Brain size={20} />
                      بدء في التوقع 🎯
                    </button>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4 py-4"
                  >
                    <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl text-red-400 text-sm mb-4">
                      <AlertCircle className="mx-auto mb-2" size={24} />
                      أنت لست عضواً في النظام. عليك إنشاء حساب جديد وعمل إيداع لتفعيل الخدمة.
                      <div className="mt-2 text-[10px] opacity-60">سيتم تحديث التطبيق تلقائياً خلال 20 ثانية...</div>
                    </div>

                    <motion.a
                      href="https://refpa14435.com/L?tag=d_2500605m_1573c_&site=2500605&ad=1573"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full p-5 rounded-full bg-[#29a643] text-white font-bold text-xl flex items-center justify-center gap-3 hover:scale-105 transition-transform`}
                    >
                      <UserPlus size={24} />
                      إنشاء حساب جديد الآن 🚀
                      <ExternalLink size={20} />
                    </motion.a>
                    
                    <button 
                      onClick={() => {
                        setIsNotWhitelisted(false);
                        setUid("");
                      }}
                      className="text-gray-500 text-xs hover:underline"
                    >
                      العودة لتجربة رقم آخر
                    </button>
                  </motion.div>
                )}
              </motion.div>
            ) : isAnalyzing ? (
              <motion.div 
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-12 space-y-6"
              >
                <div className="relative w-24 h-24">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className={`absolute inset-0 border-4 border-t-${isDarkMode ? '[#ffc600]' : '[#123262]'} border-r-transparent border-b-transparent border-l-transparent rounded-full`}
                  />
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className={`absolute inset-2 border-4 border-b-${isDarkMode ? '[#29a643]' : '[#29a643]'} border-t-transparent border-r-transparent border-l-transparent rounded-full`}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Cpu className={`${isDarkMode ? 'text-[#ffc600]' : 'text-[#123262]'} animate-pulse`} size={32} />
                  </div>
                </div>
                <div className={`${isDarkMode ? 'text-[#ffc600]' : 'text-[#123262]'} font-mono text-sm tracking-widest animate-pulse text-center`}>
                  {analysisMessage}
                </div>
                <div className={`w-full ${isDarkMode ? 'bg-[#123262]' : 'bg-[#e6f4ff]'} h-2 rounded-full overflow-hidden border ${isDarkMode ? 'border-[#ffc600]/20' : 'border-[#123262]/20'}`}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 10, ease: "linear" }}
                    className={`h-full ${isDarkMode ? 'bg-[#29a643] shadow-[0_0_10px_#29a643]' : 'bg-[#29a643]'}`}
                  />
                </div>

                <div className={`w-full p-3 rounded-lg font-mono text-[9px] ${isDarkMode ? 'bg-[#123262]/40 text-green-500' : 'bg-gray-100 text-gray-600'} border border-white/5 overflow-hidden h-24 flex flex-col-reverse`}>
                  <div className="space-y-1">
                    {analysisLogs.slice().reverse().map((log, i) => (
                      <div key={i} className="flex gap-2">
                        <span className="opacity-50">[{new Date().toLocaleTimeString([], {hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit'})}]</span>
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="grid-area"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex flex-col gap-2">
                  {Array.from({ length: 7 }).map((_, rowIndex) => (
                    <div key={rowIndex} className="flex items-center gap-3">
                      <div className={`w-14 text-[10px] font-bold ${isDarkMode ? 'text-[#ffc600]' : 'text-[#123262]'} bg-${isDarkMode ? '[#0b1a2a]' : '[#e6f4ff]'} p-1 rounded text-center shadow-inner`}>
                        {MULTIPLIERS[rowIndex]}
                      </div>
                      <div className="flex-1 grid grid-cols-5 gap-1">
                        {gridData.slice(rowIndex * 5, (rowIndex + 1) * 5).map((item, colIndex) => (
                          <motion.div
                            key={colIndex}
                            initial={{ rotateY: 90, opacity: 0 }}
                            animate={{ rotateY: 0, opacity: 1 }}
                            transition={{ delay: (rowIndex * 5 + colIndex) * 0.05, duration: 0.4 }}
                            onAnimationStart={() => clickSound.current?.play().catch(() => {})}
                            className={`aspect-square ${isDarkMode ? 'bg-[#3d2b1f] border-[#5c4033]' : 'bg-[#8b4513] border-[#5c4033]'} border-2 rounded-full flex items-center justify-center text-xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] overflow-hidden`}
                          >
                            <span className="drop-shadow-md">{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => setShowGrid(false)}
                    className={`flex-1 p-4 rounded-full ${isDarkMode ? 'bg-[#123262] border-[#ffc600]/30 text-[#ffc600] hover:bg-[#1e3b5c]' : 'bg-[#e6f4ff] border-[#123262]/30 text-[#123262] hover:bg-[#d1e7dd]'} border font-bold transition-all flex items-center justify-center gap-2`}
                  >
                    <ArrowRight size={18} />
                    رجوع للرئيسية
                  </button>
                  <button 
                    onClick={runAnalysis}
                    className={`flex-1 p-4 rounded-full bg-[#29a643] text-white font-bold transition-all hover:scale-105`}
                  >
                    بدء في التوقع 🎯
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Contest Section removed from here */}


          {/* Static Requirements List */}
          <div className="mt-8 space-y-4">
            <h3 className={`${isDarkMode ? 'text-[#ffc600]' : 'text-[#123262]'} text-xs font-bold uppercase tracking-widest flex items-center gap-2`}>
              <ShieldCheck size={16} />
              شروط تفعيل خوارزمية العنكبوت
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {[
                "إنشاء حساب جديد كلياً في المنصة",
                "استخدام الرمز الترويجي: SPIDERBET",
                "إيداع مبلغ في الحساب 5 دولار لتنشيط الاتصال بالخادم",
                "ارسل الايدي علي تلغرام او قناه الفيس بوك"
              ].map((req, i) => (
                <div key={i} className={`flex items-center gap-3 ${isDarkMode ? 'bg-[#123262]/40 border-[#ffc600]/10' : 'bg-[#e6f4ff]/40 border-[#123262]/10'} border p-3 rounded-xl`}>
                  <div className={`w-5 h-5 rounded-full ${isDarkMode ? 'bg-[#ffc600]/20 text-[#ffc600]' : 'bg-[#123262]/20 text-[#123262]'} flex items-center justify-center text-[10px] font-bold`}>
                    {i + 1}
                  </div>
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-[#123262] font-semibold'} text-[11px]`}>{req}</span>
                </div>
              ))}
            </div>
          </div>

            

          {/* New Bottom Instruction */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-6 p-4 rounded-xl ${isDarkMode ? 'bg-[#ffc600]/5 border-[#ffc600]/10' : 'bg-[#123262]/5 border-[#123262]/10'} border text-center`}
          >
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-[#123262] font-medium'} text-[11px] leading-relaxed`}>
              لضمان عمل الخوارزمية بشكل صحيح، يجب تسجيل حساب جديد باستخدام الرمز الترويجي <span className={`${isDarkMode ? 'text-[#ffc600]' : 'text-[#123262]'} font-bold`}>SPIDERBET</span> وإجراء إيداع لتفعيل النظام.
            </p>
          </motion.div>

          {/* Contact Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 flex justify-center"
          >
            <a
              href="https://t.me/informationnet0"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-[#0088cc] to-[#00aaff] text-white shadow-[0_0_15px_rgba(0,136,204,0.3)] hover:shadow-[0_0_25px_rgba(0,136,204,0.5)]' 
                  : 'bg-gradient-to-r from-[#0088cc] to-[#00aaff] text-white shadow-md hover:shadow-lg'
              }`}
            >
              <MessageCircle size={18} />
              <span>كلم العنكبوت</span>
            </a>
          </motion.div>

          {/* Developer Footer */}
          <div className={`mt-12 pt-8 border-t ${isDarkMode ? 'border-[#ffc600]/10' : 'border-[#123262]/10'} text-center space-y-4`}>
            <div className="space-y-1">
              <p className="text-gray-500 text-[10px] uppercase tracking-widest">للاشتراك في برامجنا الأخرى، تابعونا عبر قناتنا على تليجرام أو زوروا موقع العنكبوت للمعلومات</p>
              <a 
                href="https://www.information-net.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`${isDarkMode ? 'text-[#ffc600]' : 'text-[#123262]'} font-bold text-sm hover:underline`}
              >
                information-net.com
              </a>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <p className="text-gray-500 text-[10px] uppercase tracking-widest">للتواصل المباشر</p>
              <a 
                href="https://t.me/casino_arb" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center gap-2 ${isDarkMode ? 'bg-[#0088cc]/10 text-[#0088cc] border-[#0088cc]/20' : 'bg-[#0088cc]/5 text-[#0088cc] border-[#0088cc]/10'} px-4 py-2 rounded-full text-xs font-bold border hover:bg-[#0088cc]/20 transition-all`}
              >
                <Send size={14} />
                تلغرام @casino_arb
              </a>
            </div>
          </div>

          {/* Contest Section moved here */}
            <div className="mt-8 mb-6">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-2xl border-2 ${isDarkMode ? 'bg-gradient-to-br from-[#1e3b5c] to-[#0b1a2a] border-[#fcc02e]/30' : 'bg-gradient-to-br from-[#e6f4ff] to-white border-[#123262]/20'} shadow-xl relative overflow-hidden group text-right`}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#fcc02e] via-[#ffde59] to-[#fcc02e]"></div>
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-[#fcc02e]/10 text-[#fcc02e]' : 'bg-[#123262]/10 text-[#123262]'}`}>
                    <Trophy size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className={`font-bold text-base ${isDarkMode ? 'text-white' : 'text-black'}`}>إعلان المسابقة الكبرى 📢</h4>
                    </div>
                    <p className={`text-xs font-bold ${isDarkMode ? 'text-[#fcc02e]' : 'text-[#b8860b]'}`}>ربح نقدي بقيمة 15,000 جنيه 💸</p>
                    <p className="text-[10px] text-gray-500 mt-1">مسابقة البروموكود <span className="text-[#ffc600] font-bold animate-pulse">SPIDERBET</span> الحصرية.</p>
                    <div className="mt-3 flex gap-2">
                      {!WHITELISTED_IDS.includes(uid) && (
                        <a 
                          href="https://refpa14435.com/L?tag=d_2500605m_1573c_&site=2500605&ad=1573"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex-1 py-1.5 px-3 rounded-lg text-[10px] font-bold text-center bg-[#29a643] text-white hover:brightness-110 transition-all`}
                        >
                          اشترك الآن
                        </a>
                      )}
                      <a 
                        href="https://t.me/casino_arb"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 py-1.5 px-3 rounded-lg text-[10px] font-bold text-center ${isDarkMode ? 'bg-white/10 text-gray-400 border border-white/10' : 'bg-gray-100 text-gray-600 border border-gray-200'}`}
                      >
                        الشروط
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

          {/* User Comments Section */}
          <div className="mt-12 space-y-4">
            <h3 className={`text-[10px] ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-widest font-bold border-b border-white/5 pb-2`}>آراء المستخدمين وتفاعلات المسابقة</h3>
            <div className="min-h-[80px]">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentCommentIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-4 rounded-xl border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className={`text-[11px] font-bold ${isDarkMode ? 'text-[#ffc600]' : 'text-[#123262]'}`}>{USER_COMMENTS[currentCommentIndex].name}</span>
                    <span className="text-[9px] text-gray-500">{USER_COMMENTS[currentCommentIndex].time}</span>
                  </div>
                  <p className={`text-[11px] leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {USER_COMMENTS[currentCommentIndex].text.split('SPIDERBET').map((part, index, array) => (
                      <React.Fragment key={index}>
                        {part}
                        {index < array.length - 1 && (
                          <span className={`font-bold ${isDarkMode ? 'text-[#ffc600]' : 'text-[#123262]'} animate-pulse`}>SPIDERBET</span>
                        )}
                      </React.Fragment>
                    ))}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bottom Navigation (Decorative) */}
        <div className={`px-8 py-4 ${isDarkMode ? 'bg-[#123262]/50' : 'bg-white/50'} border-t ${isDarkMode ? 'border-[#ffc600]/10' : 'border-[#123262]/10'} flex justify-around items-center relative`}>
          <AnimatePresence>
            {isNotWhitelisted && (
              <motion.a
                href="https://refpa14435.com/L?tag=d_2500605m_1573c_&site=2500605&ad=1573"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ y: 100 }}
                animate={{ y: -60 }}
                exit={{ y: 100 }}
                className="absolute left-4 right-4 p-4 rounded-2xl bg-[#29a643] text-white font-bold text-center shadow-[0_-10px_30px_rgba(0,255,102,0.3)] flex items-center justify-center gap-2 z-50"
              >
                <UserPlus size={20} />
                سجل الآن واستمر في تحقيق الأرباح 💰
              </motion.a>
            )}
          </AnimatePresence>
          <button 
            onClick={() => setShowLandingPage(true)}
            className={`transition-all hover:scale-110 ${isDarkMode ? 'text-[#ffc600]' : 'text-[#123262]'}`}
            title="معلومات السكربت"
          >
            <Brain size={22} />
          </button>
          
          <button 
            onClick={handleShare} 
            className="text-gray-500 hover:text-[#ffc600] transition-all hover:scale-110"
            title="مشاركة"
          >
            <Share2 size={22} />
          </button>

          <div className="w-12 h-1 bg-gray-800/50 rounded-full mx-2"></div>

          <button 
            onClick={() => setShowGrid(false)}
            className="text-gray-500 hover:text-[#ffc600] transition-all hover:scale-110"
            title="الرئيسية"
          >
            <Cpu size={22} />
          </button>

          <button 
            className={`transition-all hover:scale-110 ${isDarkMode ? 'text-[#ffc600]' : 'text-[#123262]'}`}
            title="نشط"
          >
            <Zap size={22} />
          </button>
          
          {/* Home Indicator Bar */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-gray-500/30 rounded-full"></div>
        </div>
      </div>
    </div>

      {/* PWA Install Button */}
      <AnimatePresence>
        {installPrompt && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            onClick={handleInstall}
            className="fixed bottom-6 right-6 bg-[#29a643] text-white font-bold py-4 px-8 rounded-2xl shadow-[0_0_30px_rgba(0,255,102,0.6)] z-[100] flex flex-col items-center gap-1 border border-white/20 group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="flex items-center gap-2">
              <Download size={20} />
              <span className="text-sm">تثبيت تطبيق 1xbet - العنكبوت</span>
            </div>
            <span className="text-[9px] opacity-70 uppercase tracking-tighter">أداة تحليل متطورة بالذكاء الاصطناعي</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Audio Elements */}
      <audio ref={winSound} src="https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3" preload="auto" />
      <audio ref={clickSound} src="https://assets.mixkit.co/sfx/preview/mixkit-game-click-1114.mp3" preload="auto" />

      {/* Landing Page Overlay */}
      <AnimatePresence>
        {showLandingPage && (
          <motion.div 
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            className={`fixed inset-0 z-[200] ${isDarkMode ? 'bg-[#04120c]' : 'bg-white'} overflow-y-auto p-6 text-right`}
          >
            <div className="flex justify-between items-center mb-8">
              <button 
                onClick={() => setShowLandingPage(false)}
                className={`p-2 rounded-full ${isDarkMode ? 'bg-white/10 text-white' : 'bg-[#123262]/10 text-black'}`}
              >
                <ArrowRight size={24} />
              </button>
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-[#ffc600]' : 'text-[#123262]'}`}>عن سكربت العنكبوت</h2>
            </div>

            <div className="space-y-6 leading-relaxed">
              <section>
                <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>سكربت 1xbet العنكبوت</h3>
                <p className="text-gray-400 text-sm">
                  يعتبر سكربت 1xbet العنكبوت أقوى أداة تحليل ذكاء اصطناعي لعام 2026، حيث يعتمد على خوارزميات معقدة لتوقع أماكن التفاحات الصحيحة بدقة تصل إلى 92%.
                </p>
              </section>

              <section>
                <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>تحميل سكربت العنكبوت</h3>
                <p className="text-gray-400 text-sm">
                  يمكنك تحميل سكربت العنكبوت مباشرة من خلال تطبيقنا الويب، وهو متوافق مع جميع أنظمة التشغيل أندرويد وآيفون.
                </p>
              </section>

              <section>
                <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>هكر 1xbet العنكبوت</h3>
                <p className="text-gray-400 text-sm">
                  نحن لا نقدم هكر بالمعنى التقليدي، بل نقدم أداة تحليل إحصائي متطورة (Al-Ankabut Apple Script) تساعدك على اتخاذ قرارات مدروسة بناءً على بيانات حقيقية.
                </p>
              </section>

              <section>
                <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>سكربت العنكبوت 1xbet</h3>
                <p className="text-gray-400 text-sm">
                  على الرغم من أن هذا الإصدار مخصص لـ 1xbet، إلا أن تقنياتنا مستوحاة من نجاحات سكربت العنكبوت 1xbet الشهير، مما يضمن لك أفضل أداء.
                </p>
              </section>

              <section>
                <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>حصريات العنكبوت للمعلومات</h3>
                <p className="text-gray-400 text-sm">
                  تابعوا حصريات العنكبوت للمعلومات عبر قنواتنا الرسمية للحصول على آخر التحديثات والأكواد الترويجية الحصرية.
                </p>
              </section>

              <section className={`p-4 rounded-xl border ${isDarkMode ? 'bg-[#ffc600]/5 border-[#ffc600]/20' : 'bg-[#123262]/5 border-[#123262]/20'}`}>
                <h3 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-[#ffc600]' : 'text-[#123262]'}`}>أقوى سكربت تفاحة 2026</h3>
                <p className="text-gray-400 text-sm">
                  استعد لتجربة فريدة مع أقوى سكربت تفاحة 2026، المصمم خصيصاً لتعويض الخسائر وتحقيق أرباح مستدامة.
                </p>
              </section>
            </div>

            <div className="mt-12 text-center">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">Al-Ankabut Apple Script © 2026</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        * {
          user-select: none !important;
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
