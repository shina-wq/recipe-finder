import { SITE_NAME, SITE_URL } from "@/lib/seo"

interface SeoProps {
  title: string
  description?: string
  path: string
  noindex?: boolean
  image?: string
  ogType?: "website" | "article"
}

const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`

export function Seo({
  title,
  description,
  path,
  noindex,
  image = DEFAULT_OG_IMAGE,
  ogType = "website",
}: SeoProps) {
  const fullTitle = `${title} | ${SITE_NAME}`
  const canonicalUrl = new URL(path, SITE_URL).toString()

  return (
    <>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />

      {/* Twitter/X - summary_large_image reuses the same og:image */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image} />
    </>
  )
}