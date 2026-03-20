export default function LoadingSkeleton({ 
    className = "", 
    lines = 3,
    height = "h-4" 
}: {
    className?: string;
    lines?: number;
    height?: string;
}) {
    return (
        <div className={`space-y-2 ${className}`}>
            {Array.from({ length: lines }).map((_, i) => (
                <div
                    key={i}
                    className={`${height} bg-foreground/10 rounded animate-pulse`}
                    style={{
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: '1.5s'
                    }}
                />
            ))}
        </div>
    );
}

export function CardSkeleton() {
    return (
        <div className="bg-background border border-foreground/10 rounded-lg p-6 space-y-4">
            <div className="h-6 bg-foreground/10 rounded animate-pulse w-3/4" />
            <div className="space-y-2">
                <div className="h-4 bg-foreground/10 rounded animate-pulse" />
                <div className="h-4 bg-foreground/10 rounded animate-pulse w-5/6" />
            </div>
            <div className="h-10 bg-foreground/10 rounded animate-pulse w-1/3" />
        </div>
    );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 h-8 bg-foreground/5 animate-pulse rounded" />
                        <th className="px-6 py-3 h-8 bg-foreground/5 animate-pulse rounded" />
                        <th className="px-6 py-3 h-8 bg-foreground/5 animate-pulse rounded" />
                        <th className="px-6 py-3 h-8 bg-foreground/5 animate-pulse rounded" />
                        <th className="px-6 py-3 h-8 bg-foreground/5 animate-pulse rounded" />
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {Array.from({ length: rows }).map((_, i) => (
                        <tr key={i}>
                            <td className="px-6 py-4 h-4 bg-foreground/5 animate-pulse rounded" />
                            <td className="px-6 py-4 h-4 bg-foreground/5 animate-pulse rounded" />
                            <td className="px-6 py-4 h-4 bg-foreground/5 animate-pulse rounded" />
                            <td className="px-6 py-4 h-4 bg-foreground/5 animate-pulse rounded" />
                            <td className="px-6 py-4 h-4 bg-foreground/5 animate-pulse rounded" />
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
