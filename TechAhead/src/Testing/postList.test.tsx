import React from 'react';
import {render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import PostList from '../Screens/PostList';
import {jest, test, describe, expect} from '@jest/globals';
import {useSelector} from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

const mockState = {
  post: {
    data: [
      {id: 1, title: 'Post 1', content: 'Content 1'},
      {id: 2, title: 'Post 2', content: 'Content 2'},
    ],
  },
};

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('<PostList />', () => {
  test('renders correctly with posts', () => {
    useSelector.mockReturnValue(mockState);

    const {getByText} = render(
      <Provider store={mockStore}>
        <PostList navigation={{goBack: jest.fn()}} />
      </Provider>,
    );

    expect(getByText('Post 1')).toBeTruthy();
    expect(getByText('Post 2')).toBeTruthy();
  });

  test('renders correctly with no posts', () => {
    useSelector.mockReturnValue({post: {data: []}});

    const {getByText} = render(
      <Provider store={mockStore}>
        <PostList navigation={{goBack: jest.fn()}} />
      </Provider>,
    );

    expect(getByText('No post found!')).toBeTruthy();
  });
});
