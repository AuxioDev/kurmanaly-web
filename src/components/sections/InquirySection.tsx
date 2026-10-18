"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { RevealItem, SectionReveal } from "@/components/motion/SectionReveal";

export function InquirySection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <SectionReveal
      id="inquire"
      className="scroll-mt-28 border-t border-white/5 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl">
          <RevealItem>
            <h2 className="font-display text-3xl text-zinc-100 sm:text-5xl">Inquire</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
            Request availability, pricing, or discuss a custom commission. We respond
            within two business days.
            </p>
          </RevealItem>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-10 rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center"
            >
              <p className="font-display text-xl text-emerald-200">Message received</p>
              <p className="mt-2 text-sm text-zinc-400">
                Thank you for reaching out. The studio will reply to your email shortly.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm text-zinc-400">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-surface-raised px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:border-violet-glow/50 focus:outline-none focus:ring-1 focus:ring-violet-glow/40"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-zinc-400">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-surface-raised px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:border-violet-glow/50 focus:outline-none focus:ring-1 focus:ring-violet-glow/40"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="type" className="block text-sm text-zinc-400">
                  Inquiry type
                </label>
                <select
                  id="type"
                  name="type"
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-surface-raised px-4 py-3 text-zinc-100 focus:border-violet-glow/50 focus:outline-none focus:ring-1 focus:ring-violet-glow/40"
                  defaultValue="purchase"
                >
                  <option value="purchase">Artwork purchase / hold</option>
                  <option value="commission">Custom commission</option>
                  <option value="general">General question</option>
                </select>
              </div>
              <div>
                <label htmlFor="artwork" className="block text-sm text-zinc-400">
                  Artwork or project (optional)
                </label>
                <input
                  id="artwork"
                  name="artwork"
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-surface-raised px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:border-violet-glow/50 focus:outline-none focus:ring-1 focus:ring-violet-glow/40"
                  placeholder="e.g. Crimson Horizon"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm text-zinc-400">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="mt-1.5 w-full resize-y rounded-xl border border-white/10 bg-surface-raised px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:border-violet-glow/50 focus:outline-none focus:ring-1 focus:ring-violet-glow/40"
                  placeholder="Tell us about your interest, timeline, or commission idea..."
                />
              </div>
              <MagneticButton
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-gradient-to-r from-crimson-glow to-violet-glow py-3.5 text-sm font-semibold text-white shadow-glow disabled:opacity-60"
              >
                {loading ? "Sending…" : "Send inquiry"}
              </MagneticButton>
            </form>
          )}
        </div>
      </div>
    </SectionReveal>
  );
}
