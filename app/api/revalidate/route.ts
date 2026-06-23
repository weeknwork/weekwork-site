// app/api/revalidate/route.ts
// -----------------------------------------------------------------------------
// Receives webhook POST from Sanity when a document is created/updated/deleted.
// Validates the secret, then revalidates the affected pages on demand.
// -----------------------------------------------------------------------------

import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // 1. Validate secret
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const documentType = body?._type;
    const slug = body?.slug?.current;

    if (documentType === "project") {
      // Revalidate the works index
      revalidatePath("/works");

      // Revalidate the home page (gallery pulls from Sanity)
      revalidatePath("/");

      // Revalidate the specific project detail page if slug is available
      if (slug) {
        revalidatePath(`/works/${slug}`);
      }
    }

    return NextResponse.json({
      revalidated: true,
      type: documentType,
      slug: slug ?? null,
      now: Date.now(),
    });
  } catch (err) {
    console.error("Revalidation error:", err);
    return NextResponse.json(
      { message: "Error processing webhook" },
      { status: 500 }
    );
  }
}