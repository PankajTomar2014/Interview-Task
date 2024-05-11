import 'react-native';
import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import CreatePost from '../Screens/CreatePost';
import {test, describe, expect} from '@jest/globals';

describe('<CreatePost />', () => {
  test('renders correctly', () => {
    const {getByPlaceholderText, getByText} = render(<CreatePost />);

    expect(getByPlaceholderText('Post title')).toBeTruthy();
    expect(getByPlaceholderText('Announcement')).toBeTruthy();
    expect(getByText('Files')).toBeTruthy();
    expect(getByText('Media')).toBeTruthy();
    expect(getByText('Post')).toBeTruthy();
  });

  test('displays character count correctly', () => {
    const {getByText, getByPlaceholderText} = render(<CreatePost />);
    const announcementInput = getByPlaceholderText('Announcement');

    fireEvent.changeText(announcementInput, 'This is a test announcement.');

    expect(getByText('4000 - 28')).toBeTruthy();
  });
});
