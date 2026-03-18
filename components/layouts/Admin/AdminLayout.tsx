'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "./index";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <header className="fixed top-0 inset-x-0 z-50 border-b border-foreground/10 bg-background/80 backdrop-blur-md">
                <div className="flex items-center justify-between max-w-7xl mx-auto px-4 h-14">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="flex items-center group">
                            <span className="bg-foreground text-background px-2 py-1 rounded-md font-black uppercase mr-1">
                                sa
                            </span>
                            <span className="font-black uppercase text-lg tracking-tighter">lu</span>
                        </Link>

                        <span className="hidden sm:inline-flex text-[10px] font-black uppercase tracking-widest border border-foreground/20 px-2 py-1 rounded-sm">
                            Admin
                        </span>
                    </div>

                    <nav className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => {
                            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`p-1 px-2 text-[14px] font-medium rounded-sm transition-colors ${active
                                        ? "text-foreground bg-foreground/10"
                                        : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="flex items-center gap-2">
                        <Link
                            href="/"
                            className="hidden md:inline-flex text-[13px] font-bold text-foreground/60 hover:text-foreground transition-colors"
                        >
                            Back to site
                        </Link>

                        <button
                            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
                            onClick={() => setOpen((v) => !v)}
                            aria-label="Toggle admin navigation"
                        >
                            <span className={`h-0.5 w-6 bg-foreground rounded-full transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
                            <span className={`h-0.5 w-6 bg-foreground rounded-full transition-all ${open ? "opacity-0" : ""}`} />
                            <span className={`h-0.5 w-6 bg-foreground rounded-full transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
                        </button>
                    </div>
                </div>

                {open && (
                    <nav className="md:hidden flex flex-col gap-1 px-4 pb-6 border-t border-foreground/10 bg-background animate-in slide-in-from-top-2">
                        {navItems.map((item) => {
                            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className={`block py-4 text-sm font-bold border-b border-foreground/5 ${active ? "text-foreground" : "text-foreground/50"
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}

                        <div className="pt-4">
                            <Link
                                href="/"
                                onClick={() => setOpen(false)}
                                className="text-sm font-bold text-foreground/60 hover:text-foreground transition-colors"
                            >
                                Back to site
                            </Link>
                        </div>
                    </nav>
                )}
            </header>

            <main className="flex-1 w-full pt-20 pb-12 px-4">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}

