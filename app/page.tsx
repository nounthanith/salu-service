"use client";
import { ClientLayout } from "@/components/layouts/Client";
import DotGrid from "@/components/ui/DotGrid";
import Button from "@/components/shared/Button";
import MetaTags from "@/components/shared/MetaTags";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <MetaTags />
      <ClientLayout>
      {/* Container: h-screen makes it a full hero, relative handles the grid placement */}
      <div className="relative w-full min-h-[80vh] overflow-hidden flex flex-col items-center justify-center bg-background transition-colors duration-500 px-4">
        {/* Background Grid - Stays absolute */}
        <div className="absolute inset-0 z-0">
          <DotGrid
            dotSize={3}
            gap={24}
            baseColor="rgba(128, 128, 128, 0.2)"
            activeColor="var(--foreground)"
            proximity={100}
            shockRadius={200}
            shockStrength={3}
            resistance={800}
            returnDuration={1.2}
          />
        </div>

        {/* Content Container: Increased spacing and responsive text */}
        <div className="z-10 flex flex-col items-center text-center gap-6 md:gap-10 max-w-4xl">
          <div className="space-y-2">
            <h2 className="text-sm md:text-base font-medium tracking-[0.2em] uppercase opacity-60 animate-in fade-in slide-in-from-bottom-4 duration-700">
              Welcome To
            </h2>

            <h1 className="flex flex-wrap items-center justify-center gap-3 group cursor-default">
              <div className="flex items-center gap-1 md:gap-2">
                <span className="bg-foreground text-background px-4 py-2 md:px-6 md:py-3 rounded-sm font-black text-4xl md:text-7xl lg:text-8xl uppercase transition-transform duration-500 group-hover:-rotate-2 group-hover:scale-105">
                  sa
                </span>
                <span className="font-black uppercase text-5xl md:text-8xl lg:text-9xl tracking-tighter transition-transform duration-500 group-hover:translate-x-1">
                  lu
                </span>
              </div>
            </h1>
          </div>

          <p className="max-w-[280px] md:max-w-md text-sm md:text-lg opacity-70 leading-relaxed italic">
            Discover our delicious menu and experience the best flavors.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
            {/* Updated link to /menu */}
            <Link href="/menu" className="w-full sm:w-auto">
              <Button className="w-full sm:px-12 py-4 text-lg">
                Check Menu
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative Scroll Hint (Visual only) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-30 animate-bounce hidden md:block">
          <div className="w-[4px] h-12 bg-foreground"></div>
        </div>
      </div>
      </ClientLayout>
    </>
  );
}
