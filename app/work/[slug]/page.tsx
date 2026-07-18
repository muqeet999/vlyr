import { notFound } from "next/navigation";

import { portfolioData } from "@/data/portfolio";

export function generateStaticParams() {
  return portfolioData.map((item) => ({ slug: item.slug }));
}

export default async function WorkPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const item = portfolioData.find((entry) => entry.slug === slug);

  if (!item) notFound();

  return (
    <article className="work-page">
      <p className="eyebrow">WORK / {item.year}</p>
      <h1>{item.title}</h1>
      <p>{item.description}</p>
    </article>
  );
}
