import { SITE_NAME, SITE_URL } from "@/lib/seo"

interface SeoProps {
  title: string
  description?: string
  path: string
  noindex?: boolean
}

export function Seo({ title, description, path, noindex }: SeoProps) {
  const canonicalUrl = new URL(path, SITE_URL).toString()

  return (
    <>
      <title>{title} | {SITE_NAME}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
    </>
  )
}