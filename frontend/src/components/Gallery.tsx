"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryProps {
    showGallery: boolean;
    closeGallery: () => void;
}

const IMAGES = [
    { src: "/img/1.png" },
    { src: "/img/2.png" },
    { src: "/img/3.png" },
    { src: "/img/4.png" },
    { src: "/img/5.png" },
    { src: "/img/6.png" },
    { src: "/img/7.png" },
];

export default function Gallery({ showGallery, closeGallery }: GalleryProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (showGallery) {
            setCurrentImageIndex(0);
        }
    }, [showGallery]);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % IMAGES.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
        if (e.key === "Escape") closeGallery();
    };

    useEffect(() => {
        if (showGallery) {
            window.addEventListener("keydown", handleKeyDown);
            return () => window.removeEventListener("keydown", handleKeyDown);
        }
    }, [showGallery]);

    return (
        <AnimatePresence>
            {showGallery && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[110] bg-brand-black/98 backdrop-blur-2xl flex flex-col items-center justify-center p-10"
                >
                    <div className="absolute top-10 right-10 z-20">
                        <button
                            onClick={closeGallery}
                            className="text-white hover:text-brand-gold transition text-6xl font-thin"
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    <div className="w-full max-w-6xl">
                        <div className="relative aspect-[16/9] mb-12 shadow-2xl rounded-2xl overflow-hidden glass-panel border-brand-gold/30">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentImageIndex}
                                    src={IMAGES[currentImageIndex].src}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full h-full object-cover"
                                    alt={`Gallery image ${currentImageIndex + 1}`}
                                />
                            </AnimatePresence>
                            <button
                                onClick={prevImage}
                                className="absolute left-10 top-1/2 -translate-y-1/2 z-10 glass-panel text-brand-gold rounded-full p-8 hover:bg-brand-gold hover:text-brand-black transition duration-700"
                            >
                                <i className="fa-solid fa-chevron-left text-3xl"></i>
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-10 top-1/2 -translate-y-1/2 z-10 glass-panel text-brand-gold rounded-full p-8 hover:bg-brand-gold hover:text-brand-black transition duration-700"
                            >
                                <i className="fa-solid fa-chevron-right text-3xl"></i>
                            </button>
                        </div>
                        <div className="flex justify-center gap-2">
                            {IMAGES.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex
                                            ? "bg-brand-gold w-8"
                                            : "bg-white/20 hover:bg-white/40"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
