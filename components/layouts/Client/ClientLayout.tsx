'use client';

import Link from "next/link";
import { navItems } from "./index";
import Button from "@/components/shared/Button";
import { useEffect, useState, useRef } from "react";
import { getProfile, logout } from "@/app/src/auth.service";
import { useRouter, usePathname } from "next/navigation";

/* ---------------- TYPES ---------------- */

type User = {
    id: string;
    name?: string;
    email: string;
    role?: string;
};

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();

    const [profile, setProfile] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const profileRef = useRef<HTMLDivElement>(null);
    const isAuthenticated = !!profile;
    const isAdmin = profile?.role === "admin";

    /* ---------------- FETCH USER (Your Original Logic) ---------------- */

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getProfile();
                const user = (response as any)?.data?.user ?? response.user;

                if (user) {
                    setProfile({
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    });
                }
            } catch (error) {
                console.log("Session expired or invalid");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    /* ---------------- CLICK OUTSIDE HANDLER ---------------- */

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    /* ---------------- LOGOUT ---------------- */

    const handleLogout = async () => {
        try {
            const ok = window.confirm("Are you sure you want to logout?");
            if (!ok) return;

            await logout();
            setProfile(null);
            setIsProfileOpen(false);
            router.push("/login");
            router.refresh();
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            {/* NAVBAR */}
            <header className="fixed top-0 inset-x-0 z-50 border-b border-foreground/10 bg-background/80 backdrop-blur-md">
                <div className="flex justify-between items-center max-w-7xl mx-auto px-4 h-14">

                    {/* LOGO */}
                    <Link href="/" className="flex items-center group">
                        <span className="bg-foreground text-background px-2 py-1 rounded-md font-black uppercase mr-1">
                            sa
                        </span>
                        <span className="font-black uppercase text-lg tracking-tighter">lu</span>
                    </Link>

                    {/* CENTER NAV */}
                    <nav className="hidden md:flex items-center justify-center gap-1 flex-1 px-6">
                        {navItems.map((item, index) => {
                            const active = pathname === item.href;
                            return (
                                <Link
                                    key={index}
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

                    {/* AUTH & PROFILE AREA */}
                    <div className="flex items-center gap-3">
                        {loading ? (
                            <div className="h-8 w-8 animate-pulse bg-foreground/10 rounded-full" />
                        ) : isAuthenticated ? (
                            <>
                                {/* ADMIN ONLY */}

                                <div className="relative" ref={profileRef}>
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center gap-2 border border-foreground/50 rounded-full p-1 pr-3 hover:bg-foreground/5 transition-all"
                                    >
                                        <div className="w-7 h-7 bg-foreground text-background font-bold rounded-full flex items-center justify-center text-[10px] uppercase">
                                            {profile?.name?.[0] || profile?.email?.[0]}
                                        </div>
                                        <span className="text-[12px] font-bold truncate max-w-[100px]">
                                            {profile?.name || profile?.email}
                                        </span>
                                    </button>

                                    {isProfileOpen && (
                                        <div className="absolute right-0 mt-2 w-52 bg-background border border-foreground/50 rounded-sm shadow-xl py-2 overflow-hidden animate-in fade-in zoom-in-95">
                                            <div className="px-4 py-2 border-b border-foreground/5">
                                                <p className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Account</p>
                                                <p className="text-xs font-medium truncate">{profile?.email}</p>
                                            </div>

                                            {/* DANGER ACTION */}
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-3 text-sm text-danger font-bold hover:bg-red-500/10 transition-colors flex items-center gap-2"
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-danger" />
                                                Logout
                                            </button>
                                            {isAdmin && (
                                                <Link
                                                    href="/dashboard"
                                                    onClick={() => setIsProfileOpen(false)}
                                                    // Added 'flex' and 'items-center' to align the dot and text
                                                    className="w-full text-left px-4 py-3 text-sm text-warn font-bold hover:bg-warn/10 transition-colors flex items-center gap-2"
                                                >
                                                    {/* The Dot */}
                                                    <span className="w-1.5 h-1.5 rounded-full bg-warn" />

                                                    Dashboard
                                                </Link>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="hidden sm:flex gap-2">
                                <Link href="/login"><Button>Login</Button></Link>
                                <Link href="/register"><Button>Register</Button></Link>
                            </div>
                        )}

                        {/* TOGGLE BAR */}
                        <button
                            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <span className={`h-0.5 w-6 bg-foreground rounded-full transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
                            <span className={`h-0.5 w-6 bg-foreground rounded-full transition-all ${isOpen ? "opacity-0" : ""}`} />
                            <span className={`h-0.5 w-6 bg-foreground rounded-full transition-all ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                        </button>
                    </div>
                </div>

                {/* MOBILE MENU */}
                {isOpen && (
                    <nav className="md:hidden flex flex-col gap-1 px-4 pb-6 border-t border-foreground/50 bg-background animate-in slide-in-from-top-2">
                        <div className="pt-2">
                            {navItems.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`block py-4 text-sm font-bold border-b border-foreground/50 ${pathname === item.href ? "text-foreground" : "text-foreground/50"
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                        {isAuthenticated && isAdmin && (
                            <div className="pt-4">
                                <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                                    <Button className="w-full">
                                        Dashboard
                                    </Button>
                                </Link>
                            </div>
                        )}
                        {!isAuthenticated && (
                            <div className="">
                                <Link href="/login"><Button className="w-full">Login</Button></Link>
                            </div>
                        )}
                    </nav>
                )}
            </header>

            {/* MAIN */}
            <main className="flex-1 w-full pt-14 px-0 md:px-4">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}