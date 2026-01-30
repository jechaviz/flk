"use client";

import { motion, AnimatePresence } from "framer-motion";
import { BookingWidget } from "../lib/booking/CalAdapter";
import { useAuth } from "../lib/auth/clerkAdapter";

interface ExperienceProps {
    showExperience: boolean;
    closeExperience: () => void;
}

export default function Experience({ showExperience, closeExperience }: ExperienceProps) {
    const { user } = useAuth();

    return (
        <AnimatePresence>
            {showExperience && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[120] bg-brand-black/95 backdrop-blur-md flex flex-col overflow-hidden text-white"
                >
                    <div className="absolute top-0 right-0 z-20 p-8 md:p-12">
                        <button
                            onClick={closeExperience}
                            className="text-white hover:text-brand-gold transition-all duration-500 text-xl md:text-2xl p-4 border border-white/10 rounded-full hover:border-brand-gold leading-none bg-black/20 backdrop-blur-sm"
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="w-full max-w-[95vw] lg:max-w-7xl h-[85vh] md:h-[90vh] glass-panel rounded-3xl border-white/10 bg-white/[0.02] flex flex-col overflow-hidden relative shadow-2xl"
                        >
                            {/* Decorative Background Light */}
                            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-magenta/5 rounded-full blur-[120px] pointer-events-none"></div>

                            <div className="flex-1 w-full h-full relative z-10 grid lg:grid-cols-12 gap-6 p-4 md:p-6 overflow-hidden">
                                {/* Left Panel: Branding & Instructions */}
                                <div className="lg:col-span-3 flex flex-col justify-center space-y-8 text-center lg:text-left relative z-20">
                                    <div className="space-y-2">
                                        <h3 className="text-xl md:text-2xl font-black tracking-widest text-white italic">
                                            ESTRATEGIA FLK™
                                        </h3>
                                        <p className="text-[9px] md:text-[10px] text-brand-gold/80 tracking-[0.5em] font-black uppercase">
                                            Agendar Sesión de Consultoría
                                        </p>
                                        {user && (
                                            <p className="text-[10px] text-white/60 mt-2">
                                                Bienvenido, <span className="text-brand-gold">{user.fullName}</span>
                                            </p>
                                        )}
                                    </div>

                                    <div className="max-w-xs mx-auto lg:mx-0 py-8 border-y border-white/5 space-y-4">
                                        <div className="flex items-center gap-4 justify-center lg:justify-start">
                                            <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20 shadow-glow">
                                                <i className="fa-solid fa-bolt text-brand-gold text-sm"></i>
                                            </div>
                                            <div className="text-left">
                                                <p className="text-[10px] text-brand-gold font-black uppercase tracking-widest leading-tight">Sesión de Alto Impacto</p>
                                                <p className="text-[9px] text-white/40 mt-1">30 Minutos · Online</p>
                                            </div>
                                        </div>
                                        <p className="text-xs text-white/60 leading-relaxed font-light font-sans">
                                            Diseñaremos el Business Case para acelerar la absorción de tu inventario.
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center gap-3 text-[9px] text-brand-gold/50 font-black uppercase tracking-[0.2em] justify-center lg:justify-start">
                                            <i className="fa-solid fa-check-double text-brand-gold"></i>
                                            <span>Disponibilidad en tiempo real</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-[9px] text-brand-gold/50 font-black uppercase tracking-[0.2em] justify-center lg:justify-start">
                                            <i className="fa-solid fa-shield-halved text-brand-gold"></i>
                                            <span>Confirmación Inmediata</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Panel: Booking Widget (Cal Adapter) */}
                                <div className="lg:col-span-9 bg-black/20 rounded-2xl border border-white/5 overflow-hidden relative">
                                    <BookingWidget
                                        link="jesus-omyxg8/30min"
                                        theme="dark"
                                        className="w-full h-full"
                                        user={user ? { name: user.fullName || "", email: user.email } : undefined}
                                        onBookingComplete={() => {
                                            setTimeout(closeExperience, 2000);
                                        }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

