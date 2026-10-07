import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { siteConfig } from "@/config/site";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const baseUrl = siteConfig.url;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Anasayfa",
        "item": baseUrl
      },
      ...items.map((item, idx) => ({
        "@type": "ListItem",
        "position": idx + 2,
        "name": item.label,
        "item": item.href ? `${baseUrl}${item.href}` : undefined
      }))
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="py-3 text-xs text-slate-500">
        <ol className="flex items-center space-x-2 flex-wrap">
          <li className="flex items-center">
            <Link href="/" className="hover:text-brand-900 flex items-center transition-colors">
              <Home className="w-3.5 h-3.5 mr-1" />
              <span>Anasayfa</span>
            </Link>
          </li>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="flex items-center space-x-2">
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                {item.href && !isLast ? (
                  <Link href={item.href} className="hover:text-brand-900 transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-semibold text-brand-900 truncate max-w-xs sm:max-w-md">
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
