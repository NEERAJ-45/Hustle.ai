export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];
export const SAVED_JOBS_STORAGE_KEY = "hustleai.savedJobIds";

export const chartData = [
  { month: "Jul", matched: 12, applied: 4, saved: 8 },
  { month: "Aug", matched: 18, applied: 7, saved: 11 },
  { month: "Sep", matched: 22, applied: 9, saved: 15 },
  { month: "Oct", matched: 28, applied: 12, saved: 19 },
  { month: "Nov", matched: 35, applied: 15, saved: 22 },
  { month: "Dec", matched: 42, applied: 18, saved: 28 },
];

export const chartConfig = {
  matched: { label: "Matched", color: "hsl(262, 83%, 58%)" },
  applied: { label: "Applied", color: "hsl(142, 71%, 45%)" },
  saved: { label: "Saved", color: "hsl(217, 91%, 60%)" },
};

export const matchMetrics = [
  { label: "Match Rate", value: 72, color: "bg-blue-500" },
  { label: "Application Rate", value: 43, color: "bg-green-500" },
  { label: "Response Rate", value: 28, color: "bg-purple-500" },
];
