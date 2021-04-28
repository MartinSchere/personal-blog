import React from 'react';
import Navbar from './index';
import renderer from 'react-test-renderer';

describe('Navbar', () => {
it('renders without error', () => {
const tree = renderer
.create(<Navbar></Navbar>)
.toJSON();
expect(tree).toMatchSnapshot();
});
});