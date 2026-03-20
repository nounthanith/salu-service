import Head from "next/head";
import { usePathname } from "next/navigation";

interface MetaTagsProps {
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
    canonical?: string;
}

export default function MetaTags({ 
    title, 
    description = "Salu service - Discover our delicious menu and experience the best flavors",
    keywords = "salu, service, food, menu, restaurant",
    ogImage,
    canonical
}: MetaTagsProps) {
    const pathname = usePathname();
    
    // Dynamic title logic
    let pageTitle = "SALU | SERVICE";
    if (title) {
        pageTitle = title === "SALU | SERVICE" ? title : `${title} | SALU`;
    } else {
        // Auto-generate title based on pathname
        const pathSegments = pathname.split('/').filter(Boolean);
        if (pathSegments.length > 0) {
            const pageName = pathSegments[pathSegments.length - 1];
            pageTitle = `${pageName.charAt(0).toUpperCase() + pageName.slice(1)} | SALU`;
        }
    }

    return (
        <Head>
            <title>{pageTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            
            {/* Open Graph */}
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
            {ogImage && <meta property="og:image" content={ogImage} />}
            
            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={description} />
            {ogImage && <meta name="twitter:image" content={ogImage} />}
            
            {/* Canonical */}
            {canonical && <link rel="canonical" href={canonical} />}
            
            {/* Favicon */}
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
}
