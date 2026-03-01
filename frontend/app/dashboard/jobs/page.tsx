import JobListingsList from "@/components/dashboard/jobs/JobListingsList";

export default function JobsPage() {
  return (
    <div className="bg-gradient-to-r from-[#334e68] to-[#2563eb] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">Job Search</h1>
          <p className="text-white/80">Browse jobs matched to your profile</p>
        </div>
      </div>

      <JobListingsList />
    </div>
  );
}
