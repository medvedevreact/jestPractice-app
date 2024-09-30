import { renderWithRouter } from '../../utils/testing';
import * as api from '../../api';
import { waitForElementToBeRemoved, screen } from '@testing-library/react';
import { Home } from '../Home';
import userEvent from '@testing-library/user-event';

const apiSpy = jest.spyOn(api, 'getAllCategories');

describe('Category', () => {
  test('render', async () => {
    apiSpy.mockResolvedValueOnce({
      categories: [
        {
          idCategory: '1',
          strCategory: 'Beef',
          strCategoryThumb:
            'https://www.themealdb.com/images/category/beef.png',
          strCategoryDescription:
            'Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have been eating beef since prehistoric times.[1] Beef is a source of high-quality protein and essential nutrients.[2]',
        },
        {
          idCategory: '2',
          strCategory: 'Chicken',
          strCategoryThumb:
            'https://www.themealdb.com/images/category/chicken.png',
          strCategoryDescription:
            'Chicken is a type of domesticated fowl, a subspecies of the red junglefowl. It is one of the most common and widespread domestic animals, with a total population of more than 19 billion as of 2011.[1] Humans commonly keep chickens as a source of food (consuming both their meat and eggs) and, more rarely, as pets.',
        },
      ],
    });

    renderWithRouter(<Home />);
    const preloader = screen.getByRole('progressbar');
    expect(preloader).toBeInTheDocument();
    await waitForElementToBeRemoved(preloader);
    expect(screen.getAllByRole('article')).toMatchSnapshot();
  });
  test('renders search bar and filters categories correctly', async () => {
    apiSpy.mockResolvedValue({
      categories: [
        {
          idCategory: '1',
          strCategory: 'Beef',
          strCategoryThumb:
            'https://www.themealdb.com/images/category/beef.png',
          strCategoryDescription:
            'Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have been eating beef since prehistoric times.[1] Beef is a source of high-quality protein and essential nutrients.[2]',
        },
        {
          idCategory: '2',
          strCategory: 'Chicken',
          strCategoryThumb:
            'https://www.themealdb.com/images/category/chicken.png',
          strCategoryDescription:
            'Chicken is a type of domesticated fowl, a subspecies of the red junglefowl. It is one of the most common and widespread domestic animals, with a total population of more than 19 billion as of 2011.[1] Humans commonly keep chickens as a source of food (consuming both their meat and eggs) and, more rarely, as pets.',
        },
      ],
    });

    renderWithRouter(<Home />);

    const preloader = screen.getByRole('progressbar');
    expect(preloader).toBeInTheDocument();
    await waitForElementToBeRemoved(preloader);

    expect(screen.getAllByRole('article')).toHaveLength(2);

    const searchInput = screen.getByPlaceholderText(/search/i);
    await userEvent.type(searchInput, 'Beef');
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getAllByRole('article')).toHaveLength(1);
    expect(screen.getByText('Beef')).toBeInTheDocument();
  });
  test('should render Home with search', async () => {
    apiSpy.mockResolvedValueOnce({
      categories: [
        {
          idCategory: '1',
          strCategory: 'Beef',
          strCategoryThumb:
            'https://www.themealdb.com/images/category/beef.png',
          strCategoryDescription:
            'Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have been eating beef since prehistoric times.[1] Beef is a source of high-quality protein and essential nutrients.[2]',
        },
        {
          idCategory: '2',
          strCategory: 'Chicken',
          strCategoryThumb:
            'https://www.themealdb.com/images/category/chicken.png',
          strCategoryDescription:
            'Chicken is a type of domesticated fowl, a subspecies of the red junglefowl. It is one of the most common and widespread domestic animals, with a total population of more than 19 billion as of 2011.[1] Humans commonly keep chickens as a source of food (consuming both their meat and eggs) and, more rarely, as pets.',
        },
      ],
    });

    renderWithRouter(<Home />, {
      initialEntries: ['/?search=Beef'],
    });

    const preloader = screen.getByRole('progressbar');

    expect(preloader).toBeInTheDocument();

    await waitForElementToBeRemoved(preloader);

    expect(screen.getAllByRole('article')).toHaveLength(1);
  });
});
