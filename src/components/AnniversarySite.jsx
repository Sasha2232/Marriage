import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- ИМПОРТЫ ИЗОБРАЖЕНИЙ ---
import mainPhoto from "../images/main.jpg";
import day1 from "../images/day1.JPG";
import day2 from "../images/day2.jpg";
import day3 from "../images/day3.jpg";
import day4 from "../images/day4.jpg";
import day5 from "../images/day5.jpg";
import day6 from "../images/day6.jpg";
import day7 from "../images/day7.jpg";
import day8 from "../images/day8.jpg";
import day9 from "../images/day9.JPG";
import day10 from "../images/day10.JPG";
import day11 from "../images/day11.jpg";
import day12 from "../images/day12.JPG";
import day13 from "../images/day13.jpg";
import day14 from "../images/day14.JPG";
import day15 from "../images/day15.JPG";
import day16 from "../images/day16.JPG";
import day17 from "../images/day17.jpg";
import day18 from "../images/day18.JPG";
import day19 from "../images/day19.JPG";
import day20 from "../images/day20.JPG";
import day21 from "../images/day21.jpg";
import day22 from "../images/day22.jpg";
import day23 from "../images/day23.jpeg";
import day24 from "../images/day24.jpg";

// ==========================================================
// 1. НАСТРОЙКИ
// ==========================================================
const GALLERY_DATA = [
    { 
        src: mainPhoto, 
        caption: 'Наш первый отпуск 🌴', 
        description: 'Этот момент навсегда останется в наших сердцах. Помню, как мы тогда гуляли до самого утра!' 
    },
    { 
        src: day5, 
        caption: 'День свадьбы 💍', 
        description: 'Самый счастливый день, когда мы стали одной семьей. Начало нашего большого пути.' 
    },
    { 
        src: day11, 
        caption: 'Просто мы ❤️', 
        description: 'Любовь, улыбки и теплые вечера, которые делают нашу жизнь ярче и уютнее.' 
    },
];

const COUPLE_NAME = 'Сергей & Ольга';
const WEDDING_DATE = '2006-12-24';
const HERO_PHOTO = mainPhoto;

const ALL_PHOTOS = [
    day1, day2, day3, day4, day5, day6, day7, day8, day9, day10,
    day11, day12, day13, day14, day15, day16, day17, day18, day19,
    day20, day21, day22, day23, day24, HERO_PHOTO, mainPhoto
];

const CALENDAR_MEMORIES = {
    1: { img: day3 }, 2: { img: day4 }, 3: { img: day5 },
    4: { img: day6 }, 6: { img: day7 }, 7: { img: day8 },
    8: { img: day9 }, 9: { img: day10 }, 10: { img: day11 },
    11: { img: day12 }, 12: { img: mainPhoto }, 13: { img: day24 },
    15: { img: day15 }, 16: { img: day16 }, 17: { img: day17 },
    18: { img: day18 }, 19: { img: day19 }, 20: { img: day20 },
    21: { img: day21 }, 22: { img: day22 }, 23: { img: day23 },
    24: { img: day14 }, 25: { img: day1 }, 26: { img: day2 },
};

// --- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ---
function TypewriterText({ text }) {
    const [displayed, setDisplayed] = useState('');
    useEffect(() => {
        let i = 0;
        setDisplayed(''); 
        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                setDisplayed(text.slice(0, i + 1));
                i++;
                if (i >= text.length) clearInterval(interval);
            }, 40);
            return () => clearInterval(interval);
        }, 150); 
        return () => clearTimeout(timeout);
    }, [text]);

    return (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-600 text-base md:text-lg leading-relaxed min-h-[3em]">
            {displayed}<motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity }} className="text-pink-400 font-bold">|</motion.span>
        </motion.p>
    );
}

function yearsTogether(weddingDate) {
    const w = new Date(weddingDate + 'T00:00:00');
    const now = new Date();
    let years = now.getFullYear() - w.getFullYear();
    const m = now.getMonth() - w.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < w.getDate())) years--;
    return years;
}

