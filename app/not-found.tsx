'use client';

import { useRouter } from "next/navigation";
import Button from "@/components/shared/Button";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="flex flex-col gap-4 justify-center items-center min-h-screen text-center">
            <h1 className="text-6xl font-black shadow-text">404</h1>
            <p className="text-lg font-bold uppercase opacity-70">
                Page Not Found
            </p>

            <div className="flex gap-3 mt-4">
                {/* Go Back one step in history */}
                <Button
                    onClick={() => router.back()}
                >
                    Go Back
                </Button>

                {/* Return to Home */}
                <Button>
                    <a href="/">Return Home</a>
                </Button>
            </div>
        </div>
    );
}