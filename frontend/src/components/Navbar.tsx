"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
    showExperience: boolean;
    openGallery: () => void;
    openExperience: () => void;
}

export default function Navbar({ showExperience, openGallery, openExperience }: NavbarProps) {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (showExperience) return null;

    return (
        <>
            <nav
                className={`fixed w-full z-40 transition-all duration-700 ${scrolled
                    ? "bg-brand-black/95 py-4 shadow-xl backdrop-blur-3xl border-b border-brand-gold/15"
                    : "bg-transparent py-10"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
                    <div className="flex items-center cursor-pointer group">
                        <div className="relative h-16 md:h-22 w-auto">
                            {/* Using standard img tag for now to avoid Next.js Image config complexity with local files if not configured, allowing simpler migration */}
                            <img
                                src="/img/flk_logo.png"
                                alt="Freedom Lifestyle Key"
                                className="h-full w-auto object-contain drop-shadow-[0_0_12px_rgba(197,160,89,0.5)] group-hover:drop-shadow-[0_0_20px_rgba(197,160,89,0.7)] transition-all duration-500"
                            />
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-12">
                        <Link href="#concepto" className="nav-link">
                            El Concepto
                        </Link>
                        <Link href="#ventajas" className="nav-link">
                            Ventajas
                        </Link>
                        <Link href="/tour.html" className="nav-link">
                            Tour Interactivo
                        </Link>
                        <button onClick={openGallery} className="btn-action">
                            Ver Galería
                        </button>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={openExperience}
                                className="btn-action !border-brand-gold"
                            >
                                Agendar Demo
                            </button>
                            <SignedIn>
                                <UserButton
                                    afterSignOutUrl="/"
                                    appearance={{
                                        elements: {
                                            userButtonAvatarBox: "w-9 h-9 ring-2 ring-brand-gold shadow-glow",
                                        },
                                    }}
                                />
                            </SignedIn>
                        </div>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="lg:hidden text-brand-gold text-2xl p-2"
                    >
                        <i className="fa-solid fa-bars"></i>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {
                    isMobileMenuOpen && (
                        <div className="fixed inset-0 z-[100] lg:hidden">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="absolute inset-0 bg-brand-black/90 backdrop-blur-md"
                            />
                            <motion.div
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "100%" }}
                                transition={{ type: "tween", duration: 0.5 }}
                                className="absolute right-0 top-0 h-full w-4/5 max-w-sm glass-panel border-l border-brand-gold/20 flex flex-col p-12 overflow-y-auto"
                            >
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="absolute top-10 right-10 text-brand-gold text-3xl"
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </button>

                                <div className="mt-20 flex flex-col gap-8">
                                    <Link
                                        href="#concepto"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-xl font-serif text-white tracking-widest uppercase italic"
                                    >
                                        El Concepto
                                    </Link>
                                    <Link
                                        href="#ventajas"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-xl font-serif text-white tracking-widest uppercase italic"
                                    >
                                        Ventajas
                                    </Link>
                                    <Link
                                        href="/tour.html"
                                        className="text-xl font-serif text-white tracking-widest uppercase italic"
                                    >
                                        Tour Interactivo
                                    </Link>
                                    <div className="h-px bg-white/10 my-4"></div>

                                    <div className="flex flex-col gap-4">
                                        <button
                                            onClick={() => {
                                                openGallery();
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className="btn-action w-full"
                                        >
                                            Ver Galería
                                        </button>

                                        <SignedOut>
                                            <SignInButton mode="modal">
                                                <button className="btn-action w-full !border-brand-gold bg-brand-gold text-brand-black">
                                                    Agendar Demo
                                                </button>
                                            </SignInButton>
                                        </SignedOut>

                                        <SignedIn>
                                            <div className="flex flex-col gap-4">
                                                <button
                                                    onClick={() => {
                                                        openExperience();
                                                        setIsMobileMenuOpen(false);
                                                    }}
                                                    className="btn-action w-full !border-brand-gold bg-brand-gold text-brand-black"
                                                >
                                                    Agendar Demo
                                                </button>
                                                <div className="flex justify-center">
                                                    <UserButton />
                                                </div>
                                            </div>
                                        </SignedIn>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )
                }
            </AnimatePresence >
        </>
    );
}
