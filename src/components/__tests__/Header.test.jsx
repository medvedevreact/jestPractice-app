import { screen } from '@testing-library/react';
import { renderWithRouter } from '../../utils/testing';
import { Header } from '../Header';

describe('Header', () => {
  test('render', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText(/react food/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(3);
  });
});
