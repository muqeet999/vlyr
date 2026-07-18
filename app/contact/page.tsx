import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@/components/contact/ContactForm";
import { SectionMark } from "@/components/site/SectionMark";

export const metadata: Metadata = {
  title: "Start the diagnosis",
  description: "Tell VLYR what is actually not working in your business.",
  alternates: { canonical: "/contact" },
};

const whatsappMessage = encodeURIComponent("Hey VLYR, here's what's actually not working:");

export default function ContactPage() {
  return (
    <section className="contact-page">
      <div className="contact-page__header">
        <SectionMark number="01" label="Contact" />
        <Link className="back-link" href="/" data-cursor="">
          ← Back to the site
        </Link>
        <h1>Tell us what&apos;s actually broken.</h1>
        <p>Not what you think needs building. What&apos;s actually not working.</p>
      </div>
      <div className="contact-page__options">
        <div className="contact-page__form-wrap">
          <span className="contact-page__option-label">01 / WRITE IT DOWN</span>
          <ContactForm />
        </div>
        <aside className="contact-page__whatsapp">
          <span className="contact-page__option-label">02 / MESSAGE DIRECTLY</span>
          <p>If writing it out here is not how you work, send the first message on WhatsApp.</p>
          <a
            href={`https://wa.me/917051812855?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="whatsapp-link"
            data-cursor="open"
          >
            Message us on WhatsApp <span aria-hidden="true">↗</span>
          </a>
        </aside>
      </div>
    </section>
  );
}
