/* Fixed page backdrop — one continuous glow for every page, so no band or seam
   can ever appear between the floating navbar and section backgrounds. */
export function PageBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(60rem_30rem_at_20%_-10%,rgba(45,82,232,0.10),transparent),radial-gradient(40rem_24rem_at_90%_10%,rgba(206,126,27,0.10),transparent)]" />
    </div>
  );
}
