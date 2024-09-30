import { screen, render } from '@testing-library/react';
import { Preloader } from '../Preloader';

describe('Preloader', () => {
  test('render', () => {
    render(<Preloader />);

    expect(screen.getByRole('progressbar')).toMatchSnapshot();
  });
});
