import React from 'react';
import { render } from '@testing-library/react';
import {Home,Badge} from "./views/Home";
import {Navbar} from "./components/Navbar";

test('should renders Home with icons of type Pokemon', () => {
    const { getAllByAltText } = render(<Badge route="/all/pokemon" color="pink" src={`/images/poison.png`} name="poison" />);
    const image = getAllByAltText(/type icon/i);
    expect(image[0]).toBeInTheDocument()
});

test('should renders Home with icon name depend on component of type Pokemon', () => {
    const { getAllByText } = render(<Badge route="/all/pokemon" color="pink" src={`/images/poison.png`} name="electric" />);
    const image = getAllByText(/electric/i);
    expect(image[0]).toBeInTheDocument()
});

test('should renders Home with icon name depend on component of type Pokemon', () => {
    const { getAllByTestId } = render(<Home/>);
    const image = getAllByTestId(/homepage/i);
    expect(image).toBeInTheDocument()
});
