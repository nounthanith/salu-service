'use client';

import Link from "next/link";
import { navItems } from "./index";
import Button from "@/components/shared/Button";
import { useEffect, useState } from "react";
import { getProfile, logout } from "@/app/src/auth.service";
import { useRouter } from "next/navigation";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState(false);
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await getProfile();
                // Accessing the nested structure: data.data.user
                const user = response?.data?.user;

                if (user) {
                    setProfile(user);
                    setIsAuthenticated(true);
                }
            } catch (err) {
                console.log("Session expired or invalid");
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = async () => {
        await logout();
        setIsAuthenticated(false);
        setProfile(null);
        router.push("/login");
        router.refresh();
    };

    return (
        <div className="min-h-screen">
            <header className="border-b-2 border-foreground/10">
                <div className="flex justify-between items-center max-w-7xl mx-auto p-4">
                    <Link className="uppercase font-black" href="/">
                        <span className="bg-foreground text-background p-1 rounded-md mr-1">sa</span>lu
                    </Link>

                    <nav className="hidden md:flex gap-6">
                        {navItems.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className="text-sm font-medium hover:text-yellow-500 transition-colors duration-200"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex gap-4 items-center">
                        {!loading ? (
                            isAuthenticated ? (
                                <div className="flex items-center gap-3 text-[12px] underline">
                                    {profile?.name || profile?.email}
                                    <Button onClick={handleLogout}>Logout</Button>
                                </div>
                            ) : (
                                <div className="flex gap-2">
                                    <Link href="/login"><Button>Login</Button></Link>
                                    <Link href="/register"><Button>Register</Button></Link>
                                </div>
                            )
                        ) : (
                            <div className="h-8 w-20 animate-pulse bg-gray-200 rounded" />
                        )}
                    </div>
                </div>
            </header>

            <main className="p-4 max-w-7xl mx-auto">
                {children}
            </main>
        </div>
    );
}