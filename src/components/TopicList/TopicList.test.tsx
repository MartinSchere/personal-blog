import React from 'react';
import TopicList from './index';
import renderer from 'react-test-renderer';

describe('TopicList', () => {
it('renders without error', () => {
const tree = renderer
.create(<TopicList></TopicList>)
.toJSON();
expect(tree).toMatchSnapshot();
});
});