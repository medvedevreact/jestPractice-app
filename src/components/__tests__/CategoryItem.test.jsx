import { screen } from '@testing-library/react';
import { CategoryItem } from '../CategoryItem';
import { renderWithRouter } from '../../utils/testing';

describe('CategoryItem component', () => {
  const categoryMock = {
    strCategory: 'Dessert',
    strCategoryThumb: '/dessert.png',
    strCategoryDescription:
      'A variety of delicious desserts from around the world.',
  };

  it('renders correctly', () => {
    renderWithRouter(<CategoryItem {...categoryMock} />);
    expect(screen.getByRole('article')).toMatchSnapshot();
  });
});
