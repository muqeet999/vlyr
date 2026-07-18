import { Resend } from "resend";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanString(value: unknown, maximum: number) {
  return typeof value === "string" ? value.trim().slice(0, maximum) : "";
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;

  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Please send the form again." }, { status: 400 });
  }

  const name = cleanString(payload.name, 120);
  const email = cleanString(payload.email, 200);
  const businessType = cleanString(payload.businessType, 160);
  const message = cleanString(payload.message, 4000);

  if (!name || !emailPattern.test(email) || !message) {
    return Response.json({ error: "Please add your name, a valid email, and what is not working." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    return Response.json(
      { error: "The contact form is not connected yet. Please use WhatsApp for now." },
      { status: 503 },
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM || "VLYR <onboarding@resend.dev>",
    to: ["vlyr@gmail.com"],
    replyTo: email,
    subject: `Diagnosis request from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Business type: ${businessType || "Not provided"}`,
      "",
      "What is actually not working:",
      message,
    ].join("\n"),
  });

  if (error) {
    return Response.json({ error: "We could not send that yet. Please use WhatsApp or try again." }, { status: 502 });
  }

  return Response.json({ message: "Received. We’ll read this properly and get back to you." });
}
