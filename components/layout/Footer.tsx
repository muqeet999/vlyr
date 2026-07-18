import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__statement">
        VLYR — we don&apos;t sell websites. We fix the thing the website was supposed to fix.
      </div>
      <div className="site-footer__meta">
        <span>Srinagar, Kashmir</span>
        <Link href="mailto:vlyr@gmail.com">vlyr@gmail.com</Link>
        <span>© {new Date().getFullYear()} VLYR</span>
      </div>
    </footer>
  );
}
