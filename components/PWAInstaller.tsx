"use client";

import { useEffect, useState } from "react";

export default function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();

    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === "accepted") {
      console.log("PWA setup accepted");
    } else {
      console.log("PWA setup dismissed");
    }

    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  return showInstallButton ? (
    <div
      style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        transform: "translateX(-50%)",
        zIndex: 1000,
        background: "#0f172a",
        color: "#fff",
        padding: "0.75rem 1.25rem",
        borderRadius: "0.5rem",
        boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        cursor: "pointer",
      }}
      onClick={handleInstallClick}
    >
      📱 Install DermaGlow AI
    </div>
  ) : null;
}