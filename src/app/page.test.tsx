import Home from './page';
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

test('Home component renders correctly', () => {
  const { getByText } = render(<Home />);
  
  // Проверяем наличие элементов на странице
  expect(getByText('todos')).toBeInTheDocument();
  // Добавьте дополнительные проверки для других элементов, если необходимо
});
