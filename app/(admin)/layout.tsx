'use client';

import { AdminLayout } from "@/components/layouts/Admin";

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
    return <AdminLayout>{children}</AdminLayout>;
}