import { screen } from '@testing-library/react';
import { renderWithRouter } from '../../utils/testing';
import { Meal } from '../Meal';

describe('Meal', () => {
  it('renders correctly', () => {
    renderWithRouter(
      <Meal strMeal="Cheese cake" idMeal="123" strMealThumb="/meal.png" />,
    );

    expect(screen.getByRole('article')).toMatchSnapshot();
  });
});
