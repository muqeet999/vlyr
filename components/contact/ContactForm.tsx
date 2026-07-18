"use client";

import { FormEvent, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { error?: string; message?: string };

      if (!response.ok) throw new Error(result.error || "Something went wrong. Please try again.");

      form.reset();
      setStatus("success");
      setMessage(result.message || "Received. We’ll read this properly and get back to you.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="contact-form__field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" autoComplete="name" required />
      </div>
      <div className="contact-form__field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="contact-form__field">
        <label htmlFor="businessType">Business type <em>(optional)</em></label>
        <input id="businessType" name="businessType" type="text" autoComplete="organization" />
      </div>
      <div className="contact-form__field contact-form__field--message">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" required placeholder="What’s actually not working?" rows={5} />
      </div>
      <div className="contact-form__action">
        <button type="submit" className="diagnosis-button" disabled={status === "submitting"} data-cursor="">
          {status === "submitting" ? "Sending…" : "Send the diagnosis →"}
        </button>
        {message && (
          <p className={`form-status form-status--${status}`} role={status === "error" ? "alert" : "status"}>
            {message}
          </p>
        )}
      </div>
    </form>
  );
}
