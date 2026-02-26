import { render, screen } from '@testing-library/react';
import DashboardStats from './DashboardStats';

describe('DashboardStats', () => {
  it('renders all stats', () => {
    render(<DashboardStats />);
    expect(screen.getByText(/Job Matches/i)).toBeInTheDocument();
    expect(screen.getByText(/Applications Sent/i)).toBeInTheDocument();
    expect(screen.getByText(/Interviews/i)).toBeInTheDocument();
    expect(screen.getByText(/Offers/i)).toBeInTheDocument();
  });
});
