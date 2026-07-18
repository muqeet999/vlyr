export function SectionMark({ number, label }: { number: string; label: string }) {
  return (
    <div className="section-mark">
      <span>{number}</span>
      <i />
      <span>{label}</span>
    </div>
  );
}
