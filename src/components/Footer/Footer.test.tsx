import React from 'react';
import Footer from './index';
import renderer from 'react-test-renderer';

describe('Footer', () => {
it('renders without error', () => {
const tree = renderer
.create(<Footer></Footer>)
.toJSON();
expect(tree).toMatchSnapshot();
});
});