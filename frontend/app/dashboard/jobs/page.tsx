import JobListingsList from "@/components/dashboard/jobs/JobListingsList";

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 via-blue-500/10 to-violet-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 dark:bg-grid-white/[0.02] bg-grid-black/[0.03]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-1.5 mb-4">
            <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-[13px] font-medium tracking-wide text-cyan-400">
              AI-Matched
            </span>
          </div>
          <div>
            <h1 className="text-4xl font-extrabold mb-2 tracking-tight">
              <span className="bg-linear-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Job Search
              </span>
            </h1>
            <p className="text-muted-foreground">
              Browse jobs matched to your profile
            </p>
          </div>
        </div>
      </div>

      <JobListingsList />
    </div>
  );
}
