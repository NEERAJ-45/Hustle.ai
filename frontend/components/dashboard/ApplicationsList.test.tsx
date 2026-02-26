import { render, screen } from '@testing-library/react';
import ApplicationsList from './ApplicationsList';
import { applications } from './dashboardData';

describe('ApplicationsList', () => {
  it('renders all applications', () => {
    render(<ApplicationsList />);
    applications.forEach(app => {
      expect(screen.getByText(app.job)).toBeInTheDocument();
      expect(screen.getByText(app.status)).toBeInTheDocument();
    });
  });
});
