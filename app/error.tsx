'use client';

import { useEffect } from 'react';
import Button from '@/components/shared/Button';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Critical UI Error:", error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
            <div className="p-8 border-2 border-foreground rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-background max-w-md">
                <h2 className="text-2xl font-black uppercase mb-2">Something went wrong!</h2>
                <p className="text-sm text-foreground/60 mb-6">
                    An unexpected error occurred. We've been notified and are looking into it.
                </p>

                <div className="flex flex-col gap-3">
                    <Button onClick={() => reset()}>
                        Try Again
                    </Button>

                    <button
                        onClick={() => window.location.href = '/'}
                        className="text-xs font-bold underline opacity-50 hover:opacity-100 transition-opacity"
                    >
                        Go back to safety
                    </button>
                </div>

                {process.env.NODE_ENV === 'development' && (
                    <div className="mt-6 p-2 bg-red-50 border border-red-200 text-red-600 text-[10px] text-left overflow-auto rounded">
                        <strong>Dev Trace:</strong> {error.message}
                    </div>
                )}
            </div>
        </div>
    );
}