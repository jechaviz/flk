"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CONTENT } from "../data/content";

interface VentajasProps {
    mode: string;
}

export default function Ventajas({ mode }: VentajasProps) {
    const contentData = CONTENT[mode];
    const { benefits } = contentData;

    return (
        <section id="ventajas" className="py-32 bg-brand-dark relative overflow-hidden ventajas-rich after:absolute after:inset-0 after:z-[1] after:pointer-events-none after:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] after:bg-[length:100%_40px] after:[mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[700px] h-[700px] bg-brand-gold/10 rounded-full blur-[180px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[700px] h-[700px] bg-brand-magenta/8 rounded-full blur-[180px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-8 relative z-10">
                <div className="text-center max-w-4xl mx-auto mb-24">
                    <span className="text-brand-magenta text-[11px] font-black uppercase tracking-[0.4em]">DIFERENCIACIÓN ESTRATÉGICA</span>
                    <h3 className="font-serif text-4xl md:text-6xl text-white mt-6 mb-8 tracking-tight">Por qué los Líderes eligen FLK</h3>
                    <p className="text-brand-muted font-light text-xl">Diseñado para la psicología del comprador de alto nivel y la necesidad de cierre del vendedor.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    {/* Advantage 1 */}
                    <div className="bg-brand-card/85 backdrop-blur-2xl p-12 rounded-sm hover:-translate-y-3 transition duration-700 group border-2 border-brand-gold/45 shadow-2xl">
                        <div className="text-brand-gold text-5xl mb-10 group-hover:scale-110 transition duration-500 drop-shadow-[0_0_15px_rgba(197,160,89,0.3)]">
                            <i className="fa-solid fa-star"></i>
                        </div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={mode}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.6 }}
                            >
                                <h4 className="font-serif text-2xl text-white mb-6 italic">{benefits.b1.title}</h4>
                                <p className="text-base text-gray-400 leading-relaxed font-light">{benefits.b1.text}</p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Advantage 2 (Featured Magenta) */}
                    <div className="p-12 rounded-sm hover:-translate-y-3 transition duration-700 group relative backdrop-blur-3xl shadow-glow-strong scale-105 card-featured">
                        <div className="absolute top-6 right-8 tag-magenta shadow-xl">Impacto Inmediato</div>
                        <div className="text-brand-gold text-5xl mb-10 group-hover:scale-110 transition duration-500 drop-shadow-[0_0_20px_rgba(197,160,89,0.5)]">
                            <i className="fa-solid fa-crown"></i>
                        </div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={mode}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.6 }}
                            >
                                <h4 className="font-serif text-2xl text-white mb-6 italic">{benefits.b2.title}</h4>
                                <p className="text-base text-gray-400 leading-relaxed font-light">{benefits.b2.text}</p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Advantage 3 */}
                    <div className="bg-brand-card/85 backdrop-blur-2xl p-12 rounded-sm hover:-translate-y-3 transition duration-700 group border-2 border-brand-gold/45 shadow-2xl">
                        <div className="text-brand-gold text-5xl mb-10 group-hover:scale-110 transition duration-500 drop-shadow-[0_0_15px_rgba(197,160,89,0.3)]">
                            <i className="fa-solid fa-infinity"></i>
                        </div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={mode}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.6 }}
                            >
                                <h4 className="font-serif text-2xl text-white mb-6 italic">{benefits.b3.title}</h4>
                                <p className="text-base text-gray-400 leading-relaxed font-light">{benefits.b3.text}</p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
