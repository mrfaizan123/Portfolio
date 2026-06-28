import { Helmet } from 'react-helmet-async'

const SEO = ({ title, description, keywords, type = 'website', path = '' }) => {
  const siteUrl = 'https://bytesoft.in' // Or user's domain
  const url = `${siteUrl}${path}`
  
  // Person Schema
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mohd Faizan",
    "url": siteUrl,
    "jobTitle": "Software Engineer & AI Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "ByteSoft"
    },
    "alumniOf": {
      "@type": "Organization",
      "name": "Integral University"
    },
    "sameAs": [
      "https://github.com/mrfaizan123",
      "https://www.linkedin.com/in/mohd-faizan-05a435309/"
    ]
  }

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": siteUrl,
    "name": "Mohd Faizan | AI Engineer & React Developer",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/projects?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}/profile.jpg`} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${siteUrl}/profile.jpg`} />

      {/* Structured Data JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
    </Helmet>
  )
}

export default SEO
