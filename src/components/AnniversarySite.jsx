import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- ИМПОРТЫ ИЗОБРАЖЕНИЙ ---
import mainPhoto from "../images/main.jpg";
import marriage from "../images/marriage.jpg";
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

// --- НАСТРОЙКИ ---
const GALLERY_DATA = [
    { src: day9, caption: 'Наш первый отпуск 🌴', description: 'Этот момент навсегда останется в наших сердцах. Помню, как мы тогда гуляли до самого утра!' },
    { src: marriage, caption: 'День свадьбы 💍', description: 'Самый счастливый день, когда мы стали одной семьей.' },
    { src: day11, caption: 'Просто мы ❤️', description: 'Любовь, улыбки и теплые вечера, которые делают нашу жизнь уютнее.' },
];

const COUPLE_NAME = 'Сергей & Ольга';
const WEDDING_DATE = '2005-12-24';
const HERO_PHOTO = mainPhoto;

const ALL_PHOTOS = [day1, day2, day3, day4, day5, day6, day7, day8, day9, day10, day11, day12, day13, day15, day16, day17, day18, day19, day20, day21, day22, day23, day24];

const CALENDAR_MEMORIES = {
    24: { img: day14, text: "Наш особенный день ✨" },
};

// Данные для одной заметки со всеми важными датами
const IMPORTANT_DATES = [
    { 
        title: 'Дата свадьбы', 
        date: '24 декабря 2006 года',
        icon: '💍'
    },
    { 
        title: 'Рождение первого сына', 
        date: '2007-10-23',
        icon: '👦'
    },
    { 
        title: 'Рождение второго сына', 
        date: '2017-09-06',
        icon: '👶'
    }
];

// База данных пожеланий
const WISHES_DATABASE = [
    "Пусть каждый день приносит вам новые поводы для улыбок и счастливых моментов! 🌈",
    "Желаю вашей любви становиться только сильнее с каждым годом! 💖",
    "Пусть ваше взаимопонимание и поддержка будут примером для всех вокруг! 👫",
    "Желаю здоровья, терпения и бесконечного счастья вашей семье! 🏡",
    "Пусть ваша жизнь будет наполнена теплом, уютом и радостными событиями! ☀️",
    "Желаю, чтобы ваши сердца всегда бились в унисон, а души понимали друг друга без слов! 💞",
    "Пусть ваша любовь освещает путь всем, кто вас окружает! ✨",
    "Желаю вам много совместных путешествий и незабываемых впечатлений! 🗺️",
    "Пусть ваша мудрость и опыт помогают преодолевать любые трудности! 🌟",
    "Желаю, чтобы ваш дом всегда был полон смеха, любви и гармонии! 🏠",
    "Пусть ваши дети радуют вас успехами и делают вашу семью еще крепче! 👨‍👩‍👦‍👦",
    "Желаю вам сохранить ту искру в глазах, которая была в день вашей свадьбы! 💫",
    "Пусть каждый новый день укрепляет ваши чувства и делает отношения еще глубже! 💕",
    "Желаю вам наслаждаться каждым мгновением вместе и создавать новые прекрасные воспоминания! 📸",
    "Пусть ваша любовь будет вечной, как сама вселенная! 🌌"
];

// --- ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ ---

function TypewriterText({ text }) {
    const [displayed, setDisplayed] = useState('');
    useEffect(() => {
        let i = 0;
        setDisplayed(''); 
        const interval = setInterval(() => {
            setDisplayed(text.slice(0, i + 1));
            i++;
            if (i >= text.length) clearInterval(interval);
        }, 40);
        return () => clearInterval(interval);
    }, [text]);

    return (
        <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed min-h-[2.5em] sm:min-h-[3em] px-2 sm:px-0">
            {displayed}<span className="text-pink-400 animate-pulse">|</span>
        </p>
    );
}

