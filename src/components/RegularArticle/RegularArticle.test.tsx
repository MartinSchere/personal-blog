import React from 'react';
import RegularArticle from './index';
import renderer from 'react-test-renderer';

describe('RegularArticle', () => {
it('renders without error', () => {
const tree = renderer
.create(<RegularArticle></RegularArticle>)
.toJSON();
expect(tree).toMatchSnapshot();
});
});