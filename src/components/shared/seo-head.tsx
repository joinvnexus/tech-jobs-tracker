"use client";

import Head from "next/head";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
  noFollow?: boolean;
}

export function SEOHead({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  author,
  publishedTime,
  modifiedTime,
  noIndex = false,
  noFollow = false,
}: SEOHeadProps) {
  const siteName = "HireHub";
  const defaultTitle = "HireHub - Find Your Dream Job";
  const defaultDescription =
    "HireHub is the best job portal for job seekers and employers. Find your dream job or hire the best talent.";
  const defaultImage = "/images/og-image.jpg";

  const fullTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaImage = image || defaultImage;

  const robots = [
    noIndex ? "noindex" : "index",
    noFollow ? "nofollow" : "follow",
  ].join(", ");

  return (
    <Head>
      {/* Basic metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      <meta name="robots" content={robots} />

      {/* Canonical URL */}
      {url && <link rel="canonical" href={url} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      {url && <meta property="og:url" content={url} />}
      {author && <meta property="article:author" content={author} />}
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
    </Head>
  );
}

// Default SEO for the entire site
export function DefaultSEO() {
  return (
    <SEOHead
      title="Find Your Dream Job | HireHub"
      description="HireHub is the best job portal for job seekers and employers. Find your dream job or hire the best talent in Bangladesh."
    />
  );
}
