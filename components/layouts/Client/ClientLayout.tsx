import Link from "next/link";
import { navItems } from "./index";
import Button from "@/components/shared/Button";
export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <div className="flex justify-between items-center max-w-7xl mx-auto p-4">
                <Link className="uppercase" href="/">
                    <span className="bg-foreground text-background p-1 rounded-md">
                        sa
                    </span>
                    lu
                </Link>
                <nav className="flex gap-4 text-sm">
                    {navItems?.map((item) => (
                        <Link className="hover:underline text-[16px] transition-all duration-300" key={item.href} href={item.href}>
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="flex gap-1">
                    <Button><Link href="/login">Login</Link></Button>
                    <Button><Link href="/register">Register</Link></Button>
                </div>
            </div>
            <main className="p-4 max-w-7xl mx-auto">{children}</main>
        </div>
    );
}
