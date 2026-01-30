"use client";

import { useState, useEffect } from "react";

export default function EditPage() {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [history, setHistory] = useState<any[]>([]);
    const [narrative, setNarrative] = useState([
        { step: 'date', title: 'Comienza tu Evolución', content: 'Selecciona una fecha para tu Consultoría Estratégica.' },
        { step: 'time', title: 'Sesión de Alto Impacto', content: 'Diseñaremos el Business Case para acelerar la absorción de tu inventario.' }
    ]);
    const [selectedCommit, setSelectedCommit] = useState(null);
    const [statusMsg, setStatusMsg] = useState('');

    // Mock functions for now
    const fetchNarrative = async () => { };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const saveNarrative = async (step: any) => {
        setStatusMsg(`Sincronizado: ${step.step}`);
        refreshPreview();
    };
    const fetchHistory = async () => { };
    const generate = async () => {
        if (!prompt) return;
        setLoading(true);
        setTimeout(() => {
            setStatusMsg('Edición completada');
            setPrompt('');
            refreshPreview();
            setLoading(false);
        }, 1000);
    };
    const revert = async () => {
        if (!selectedCommit) return;
        setLoading(true);
        setTimeout(() => {
            setStatusMsg('Proyecto revertido');
            refreshPreview();
            setLoading(false);
        }, 1000);
    };

    const refreshPreview = () => {
        const iframe = document.getElementById('preview-frame') as HTMLIFrameElement;
        if (iframe) iframe.src = iframe.src;
    };

    useEffect(() => {
        if (statusMsg) {
            const timer = setTimeout(() => setStatusMsg(''), 4000);
            return () => clearTimeout(timer);
        }
    }, [statusMsg]);

    return (
        <div className="h-screen flex flex-col bg-brand-black text-gray-200 font-sans overflow-hidden">
            {/* Navigation Header */}
            <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 shrink-0 bg-black/40 backdrop-blur-md z-50">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded bg-brand-gold flex items-center justify-center">
                        <i className="fa-solid fa-bolt text-brand-black text-sm"></i>
                    </div>
                    <div>
                        <h1 className="text-sm font-serif text-white italic tracking-widest uppercase">Admin | Advanced Editor</h1>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-[10px] uppercase tracking-widest text-white/60">Live Preview Active</span>
                    </div>
                    <a href="/" className="text-[10px] uppercase tracking-widest hover:text-brand-gold transition-all border-b border-white/10 pb-0.5">Salir al Sitio</a>
                </div>
            </header>

            {/* Main Workspace */}
            <main className="flex-1 flex overflow-hidden">
                {/* Left Panel: Editor Sidebar */}
                <aside className="w-[450px] border-r border-white/10 flex flex-col bg-black/20 shrink-0">
                    <div className="p-6 border-b border-white/5 space-y-1">
                        <p className="text-[9px] text-brand-gold font-black uppercase tracking-[0.3em]">IA Architecture</p>
                        <h2 className="text-xl font-serif italic text-white">Narrativa & Estética</h2>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                        {/* Section: Sales Narrative */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs uppercase tracking-[0.2em] font-black text-white/40 flex items-center gap-2">
                                    <i className="fa-solid fa-pen-nib text-brand-gold"></i>
                                    Narrative Override
                                </h3>
                                <span className="text-[9px] text-brand-gold/50 font-mono">db.json persistence</span>
                            </div>

                            {narrative.map((step) => (
                                <div key={step.step} className="glass-panel p-4 rounded-xl space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] uppercase font-bold text-brand-gold">
                                            {step.step === 'date' ? 'Paso 1: Calendario' : 'Paso 2: Horarios'}
                                        </span>
                                        <i className="fa-solid fa-cloud-arrow-up text-[10px] text-white/20"></i>
                                    </div>
                                    <input
                                        value={step.title}
                                        onChange={(e) => {
                                            const newNarrative = [...narrative];
                                            const index = newNarrative.findIndex(n => n.step === step.step);
                                            newNarrative[index].title = e.target.value;
                                            setNarrative(newNarrative);
                                        }}
                                        onBlur={() => saveNarrative(step)}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-xs text-white outline-none focus:border-brand-gold transition"
                                        placeholder="Título del paso..."
                                    />
                                    <textarea
                                        value={step.content}
                                        onChange={(e) => {
                                            const newNarrative = [...narrative];
                                            const index = newNarrative.findIndex(n => n.step === step.step);
                                            newNarrative[index].content = e.target.value;
                                            setNarrative(newNarrative);
                                        }}
                                        onBlur={() => saveNarrative(step)}
                                        className="w-full h-20 bg-white/5 border border-white/10 rounded-lg p-3 text-xs text-white/70 outline-none focus:border-brand-gold transition resize-none"
                                        placeholder="Descripción persuasiva..."
                                    ></textarea>
                                </div>
                            ))}
                        </div>

                        {/* Section: AI Visual Refactoring */}
                        <div className="space-y-4 pt-4 border-t border-white/5">
                            <h3 className="text-xs uppercase tracking-[0.2em] font-black text-white/40 flex items-center gap-2">
                                <i className="fa-solid fa-wand-magic-sparkles text-brand-gold"></i>
                                IA Global Design
                            </h3>
                            <div className="glass-panel p-5 rounded-xl space-y-4">
                                <p className="text-[11px] text-white/60 italic leading-relaxed">Pide cambios estéticos globales (colores, sombras, layouts) y Gemini actualizará el Next.js automáticamente.</p>
                                <textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="Ej: Cambia todos los botones a color magenta flúor con sombra de neón..."
                                    className="w-full h-28 bg-black/40 border border-white/10 rounded-lg p-4 text-xs outline-none focus:border-brand-gold transition resize-none"
                                ></textarea>
                                <button
                                    onClick={generate}
                                    disabled={loading || !prompt}
                                    className="w-full py-3 bg-brand-gold text-brand-black text-[10px] font-black uppercase tracking-[0.2em] rounded-lg transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 flex justify-center items-center gap-3"
                                >
                                    {loading && <i className="fa-solid fa-circle-notch animate-spin"></i>}
                                    {loading ? 'Evolucionando Código...' : 'Aplicar Cambios Estéticos'}
                                </button>
                            </div>
                        </div>

                        {/* Section: Version Control */}
                        <div className="space-y-4 pt-4 border-t border-white/5">
                            <h3 className="text-xs uppercase tracking-[0.2em] font-black text-white/40 flex items-center gap-2">
                                <i className="fa-solid fa-clock-rotate-left text-brand-gold"></i>
                                Git History
                            </h3>
                            <div className="flex gap-2">
                                <select
                                    onChange={(e) => setSelectedCommit(e.target.value as any)}
                                    className="flex-1 bg-white/5 border border-white/10 rounded-lg p-3 text-[10px] outline-none focus:border-brand-gold text-white appearance-none"
                                >
                                    <option value="">Seleccionar Commit...</option>
                                    {history.map((c) => (
                                        <option key={c.sha} value={c.sha}>{c.message}</option>
                                    ))}
                                </select>
                                <button
                                    onClick={revert}
                                    disabled={!selectedCommit || loading}
                                    className="px-4 border border-brand-gold text-brand-gold text-[10px] font-black uppercase rounded-lg hover:bg-brand-gold hover:text-brand-black transition disabled:opacity-30"
                                >
                                    Revertir
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer Status */}
                    <div className="p-4 bg-white/[0.02] border-t border-white/10">
                        <div className="flex items-center justify-between text-[8px] uppercase tracking-widest text-white/30">
                            <span>Database Status: PocketBase</span>
                            <span>v3.0.0 Beta</span>
                        </div>
                    </div>
                </aside>

                {/* Right Panel: Live Viewport */}
                <section className="flex-1 bg-white/5 p-8 relative flex flex-col overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/30"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/30"></div>
                        </div>
                        <div className="text-[10px] text-white/20 font-mono tracking-wider">localhost:3000/preview</div>
                    </div>

                    <div className="flex-1 rounded-2xl overflow-hidden shadow-2xl border border-white/5 relative group">
                        <iframe id="preview-frame" src="/" className="w-full h-full border-none pointer-events-auto bg-black"></iframe>

                        {/* Overlay Controls */}
                        <div className="absolute bottom-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <button onClick={refreshPreview} className="w-10 h-10 rounded-full bg-brand-gold text-brand-black flex items-center justify-center shadow-lg hover:scale-110 active:scale-90 transition">
                                <i className="fa-solid fa-redo"></i>
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            {/* Feedback Overlay */}
            {statusMsg && (
                <div className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-brand-gold text-brand-black px-10 py-3 rounded-full shadow-2xl font-black uppercase tracking-widest text-[11px] z-[100] animate-bounce">
                    <i className="fa-solid fa-check-circle mr-2"></i>
                    {statusMsg}
                </div>
            )}
        </div>
    );
}
