// sanity/schemaTypes/project.ts

import { defineType, defineField, defineArrayMember } from "sanity";

export const projectSchema = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "brand",
      title: "Brand Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "description",
      title: "Project Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "links",
      title: "External Links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "URL", type: "url" }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        }),
      ],
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Controls the order projects appear on the site. Lower = earlier.",
    }),
    defineField({
      name: "blocks",
      title: "Content Blocks",
      type: "array",
      of: [
        // TEXT BLOCK
        defineArrayMember({
          type: "object",
          name: "textBlock",
          title: "Text Block",
          fields: [
            defineField({
              name: "label",
              title: "Label (optional)",
              type: "string",
              description: "Appears as (LABEL) above the text. e.g. THE PACKAGING, THE STORYLINE",
            }),
            defineField({
              name: "body",
              title: "Body",
              type: "text",
              rows: 6,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "body" },
            prepare({ title, subtitle }) {
              return {
                title: title ? `(${title})` : "(Text Block)",
                subtitle: subtitle?.slice(0, 60),
              };
            },
          },
        }),

        // MEDIA BLOCK
        defineArrayMember({
          type: "object",
          name: "mediaBlock",
          title: "Media Block",
          fields: [
            defineField({
              name: "layout",
              title: "Layout",
              type: "string",
              options: {
                list: [
                  { title: "Single (full width)", value: "single" },
                  { title: "Pair (two side by side)", value: "pair" },
                  { title: "Triple (three across)", value: "triple" },
                ],
                layout: "radio",
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "items",
              title: "Media Items",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  name: "mediaItem",
                  fields: [
                    defineField({
                      name: "kind",
                      title: "Type",
                      type: "string",
                      options: {
                        list: [
                          { title: "Image", value: "image" },
                          { title: "Video", value: "video" },
                        ],
                        layout: "radio",
                      },
                      validation: (Rule) => Rule.required(),
                    }),
                    // --- Sanity-hosted assets ---
                    defineField({
                      name: "image",
                      title: "Image (upload to Sanity)",
                      type: "image",
                      options: { hotspot: true },
                      hidden: ({ parent }) => parent?.kind !== "image",
                    }),
                    defineField({
                      name: "video",
                      title: "Video (upload to Sanity)",
                      type: "file",
                      options: { accept: "video/*" },
                      hidden: ({ parent }) => parent?.kind !== "video",
                    }),
                    // --- External CDN asset ---
                    defineField({
                      name: "externalUrl",
                      title: "External URL (S3, Cloudflare R2, etc.)",
                      type: "url",
                      description:
                        "Paste a direct media URL from S3 or any CDN. If filled, this takes priority over the upload fields above. Do NOT use Google Drive links — use S3 or Cloudflare R2.",
                    }),
                    defineField({
                      name: "alt",
                      title: "Alt Text",
                      type: "string",
                    }),
                    defineField({
                      name: "aspect",
                      title: "Aspect Ratio",
                      type: "string",
                      options: {
                        list: [
                          { title: "3:4 (Portrait)", value: "3/4" },
                          { title: "4:3 (Landscape)", value: "4/3" },
                          { title: "1:1 (Square)", value: "1/1" },
                          { title: "16:9 (Widescreen)", value: "16/9" },
                          { title: "4:5 (Tall)", value: "4/5" },
                        ],
                      },
                    }),
                  ],
                  preview: {
                    select: { kind: "kind", alt: "alt", externalUrl: "externalUrl" },
                    prepare({ kind, alt, externalUrl }) {
                      return {
                        title: kind === "video" ? "Video" : "Image",
                        subtitle: externalUrl ? `CDN: ${externalUrl.slice(0, 40)}...` : (alt ?? ""),
                      };
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: { layout: "layout" },
            prepare({ layout }) {
              return { title: `Media Block — ${layout ?? ""}` };
            },
          },
        }),
      ],
    }),
  ],

  preview: {
    select: { title: "title", subtitle: "brand", media: "heroImage" },
  },
});