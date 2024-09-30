import { renderWithRouter } from '../../utils/testing';
import { Recipe } from '../Recipe';
import * as api from '../../api';
import { waitForElementToBeRemoved, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router-dom';

const apiSpy = jest.spyOn(api, 'getMealById');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const useNavigateMock = jest.mocked(useNavigate);

describe('Recipe', () => {
  test('render', async () => {
    apiSpy.mockResolvedValueOnce({
      meals: [
        {
          idMeal: '1',
          strMeal: 'First',
          strCategory: 'Category',
          strArea: 'Area',
          strInstructions: 'Instructions',
          strMealThumb: 'Thumb',
          strIngridients: 'Ing1',
          strMeasure: 'Measure1',
          strYoutube: 'Youtube',
        },
      ],
    });
    renderWithRouter(<Recipe />);
    const preloader = screen.getByRole('progressbar');
    expect(preloader).toBeInTheDocument();
    await waitForElementToBeRemoved(preloader);
    expect(screen.getByRole('article')).toMatchSnapshot();
  });
  test('navigates back when "Go Back" button is clicked', async () => {
    const navigateMock = jest.fn();

    useNavigateMock.mockReturnValue(navigateMock);

    apiSpy.mockResolvedValueOnce({
      meals: [
        {
          idMeal: '1',
          strMeal: 'First',
          strCategory: 'Category',
          strArea: 'Area',
          strInstructions: 'Instructions',
          strMealThumb: 'Thumb',
          strIngridients: 'Ing1',
          strMeasure: 'Measure1',
          strYoutube: 'Youtube',
        },
      ],
    });

    renderWithRouter(<Recipe />);

    const preloader = screen.getByRole('progressbar');
    await waitForElementToBeRemoved(preloader);

    const goBackButton = screen.getByRole('button', { name: /go back/i });

    await userEvent.click(goBackButton);

    expect(navigateMock).toHaveBeenCalledWith(-1);
    expect(navigateMock).toHaveBeenCalledTimes(1);
  });
});