function formatDate(d) {
    if (!d) return "";
    return new Date(d).toLocaleDateString();
}

function CloudButton({ text, side = 'left' }) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if (visible) {
            const t = setTimeout(() => setVisible(false), 5000);
            return () => clearTimeout(t);
        }
    }, [visible]);

    return (
        <div className={`flex items-center gap-4 ${side === 'right' ? 'justify-end' : 'justify-start'} w-full`}>
            {side === 'left' && visible && (
                <motion.div initial={{scale:0.8, opacity:0}} animate={{scale:1, opacity:1}} className="bg-white/95 p-3 rounded-2xl shadow-xl text-sm max-w-[200px] border border-pink-100">
                    {text}
                </motion.div>
            )}
            <button onClick={() => setVisible(true)} className="bg-pink-200 hover:bg-pink-300 w-16 h-16 rounded-full shadow-lg text-2xl flex items-center justify-center transition-transform active:scale-90">💭</button>
            {side === 'right' && visible && (
                <motion.div initial={{scale:0.8, opacity:0}} animate={{scale:1, opacity:1}} className="bg-white/95 p-3 rounded-2xl shadow-xl text-sm max-w-[200px] border border-pink-100">
                    {text}
                </motion.div>
            )}
        </div>
    );
}

// ==========================================================
// ГЛАВНЫЙ КОМПОНЕНТ
// ==========================================================
export default function AnniversarySite() {
    const [messages, setMessages] = useState([]);
    const [form, setForm] = useState({ name: '', text: '' });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedMemory, setSelectedMemory] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [loading, setLoading] = useState(false);

    // Загрузка сообщений
    const fetchMessages = useCallback(async () => {
        try {
            const res = await fetch('/api/messages');
            if (!res.ok) throw new Error('Ошибка сервера');
            const data = await res.json();
            if (Array.isArray(data)) {
                setMessages(data);
            }
        } catch (err) {
            console.error("Ошибка загрузки данных:", err);
        }
    }, []);

    useEffect(() => {
        fetchMessages(); // Первая загрузка
        
        // Авто-обновление каждые 15 секунд, чтобы видеть новые сообщения от других
        const interval = setInterval(fetchMessages, 15000); 
        
        return () => clearInterval(interval);
    }, [fetchMessages]);

    // 2. Отправка сообщения
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!form.name || !form.text) return;
        setLoading(true);

        try {
            const res = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            
            const data = await res.json();
            
            if (res.ok) {
                // Если API возвращает весь список, ставим его. 
                // Если только одно сообщение - добавляем его в начало.
                if (Array.isArray(data)) {
                    setMessages(data);
                } else {
                    fetchMessages(); // Надежный перезапрос
                }
                setForm({ name: '', text: '' });
                alert("Поздравление сохранено в базе! ❤️");
            } else {
                alert("Ошибка сервера: " + (data.error || "Неизвестная ошибка"));
            }
        } catch (err) {
            alert("Не удалось отправить. Проверьте соединение с интернетом.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const id = setInterval(() => setCurrentIndex((prev) => (prev + 1) % GALLERY_DATA.length), 10000);
        return () => clearInterval(id);
    }, []);

    const getPhotoForDay = (day) => {
        if (CALENDAR_MEMORIES[day] && CALENDAR_MEMORIES[day].img) return CALENDAR_MEMORIES[day].img;
        return ALL_PHOTOS[day % ALL_PHOTOS.length];
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 text-gray-800 antialiased relative overflow-x-hidden pb-20">
            <BackgroundEffect />

            {/* HEADER */}
            <header className="max-w-5xl mx-auto px-6 py-6">
                <nav className="flex items-center justify-between">
                    <h1 className="text-2xl md:text-3xl font-serif text-pink-800">{COUPLE_NAME}</h1>
                    <div className="space-x-4 text-sm md:text-base">
                        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-pink-600">Главная</button>
                        <button onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-pink-600">Галерея</button>
                    </div>
                </nav>
            </header>

            {/* HERO */}
            <section className="relative px-6">
                <div className="max-w-5xl mx-auto h-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl relative">
                    <div className="absolute inset-0 bg-black/20 z-10" />
                    <img src={HERO_PHOTO} alt="Hero" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 z-20 flex items-center justify-center text-center text-white px-4">
                        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                            <h2 className="text-4xl md:text-6xl font-serif drop-shadow-xl mb-2">{COUPLE_NAME}</h2>
                            <p className="text-xl md:text-2xl font-light">{yearsTogether(WEDDING_DATE)} лет бесконечного счастья</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* КАЛЕНДАРЬ */}
            <section id="memory-calendar" className="max-w-3xl mx-auto mt-16 px-4">
                <style>{`
                    .hover-3d:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(244,114,182,0.3); }
                    .animate-pinkPulse { animation: pinkPulse 3s ease-in-out infinite; }
                    @keyframes pinkPulse { 0%, 100% { background-color: #fbcfe8; } 50% { background-color: #fdf2f8; } }
                `}</style>
                <h3 className="text-3xl font-semibold text-center text-pink-700 mb-8">Календарь воспоминаний 💌</h3>
                <div className="flex justify-center mb-10">
                    <button onClick={() => setShowCalendar(!showCalendar)} className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full shadow-lg transition-colors font-medium">
                        {showCalendar ? "Закрыть календарь" : "Открыть календарь"}
                    </button>
                </div>
                <AnimatePresence>
                    {showCalendar && (
                        <motion.div className="grid grid-cols-4 sm:grid-cols-7 gap-3 mt-6 bg-white/80 backdrop-blur-sm border border-pink-100 rounded-3xl shadow-xl p-6" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                            {Array.from({ length: 31 }, (_, i) => {
                                const day = i + 1;
                                const isSpecial = day === 24;
                                return (
                                    <motion.div key={day} layoutId={`day-${day}`} onClick={() => setSelectedMemory({ img: getPhotoForDay(day), date: day, text: day === 24 ? "Наш особенный день ✨" : "Наши счастливые воспоминания ❤️", isSpecial })} className={`relative flex items-center justify-center aspect-square border rounded-2xl cursor-pointer transition-all hover-3d ${isSpecial ? "animate-pinkPulse border-pink-400 ring-2 ring-pink-200" : "bg-white border-pink-100 hover:bg-pink-50"}`}>
                                        <div className="text-lg font-bold text-pink-700">{day}</div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {selectedMemory && (
                        <motion.div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setSelectedMemory(null)} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                            <motion.div layoutId={`day-${selectedMemory.date}`} className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 relative" onClick={(e) => e.stopPropagation()}>
                                <button onClick={() => setSelectedMemory(null)} className="absolute -top-12 right-0 text-white text-3xl">✕</button>
                                <img src={selectedMemory.img} alt="Moment" className="w-full h-72 object-cover rounded-2xl mb-4 shadow-md" />
                                <h4 className="text-2xl font-bold text-pink-600 mb-2">День {selectedMemory.date}</h4>
                                <TypewriterText text={selectedMemory.text} />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            {/* ГАЛЕРЕЯ */}
            <section id="gallery" className="max-w-5xl mx-auto mt-20 px-6">
                <h3 className="text-3xl font-semibold text-center text-pink-700 mb-10">Наши моменты 💞</h3>
                <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-6 md:p-10 border border-pink-50 relative">
                    <div className="flex flex-col md:flex-row gap-10 items-center">
                        <div className="w-full md:w-1/2 h-[400px] rounded-3xl overflow-hidden shadow-lg border-4 border-pink-50">
                            <AnimatePresence mode="wait">
                                <motion.img key={currentIndex} src={GALLERY_DATA[currentIndex].src} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.5 }} className="w-full h-full object-cover" />
                            </AnimatePresence>
                        </div>
                        <div className="w-full md:w-1/2 flex flex-col justify-center">
                            <AnimatePresence mode="wait">
                                <motion.div key={currentIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
                                    <h4 className="text-3xl font-serif text-pink-600 mb-6">{GALLERY_DATA[currentIndex].caption}</h4>
                                    <TypewriterText text={GALLERY_DATA[currentIndex].description} />
                                </motion.div>
                            </AnimatePresence>
                            <div className="flex gap-4 mt-10">
                                <button onClick={() => setCurrentIndex((prev) => (prev - 1 + GALLERY_DATA.length) % GALLERY_DATA.length)} className="w-12 h-12 flex items-center justify-center bg-pink-100 rounded-full hover:bg-pink-200 transition-colors text-pink-600 text-xl">‹</button>
                                <button onClick={() => setCurrentIndex((prev) => (prev + 1) % GALLERY_DATA.length)} className="w-12 h-12 flex items-center justify-center bg-pink-100 rounded-full hover:bg-pink-200 transition-colors text-pink-600 text-xl">›</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ПОЖЕЛАНИЯ */}
            <section className="max-w-5xl mx-auto mt-20 px-6">
                <div className="bg-gradient-to-r from-pink-100/40 to-rose-100/40 p-10 rounded-[3rem] text-center border border-white">
                    <h3 className="text-3xl font-semibold text-pink-700 mb-10">Пожелания друг другу 💌</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <CloudButton text="Счастья и любви нам на многие годы! Ты — мой мир. 🌷" side="right" />
                        <CloudButton text="Пусть каждый день начинается с твоей улыбки! 💖" side="left" />
                    </div>
                </div>
            </section>

            {/* ГРИТИНГИ */}
            <section id="greetings" className="max-w-3xl mx-auto mt-20 px-6">
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-pink-50">
                    <h3 className="text-2xl font-bold text-center text-pink-800 mb-8">Оставить поздравление ✍️</h3>
                    <form onSubmit={handleSendMessage} className="space-y-5">
                        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ваше имя" className="w-full p-4 bg-pink-50/30 border border-pink-100 rounded-2xl outline-none focus:ring-2 focus:ring-pink-300 transition-all" />
                        <textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} placeholder="Ваше поздравление" className="w-full p-4 bg-pink-50/30 border border-pink-100 rounded-2xl h-32 outline-none focus:ring-2 focus:ring-pink-300 transition-all resize-none" />
                        <button disabled={loading} type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-2xl font-bold shadow-lg transition-transform active:scale-95 disabled:bg-gray-400">
                            {loading ? "Отправка..." : "Отправить в сердце ❤️"}
                        </button>
                    </form>
                    <div className="mt-10 space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                        <AnimatePresence>
                            {messages.map((m, idx) => (
                                <motion.div key={m.id || idx} initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:20}} className="p-5 bg-pink-50/20 rounded-2xl border border-pink-50 relative group">
                                    <div className="flex justify-between items-start">
                                        <span className="font-bold text-pink-700">{m.name}</span>
                                    </div>
                                    <p className="text-gray-700 mt-2 italic leading-relaxed">"{m.text}"</p>
                                    <div className="text-[10px] text-gray-400 mt-3">{formatDate(m.created_at)}</div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </section>
        </div>
    );
}

const BackgroundEffect = () => (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {[...Array(20)].map((_, i) => (
            <motion.div key={i} className="absolute text-pink-200 opacity-40" style={{ left: `${Math.random() * 100}%`, top: `-5%`, fontSize: `${Math.random() * 20 + 10}px` }} animate={{ y: '110vh', rotate: 360, x: [0, 25, -25, 0] }} transition={{ duration: 12 + Math.random() * 8, repeat: Infinity, ease: "linear", delay: Math.random() * 10 }}>🌸</motion.div>
        ))}
    </div>
);