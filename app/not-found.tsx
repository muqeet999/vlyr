import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found">
      <p className="eyebrow">404 / NOT FOUND</p>
      <h1>There&apos;s nothing useful here.</h1>
      <Link href="/" className="back-link">Return to the diagnosis →</Link>
    </section>
  );
}
