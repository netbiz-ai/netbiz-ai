import { ContactForm } from "./contact-form";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative mx-auto max-w-6xl px-6 py-28 md:py-36"
    >
      <div className="grid gap-12 md:grid-cols-2">
        <div className="md:sticky md:top-32 md:self-start">
          <span className="section-eyebrow">Let&apos;s talk</span>
          <h2 className="mt-3 text-4xl font-medium tracking-tight sm:text-5xl">
            Tell us what you&apos;re{" "}
            <span className="font-serif italic font-normal gradient-text">
              trying to ship.
            </span>
          </h2>
          <p className="mt-4 max-w-md text-white/60">
            We reply within one business day. Submit the form and we&apos;ll
            send you straight to a time that works for both of us.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-white/55">
            <li className="flex gap-3">
              <span className="mt-2 h-1 w-1 rounded-full bg-white/40" />
              30-minute discovery, no pitch deck.
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1 w-1 rounded-full bg-white/40" />
              You leave with a one-page plan whether or not we work
              together.
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1 w-1 rounded-full bg-white/40" />
              Typical first project ships in 2–6 weeks.
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
