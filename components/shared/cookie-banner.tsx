"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Button from "@/components/shared/Button"; // Using your shared button
import Link from "next/link";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  // Use useEffect to avoid hydration mismatch errors in Next.js
  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          // Using your background and foreground variables
          className="fixed bottom-4 inset-x-4 z-[100] md:bottom-8 md:left-auto md:right-8 md:max-w-md bg-background text-foreground border border-foreground/10 shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-xl overflow-hidden"
        >
          <div className="p-5 md:p-6">
            {/* HEADER WITH LOGO STYLE ACCENT */}
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-foreground text-background px-1.5 py-0.5 rounded text-[10px] font-black uppercase">
                sa
              </span>
              <h3 className="text-sm font-black uppercase tracking-tight">
                Cookie Policy
              </h3>
            </div>

            <p className="text-xs md:text-sm text-foreground/70 leading-relaxed mb-6">
              We use cookies to enhance your experience. By continuing, you
              agree to our
              <Link
                href="/privacy"
                className="text-foreground font-bold underline ml-1 hover:text-yellow-500 transition-colors"
              >
                Privacy Policy
              </Link>
              .
            </p>

            {/* BUTTONS AREA */}
            <div className="flex flex-col sm:flex-row gap-2">
              {/* REJECT - DANGER STYLE */}
              <div className="flex-1 group">
                <button
                  onClick={rejectCookies}
                  className="w-full py-2.5 text-xs font-bold uppercase tracking-wider text-red-500 border border-red-500/20 rounded-md hover:bg-red-500 hover:text-white transition-all duration-200"
                >
                  Reject
                </button>
              </div>

              {/* ACCEPT - PRIMARY STYLE */}
              <div className="flex-1">
                <Button
                  onClick={acceptCookies}
                  className="w-full py-2.5 text-xs font-bold uppercase tracking-wider shadow-[0_4px_14px_0_rgba(0,0,0,0.1)]"
                >
                  Accept All
                </Button>
              </div>
            </div>
          </div>

          {/* DECORATIVE BOTTOM BAR */}
          <div className="h-1 w-full bg-foreground/5" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
