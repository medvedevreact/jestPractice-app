import { screen } from '@testing-library/react';
import { renderWithRouter } from './utils/testing';
import App from './App';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }) => <div>{children}</div>,
}));

jest.mock('./pages/Home', () => ({
  Home: () => <div data-testid="home">Home</div>,
}));
jest.mock('./pages/About', () => ({
  About: () => <div data-testid="about">About</div>,
}));
jest.mock('./pages/Category', () => ({
  Category: () => <div data-testid="category">Category</div>,
}));
jest.mock('./pages/Contact', () => ({
  Contact: () => <div data-testid="contact">Contact</div>,
}));
jest.mock('./pages/NotFound', () => ({
  NotFound: () => <div data-testid="not-found">Not Found</div>,
}));
jest.mock('./pages/Recipe', () => ({
  Recipe: () => <div data-testid="recipe">Recipe</div>,
}));

describe('App Routing', () => {
  test('renders Home component on default route "/"', () => {
    renderWithRouter(<App />, { initialEntries: ['/'] });
    expect(screen.getByTestId('home')).toBeInTheDocument();
  });

  test('renders About component on route "/about"', () => {
    renderWithRouter(<App />, { initialEntries: ['/about'] });
    expect(screen.getByTestId('about')).toBeInTheDocument();
  });

  test('renders Category component on route "/category/:name"', () => {
    renderWithRouter(<App />, { initialEntries: ['/category/beef'] });
    expect(screen.getByTestId('category')).toBeInTheDocument();
  });

  test('renders Contact component on route "/contacts"', () => {
    renderWithRouter(<App />, { initialEntries: ['/contacts'] });
    expect(screen.getByTestId('contact')).toBeInTheDocument();
  });

  test('renders Recipe component on route "/meal/:id"', () => {
    renderWithRouter(<App />, { initialEntries: ['/meal/52772'] });
    expect(screen.getByTestId('recipe')).toBeInTheDocument();
  });

  test('renders NotFound component on unknown route', () => {
    renderWithRouter(<App />, { initialEntries: ['/unknown-route'] });
    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });
});
