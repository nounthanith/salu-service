import { useEffect, useState } from "react";
import { getProfile, logout } from "@/app/src/auth.service";
import { useRouter } from "next/navigation";

type User = {
    id: string;
    name?: string;
    email: string;
    role?: string;
};

export function useAuth() {
    const [profile, setProfile] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const isAuthenticated = !!profile;
    const isAdmin = profile?.role === "admin";

    useEffect(() => {
        let mounted = true;

        const fetchUser = async () => {
            try {
                const response = await getProfile();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const user = (response as any)?.data?.user ?? (response as any)?.user;

                if (mounted && user) {
                    setProfile({
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    });
                }
            } catch {
                if (mounted) {
                    console.log("Session expired or invalid");
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        fetchUser();

        return () => {
            mounted = false;
        };
    }, []);

    const handleLogout = async () => {
        try {
            const ok = window.confirm("Are you sure you want to logout?");
            if (!ok) return;

            await logout();
            setProfile(null);
            router.push("/login");
            router.refresh();
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return {
        profile,
        loading,
        isAuthenticated,
        isAdmin,
        handleLogout,
        setProfile
    };
}
