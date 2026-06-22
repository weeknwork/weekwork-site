// sanity/lib/queries.ts

import { groq } from "next-sanity";

// All projects, ordered by the `order` field, for the works index + gallery
export const allProjectsQuery = groq`
  *[_type == "project"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    brand,
    year,
    services,
    "heroImage": heroImage.asset->url,
  }
`;

// Single project by slug, including full blocks, for the detail page
export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    brand,
    year,
    services,
    description,
    "heroImage": heroImage.asset->url,
    links,
    order,
    blocks[] {
      _type,
      // text block fields
      label,
      body,
      // media block fields
      layout,
      items[] {
        kind,
        alt,
        aspect,
        // coalesce: use externalUrl if set, otherwise fall back to Sanity-hosted asset
        "src": coalesce(externalUrl, image.asset->url),
        "videoSrc": coalesce(externalUrl, video.asset->url),
      }
    }
  }
`;

// All slugs — used by generateStaticParams
export const allProjectSlugsQuery = groq`
  *[_type == "project"] { "slug": slug.current }
`;

// Prev/next neighbours by order field
export const projectNeighboursQuery = groq`
{
  "prev": *[_type == "project" && order < $order] | order(order desc)[0] {
    title, "slug": slug.current
  },
  "next": *[_type == "project" && order > $order] | order(order asc)[0] {
    title, "slug": slug.current
  }
}
`; 