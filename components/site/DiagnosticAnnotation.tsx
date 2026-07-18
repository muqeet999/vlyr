export function DiagnosticAnnotation({ label }: { label: string }) {
  return (
    <span className="diagnostic-annotation" aria-hidden="true">
      <i />
      {label}
    </span>
  );
}
