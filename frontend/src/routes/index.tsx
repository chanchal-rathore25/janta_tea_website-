import { createFileRoute } from '@tanstack/react-router'
import Home from "@/components/Home";
const title = "Janta Tea Company — Fresh Tea Shop & Wholesale Dealer, Indore";
const description =
  "Buy fresh Assam, Darjeeling, masala, green and cardamom tea from Janta Tea Company, Siyaganj, Indore. Retail packs and wholesale rates since 1974. Call +91 99266 99991.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Store",
          name: "Janta Tea Company",
          description,
          telephone: "+91-99266-99991",
          email: "jantatea@yahoo.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Siyaganj Market",
            addressLocality: "Indore",
            addressRegion: "Madhya Pradesh",
            addressCountry: "IN",
          },
          openingHours: "Mo-Sa 10:00-20:00",
          aggregateRating: { "@type": "AggregateRating", ratingValue: "4.2", reviewCount: "180" },
        }),
      },
    ],
  }),
  component: Home,
});
