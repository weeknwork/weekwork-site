// sanity/schemaTypes/inquiry.ts
// -----------------------------------------------------------------------------
// Inquiry document — stores contact form submissions.
// Written to Sanity via API route when form is submitted.
// -----------------------------------------------------------------------------

import { defineType, defineField } from "sanity";

export const inquirySchema = defineType({
  name: "inquiry",
  title: "Inquiry",
  type: "document",
  // Read-only in Studio — submissions come from the contact form, not manually
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp",
      type: "string"
    }),
    defineField({
      name: "brand",
      title: "Brand / Company",
      type: "string",
    }),
    defineField({
      name: "service",
      title: "Service Needed",
      type: "string",
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "email",
    },
  },
});