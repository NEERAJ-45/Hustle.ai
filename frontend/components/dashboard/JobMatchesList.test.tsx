import { render, screen } from '@testing-library/react';
import JobMatchesList from './JobMatchesList';
import { jobMatches } from './dashboardData';

describe('JobMatchesList', () => {
  it('renders all job matches', () => {
    render(<JobMatchesList />);
    jobMatches.forEach(job => {
      expect(screen.getByText(job.title)).toBeInTheDocument();
      expect(screen.getByText(job.company)).toBeInTheDocument();
    });
  });
});
