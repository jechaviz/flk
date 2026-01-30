"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CONTENT } from "../data/content";

interface HeroProps {
    mode: string;
    setMode: (mode: string) => void;
    openExperience: () => void;
}

export default function Hero({ mode, setMode, openExperience }: HeroProps) {
    const content = CONTENT[mode];

    return (
        <header className="relative h-screen flex items-center justify-center overflow-hidden hero-overlay pt-20">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-brand-black/50 z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-dark/20 to-brand-black/60 z-10"></div>
                <img
                    src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2049&auto=format&fit=crop"
                    className="w-full h-full object-cover opacity-65 scale-105 animate-[pulse_12s_ease-in-out_infinite]"
                    alt="Luxury World"
                />
            </div>

            <div className="relative z-20 max-w-6xl mx-auto px-8 text-center mt-12">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={mode}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="mb-6 inline-block bg-brand-card/60 backdrop-blur-2xl px-8 py-3 rounded-full border border-brand-gold/25 shadow-[0_4px_30px_rgba(0,0,0,0.15)]">
                            <span className="text-brand-gold text-[11px] md:text-xs font-bold uppercase tracking-[0.4em]">
                                {content.hero.tagline}
                            </span>
                        </div>
                        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-[1.1] tracking-tight">
                            <span dangerouslySetInnerHTML={{ __html: content.hero.headline }}></span>
                        </h1>
                        <p className="font-sans text-gray-300 text-lg md:text-xl font-light max-w-2xl mx-auto mb-10 leading-relaxed tracking-wide opacity-90">
                            {content.hero.subtext}
                        </p>

                        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                            <button
                                onClick={openExperience}
                                className="group relative px-12 py-5 bg-brand-gold text-brand-black font-serif font-bold text-base tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-glow-strong rounded-sm shadow-glow hover:scale-105"
                            >
                                <span className="relative z-10">{content.hero.ctaPrimary}</span>
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 animate-bounce text-brand-gold/60">
                <i className="fa-solid fa-chevron-down text-3xl"></i>
            </div>

            {/* Mode Switcher moved here or kept in Page */}
        </header>
    );
}
