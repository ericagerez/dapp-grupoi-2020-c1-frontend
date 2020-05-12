import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { API_URL } from './api/base';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Bienvenidx/i);
  expect(linkElement).toBeInTheDocument();
});

test('api url is correct', () => {
  expect(API_URL).toEqual('https://compramundo-admin.herokuapp.com/api/')
})