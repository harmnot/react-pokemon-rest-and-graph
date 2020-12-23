import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('should renders root', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Browse/i);
  expect(linkElement).toBeInTheDocument();
});

test('should show Title Logo For Homepage', () => {
  const { getByText } = render(<App />);
  const head = getByText(/WARUNG/i);
  expect(head).toBeInTheDocument()
});

