"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

export default function ContactPage() {
  const t = useTranslations("contact");
  const sectionRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    message: "",
  });

  useGSAP(
    () => {
      if (prefersReducedMotion || !sectionRef.current) return;

      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        ".contact-label",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );

      tl.fromTo(
        ".contact-title-word",
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power4.out" },
        "-=0.3"
      );

      tl.fromTo(
        ".contact-subtitle",
        { opacity: 0, y: 20 },
        { opacity: 0.7, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );

      tl.fromTo(
        ".contact-form-element",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" },
        "-=0.4"
      );

      tl.fromTo(
        ".contact-aside",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.8"
      );
    },
    { scope: sectionRef }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");

    // Build mailto link as fallback (no backend yet)
    const subject = encodeURIComponent(
      `New enquiry from ${formData.name} - ${formData.service || "General"}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nService: ${formData.service || "Not specified"}\nBudget: ${formData.budget || "Not specified"}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:hello@ethanroworth.com?subject=${subject}&body=${body}`;
    setFormState("sent");
  };

  const titleWords = t("title").split(" ");

  return (
    <section ref={sectionRef} className="relative bg-black min-h-screen pt-40 pb-24 md:pb-40">
      <div className="px-6 md:px-16 lg:px-24">
        {/* Header */}
        <div className="mb-20 md:mb-28">
          <span
            className="contact-label font-body text-sm tracking-[0.2em] uppercase text-accent block mb-4"
            style={prefersReducedMotion ? {} : { opacity: 0 }}
          >
            {t("label")}
          </span>

          <h1 className="mb-6">
            {titleWords.map((word, i) => (
              <span key={i} className="overflow-hidden inline-block mr-[0.3em]">
                <span
                  className="contact-title-word inline-block font-display text-[clamp(3rem,8vw,8rem)] leading-[1] text-text-light"
                  style={prefersReducedMotion ? {} : { opacity: 0 }}
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="contact-subtitle max-w-lg font-body text-base md:text-lg font-light text-text-muted"
            style={prefersReducedMotion ? {} : { opacity: 0 }}
          >
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-0">
            {/* Name */}
            <div className="contact-form-element border-b border-white/[0.08] py-6" style={prefersReducedMotion ? {} : { opacity: 0 }}>
              <label className="block font-body text-xs tracking-[0.15em] uppercase text-text-muted mb-3">
                {t("form.name")}
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent font-display text-2xl md:text-3xl text-text-light border-none outline-none placeholder-white/10 focus:placeholder-white/20 transition-colors"
                placeholder={t("form.namePlaceholder")}
              />
            </div>

            {/* Email */}
            <div className="contact-form-element border-b border-white/[0.08] py-6" style={prefersReducedMotion ? {} : { opacity: 0 }}>
              <label className="block font-body text-xs tracking-[0.15em] uppercase text-text-muted mb-3">
                {t("form.email")}
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent font-display text-2xl md:text-3xl text-text-light border-none outline-none placeholder-white/10 focus:placeholder-white/20 transition-colors"
                placeholder={t("form.emailPlaceholder")}
              />
            </div>

            {/* Service */}
            <div className="contact-form-element border-b border-white/[0.08] py-6" style={prefersReducedMotion ? {} : { opacity: 0 }}>
              <label className="block font-body text-xs tracking-[0.15em] uppercase text-text-muted mb-3">
                {t("form.service")}
              </label>
              <div className="flex flex-wrap gap-3 mt-2">
                {["Web Design", "AI Automation", "SEO", "Web App", "Other"].map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => setFormData({ ...formData, service })}
                    className={`px-5 py-2.5 rounded-full font-body text-sm tracking-wide transition-all duration-300 ${
                      formData.service === service
                        ? "bg-accent text-white"
                        : "border border-white/[0.12] text-text-muted hover:border-accent hover:text-accent"
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div className="contact-form-element border-b border-white/[0.08] py-6" style={prefersReducedMotion ? {} : { opacity: 0 }}>
              <label className="block font-body text-xs tracking-[0.15em] uppercase text-text-muted mb-3">
                {t("form.budget")}
              </label>
              <div className="flex flex-wrap gap-3 mt-2">
                {["< £500", "£500 - £1,500", "£1,500 - £3,000", "£3,000+"].map((budget) => (
                  <button
                    key={budget}
                    type="button"
                    onClick={() => setFormData({ ...formData, budget })}
                    className={`px-5 py-2.5 rounded-full font-body text-sm tracking-wide transition-all duration-300 ${
                      formData.budget === budget
                        ? "bg-accent text-white"
                        : "border border-white/[0.12] text-text-muted hover:border-accent hover:text-accent"
                    }`}
                  >
                    {budget}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="contact-form-element border-b border-white/[0.08] py-6" style={prefersReducedMotion ? {} : { opacity: 0 }}>
              <label className="block font-body text-xs tracking-[0.15em] uppercase text-text-muted mb-3">
                {t("form.message")}
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-transparent font-body text-lg text-text-light border-none outline-none placeholder-white/10 focus:placeholder-white/20 transition-colors resize-none"
                placeholder={t("form.messagePlaceholder")}
              />
            </div>

            {/* Submit */}
            <div className="contact-form-element pt-10" style={prefersReducedMotion ? {} : { opacity: 0 }}>
              <button
                type="submit"
                disabled={formState === "sending"}
                className="group relative inline-flex items-center gap-4 font-body text-sm tracking-[0.15em] uppercase text-text-light hover:text-accent transition-colors duration-300"
                data-magnetic
              >
                <span className="relative z-10">
                  {formState === "sent" ? t("form.sent") : t("form.submit")}
                </span>
                <span className="block w-12 h-12 rounded-full border border-white/[0.12] group-hover:border-accent group-hover:bg-accent transition-all duration-500 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-text-muted group-hover:text-white transition-colors duration-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                  </svg>
                </span>
              </button>
            </div>
          </form>

          {/* Sidebar */}
          <div
            className="contact-aside lg:col-span-2 space-y-12"
            style={prefersReducedMotion ? {} : { opacity: 0 }}
          >
            {/* Direct email */}
            <div>
              <span className="font-body text-xs tracking-[0.15em] uppercase text-text-muted block mb-3">
                {t("aside.email")}
              </span>
              <a
                href="mailto:hello@ethanroworth.com"
                className="font-display text-xl text-accent hover:text-accent-hover transition-colors duration-300"
                data-magnetic
              >
                hello@ethanroworth.com
              </a>
            </div>

            {/* Location */}
            <div>
              <span className="font-body text-xs tracking-[0.15em] uppercase text-text-muted block mb-3">
                {t("aside.location")}
              </span>
              <p className="font-body text-base text-text-light">
                Gibraltar & La Linea de la Concepcion
              </p>
            </div>

            {/* Response time */}
            <div>
              <span className="font-body text-xs tracking-[0.15em] uppercase text-text-muted block mb-3">
                {t("aside.response")}
              </span>
              <p className="font-body text-base text-text-light">
                {t("aside.responseTime")}
              </p>
            </div>

            {/* Book a call - Calendly */}
            <div className="pt-8 border-t border-white/[0.08]">
              <span className="font-body text-xs tracking-[0.15em] uppercase text-text-muted block mb-4">
                {t("aside.bookCall")}
              </span>
              <p className="font-body text-sm text-text-muted mb-6">
                {t("aside.bookCallDescription")}
              </p>
              <a
                href="https://calendly.com/ethanroworth"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-4 px-6 py-3 rounded-full border border-accent text-accent hover:bg-accent hover:text-white transition-all duration-300 font-body text-sm tracking-[0.1em] uppercase"
                data-magnetic
              >
                {t("aside.bookCallCta")}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
