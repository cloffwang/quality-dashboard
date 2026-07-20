export function StagingBanner() {
  return (
    <div
      data-testid="staging-banner"
      className="w-full bg-amber-500 px-4 py-1.5 text-center text-sm font-semibold text-neutral-950"
    >
      STAGING ENVIRONMENT — mock data, not production
    </div>
  );
}
