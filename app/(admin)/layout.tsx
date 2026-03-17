import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const navItems = [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/users", label: "Users" },
    ];
    return (
        <div>
            <nav>
                {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>{item.label}</Link>
                ))}
            </nav>
            {children}
        </div>);
}