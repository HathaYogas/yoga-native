import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../Button';

describe('Button 컴포넌트 테스트', () => {
  it('버튼이 올바르게 렌더링된다.', () => {
    const { getByText } = render(
      <Button title="클릭하세요" onPress={() => {}} />
    );
    expect(getByText('클릭하세요')).toBeTruthy();
  });

  it('버튼 클릭 시 onPress가 호출된다.', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Button title="클릭하세요" onPress={mockOnPress} />
    );

    fireEvent.press(getByText('클릭하세요'));
    expect(mockOnPress).toHaveBeenCalled();
  });

  it('비활성화된 버튼은 클릭할 수 없다.', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Button title="클릭하세요" onPress={mockOnPress} disabled />
    );

    fireEvent.press(getByText('클릭하세요'));
    expect(mockOnPress).not.toHaveBeenCalled();
  });
});
