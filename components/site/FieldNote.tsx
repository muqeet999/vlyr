import type { ReactNode } from "react";

export function FieldNote({ index, children }: { index: string; children: ReactNode }) {
  return (
    <article className="field-note">
      <span className="field-note__index">NOTE / {index}</span>
      <p>{children}</p>
    </article>
  );
}
