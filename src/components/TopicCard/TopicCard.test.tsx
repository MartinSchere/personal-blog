import React from 'react';
import TopicCard from './index';
import renderer from 'react-test-renderer';

describe('TopicCard', () => {
it('renders without error', () => {
const tree = renderer
.create(<TopicCard></TopicCard>)
.toJSON();
expect(tree).toMatchSnapshot();
});
});