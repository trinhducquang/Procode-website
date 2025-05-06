import Script from "next/script"

export default function StructuredData() {
    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "@id": "https://procode-website.vercel.app/#website",
                url: "https://procode-website.vercel.app/",
                name: "Procode Portfolio",
                description:
                    "Trang web portfolio cá nhân hiện đại, chuyên nghiệp với các dự án web, thiết kế UI/UX và phát triển front-end",
                potentialAction: [
                    {
                        "@type": "SearchAction",
                        target: "https://procode-website.vercel.app/search?q={search_term_string}",
                        "query-input": "required name=search_term_string",
                    },
                ],
                inLanguage: "vi",
            },
            {
                "@type": "Person",
                "@id": "https://procode-website.vercel.app/#person",
                name: "James William",
                image: {
                    "@type": "ImageObject",
                    "@id": "https://procode-website.vercel.app/#personImage",
                    inLanguage: "vi",
                    url: "https://procode-website.vercel.app/profile.jpg",
                    contentUrl: "https://procode-website.vercel.app/profile.jpg",
                    caption: "James William",
                },
                description: "Front-End Developer with expertise in UI/UX design and web development",
                sameAs: [
                    "https://twitter.com/procode",
                    "https://www.instagram.com/procode/",
                    "https://www.linkedin.com/in/procode/",
                    "https://github.com/procode",
                ],
                jobTitle: "Front-End Developer",
                worksFor: {
                    "@type": "Organization",
                    name: "Procode",
                },
            },
            {
                "@type": "BreadcrumbList",
                "@id": "https://procode-website.vercel.app/#breadcrumb",
                itemListElement: [
                    {
                        "@type": "ListItem",
                        position: 1,
                        name: "Home",
                        item: "https://procode-website.vercel.app/",
                    },
                ],
            },
            {
                "@type": "WebPage",
                "@id": "https://procode-website.vercel.app/#webpage",
                url: "https://procode-website.vercel.app/",
                name: "Procode - Portfolio cá nhân chuyên nghiệp",
                isPartOf: {
                    "@id": "https://procode-website.vercel.app/#website",
                },
                about: {
                    "@id": "https://procode-website.vercel.app/#person",
                },
                breadcrumb: {
                    "@id": "https://procode-website.vercel.app/#breadcrumb",
                },
                inLanguage: "vi",
                potentialAction: [
                    {
                        "@type": "ReadAction",
                        target: ["https://procode-website.vercel.app/"],
                    },
                ],
            },
        ],
    }

    return (
        <Script
            id="structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    )
}
