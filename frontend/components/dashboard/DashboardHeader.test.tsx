import { render, screen } from '@testing-library/react';
import DashboardHeader from './DashboardHeader';

describe('DashboardHeader', () => {
  it('renders welcome message', () => {
    render(<DashboardHeader />);
    expect(screen.getByText(/Welcome back, Alex!/i)).toBeInTheDocument();
    expect(screen.getByText(/Your job search is performing great/i)).toBeInTheDocument();
  });
});
