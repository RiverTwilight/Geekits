import React from 'react';
import { render } from '@testing-library/react';
// @ts-expect-error ts-migrate(6142) FIXME: Module './App' was resolved to '/mnt/h/Bob/Web/Pro... Remove this comment to see the full error message
import App from './App';

test('renders learn react link', () => {
  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