// Компонент для генерации пожеланий в розовых оттенках
function WishesGenerator() {
    const [currentWish, setCurrentWish] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [favoriteWishes, setFavoriteWishes] = useState([]);
    const [recentWishes, setRecentWishes] = useState([]);

    const generateNewWish = () => {
        if (isGenerating) return;
        
        setIsGenerating(true);
        
        // Анимация генерации
        const wishes = [
            "Генерируем самое теплое пожелание...",
            "Подбираем самые нежные слова...",
            "Находим идеальное поздравление..."
        ];
        
        let step = 0;
        const interval = setInterval(() => {
            setCurrentWish(wishes[step % wishes.length]);
            step++;
        }, 200);
        
        // Через 1.5 секунды показываем результат
        setTimeout(() => {
            clearInterval(interval);
            
            // Выбираем случайное пожелание
            const randomIndex = Math.floor(Math.random() * WISHES_DATABASE.length);
            const newWish = WISHES_DATABASE[randomIndex];
            
            setCurrentWish(newWish);
            
            // Добавляем в историю
            setRecentWishes(prev => {
                const updated = [newWish, ...prev.slice(0, 4)];
                return updated;
            });
            
            setIsGenerating(false);
        }, 1500);
    };

    const addToFavorites = () => {
        if (currentWish && !favoriteWishes.includes(currentWish)) {
            setFavoriteWishes(prev => [currentWish, ...prev]);
        }
    };

    const removeFromFavorites = (wishToRemove) => {
        setFavoriteWishes(prev => prev.filter(wish => wish !== wishToRemove));
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(currentWish);
            alert("Пожелание скопировано!");
        } catch (err) {
            console.error("Ошибка копирования: ", err);
        }
    };

    return (
        <section className="max-w-5xl mx-auto mt-12 sm:mt-16 md:mt-20 lg:mt-24 px-3 sm:px-4 md:px-6">
            <div className="bg-gradient-to-br from-pink-50/80 to-rose-50/80 p-6 sm:p-8 md:p-10 lg:p-12 rounded-xl sm:rounded-2xl md:rounded-3xl border border-pink-100 shadow-lg">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-pink-700 mb-6 sm:mb-8 text-center">
                    Генерация пожеланий 💝
                </h3>
                
                {/* Основной блок генерации */}
                <div className="mb-8 sm:mb-10">
                    <div className="bg-white/90 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 shadow-inner border border-pink-200">
                        <div className="min-h-[120px] sm:min-h-[140px] flex items-center justify-center">
                            {currentWish ? (
                                <motion.p 
                                    key={currentWish}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-lg sm:text-xl md:text-2xl text-pink-800 italic text-center font-serif px-2"
                                >
                                    "{currentWish}"
                                </motion.p>
                            ) : (
                                <p className="text-pink-500 text-center">
                                    Нажмите кнопку ниже, чтобы сгенерировать пожелание
                                </p>
                            )}
                        </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                        <button 
                            onClick={generateNewWish}
                            disabled={isGenerating}
                            className={`px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-white transition-all ${
                                isGenerating 
                                    ? 'bg-pink-300 cursor-not-allowed' 
                                    : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 active:scale-95 shadow-lg'
                            } text-sm sm:text-base`}
                        >
                            {isGenerating ? (
                                <span className="flex items-center gap-2">
                                    <motion.span
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="inline-block"
                                    >
                                        🌸
                                    </motion.span>
                                    Создаём пожелание...
                                </span>
                            ) : (
                                '🎀 Сгенерировать пожелание'
                            )}
                        </button>
                        
                        {currentWish && (
                            <>
                                <button 
                                    onClick={addToFavorites}
                                    className="px-4 sm:px-6 py-3 sm:py-4 rounded-full bg-gradient-to-r from-pink-100 to-rose-100 hover:from-pink-200 hover:to-rose-200 text-pink-700 font-bold transition-all active:scale-95 shadow border border-pink-200 text-sm sm:text-base"
                                >
                                    💖 В избранное
                                </button>
                                <button 
                                    onClick={copyToClipboard}
                                    className="px-4 sm:px-6 py-3 sm:py-4 rounded-full bg-gradient-to-r from-rose-50 to-pink-50 hover:from-rose-100 hover:to-pink-100 text-rose-700 font-bold transition-all active:scale-95 shadow border border-rose-200 text-sm sm:text-base"
                                >
                                    📝 Копировать
                                </button>
                            </>
                        )}
                    </div>
                </div>
                
                {/* История и избранное */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    {/* История */}
                    <div className="bg-gradient-to-br from-pink-50/60 to-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-pink-100 shadow-sm">
                        <h4 className="text-lg sm:text-xl font-bold text-pink-700 mb-4 flex items-center gap-2">
                            <span className="bg-pink-100 w-8 h-8 rounded-full flex items-center justify-center">🕐</span> 
                            Недавние пожелания
                        </h4>
                        {recentWishes.length > 0 ? (
                            <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2">
                                {recentWishes.map((wish, index) => (
                                    <motion.div 
                                        key={index} 
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white/80 p-3 rounded-lg border-l-4 border-pink-300 shadow-sm hover:shadow transition-shadow"
                                    >
                                        <p className="text-sm text-pink-800 line-clamp-3">"{wish}"</p>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-xs text-pink-500">
                                                {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                            </span>
                                            <button 
                                                onClick={() => {
                                                    setCurrentWish(wish);
                                                    window.scrollTo({top: document.querySelector('.WishesGenerator')?.offsetTop - 100 || 0, behavior: 'smooth'});
                                                }}
                                                className="text-xs text-pink-600 hover:text-pink-800"
                                            >
                                                👆 Выбрать
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-pink-50/50 p-4 rounded-lg border border-pink-100">
                                <p className="text-pink-600 text-sm italic text-center">
                                    Здесь появятся ваши недавние пожелания
                                </p>
                            </div>
                        )}
                    </div>
                    
                    {/* Избранное */}
                    <div className="bg-gradient-to-br from-rose-50/60 to-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-rose-100 shadow-sm">
                        <h4 className="text-lg sm:text-xl font-bold text-rose-700 mb-4 flex items-center gap-2">
                            <span className="bg-rose-100 w-8 h-8 rounded-full flex items-center justify-center">⭐</span> 
                            Избранные пожелания
                        </h4>
                        {favoriteWishes.length > 0 ? (
                            <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2">
                                {favoriteWishes.map((wish, index) => (
                                    <motion.div 
                                        key={index} 
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white/80 p-3 rounded-lg border-l-4 border-rose-300 shadow-sm hover:shadow transition-shadow"
                                    >
                                        <div className="flex justify-between items-start gap-2">
                                            <p className="text-sm text-rose-800 line-clamp-3 flex-1">"{wish}"</p>
                                            <button 
                                                onClick={() => removeFromFavorites(wish)}
                                                className="text-rose-500 hover:text-rose-700 text-sm flex-shrink-0"
                                            >
                                                ❌
                                            </button>
                                        </div>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-xs text-rose-500">
                                                Избранное #{index + 1}
                                            </span>
                                            <button 
                                                onClick={() => {
                                                    setCurrentWish(wish);
                                                    window.scrollTo({top: document.querySelector('.WishesGenerator')?.offsetTop - 100 || 0, behavior: 'smooth'});
                                                }}
                                                className="text-xs text-rose-600 hover:text-rose-800"
                                            >
                                                ✨ Использовать
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-rose-50/50 p-4 rounded-lg border border-rose-100">
                                <p className="text-rose-600 text-sm italic text-center">
                                    Сохраняйте понравившиеся пожелания с помощью 💖
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Подсказка */}
                <div className="mt-6 sm:mt-8 text-center">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-rose-100 px-4 sm:px-6 py-3 rounded-full border border-pink-200">
                        <span className="text-pink-600">💡</span>
                        <p className="text-pink-700 text-xs sm:text-sm italic">
                            Используйте эти пожелания для поднятие себе настроения или просто чтобы порадовать близких!
                        </p>
                    </div>
                </div>
                
                {/* Декоративные элементы */}
                <div className="absolute top-4 right-4 opacity-20">
                    <div className="text-3xl">💌</div>
                </div>
                <div className="absolute bottom-4 left-4 opacity-20">
                    <div className="text-3xl">🌸</div>
                </div>
            </div>
        </section>
    );
}

// Компонент для одной заметки со всеми датами
function ImportantDatesNote() {
    return (
        <section className="max-w-3xl mx-auto mt-12 sm:mt-16 md:mt-20 px-4 sm:px-6">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl overflow-hidden border border-pink-100 mx-2 sm:mx-0"
            >
                {/* Заголовок заметки */}
                <div className="bg-gradient-to-r from-pink-50 to-rose-50 px-4 sm:px-6 md:px-8 py-4 sm:py-6 border-b border-pink-100">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-xl sm:text-2xl">📅</span>
                        </div>
                        <div className="min-w-0">
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-pink-800 truncate">
                                Важные даты нашей семьи
                            </h3>
                            <p className="text-pink-600 text-xs sm:text-sm truncate">
                                Самые значимые моменты в нашей истории
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Содержимое заметки */}
                <div className="p-4 sm:p-6 md:p-8">
                    <div className="space-y-4 sm:space-y-6">
                        {IMPORTANT_DATES.map((item, index) => (
                            <div key={index} className="flex items-start gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-pink-50 last:border-0">
                                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-pink-50 flex items-center justify-center">
                                    <span className="text-xl sm:text-2xl">{item.icon}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 truncate">
                                        {item.title}
                                    </h4>
                                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-pink-600 break-words">
                                        {item.date}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Декоративный элемент внизу */}
                    <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-pink-50 text-center">
                        <p className="text-pink-500 italic text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-2">
                            <span className="text-base sm:text-lg">✨</span>
                            Каждая дата — новая страница в книге нашей любви
                            <span className="text-base sm:text-lg">📖</span>
                        </p>
                    </div>
                </div>
                
                {/* Угловые декоративные элементы */}
                <div className="absolute top-0 left-0 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-t-2 border-l-2 border-pink-200 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-t-2 border-r-2 border-pink-200 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-b-2 border-l-2 border-pink-200 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-b-2 border-r-2 border-pink-200 rounded-br-lg"></div>
            </motion.div>
            
            {/* Декоративная линия */}
            <div className="mt-6 sm:mt-8 flex justify-center">
                <div className="w-24 sm:w-32 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent rounded-full"></div>
            </div>
        </section>
    );
}

export default function AnniversarySite() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedMemory, setSelectedMemory] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);

    const years = new Date().getFullYear() - new Date(WEDDING_DATE).getFullYear();

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 pb-12 sm:pb-20 overflow-x-hidden safe-area-padding">
            <style jsx>{`
                .safe-area-padding {
                    padding-left: env(safe-area-inset-left);
                    padding-right: env(safe-area-inset-right);
                    padding-top: env(safe-area-inset-top);
                    padding-bottom: env(safe-area-inset-bottom);
                }
                
                @supports (padding: max(0px)) {
                    .safe-area-padding {
                        padding-left: max(1rem, env(safe-area-inset-left));
                        padding-right: max(1rem, env(safe-area-inset-right));
                        padding-top: max(0.5rem, env(safe-area-inset-top));
                        padding-bottom: max(1rem, env(safe-area-inset-bottom));
                    }
                }
                
                /* Специфичные стили для iPhone */
                @media (max-width: 430px) {
                    .text-iphone-safe {
                        font-size: clamp(1.5rem, 8vw, 3rem);
                    }
                }
                
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
            
            <BackgroundEffect />

            {/* HEADER */}
            <header className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 flex justify-between items-center">
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-pink-800 truncate max-w-[50%]">
                    {COUPLE_NAME}
                </h1>
                <div className="flex gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm font-medium">
                    <button 
                        onClick={() => window.scrollTo({top:0, behavior:'smooth'})} 
                        className="hover:text-pink-600 transition-colors whitespace-nowrap px-2 py-1"
                    >
                        Начало
                    </button>
                    <button 
                        onClick={() => document.getElementById('gallery').scrollIntoView({behavior:'smooth'})} 
                        className="hover:text-pink-600 transition-colors whitespace-nowrap px-2 py-1"
                    >
                        Галерея
                    </button>
                </div>
            </header>

            {/* HERO */}
            <section className="px-3 sm:px-4 md:px-6">
                <div className="max-w-5xl mx-auto h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] rounded-2xl sm:rounded-3xl md:rounded-[3rem] overflow-hidden shadow-xl sm:shadow-2xl relative border-4 sm:border-6 md:border-8 border-white">
                    <img src={HERO_PHOTO} alt="Hero" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center text-center text-white p-3 sm:p-4">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold mb-2 sm:mb-3 md:mb-4 text-iphone-safe">
                                {COUPLE_NAME}
                            </h2>
                            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-light tracking-wide">
                                {years} лет любви и счастья
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ОДНА ЗАМЕТКА С ВАЖНЫМИ ДАТАМИ */}
            <ImportantDatesNote />

            {/* КАЛЕНДАРЬ */}
            <section className="max-w-4xl mx-auto mt-12 sm:mt-16 md:mt-20 px-3 sm:px-4 md:px-6">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-pink-700 mb-6 sm:mb-8">
                    Календарь воспоминаний 💌
                </h3>
                <div className="flex justify-center mb-6 sm:mb-8">
                    <button 
                        onClick={() => setShowCalendar(!showCalendar)} 
                        className="bg-pink-500 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full shadow-lg hover:bg-pink-600 transition-all font-bold text-sm sm:text-base"
                    >
                        {showCalendar ? "Скрыть календарь" : "Открыть календарь"}
                    </button>
                </div>
                <AnimatePresence>
                    {showCalendar && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }} 
                            animate={{ opacity: 1, scale: 1 }} 
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="grid grid-cols-4 sm:grid-cols-7 gap-2 sm:gap-3 bg-white/60 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl md:rounded-[2rem] shadow-lg sm:shadow-xl border border-white mx-1 sm:mx-0"
                        >
                            {Array.from({ length: 31 }, (_, i) => {
                                const day = i + 1;
                                const isSpecial = day === 24;
                                return (
                                    <div 
                                        key={day} 
                                        onClick={() => setSelectedMemory({ 
                                            img: CALENDAR_MEMORIES[day]?.img || ALL_PHOTOS[day % ALL_PHOTOS.length], 
                                            date: day, 
                                            text: CALENDAR_MEMORIES[day]?.text || "Наши счастливые моменты ❤️" 
                                        })}
                                        className={`aspect-square flex items-center justify-center rounded-lg sm:rounded-xl md:rounded-2xl cursor-pointer hover:scale-105 active:scale-95 transition-transform border ${
                                            isSpecial ? 'animate-pulse border-pink-400 bg-pink-50' : 'bg-white border-pink-50'
                                        }`}
                                    >
                                        <span className="text-sm sm:text-base md:text-lg font-bold text-pink-700">
                                            {day}
                                        </span>
                                    </div>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            {/* ГАЛЕРЕЯ */}
            <section id="gallery" className="max-w-5xl mx-auto mt-12 sm:mt-16 md:mt-20 lg:mt-24 px-3 sm:px-4 md:px-6">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-pink-700 mb-8 sm:mb-10 md:mb-12">
                    Наши моменты 💞
                </h3>
                <div className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-lg sm:shadow-xl md:shadow-2xl overflow-hidden border border-pink-50 flex flex-col">
                    <div className="h-[250px] sm:h-[300px] md:h-[350px] lg:h-[450px]">
                        <AnimatePresence mode="wait">
                            <motion.img 
                                key={currentIndex} 
                                src={GALLERY_DATA[currentIndex].src} 
                                initial={{opacity:0}} 
                                animate={{opacity:1}} 
                                exit={{opacity:0}} 
                                className="w-full h-full object-cover" 
                                alt="Галерея"
                            />
                        </AnimatePresence>
                    </div>
                    <div className="p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center">
                        <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-pink-600 mb-4 sm:mb-6">
                            {GALLERY_DATA[currentIndex].caption}
                        </h4>
                        <TypewriterText text={GALLERY_DATA[currentIndex].description} />
                        <div className="flex gap-3 sm:gap-4 mt-6 sm:mt-8 self-center sm:self-start">
                            <button 
                                onClick={() => setCurrentIndex((prev) => (prev - 1 + GALLERY_DATA.length) % GALLERY_DATA.length)} 
                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-pink-100 flex items-center justify-center hover:bg-pink-200 active:scale-90 transition-transform text-lg sm:text-xl"
                            >
                                ⬅
                            </button>
                            <button 
                                onClick={() => setCurrentIndex((prev) => (prev + 1) % GALLERY_DATA.length)} 
                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-pink-100 flex items-center justify-center hover:bg-pink-200 active:scale-90 transition-transform text-lg sm:text-xl"
                            >
                                ➡
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ГЕНЕРАТОР ПОЖЕЛАНИЙ */}
            <WishesGenerator />

            {/* MODAL */}
            <AnimatePresence>
                {selectedMemory && (
                    <motion.div 
                        className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-3 sm:p-4 backdrop-blur-sm safe-area-padding"
                        onClick={() => setSelectedMemory(null)} 
                        initial={{opacity:0}} 
                        animate={{opacity:1}} 
                        exit={{opacity:0}}
                    >
                        <motion.div 
                            className="bg-white rounded-xl sm:rounded-2xl overflow-hidden max-w-[95%] sm:max-w-md md:max-w-lg w-full p-4 sm:p-5 md:p-6 mx-auto"
                            onClick={e => e.stopPropagation()}
                        >
                            <img 
                                src={selectedMemory.img} 
                                className="w-full h-48 sm:h-56 md:h-64 lg:h-80 object-cover rounded-lg sm:rounded-xl mb-4 sm:mb-5 md:mb-6" 
                                alt="Воспоминание"
                            />
                            <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-pink-600 mb-2">
                                День {selectedMemory.date}
                            </h4>
                            <p className="text-gray-700 italic text-sm sm:text-base">
                                {selectedMemory.text}
                            </p>
                            <button 
                                onClick={() => setSelectedMemory(null)} 
                                className="mt-4 sm:mt-5 md:mt-6 w-full py-2 sm:py-3 bg-pink-500 text-white rounded-lg sm:rounded-xl font-bold text-sm sm:text-base"
                            >
                                Закрыть
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

const BackgroundEffect = () => (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {[...Array(12)].map((_, i) => (
            <motion.div 
                key={i} 
                className="absolute text-pink-200/30 sm:text-pink-200/40" 
                style={{ 
                    left: `${Math.random() * 100}%`, 
                    fontSize: window.innerWidth < 640 ? '16px' : '24px'
                }}
                animate={{ 
                    y: ['-10vh', '110vh'], 
                    rotate: 360 
                }}
                transition={{ 
                    duration: 10 + Math.random() * 10, 
                    repeat: Infinity, 
                    ease: "linear", 
                    delay: Math.random() * 5 
                }}
            >
                {window.innerWidth < 640 ? '•' : '🌸'}
            </motion.div>
        ))}
    </div>
);