"use client";

import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

export default function ToastProvider() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");

    const handleChange = () => {
      setIsMobile(media.matches);
    };

    handleChange();

    media.addEventListener("change", handleChange);

    return () => {
      media.removeEventListener("change", handleChange);
    };
  }, []);

  return isMobile ? (
    <Toaster
      key="mobile-toaster"
      position="top-left"
      containerStyle={{
        top: 58,
        left: 35,
      }}
      toastOptions={{
        style: {
          minWidth: 240,
          maxWidth: 320,
          textAlign: "center",
          wordBreak: "keep-all",
          whiteSpace: "normal",
        },
      }}
    />
  ) : (
    <Toaster key="desktop-toaster" position="top-center" />
  );
}
