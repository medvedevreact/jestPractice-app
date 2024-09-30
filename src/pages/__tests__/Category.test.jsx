import { renderWithRouter } from '../../utils/testing';
import * as api from '../../api';
import { waitForElementToBeRemoved, screen } from '@testing-library/react';
import { Category } from '../Category';
import { useNavigate } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const apiSpy = jest.spyOn(api, 'getFilteredCategory');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const useNavigateMock = jest.mocked(useNavigate);

describe('Category', () => {
  test('render', async () => {
    apiSpy.mockResolvedValueOnce({
      meals: [
        {
          strMeal: 'Beef and Mustard Pie',
          strMealThumb:
            'https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg',
          idMeal: '52874',
        },
        {
          strMeal: 'Beef and Oyster pie',
          strMealThumb:
            'https://www.themealdb.com/images/media/meals/wrssvt1511556563.jpg',
          idMeal: '52878',
        },
      ],
    });

    renderWithRouter(<Category />);
    const preloader = screen.getByRole('progressbar');
    expect(preloader).toBeInTheDocument();
    await waitForElementToBeRemoved(preloader);
    expect(screen.getAllByRole('article')).toMatchSnapshot();
  });
  test('navigates back when "Go Back" button is clicked', async () => {
    const navigateMock = jest.fn();

    useNavigateMock.mockReturnValue(navigateMock);

    apiSpy.mockResolvedValueOnce({
      meals: [
        {
          strMeal: 'Beef and Mustard Pie',
          strMealThumb:
            'https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg',
          idMeal: '52874',
        },
      ],
    });

    renderWithRouter(<Category />);

    const preloader = screen.getByRole('progressbar');
    await waitForElementToBeRemoved(preloader);

    const goBackButton = screen.getByRole('button', { name: /go back/i });

    await userEvent.click(goBackButton);

    expect(navigateMock).toHaveBeenCalledWith(-1);
    expect(navigateMock).toHaveBeenCalledTimes(1);
  });
});
