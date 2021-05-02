import React from 'react';
import Searchbar from './index';
import renderer from 'react-test-renderer';

describe('Searchbar', () => {
it('renders without error', () => {
const tree = renderer
.create(<Searchbar></Searchbar>)
.toJSON();
expect(tree).toMatchSnapshot();
});
});