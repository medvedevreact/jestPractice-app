import { screen } from '@testing-library/react';
import { MealList } from '../MealList';
import { renderWithRouter } from '../../utils/testing';

describe('MealList component', () => {
  const mealsMock = [
    {
      idMeal: '1',
      strMeal: 'Pizza',
      strMealThumb: '/pizza.png',
    },
    {
      idMeal: '2',
      strMeal: 'Burger',
      strMealThumb: '/burger.png',
    },
  ];

  it('renders the list of meals', () => {
    renderWithRouter(<MealList meals={mealsMock} />);

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();

    const items = screen.getAllByRole('article');
    expect(items).toHaveLength(mealsMock.length);
  });
});
