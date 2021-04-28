import React from 'react';
import Article from './index';
import renderer from 'react-test-renderer';

describe('Article', () => {
it('renders without error', () => {
const tree = renderer
.create(<Article></Article>)
.toJSON();
expect(tree).toMatchSnapshot();
});
});