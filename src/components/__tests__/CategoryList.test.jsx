import { screen } from '@testing-library/react';
import { CategoryList } from '../CategoryList';
import { renderWithRouter } from '../../utils/testing';

describe('CategoryList component', () => {
  const categoriesMock = [
    {
      idCategory: '1',
      strCategory: 'Dessert',
      strCategoryThumb: '/dessert.png',
      strCategoryDescription: 'A variety of delicious desserts.',
    },
    {
      idCategory: '2',
      strCategory: 'Main Course',
      strCategoryThumb: '/main-course.png',
      strCategoryDescription: 'Delicious main course meals.',
    },
  ];

  it('renders the list of categories', () => {
    renderWithRouter(<CategoryList catalog={categoriesMock} />);

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();

    const items = screen.getAllByRole('article');
    expect(items).toHaveLength(categoriesMock.length);
  });

  it('renders nothing when catalog is empty', () => {
    renderWithRouter(<CategoryList />);

    const list = screen.queryByRole('list');
    expect(list).toMatchSnapshot();
  });
});
