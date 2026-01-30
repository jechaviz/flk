"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Concepto from "../components/Concepto";
import Ventajas from "../components/Ventajas";
import ModeSwitcher from "../components/ModeSwitcher";
import Gallery from "../components/Gallery";
import Experience from "../components/Experience";
import Footer from "../components/Footer";

export default function Home() {
  const [mode, setMode] = useState("A");
  const [showExperience, setShowExperience] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  const openExperience = () => {
    setShowExperience(true);
    document.body.style.overflow = "hidden";
  };

  const closeExperience = () => {
    setShowExperience(false);
    document.body.style.overflow = "";
  };

  const openGallery = () => {
    setShowGallery(true);
    document.body.style.overflow = "hidden";
  };

  const closeGallery = () => {
    setShowGallery(false);
    document.body.style.overflow = "";
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-brand-black text-brand-text">
      <ModeSwitcher mode={mode} setMode={setMode} />

      <Navbar
        showExperience={showExperience}
        openGallery={openGallery}
        openExperience={openExperience}
      />

      <Hero
        mode={mode}
        setMode={setMode}
        openExperience={openExperience}
      />

      <Concepto mode={mode} />
      <Ventajas mode={mode} />

      <Footer openExperience={openExperience} />

      {/* Gallery Modal */}
      <Gallery showGallery={showGallery} closeGallery={closeGallery} />

      {/* Experience Overlay */}
      <Experience showExperience={showExperience} closeExperience={closeExperience} />
    </div>
  );
}
