import React from 'react';
import { render } from '@testing-library/react';
import Detail from "./components/Detail";

test('should show loading to get detail of Pokemon', () => {
    const { getByRole } = render(<Detail />);
    const loader = getByRole(/status/i);
    expect(loader).toBeInTheDocument()
});
