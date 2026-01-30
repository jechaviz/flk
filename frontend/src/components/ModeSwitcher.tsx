"use client";

import { motion } from "framer-motion";

interface ModeSwitcherProps {
    mode: string;
    setMode: (mode: string) => void;
}

const MODES = ["A", "B", "C", "D"];

const getModeLabel = (m: string) =>
({
    A: "Visión (CEO)",
    B: "Negocio (Sales)",
    C: "Life (Cliente)",
    D: "Mi Narrativa",
}[m] || "");

export default function ModeSwitcher({ mode, setMode }: ModeSwitcherProps) {
    return (
        <div className="fixed top-1/2 -translate-y-1/2 left-0 z-50 glass-panel p-4 pr-5 rounded-r-2xl border-l-0 border-brand-gold/30 shadow-2xl scale-90 origin-left">
            <p className="text-[9px] uppercase tracking-[0.3em] text-brand-gold mb-4 font-bold text-center border-b border-white/5 pb-2">
                NARRATIVA
            </p>
            <div className="flex flex-col gap-2">
                {MODES.map((m) => (
                    <button
                        key={m}
                        onClick={() => setMode(m)}
                        className={`px-4 py-2.5 rounded text-[10px] font-bold transition-all duration-300 flex justify-between items-center tracking-widest uppercase ${mode === m
                            ? "bg-brand-gold text-brand-black shadow-glow"
                            : "text-gray-500 hover:text-white"
                            }`}
                    >
                        <span>
                            {m}: {getModeLabel(m)}
                        </span>
                        {mode === m && <span className="ml-3">●</span>}
                    </button>
                ))}
            </div>
        </div>
    );
}
