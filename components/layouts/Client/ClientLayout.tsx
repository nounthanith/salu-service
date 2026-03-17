'use client';

import Link from "next/link";
import { navItems } from "./index";
import Button from "@/components/shared/Button";
import { useEffect, useState } from "react";
import { getProfile, logout } from "@/app/src/auth.service";
import { useRouter } from "next/navigation";

/* ---------------- TYPES ---------------- */

type User = {
    id: string;
    name?: string;
    email: string;
};

/* ---------------- COMPONENT ---------------- */

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const router = useRouter();

    const [profile, setProfile] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    const isAuthenticated = !!profile;

    /* ---------------- FETCH USER ---------------- */

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

    /* ---------------- LOGOUT ---------------- */

    const handleLogout = async () => {
        try {

            await logout();

            setProfile(null);

            router.push("/login");
            router.refresh();

        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    /* ---------------- UI ---------------- */

    return (
        <div className="min-h-screen flex flex-col">

            {/* HEADER */}

            <header className="border-b border-foreground/10">

                <div className="flex justify-between items-center max-w-7xl mx-auto p-4">

                    {/* LOGO */}

                    <Link
                        className="uppercase font-black text-lg"
                        href="/"
                    >
                        <span className="bg-foreground text-background px-2 py-1 rounded-md mr-1">
                            sa
                        </span>
                        lu
                    </Link>

                    {/* DESKTOP NAV */}

                    <nav className="hidden md:flex gap-6">

                        {navItems.map((item, index) => (

                            <Link
                                key={index}
                                href={item.href}
                                className="text-sm font-medium hover:text-yellow-500 transition-colors"
                            >
                                {item.label}
                            </Link>

                        ))}

                    </nav>

                    {/* AUTH AREA */}

                    <div className="flex items-center gap-3">

                        {loading ? (

                            <div className="h-8 w-20 animate-pulse bg-foreground/10 rounded-md" />

                        ) : isAuthenticated ? (

                            <div className="flex items-center gap-3 text-sm">

                                <span className="underline">
                                    {profile?.name || profile?.email}
                                </span>

                                <Button onClick={handleLogout}>
                                    Logout
                                </Button>

                            </div>

                        ) : (

                            <div className="flex gap-2">

                                <Link href="/login">
                                    <Button>
                                        Login
                                    </Button>
                                </Link>

                                <Link href="/register">
                                    <Button>
                                        Register
                                    </Button>
                                </Link>

                            </div>

                        )}

                        {/* MOBILE MENU BUTTON */}

                        <button
                            className="md:hidden text-xl"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            ☰
                        </button>

                    </div>

                </div>

                {/* MOBILE NAV */}

                {isOpen && (

                    <nav className="md:hidden flex flex-col gap-3 p-4 border-t border-foreground/10">

                        {navItems.map((item, index) => (

                            <Link
                                key={index}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="text-sm font-medium hover:text-yellow-500"
                            >
                                {item.label}
                            </Link>

                        ))}

                    </nav>

                )}

            </header>

            {/* MAIN */}

            <main className="flex-1 p-4 max-w-7xl mx-auto w-full">
                {children}
            </main>

        </div>
    );
}