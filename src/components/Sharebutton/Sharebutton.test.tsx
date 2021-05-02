import React from 'react';
import Sharebutton from './index';
import renderer from 'react-test-renderer';

describe('Sharebutton', () => {
it('renders without error', () => {
const tree = renderer
.create(<Sharebutton></Sharebutton>)
.toJSON();
expect(tree).toMatchSnapshot();
});
});