/* Material Symbols Outlined icon — renders a single ligature glyph.
   Usage: <Icon name="school" className="h-5 w-5" />
   The font ligates the ligature name, so `name` is written as children text. */
export function Icon({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  return (
    <span aria-hidden className={`material-symbols-outlined select-none ${className}`}>
      {name}
    </span>
  );
}
