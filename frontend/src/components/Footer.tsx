"use client";

import { motion } from "framer-motion";

interface FooterProps {
    openExperience: () => void;
}

export default function Footer({ openExperience }: FooterProps) {
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-[#010101] pt-32 pb-16 border-t border-white/10 relative shadow-footer-up overflow-hidden
                       before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_bottom,#1a1f2e_0%,#010101_80%)] before:z-0
                       footer-flow-pattern"
        >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent"></div>
            <div className="max-w-5xl mx-auto px-8 text-center relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="font-serif text-5xl md:text-8xl text-white mb-12 tracking-tight"
                >
                    Eleva el Estándar de tu <span className="italic text-brand-gold">Inventario</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-gray-200 text-xl md:text-2xl mb-20 max-w-3xl mx-auto font-light leading-relaxed italic opacity-90"
                >
                    "Trabajamos exclusivamente con desarrollos seleccionados para mantener el prestigio del programa."
                </motion.p>
                <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={openExperience}
                    className="bg-transparent border-2 border-brand-gold text-brand-gold px-16 py-6 font-serif text-base tracking-[0.3em] uppercase hover:bg-brand-gold hover:text-brand-black transition duration-500 shadow-glow hover:shadow-glow-strong rounded-xs font-bold"
                >
                    Solicitar Alianza
                </motion.button>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="mt-32 pt-12 border-t border-white/5 flex flex-col items-center gap-5 opacity-70"
                >
                    <p className="text-[11px] text-gray-600 uppercase tracking-[0.4em] font-black">UN PRODUCTO EXCLUSIVO</p>
                    <motion.div
                        className="flex items-center gap-4 opacity-60 hover:opacity-100 transition duration-700"
                        animate={{
                            opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <span className="text-sm text-gray-400 font-serif italic">by</span>
                        <span className="text-sm text-gray-200 font-black tracking-[0.5em] uppercase">FREEDOM VACATION SYSTEMS</span>
                    </motion.div>
                    <p className="text-[10px] text-gray-800 mt-5 font-bold tracking-widest">© 2026 Freedom Lifestyle Key. Derechos Reservados.</p>
                </motion.div>
            </div>
        </motion.footer>
    );
}
