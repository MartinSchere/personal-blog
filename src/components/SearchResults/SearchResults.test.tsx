import React from 'react';
import SearchResults from './index';
import renderer from 'react-test-renderer';

describe('SearchResults', () => {
it('renders without error', () => {
const tree = renderer
.create(<SearchResults></SearchResults>)
.toJSON();
expect(tree).toMatchSnapshot();
});
});