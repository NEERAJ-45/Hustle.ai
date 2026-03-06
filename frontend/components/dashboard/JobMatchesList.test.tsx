import { render, screen } from "@testing-library/react";
import JobMatchesList from "./JobMatchesList";

const jobMatches = [
  {
    id: "1",
    title: "Frontend Engineer",
    company: "Acme Corp",
    location: "Bengaluru, India",
    salary: "$100k - $120k",
    match: 92,
    posted: "2026-03-04T00:00:00.000Z",
    status: "new",
  },
  {
    id: "2",
    title: "Backend Engineer",
    company: "Globex",
    location: "Pune, India",
    salary: "$90k - $110k",
    match: 88,
    posted: "2026-03-03T00:00:00.000Z",
    status: "applied",
  },
];

describe("JobMatchesList", () => {
  it("renders all job matches", () => {
    render(<JobMatchesList data={jobMatches} />);
    jobMatches.forEach((job) => {
      expect(screen.getByText(job.title)).toBeInTheDocument();
      expect(screen.getByText(job.company)).toBeInTheDocument();
    });
  });
});
