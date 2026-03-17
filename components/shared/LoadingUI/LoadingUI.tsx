export default function LoadingUI({ children }: { children: React.ReactNode }) {
    return <div className="flex justify-center items-center min-h-[60vh]">Loading {children}...</div>;
}