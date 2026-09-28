import Link from "next/link";

export default function ProgramsNotFound() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 text-center">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-gold">Programmes</p>
      <h1 className="mt-3 font-display text-4xl font-bold text-zinc-900">That programme doesn&apos;t exist.</h1>
      <p className="mx-auto mt-3 max-w-md text-zinc-500">
        Browse the eight programmes we actually run — or tell us what you&apos;re looking for.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link href="/programs" className="font-display text-sm font-bold text-gold hover:text-gold-soft">
          All programmes
        </Link>
        <span className="text-zinc-400">·</span>
        <Link href="/contact" className="font-display text-sm font-bold text-gold hover:text-gold-soft">
          Ask us directly
        </Link>
      </div>
    </section>
  );
}
