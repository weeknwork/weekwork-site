// sanity.config.ts
// -----------------------------------------------------------------------------
// Sanity Studio configuration. Studio is accessible at /studio in the app.
// -----------------------------------------------------------------------------

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "weekwork",
  title: "WEEK&WORK",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Projects")
              .child(S.documentTypeList("project").title("Projects")),
            S.divider(),
            S.listItem()
              .title("Inquiries")
              .child(S.documentTypeList("inquiry").title("Inquiries")),
          ]),
    }),
    visionTool(), // GROQ query explorer — useful for debugging
  ],

  schema: {
    types: schemaTypes,
  },
});