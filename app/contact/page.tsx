"use client";

// app/contact/page.tsx

import { useState } from "react";
import Footer from "../components/Footer";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = {
  name: (form.elements.namedItem("name") as HTMLInputElement).value,
  email: (form.elements.namedItem("email") as HTMLInputElement).value,
  whatsapp: (form.elements.namedItem("whatsapp") as HTMLInputElement).value,
  brand: (form.elements.namedItem("brand") as HTMLInputElement).value,
  service: (form.elements.namedItem("service") as HTMLSelectElement).value,
  message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
};

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        const json = await res.json();
        setErrorMessage(json.error ?? "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <>
      <section
        data-nav-theme="light"
        className="bg-canvas text-ink min-h-screen section"
      >
        <div className="pt-24 md:pt-32">
          <p className="label text-ink-muted mb-8">(CONTACT US)</p>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">

            {/* Left — info column */}
            <div className="md:col-span-5 flex flex-col gap-12">
              <div>
                <h1 className="heading-section text-ink mb-6">
                  Let&apos;s build<br />something<br />that scales.
                </h1>
                <p className="font-geist text-body text-ink-muted max-w-sm">
                  For project inquiries, fill out the form. For everything else, reach us directly.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <div>
                  <p className="label text-ink-muted mb-2">(EMAIL)</p>
                  <a
                    href="mailto:business@weekn.work"
                    className="font-geist text-body text-ink hover:text-accent transition-colors duration-200"
                  >
                    business@weekn.work
                  </a>
                </div>
                <div>
                  <p className="label text-ink-muted mb-2">(WHATSAPP)</p>
                  <a
                    href="https://wa.me/6285186068158"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-geist text-body text-ink hover:text-accent transition-colors duration-200"
                  >
                    +62 8518 606 8158
                  </a>
                </div>
                <div>
                  <p className="label text-ink-muted mb-2">(LOCATION)</p>
                  <p className="font-geist text-body text-ink">
                    Malang, East Java<br />Indonesia
                  </p>
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div className="md:col-span-6 md:col-start-7">
              {status === "sent" ? (
                <div className="flex flex-col gap-6 py-16">
                  <p className="label text-ink-muted">(MESSAGE RECEIVED)</p>
                  <p className="font-sora text-h3 text-ink">
                    Thank you. We&apos;ll be in touch shortly.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="label text-ink hover:text-accent transition-colors duration-200 text-left"
                  >
                    (SEND ANOTHER) &rarr;
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-0">

                  <div className="border-t border-line py-6 flex flex-col gap-2">
                    <label htmlFor="name" className="label text-ink-muted">(NAME) *</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your full name"
                      className="font-geist text-body text-ink bg-transparent outline-none placeholder:text-ink-muted/40 w-full"
                    />
                  </div>

                  <div className="border-t border-line py-6 flex flex-col gap-2">
                    <label htmlFor="email" className="label text-ink-muted">(EMAIL) *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      className="font-geist text-body text-ink bg-transparent outline-none placeholder:text-ink-muted/40 w-full"
                    />
                  </div>

                  <div className="border-t border-line py-6 flex flex-col gap-2">
                     <label htmlFor="whatsapp" className="label text-ink-muted">(WHATSAPP NUMBER) *</label>
                     <input
                      id="whatsapp"
                      name="whatsapp"
                      type="tel"
                      required
                      placeholder="+62 812 3456 7890"
                      className="font-geist text-body text-ink bg-transparent outline-none placeholder:text-ink-muted/40 w-full"
                    />
                  </div>

                  <div className="border-t border-line py-6 flex flex-col gap-2">
                    <label htmlFor="brand" className="label text-ink-muted">(BRAND / COMPANY) *</label>
                    <input
                      id="brand"
                      name="brand"
                      type="text"
                      required
                      placeholder="Your brand or company name"
                      className="font-geist text-body text-ink bg-transparent outline-none placeholder:text-ink-muted/40 w-full"
                    />
                  </div>

                  <div className="border-t border-line py-6 flex flex-col gap-2">
                    <label htmlFor="service" className="label text-ink-muted">(SERVICE NEEDED) *</label>
                    <select
                      id="service"
                      name="service"
                      required
                      defaultValue=""
                      className="font-geist text-body text-ink bg-transparent outline-none w-full appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="text-ink-muted">
                        Select a service
                      </option>
                      <option value="Brand Identity Development">Brand Identity Development</option>
                      <option value="Commercial Video & Photo">Commercial Video &amp; Photo</option>
                      <option value="UGC Content Production">UGC Content Production</option>
                      <option value="Not sure yet">Not sure yet</option>
                    </select>
                  </div>

                  <div className="border-t border-line py-6 flex flex-col gap-2">
                    <label htmlFor="message" className="label text-ink-muted">(TELL US ABOUT YOUR PROJECT)</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="What are you building? What do you need?"
                      className="font-geist text-body text-ink bg-transparent outline-none placeholder:text-ink-muted/40 w-full resize-none"
                    />
                  </div>

                  <div className="border-t border-line pt-8">
                    {status === "error" && (
                      <p className="label text-accent mb-4">{errorMessage}</p>
                    )}
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="label text-ink hover:text-accent transition-colors duration-200 disabled:opacity-40"
                    >
                      {status === "sending" ? "(SENDING...)" : "(SEND MESSAGE) \u2192"}
                    </button>
                  </div>

                </form>
              )}
            </div>
          </div>
        </div>
      </section>

    </>
  );
}