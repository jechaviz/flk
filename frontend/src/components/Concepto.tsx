"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONTENT } from "../data/content";

interface ConceptoProps {
    mode: string;
}

export default function Concepto({ mode }: ConceptoProps) {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const cardImages = ['/img/flk_card_front.png', '/img/flk_card_back.png', '/img/flk_card_back_2.png'];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentCardIndex((prev) => (prev + 1) % cardImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [cardImages.length]);

    const contentData = CONTENT[mode];

    return (
        <section id="concepto" className="pt-0 pb-24 md:pt-0 md:pb-32 bg-brand-black relative overflow-hidden concept-pattern before:absolute before:inset-0 before:bg-[linear-gradient(180deg,#050505_0%,#0e121b_50%,#050505_100%)] before:z-0">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-[200px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-12 gap-24 items-center relative z-10">
                {/* Carousel */}
                <div className="lg:col-span-7">
                    <div className="relative w-full aspect-[16/9] group perspective-1000">
                        <div className="absolute inset-0 glass-panel rounded-2xl transform group-hover:rotate-0 transition duration-1000 border-brand-gold/15"></div>
                        <div className="absolute inset-0 flex items-center justify-center transform group-hover:scale-105 transition duration-1000 h-full">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentCardIndex}
                                    src={cardImages[currentCardIndex]}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-[80%] h-auto object-contain drop-shadow-[0_25px_60px_rgba(197,160,89,0.3)] [image-rendering:-webkit-optimize-contrast] [backface-visibility:hidden] transform-translate-z-0"
                                    alt="Freedom Lifestyle Key"
                                />
                            </AnimatePresence>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-brand-gold/25 blur-3xl rounded-full animate-pulse -z-10"></div>
                        </div>
                    </div>
                </div>

                {/* Text Content */}
                <div className="lg:col-span-5 mt-12 lg:mt-0 relative z-20">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={mode}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                        >
                            <h2 className="font-serif text-4xl md:text-5xl text-white mb-10 leading-tight tracking-tight">
                                {contentData.product.title}
                            </h2>
                            <div className="w-20 h-1 bg-brand-gold mb-10 shadow-glow"></div>
                            <div className="space-y-8 text-brand-muted font-light text-xl leading-relaxed">
                                {contentData.product.description.map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>

                            <div className="mt-16 grid grid-cols-1 gap-8">
                                <div className="flex items-center gap-6 p-5 rounded-xl bg-white/5 border border-white/5 hover:border-brand-gold/40 transition duration-500 group">
                                    <div className="w-12 h-12 rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-gold group-hover:scale-110 transition">
                                        <i className="fa-solid fa-building text-xl"></i>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-serif text-lg tracking-wide">1 Millón de Propiedades</h4>
                                        <p className="text-[10px] text-brand-muted mt-1.5 uppercase tracking-widest font-bold">Tarifas Netas (Wholesale)</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 p-5 rounded-xl bg-white/5 border border-white/5 hover:border-brand-gold/40 transition duration-500 group">
                                    <div className="w-12 h-12 rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-gold group-hover:scale-110 transition">
                                        <i className="fa-solid fa-bell-concierge text-xl"></i>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-serif text-lg tracking-wide">Concierge Híbrido</h4>
                                        <p className="text-[10px] text-brand-muted mt-1.5 uppercase tracking-widest font-bold">Tecnología + Expertos Humanos</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
