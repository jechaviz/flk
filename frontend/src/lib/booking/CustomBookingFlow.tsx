"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookingWidgetProps } from "./types";
import { CalApiService, CalSlot } from "./CalApiService";
import { pb } from "../pocketbase";

export function CustomBookingFlow({ theme, className, onBookingComplete, user }: BookingWidgetProps) {
    const [step, setStep] = useState<"date" | "time" | "form" | "success">("date");

    // Data
    const [currentMonthOffset, setCurrentMonthOffset] = useState(0);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [slots, setSlots] = useState<CalSlot[]>([]);
    const [loadingSlots, setLoadingSlots] = useState(false);

    // Form Data
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: ""
    });

    const currentDate = new Date();
    const viewDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + currentMonthOffset, 1);

    const currentMonthLabel = viewDate.toLocaleDateString("es-ES", { month: "long", year: "numeric" }).toUpperCase();

    // Fetch Slots when date is selected
    useEffect(() => {
        if (selectedDate) {
            setLoadingSlots(true);
            setStep("time");
            // Define range for the selected day (00:00 to 23:59)
            const dateStr = selectedDate; // ISO YYYY-MM-DD
            // Actually Cal API usually takes range. 
            // We fetch specific day.
            const from = `${dateStr}T00:00:00Z`;
            const to = `${dateStr}T23:59:59Z`; // Approximate

            CalApiService.getSlots(from, to).then(data => {
                setSlots(data);
                setLoadingSlots(false);
            }).catch(() => {
                setSlots([]);
                setLoadingSlots(false);
            });
        }
    }, [selectedDate]);

    const calendarGrid = useMemo(() => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        type GridItem = { empty: boolean; dayNum?: number; dateStr?: string; available?: boolean };
        const grid: GridItem[] = [];

        // Adjust for Monday start if needed, standard JS Date is Sunday=0
        for (let i = 0; i < firstDay; i++) grid.push({ empty: true });
        for (let i = 1; i <= daysInMonth; i++) {
            // Pad Zero
            const mm = (month + 1).toString().padStart(2, '0');
            const dd = i.toString().padStart(2, '0');
            const dateStr = `${year}-${mm}-${dd}`;

            // Basic check to disable past dates
            const isPast = new Date(dateStr) < new Date(new Date().toDateString());

            grid.push({
                empty: false,
                dayNum: i,
                dateStr: dateStr,
                available: !isPast, // Real availability would require fetching full month, for now enable all future days to let user click and check slots
            });
        }
        return grid;
    }, [currentMonthOffset]);

    const handleDateSelect = (dateStr: string) => {
        setSelectedDate(dateStr);
        // Step change is handled by useEffect
    };

    const handleTimeSelect = (timeSlot: CalSlot) => {
        setSelectedTime(timeSlot.utcTime); // Store UTC for booking
        setStep("form");
    };

    const handleConfirm = async () => {
        if (!selectedTime) return;

        try {
            const eventId = await CalApiService.getEventTypeId();
            await CalApiService.createBooking({
                eventTypeId: eventId,
                start: selectedTime,
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                language: "es",
                responses: {
                    name: formData.name,
                    email: formData.email,
                    notes: "Booking via FLK Headless Flow"
                }
            });
            setStep("success");
            if (onBookingComplete) setTimeout(onBookingComplete, 3000);
        } catch (error) {
            alert("Error al reservar. Por favor intenta de nuevo.");
            console.error(error);
        }
    };

    return (
        <div className={`w-full h-full flex flex-col ${className} overflow-hidden`}>
            <AnimatePresence mode="wait">
                {step === "date" && (
                    <motion.div
                        key="date"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex-1 flex flex-col bg-white/[0.02] rounded-xl p-4 border border-white/5 h-full"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <button onClick={() => setCurrentMonthOffset(p => p - 1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white transition">
                                <i className="fa-solid fa-chevron-left text-xs"></i>
                            </button>
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-white">{currentMonthLabel}</span>
                            <button onClick={() => setCurrentMonthOffset(p => p + 1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white transition">
                                <i className="fa-solid fa-chevron-right text-xs"></i>
                            </button>
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-center mb-2">
                            {["D", "L", "M", "M", "J", "V", "S"].map(d => (
                                <div key={d} className="text-[9px] text-brand-gold/50 font-black">{d}</div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 gap-2 overflow-y-auto custom-scrollbar">
                            {calendarGrid.map((d, i) => (
                                <div key={i} className="aspect-square">
                                    {!d.empty && (
                                        <button
                                            disabled={!d.available}
                                            onClick={() => d.dateStr && handleDateSelect(d.dateStr)}
                                            className={`w-full h-full rounded-lg flex items-center justify-center text-[10px] font-bold transition-all
                                                ${d.available ? "hover:bg-brand-gold hover:text-black text-white bg-white/5" : "text-white/10 cursor-not-allowed"}
                                            `}
                                        >
                                            {d.dayNum}
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {step === "time" && (
                    <motion.div
                        key="time"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex-1 flex flex-col h-full"
                    >
                        <button onClick={() => setStep("date")} className="text-[9px] text-brand-gold/60 hover:text-brand-gold mb-4 flex items-center gap-2 uppercase tracking-widest font-black">
                            <i className="fa-solid fa-arrow-left"></i> Volver a Calendario
                        </button>
                        <h4 className="text-sm text-white font-serif italic mb-4">Selecciona Hora ({selectedDate})</h4>

                        {loadingSlots ? (
                            <div className="flex-1 flex items-center justify-center">
                                <i className="fa-solid fa-circle-notch fa-spin text-brand-gold text-2xl"></i>
                            </div>
                        ) : slots.length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-white/40">
                                <p className="text-xs">No hay horarios disponibles.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-3 overflow-y-auto pr-2 custom-scrollbar max-h-[400px]">
                                {slots.map((s, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleTimeSelect(s)}
                                        className="p-3 rounded-lg border border-white/10 bg-white/5 hover:border-brand-gold hover:bg-brand-gold/10 text-xs text-white transition-all text-center"
                                    >
                                        {s.time}
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}

                {step === "form" && (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex-1 flex flex-col h-full"
                    >
                        <button onClick={() => setStep("time")} className="text-[9px] text-brand-gold/60 hover:text-brand-gold mb-4 flex items-center gap-2 uppercase tracking-widest font-black">
                            <i className="fa-solid fa-arrow-left"></i> Volver a Horarios
                        </button>

                        <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar pr-2">
                            <div>
                                <h4 className="text-xl text-white font-serif italic">Confirmar Reserva</h4>
                                <p className="text-[10px] text-white/50 mt-1">{selectedDate}</p>
                            </div>

                            <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); handleConfirm(); }}>
                                <div>
                                    <label className="text-[9px] text-brand-gold/50 uppercase font-black block mb-1">Nombre</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-xs text-white focus:border-brand-gold/50 outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="text-[9px] text-brand-gold/50 uppercase font-black block mb-1">Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-xs text-white focus:border-brand-gold/50 outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="text-[9px] text-brand-gold/50 uppercase font-black block mb-1">Notas</label>
                                    <input
                                        type="text"
                                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-xs text-white focus:border-brand-gold/50 outline-none transition-colors"
                                        placeholder="Opcional"
                                    />
                                </div>
                                <button type="submit" className="w-full py-4 mt-4 bg-brand-gold text-brand-black font-black uppercase tracking-widest text-xs rounded-lg hover:scale-[1.02] transition-transform shadow-glow">
                                    Confirmar
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}

                {step === "success" && (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex-1 flex flex-col items-center justify-center text-center p-6"
                    >
                        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4 border border-green-500/40 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                            <i className="fa-solid fa-check text-green-500 text-2xl"></i>
                        </div>
                        <h4 className="text-2xl text-white font-serif italic mb-2">¡Reserva Exitosa!</h4>
                        <p className="text-xs text-white/60 mb-6">Hemos enviado los detalles a tu correo.</p>
                        <button onClick={onBookingComplete} className="px-6 py-3 rounded-lg border border-white/10 text-white text-xs uppercase tracking-widest hover:bg-white/5 transition">
                            Cerrar
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
