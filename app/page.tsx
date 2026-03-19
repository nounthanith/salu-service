"use client";
import { ClientLayout } from "@/components/layouts/Client";
import DotGrid from "@/components/ui/DotGrid";
import Button from "@/components/shared/Button";
import Link from "next/link";

export default function Home() {
  return (
    <ClientLayout>
      <div className="relative w-full min-h-[80vh] overflow-hidden flex flex-col items-center justify-center bg-background transition-colors duration-500">

        {/* Background Grid */}
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

        {/* Content Container */}
        <div className="z-10 flex flex-col items-center gap-8">
          <h1 className="flex items-center gap-3 group cursor-default">
            <span className="text-2xl font-medium tracking-tight opacity-80">
              Welcome To
            </span>

            <div className="flex items-center gap-1">
              <span className="bg-foreground text-background px-3 py-1 rounded-sm font-black text-3xl uppercase transition-transform duration-300 group-hover:scale-110">
                sa
              </span>
              <span className="font-black uppercase text-4xl tracking-tighter">
                lu
              </span>
            </div>
            
          </h1>

          <div className="flex gap-4">
            <Link href="/explore">
              <Button >
                Explore
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </ClientLayout>
  );
}