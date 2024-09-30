import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Search } from '../Search';

describe('Search component', () => {
  it('should render input and button', () => {
    render(<Search />);

    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByText(/search/i);

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should update the input value on change', async () => {
    render(<Search />);

    const input = screen.getByPlaceholderText(/search/i);
    await userEvent.type(input, 'test value');

    expect(input).toHaveValue('test value');
  });

  it('should call callback on Enter key press', async () => {
    const mockCb = jest.fn();
    render(<Search cb={mockCb} />);

    const input = screen.getByPlaceholderText(/search/i);
    await userEvent.type(input, 'test value{enter}');

    expect(mockCb).toHaveBeenCalledWith('test value');
  });

  it('should call callback on button click', async () => {
    const mockCb = jest.fn();
    render(<Search cb={mockCb} />);

    const input = screen.getByPlaceholderText(/search/i);
    await userEvent.type(input, 'test value');

    const button = screen.getByText(/search/i);
    await userEvent.click(button);

    expect(mockCb).toHaveBeenCalledWith('test value');
  });
});
