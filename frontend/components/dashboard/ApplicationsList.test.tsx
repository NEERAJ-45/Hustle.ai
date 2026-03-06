import { render, screen } from "@testing-library/react";
import ApplicationsList from "./ApplicationsList";

const applications = [
  {
    id: "1",
    job: "Frontend Engineer at Acme Corp",
    status: "Interview Scheduled",
    date: "2026-03-04",
    stage: "Technical Interview",
  },
  {
    id: "2",
    job: "Backend Engineer at Globex",
    status: "Application Submitted",
    date: "2026-03-03",
    stage: "Under Review",
  },
];

describe("ApplicationsList", () => {
  it("renders all applications", () => {
    render(<ApplicationsList data={applications} />);
    applications.forEach((app) => {
      expect(screen.getByText(app.job)).toBeInTheDocument();
      expect(screen.getByText(app.status)).toBeInTheDocument();
    });
  });
});
