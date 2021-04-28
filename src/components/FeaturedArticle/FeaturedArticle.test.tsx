import React from 'react';
import FeaturedArticle from './index';
import renderer from 'react-test-renderer';

describe('FeaturedArticle', () => {
it('renders without error', () => {
const tree = renderer
.create(<FeaturedArticle></FeaturedArticle>)
.toJSON();
expect(tree).toMatchSnapshot();
});
});