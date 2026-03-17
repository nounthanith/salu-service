import ClientLayoutComponent from "@/components/layouts/Client/ClientLayout";

export default function ClientLayout({ children }: { children: React.ReactNode }) {

    return (
        <ClientLayoutComponent>
            {children}
        </ClientLayoutComponent>
    );
}