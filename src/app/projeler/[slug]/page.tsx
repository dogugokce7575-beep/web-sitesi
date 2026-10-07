import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import ProjectDetailClient from "@/components/projects/ProjectDetailClient";
import { projectsData, getProjectBySlug } from "@/data/projects";
import { siteConfig } from "@/config/site";

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

export const dynamicParams = true;

export function generateStaticParams() {
  const primarySlugs = [
    "a-bagli-sistem", "b-karma-sistem", "c-besi-modeli", "d-sut-modeli", "e-acik-besi",
    "model-a", "model-b", "model-c", "model-d", "model-e",
    "model-a-bagli-sistem", "model-b-karma-sistem", "model-c-besi-modeli", "model-d-sut-modeli", "model-e-acik-besi"
  ];
  return primarySlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: ProjectDetailPageProps): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: "Proje Bulunamadı" };

  const canonicalUrl = `${siteConfig.url}/projeler/${project.slug}`;

  return {
    title: `${project.title} (${project.dimensions?.totalArea || ""} m²) | Gökçe İnşaat ve Yapı`,
    description: `${project.title} anahtar teslim çiftlik ve yapı projesi. ${project.shortDescription}`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${project.title} - Gökçe İnşaat ve Yapı`,
      description: project.shortDescription,
      url: canonicalUrl,
      images: [{ url: project.mainImage, width: 1200, height: 630, alt: project.title }],
    },
  };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  // Similar projects: in same category or matching capacity/model
  const similarProjects = projectsData
    .filter((p) => p.id !== project.id && (p.capacityValue === project.capacityValue || p.category === project.category || p.featured))
    .slice(0, 3);

  // Schema.org Structured Data for this project / Construction Product
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": project.title,
    "image": `${siteConfig.url}${project.mainImage}`,
    "description": project.shortDescription,
    "brand": {
      "@type": "Brand",
      "name": siteConfig.name,
    },
    "category": project.categoryLabel,
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "TRY",
      "price": project.estimatedCost?.includes("₺") ? project.estimatedCost.replace(/[^\d]/g, "") : "0",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": siteConfig.name,
      },
    },
  };

  return (
    <div className="min-h-screen bg-surface-soft py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Model Kataloğu", href: "/projeler" },
            { label: project.title },
          ]}
        />

        <ProjectDetailClient project={project} similarProjects={similarProjects} />
      </div>
    </div>
  );
}
